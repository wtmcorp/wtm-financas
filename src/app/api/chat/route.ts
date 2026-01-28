import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

// Configuração OpenAI
const openaiKey = (process.env.OPENAI_API_KEY || "").trim();
const hasOpenaiKey = openaiKey && openaiKey !== "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && openaiKey !== "";
const openai = hasOpenaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

// Configuração DeepSeek (Fallback)
const deepseekKey = (process.env.DEEPSEEK_API_KEY || "").trim();
const hasDeepseekKey = deepseekKey && deepseekKey !== "";
const deepseek = hasDeepseekKey ? new OpenAI({
    apiKey: deepseekKey,
    baseURL: 'https://api.deepseek.com'
}) : null;

// Função de resposta offline (último recurso)
function getOfflineResponse(message: string, errorDetail: string = "") {
    const lowerMsg = message.toLowerCase();
    let response = "Olá! No momento estou operando em modo de segurança (offline). ";

    if (lowerMsg.includes("investir") || lowerMsg.includes("investimento")) {
        response += "Para investir com segurança, foque primeiro em sua reserva de emergência (CDB 100% CDI ou Tesouro Selic). O mercado está em um momento de atenção com a Selic em patamares elevados. 🚀";
    } else if (lowerMsg.includes("cartão") || lowerMsg.includes("crédito")) {
        response += "Sobre cartões, a melhor estratégia é concentrar gastos em um único cartão que ofereça benefícios reais como cashback ou milhas, evitando anuidades desnecessárias. 💳";
    } else if (lowerMsg.includes("economizar") || lowerMsg.includes("poupar") || lowerMsg.includes("saudável")) {
        response += "Para economizar de forma saudável, use a regra 50/30/20: 50% para necessidades básicas, 30% para lazer e 20% para o seu futuro. Pequenos cortes em gastos supérfluos fazem grande diferença no longo prazo. 💰";
    } else if (lowerMsg.includes("wtm") || lowerMsg.includes("quem é")) {
        response += "A WTM Corps é sua parceira em inteligência financeira. Estamos aqui para simplificar o mercado e ajudar você a tomar as melhores decisões com seu dinheiro. 🏢";
    } else {
        response += "Como posso ajudar você com suas finanças hoje? Posso falar sobre investimentos, cartões ou estratégias de economia. (Modo Offline)";
    }

    if (errorDetail) {
        // Log discreto para debug, mas mensagem amigável para o usuário
        console.warn("Offline fallback triggered due to:", errorDetail);
    }

    return response;
}

export async function POST(req: NextRequest) {
    try {
        const { message, conversationHistory } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const systemPrompt = `Você é o Wtm AI, um assistente financeiro profissional especializado em finanças pessoais brasileiras. 
Suas especialidades incluem:
- Investimentos (CDB, Tesouro Direto, Ações, Fundos, Cripto)
- Cartões de crédito (cashback, milhas, benefícios)
- Planejamento financeiro e orçamento
- Reserva de emergência
- Gestão de dívidas e alavancagem
- Indicadores econômicos (Selic, CDI, IPCA)
- Aposentadoria e previdência
- Análise de risco e diversificação

IMPORTANTE:
- Sempre responda em português brasileiro
- Use exemplos práticos com valores em Reais (R$)
- Seja didático e acessível
- Forneça respostas estruturadas e organizadas
- Use emojis para tornar as respostas mais amigáveis
- Quando falar de investimentos, mencione os riscos
- Cite taxas e impostos quando relevante
- Seja conciso mas completo (máximo 400 palavras por resposta)

Contexto atual do Brasil (Janeiro 2026):
- Selic: ~9.5% a.a.
- CDI: ~9.4% a.a.
- IPCA (inflação): ~3.9% a.a.`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...(conversationHistory || []).map((msg: any) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
            })),
            { role: "user", content: message },
        ];

        // 1. Tenta OpenAI primeiro
        if (openai) {
            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: messages as any,
                    max_tokens: 600,
                    temperature: 0.7,
                });
                const aiMessage = response.choices[0].message.content || "Sem resposta.";
                return NextResponse.json({ message: aiMessage, source: "openai" });
            } catch (error: any) {
                console.error("OpenAI Error:", error.message);
                // Se for erro de cota ou outro erro, tenta o DeepSeek
            }
        }

        // 2. Tenta DeepSeek (Fallback)
        if (deepseek) {
            try {
                console.log("Attempting DeepSeek fallback...");
                const response = await deepseek.chat.completions.create({
                    model: "deepseek-chat",
                    messages: messages as any,
                    max_tokens: 600,
                    temperature: 0.7,
                });
                const aiMessage = response.choices[0].message.content || "Sem resposta.";
                return NextResponse.json({ message: aiMessage, source: "deepseek" });
            } catch (error: any) {
                console.error("DeepSeek Error:", error.message);
            }
        }

        // 3. Se tudo falhar, usa resposta offline
        return NextResponse.json({
            message: getOfflineResponse(message, "All AI providers failed"),
            source: "offline"
        });

    } catch (error: any) {
        console.error("Chat API Critical Error:", error);
        return NextResponse.json({
            message: "Olá! Tivemos um pequeno problema de conexão, mas você pode continuar usando as ferramentas do dashboard enquanto restabelecemos o sinal total. 🛠️"
        });
    }
}
