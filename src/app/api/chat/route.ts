import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
    apiKey: (process.env.OPENAI_API_KEY || "").trim(),
});

export async function POST(req: NextRequest) {
    try {
        const { message, conversationHistory } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Preparar mensagens para ChatGPT
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
- Forneça links úteis quando apropriado

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

        // Chamar OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages as any,
            max_tokens: 600,
            temperature: 0.7,
        });

        const aiMessage = response.choices[0].message.content || "Desculpe, não consegui gerar uma resposta.";

        return NextResponse.json({
            message: aiMessage
        });

    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
