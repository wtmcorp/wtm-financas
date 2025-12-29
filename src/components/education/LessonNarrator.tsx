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

    // Clean text for speech
    const cleanText = (md: string) => {
        return md
            .replace(/[#*`_]/g, "")
            .replace(/\[(.*?)\]\(.*?\)/g, "$1")
            .replace(/\n/g, ". ");
    };

    // Reset and cleanup when text changes
    useEffect(() => {
        // Stop any current audio
        if (audio) {
            audio.pause();
            audio.src = "";
        }

        // Abort any pending fetch
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Reset state
        setAudio(null);
        setIsPlaying(false);
        setIsLoading(false);
        setProgress(0);
    }, [text]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (audio) {
                audio.pause();
                audio.src = "";
            }
        };
    }, [audio]);

    const handlePlay = async () => {
        if (audio) {
            audio.play();
            setIsPlaying(true);
            return;
        }

        try {
            setIsLoading(true);

            // Abort previous request if any
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            // Add a timeout to the fetch request
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

            const response = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: cleanText(text),
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error("Failed to generate audio");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const newAudio = new Audio(url);

            newAudio.onended = () => {
                setIsPlaying(false);
                setProgress(100);
            };

            newAudio.ontimeupdate = () => {
                if (newAudio.duration) {
                    setProgress((newAudio.currentTime / newAudio.duration) * 100);
                }
            };

            newAudio.onerror = () => {
                console.error("Audio playback error");
                setIsPlaying(false);
                setIsLoading(false);
            };

            // Wait for audio to be ready
            newAudio.oncanplaythrough = () => {
                setAudio(newAudio);
                newAudio.play().catch(e => console.error("Play error:", e));
                setIsPlaying(true);
                setIsLoading(false);
            };

            // Fallback if canplaythrough doesn't fire immediately
            newAudio.load();

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log("TTS request aborted");
            } else {
                console.error("Narrator error:", error);
            }
            setIsLoading(false);
        }
    };

    const handlePause = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
            setProgress(0);
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 p-2 pl-4 pr-2 bg-[#0f0f13]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl animate-in slide-in-from-bottom-10 duration-500">

            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-purple-500 animate-pulse" : "bg-gray-500"}`} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:block">
                    {isLoading ? "Gerando Voz..." : isPlaying ? "Narrando (Gojo Mode)" : "Narrador IA"}
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
