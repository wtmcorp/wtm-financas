import { NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { text, voice = "pt-BR-AntonioNeural", pitch = "-2Hz", rate = "+5%" } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const tts = new MsEdgeTTS();
        await tts.setMetadata(voice, OUTPUT_FORMAT.WEBM_24KHZ_16BIT_MONO_OPUS);

        const ssml = `
            <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="pt-BR">
                <voice name="${voice}">
                    <prosody pitch="${pitch}" rate="${rate}">
                        ${text}
                    </prosody>
                </voice>
            </speak>
        `;

        // Add timeout to TTS generation (10 seconds)
        const timeoutPromise = new Promise<any>((_, reject) =>
            setTimeout(() => reject(new Error("TTS Generation Timeout")), 10000)
        );

        const readable = await Promise.race([
            tts.toStream(ssml),
            timeoutPromise
        ]) as any;

        const chunkBuffers: any[] = [];
        for await (const data of readable) {
            chunkBuffers.push(data);
        }

        const finalAudio = Buffer.concat(chunkBuffers);

        return new NextResponse(finalAudio, {
            headers: {
                "Content-Type": "audio/webm",
                "Content-Length": finalAudio.length.toString(),
            },
        });

    } catch (error: any) {
        console.error("TTS Error:", error);
        return NextResponse.json({
            error: "Failed to generate speech",
            details: error.message
        }, { status: 500 });
    }
}
