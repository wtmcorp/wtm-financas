"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const { user, updateUser } = useAuth();

    useEffect(() => {
        // Show modal if user hasn't set their name
        const hasSeenWelcome = localStorage.getItem("wtm_welcome_seen");
        if (!hasSeenWelcome && (!user?.name || user.name === "Usuário")) {
            setIsOpen(true);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            updateUser({ name: name.trim() });
            localStorage.setItem("wtm_welcome_seen", "true");
            setIsOpen(false);
        }
    };

    const handleSkip = () => {
        localStorage.setItem("wtm_welcome_seen", "true");
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-gradient-to-b from-card to-black border border-primary/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                    >
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-primary mb-2">Bem-vindo ao Wtm Corps! 🎉</h1>
                            <p className="text-gray-400 text-sm">Sua jornada financeira começa aqui</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Como podemos te chamar?
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite seu nome..."
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors placeholder:text-gray-500"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleSkip}
                                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-colors text-sm"
                                >
                                    Pular
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-black font-bold rounded-lg transition-colors text-sm"
                                >
                                    Começar
                                </button>
                            </div>
                        </form>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Personalize sua experiência para receber dicas financeiras sob medida
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
