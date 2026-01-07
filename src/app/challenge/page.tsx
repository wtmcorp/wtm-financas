"use client";

import { useState } from "react";
import { Lock, Heart, Coins, Key, ShieldCheck, Sparkles } from "lucide-react";
import Challenge100k from "@/components/tools/Challenge100k";
import { motion, AnimatePresence } from "framer-motion";

export default function ChallengePage() {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating a secure check delay
        setTimeout(() => {
            if (password === "sofiaewalter100k") {
                setIsAuthorized(true);
                setError("");
            } else {
                setError("Acesso Negado. Senha incorreta.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <AnimatePresence mode="wait">
                {!isAuthorized ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        className="min-h-[70vh] flex items-center justify-center"
                    >
                        <div className="w-full max-w-md relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />

                            <div className="bg-[#0f0f13]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-pink-500 to-primary animate-gradient" />

                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner group">
                                        <Lock className="text-gray-400 group-hover:text-primary transition-colors duration-500" size={32} />
                                    </div>
                                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Área Restrita</h1>
                                    <p className="text-gray-400 text-sm font-medium">
                                        Acesso exclusivo para <span className="text-primary">Walter</span> & <span className="text-pink-500">Sofia</span>
                                    </p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Senha de Acesso</label>
                                        <div className="relative group">
                                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••••"
                                                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono tracking-widest"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold text-center flex items-center justify-center gap-2"
                                        >
                                            <ShieldCheck size={14} />
                                            {error}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-black font-bold py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Sparkles size={18} />
                                                Desbloquear Cofre
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-7xl mx-auto space-y-8"
                    >
                        <header className="reveal relative overflow-hidden rounded-3xl glass-panel p-8 md:p-12 shadow-2xl">
                            <div className="absolute top-0 right-0 p-12 opacity-5">
                                <Heart size={300} className="text-pink-500 rotate-12" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
                                        <Heart size={16} className="text-pink-500 fill-pink-500" />
                                        <span className="text-sm font-medium text-pink-400">Projeto de Vida</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                                        O Desafio dos <span className="gradient-text">100k</span>
                                    </h1>
                                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                                        Cada depósito é um tijolo na construção da nossa liberdade. Vamos juntos nessa jornada! 🚀
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Meta Final</p>
                                        <p className="text-3xl font-black text-primary">R$ 100.000,00</p>
                                    </div>
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                                        <Coins className="text-primary" size={32} />
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="reveal" style={{ animationDelay: '0.2s' }}>
                            <Challenge100k />
                        </div>

                        <footer className="text-center py-10 opacity-50 reveal" style={{ animationDelay: '0.4s' }}>
                            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                                Feito com <Heart size={14} className="text-pink-500 fill-pink-500" /> para o nosso futuro.
                            </p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
