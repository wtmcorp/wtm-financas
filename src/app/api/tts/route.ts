import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || "sk_259c1a64b5f7c59c5d6f4b7f27a28a30f8545c35d149ab1e";
const PRIMARY_VOICE_ID = "iP95p4xoKVk53GoZ742B"; // Chris (Charming, Down-to-Earth)
const FALLBACK_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam (Dominant, Firm)

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        console.log("TTS Request received for text:", text.substring(0, 50) + "...");

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const callElevenLabs = async (voiceId: string) => {
            console.log(`Calling ElevenLabs API with voice: ${voiceId}...`);
            return await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "xi-api-key": ELEVENLABS_API_KEY,
                    },
                    body: JSON.stringify({
                        text,
                        model_id: "eleven_multilingual_v2",
                        voice_settings: {
                            stability: 0.5,
                            similarity_boost: 0.75,
                            style: 0.0,
                            use_speaker_boost: true
                        },
                    }),
                }
            );
        };

        let response = await callElevenLabs(PRIMARY_VOICE_ID);

        // Fallback if primary voice fails
        if (!response.ok) {
            console.warn(`Primary voice ${PRIMARY_VOICE_ID} failed, trying fallback...`);
            response = await callElevenLabs(FALLBACK_VOICE_ID);
        }

        console.log("ElevenLabs Response Status:", response.status);

        if (!response.ok) {
            const error = await response.json();
            console.error("ElevenLabs API Error Detail:", error);
            throw new Error(error.detail?.message || JSON.stringify(error) || "ElevenLabs API error");
        }

        const audioBuffer = await response.arrayBuffer();
        console.log("Audio Buffer size:", audioBuffer.byteLength);

        return new NextResponse(audioBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": audioBuffer.byteLength.toString(),
            },
        });

    } catch (error: any) {
        console.error("TTS Route Error:", error);
        return NextResponse.json({
            error: "Failed to generate speech",
            details: error.message
        }, { status: 500 });
    }
}
