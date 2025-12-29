import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
    apiKey: (process.env.OPENAI_API_KEY || "").trim(),
});

export async function POST(req: Request) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error("OpenAI API Key is missing");
            return NextResponse.json({
                error: "Configuration Error",
                details: "OpenAI API Key is not configured in the server environment."
            }, { status: 500 });
        }

        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "onyx", // Deep, authoritative voice
            input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": buffer.length.toString(),
            },
        });

    } catch (error: any) {
        console.error("OpenAI TTS Error:", error);
        return NextResponse.json({
            error: "Failed to generate speech",
            details: error.message
        }, { status: 500 });
    }
}
