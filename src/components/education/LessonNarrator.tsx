"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LessonNarratorProps {
    text: string;
    autoPlay?: boolean;
}

export default function LessonNarrator({ text, autoPlay = false }: LessonNarratorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const abortControllerRef = useRef<AbortController | null>(null);
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    // Gojo intros
    const gojoIntros = [
        "E aí, aluno? Presta atenção que o pai tá on. ",
        "Vamos lá, foco na aula. Não vai ser chato, prometo. ",
        "Ei, acorda! Hora de aprender algo novo com o melhor. ",
        "Relaxa, eu vou explicar isso de um jeito fácil. ",
    ];

    // Clean text for speech
    const cleanText = (md: string) => {
        return md
            .replace(/[#*`_]/g, "")
            .replace(/\[(.*?)\]\(.*?\)/g, "$1")
            .replace(/\n/g, ". ");
    };

    // Split text into smaller chunks for the API
    const splitText = (text: string): string[] => {
        // Split by punctuation to respect sentences, aiming for ~200 chars
        const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
        const chunks: string[] = [];
        let currentChunk = "";

        for (const sentence of sentences) {
            if ((currentChunk + sentence).length > 200) {
                chunks.push(currentChunk.trim());
                currentChunk = sentence;
            } else {
                currentChunk += sentence;
            }
        }
        if (currentChunk) chunks.push(currentChunk.trim());
        return chunks.filter(c => c.length > 0);
    };

    const stopPlayback = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.src = "";
            currentAudioRef.current = null;
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        setAudio(null);
        setIsPlaying(false);
        setIsLoading(false);
        setProgress(0);
    };

    // Reset and cleanup when text changes
    useEffect(() => {
        stopPlayback();
    }, [text]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopPlayback();
        };
    }, []);



    const fetchChunk = async (chunk: string, index: number): Promise<string | null> => {
        // If we already have the URL, return it
        if (audioQueueRef.current[index]) return audioQueueRef.current[index];

        // If a fetch is already in progress, return that promise
        if (index in prefetchPromisesRef.current) return prefetchPromisesRef.current[index];

        // Create a new fetch promise
        const fetchPromise = (async () => {
            try {
                console.log(`Fetching chunk ${index}...`);
                const response = await fetch("/api/tts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: chunk }),
                });

                if (!response.ok) throw new Error(`Failed to fetch chunk ${index}`);

                const blob = await response.blob();
                if (blob.size === 0) throw new Error(`Empty blob for chunk ${index}`);

                const url = URL.createObjectURL(blob);
                audioQueueRef.current[index] = url;
                return url;
            } catch (error) {
                console.error(`Error fetching chunk ${index}:`, error);
                return null;
            } finally {
                // Clean up the promise ref once done
                delete prefetchPromisesRef.current[index];
            }
        })();

        prefetchPromisesRef.current[index] = fetchPromise;
        return fetchPromise;
    };

    const playQueue = async (chunks: string[], index: number) => {
        if (index >= chunks.length) {
            setIsPlaying(false);
            setIsLoading(false);
            setProgress(100);
            return;
        }

        try {
            // Start pre-fetching next chunk immediately
            if (index + 1 < chunks.length) {
                fetchChunk(chunks[index + 1], index + 1);
            }

            // Get current chunk URL
            let url = audioQueueRef.current[index];
            if (!url) {
                setIsLoading(true);
                url = await fetchChunk(chunks[index], index) as string;
                if (!url) throw new Error(`Could not get audio URL for chunk ${index}`);
            }

            const newAudio = new Audio(url);
            currentAudioRef.current = newAudio;
            setAudio(newAudio);

            newAudio.onended = () => {
                playQueue(chunks, index + 1);
            };

            newAudio.ontimeupdate = () => {
                if (newAudio.duration) {
                    const chunkProgress = (newAudio.currentTime / newAudio.duration);
                    const totalProgress = ((index + chunkProgress) / chunks.length) * 100;
                    setProgress(totalProgress);
                }
            };

            newAudio.onerror = (e) => {
                console.error(`Audio playback error on chunk ${index}:`, e);
                playQueue(chunks, index + 1);
            };

            await newAudio.play();
            setIsLoading(false);

        } catch (error: any) {
            console.error("Queue playback error:", error);
            if (index === 0) {
                setIsPlaying(false);
                setIsLoading(false);
                alert("Erro ao iniciar o narrador. Tente novamente.");
            } else {
                playQueue(chunks, index + 1);
            }
        }
    };

    const handlePlay = async () => {
        if (isPlaying) {
            // If already playing, just pause (handled by handlePause)
            return;
        }

        setIsLoading(true);
        setIsPlaying(true);

        // Prepare text
        const cleaned = cleanText(text);
        let chunks = splitText(cleaned);

        // Add intro if text is long enough
        if (cleaned.length > 50) {
            const randomIntro = gojoIntros[Math.floor(Math.random() * gojoIntros.length)];
            if (randomIntro) {
                chunks = [randomIntro, ...chunks];
            }
        }

        // Start playing queue
        playQueue(chunks, 0);
    };

    const handlePause = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        stopPlayback();
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 p-2 pl-4 pr-2 bg-[#0f0f13]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl animate-in slide-in-from-bottom-10 duration-500">

            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-purple-500 animate-pulse" : "bg-gray-500"}`} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:block">
                    {isLoading ? "Gerando Voz..." : isPlaying ? "Gojo Narrador" : "Gojo Narrador"}
                </span>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex items-center gap-1">
                {isLoading ? (
                    <div className="p-2">
                        <RefreshCw size={18} className="text-primary animate-spin" />
                    </div>
                ) : !isPlaying ? (
                    <button
                        onClick={handlePlay}
                        className="p-2 hover:bg-white/10 rounded-full text-white transition-colors group relative"
                        title="Iniciar Narração"
                    >
                        <Play size={18} className="fill-white" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Ouvir Aula
                        </span>
                    </button>
                ) : (
                    <>
                        <button onClick={handlePause} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                            <Pause size={18} className="fill-white" />
                        </button>

                        <button onClick={handleStop} className="p-2 hover:bg-white/10 rounded-full text-red-400 transition-colors">
                            <VolumeX size={18} />
                        </button>
                    </>
                )}
            </div>

            {/* Progress Ring */}
            {isPlaying && (
                <div className="absolute -top-1 -right-1">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                    </span>
                </div>
            )}
        </div>
    );
}
