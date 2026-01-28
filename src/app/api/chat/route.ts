import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

const apiKey = (process.env.OPENAI_API_KEY || "").trim();
const hasApiKey = apiKey && apiKey !== "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && apiKey !== "";

const openai = hasApiKey ? new OpenAI({ apiKey }) : null;

// Função de resposta offline (fallback)
function getOfflineResponse(message: string, isQuotaError: boolean = false) {
    const lowerMsg = message.toLowerCase();
    let response = isQuotaError
        ? "Olá! Notei que minha 'energia' (créditos da API) acabou por agora. Enquanto meu mestre não recarrega, posso te ajudar com orientações básicas: "
        : "Olá! No momento estou operando em modo de segurança (assistente básico). ";

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

    if (isQuotaError) {
        response += "\n\n*(Nota: O limite de uso da API OpenAI foi atingido. É necessário adicionar créditos na plataforma para restaurar o chat completo.)*";
    }

    return response;
}

export async function POST(req: NextRequest) {
    try {
        const { message, conversationHistory } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // 1. Se não houver API Key, usa o fallback imediatamente
        if (!openai) {
            return NextResponse.json({ message: getOfflineResponse(message) });
        }

        // 2. Tenta usar a OpenAI
        try {
            const messages = [
                {
                    role: "system",
                    content: `Você é o Wtm AI, um assistente financeiro profissional especializado em finanças pessoais brasileiras. 
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
- IPCA (inflação): ~3.9% a.a.`,
                },
                ...(conversationHistory || []).map((msg: any) => ({
                    role: msg.sender === "user" ? "user" : "assistant",
                    content: msg.text,
                })),
                {
                    role: "user",
                    content: message,
                },
            ];

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: messages as any,
                max_tokens: 600,
                temperature: 0.7,
            });

            const aiMessage = response.choices[0].message.content || "Desculpe, não consegui gerar uma resposta.";
            return NextResponse.json({ message: aiMessage });

        } catch (apiError: any) {
            console.error("OpenAI API Error:", apiError.message);

            // Detectar erro de quota (429)
            const isQuotaError = apiError.status === 429 || apiError.message?.toLowerCase().includes("quota");

            return NextResponse.json({ message: getOfflineResponse(message, isQuotaError) });
        }

    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json({
            message: "Olá! Tivemos um pequeno problema de conexão, mas você pode continuar usando as ferramentas do dashboard enquanto restabelecemos o sinal total. 🛠️"
        });
    }
}
