import { NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export async function POST(req: Request) {
    try {
        const { text, voice = "pt-BR-AntonioNeural", pitch = "-2Hz", rate = "+5%" } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // Gojo-style intros (randomly selected for fun)
        const gojoIntros = [
            "E aí, aluno? Presta atenção que o pai tá on. ",
            "Vamos lá, foco na aula. Não vai ser chato, prometo. ",
            "Ei, acorda! Hora de aprender algo novo com o melhor. ",
            "Relaxa, eu vou explicar isso de um jeito fácil. ",
            "" // Sometimes no intro
        ];
        const randomIntro = gojoIntros[Math.floor(Math.random() * gojoIntros.length)];

        // Only add intro if text is long enough to be a lesson (e.g., > 50 chars)
        const finalText = text.length > 50 ? randomIntro + text : text;

        // Split text into chunks to avoid Vercel timeouts (approx 200 chars per chunk)
        // Simple regex to split by sentences but keep delimiters
        const sentences = finalText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [finalText];
        const chunks: string[] = [];
        let currentChunk = "";

        for (const sentence of sentences) {
            if ((currentChunk + sentence).length > 200) {
                chunks.push(currentChunk);
                currentChunk = sentence;
            } else {
                currentChunk += sentence;
            }
        }
        if (currentChunk) chunks.push(currentChunk);

        // Generate audio for each chunk
        const audioBuffers: Buffer[] = [];

        for (const chunk of chunks) {
            if (!chunk.trim()) continue;

            const tts = new MsEdgeTTS();
            await tts.setMetadata(voice, OUTPUT_FORMAT.WEBM_24KHZ_16BIT_MONO_OPUS);

            const ssml = `
                <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="pt-BR">
                    <voice name="${voice}">
                        <prosody pitch="${pitch}" rate="${rate}">
                            ${chunk}
                        </prosody>
                    </voice>
                </speak>
            `;

            const readable = await tts.toStream(ssml);
            const chunkBuffers: any[] = [];
            for await (const data of readable) {
                chunkBuffers.push(data);
            }
            audioBuffers.push(Buffer.concat(chunkBuffers));
        }

        const finalAudio = Buffer.concat(audioBuffers);

        return new NextResponse(finalAudio, {
            headers: {
                "Content-Type": "audio/webm",
                "Content-Length": finalAudio.length.toString(),
            },
        });

    } catch (error) {
        console.error("TTS Error:", error);
        return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 });
    }
}
