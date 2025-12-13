import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

export async function GET() {
    const hasKey = !!process.env.OPENAI_API_KEY;
    const keyLength = process.env.OPENAI_API_KEY?.length || 0;
    const keyStart = process.env.OPENAI_API_KEY?.substring(0, 7); // Show sk-proj

    let openaiStatus = "Not tested";
    let openaiError = null;

    try {
        if (hasKey) {
            const apiKey = (process.env.OPENAI_API_KEY || "").trim();
            const openai = new OpenAI({ apiKey });
            // Try a lightweight call
            await openai.models.list();
            openaiStatus = "Connected";
        } else {
            openaiStatus = "Skipped (No Key)";
        }
    } catch (e: any) {
        openaiStatus = "Failed";
        openaiError = {
            message: e.message,
            type: e.type,
            code: e.code,
            param: e.param,
            status: e.status
        };
    }

    return NextResponse.json({
        env: {
            hasOpenAIKey: hasKey,
            keyLength,
            keyStart,
            firebaseProject: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "Missing"
        },
        openai: {
            status: openaiStatus,
            error: openaiError
        },
        timestamp: new Date().toISOString()
    });
}
