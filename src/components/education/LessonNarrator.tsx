"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LessonNarratorProps {
    text: string;
    autoPlay?: boolean;
}

export default function LessonNarrator({ text, autoPlay = false }: LessonNarratorProps) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [progress, setProgress] = useState(0);
    const [available, setAvailable] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Initialize Speech Synthesis
    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            setAvailable(true);

            const loadVoices = () => {
                const voices = window.speechSynthesis.getVoices();
                // Try to find a good Portuguese male voice (Google or Microsoft)
                // Priority: Google Português do Brasil, Microsoft Daniel, Luciana (female fallback)
                const ptVoices = voices.filter(v => v.lang.includes("pt-BR") || v.lang.includes("pt-PT"));

                const preferredVoice = ptVoices.find(v => v.name.includes("Google") && !v.name.includes("Female")) ||
                    ptVoices.find(v => v.name.includes("Daniel")) ||
                    ptVoices[0];

                setVoice(preferredVoice || null);
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Clean text for speech (remove markdown symbols)
    const cleanText = (md: string) => {
        return md
            .replace(/[#*`_]/g, "") // Remove markdown chars
            .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Keep link text
            .replace(/\n/g, ". "); // Replace newlines with pauses
    };

    const speak = () => {
        if (!available || !voice) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsSpeaking(true);
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(cleanText(text));
        utterance.voice = voice;
        utterance.lang = "pt-BR";
        utterance.rate = 1.0; // Normal speed
        utterance.pitch = 0.9; // Slightly lower pitch for "calm" effect

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            setProgress(100);
        };

        utterance.onboundary = (event) => {
            // Estimate progress based on char index
            const len = text.length;
            const current = event.charIndex;
            setProgress(Math.min((current / len) * 100, 100));
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const pause = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsSpeaking(false);
        }
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        setProgress(0);
    };

    if (!available) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 p-2 pl-4 pr-2 bg-[#0f0f13]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl animate-in slide-in-from-bottom-10 duration-500">

            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:block">
                    {isSpeaking ? "Narrando Aula" : "Narrador IA"}
                </span>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex items-center gap-1">
                {!isSpeaking && !isPaused ? (
                    <button
                        onClick={speak}
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
                        {isPaused ? (
                            <button onClick={speak} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                                <Play size={18} className="fill-white" />
                            </button>
                        ) : (
                            <button onClick={pause} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                                <Pause size={18} className="fill-white" />
                            </button>
                        )}

                        <button onClick={stop} className="p-2 hover:bg-white/10 rounded-full text-red-400 transition-colors">
                            <VolumeX size={18} />
                        </button>
                    </>
                )}
            </div>

            {/* Progress Ring */}
            {isSpeaking && (
                <div className="absolute -top-1 -right-1">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                </div>
            )}
        </div>
    );
}
