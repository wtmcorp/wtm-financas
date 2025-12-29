import { NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "ms-edge-tts";

export async function POST(req: Request) {
    try {
        const { text, voice = "pt-BR-AntonioNeural", pitch = "-5Hz", rate = "+0%" } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const tts = new MsEdgeTTS();
        await tts.setMetadata(voice, OUTPUT_FORMAT.WEBM_24KHZ_16BIT_MONO_OPUS);

        // SSML to adjust pitch and rate for "Gojo" effect
        // Gojo has a deep, relaxed voice. We lower the pitch slightly.
        const ssml = `
            <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="pt-BR">
                <voice name="${voice}">
                    <prosody pitch="${pitch}" rate="${rate}">
                        ${text}
                    </prosody>
                </voice>
            </speak>
        `;

        const readable = await tts.toStream(ssml);

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of readable) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        return new NextResponse(audioBuffer, {
            headers: {
                "Content-Type": "audio/webm",
                "Content-Length": audioBuffer.length.toString(),
            },
        });

    } catch (error) {
        console.error("TTS Error:", error);
        return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 });
    }
}
