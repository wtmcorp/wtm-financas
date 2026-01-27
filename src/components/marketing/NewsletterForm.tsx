"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-xl p-1.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-xl">
                    <div className="pl-4 text-zinc-500">
                        <Mail size={20} />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu melhor e-mail..."
                        className="flex-1 bg-transparent border-none text-white placeholder-zinc-500 focus:ring-0 px-4 py-3 text-sm"
                        disabled={status === "loading" || status === "success"}
                    />
                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success" || !email}
                        className={`p-3 rounded-lg font-bold transition-all flex items-center justify-center min-w-[50px] ${status === "success"
                                ? "bg-green-500 text-white"
                                : "bg-primary text-black hover:bg-white"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <AnimatePresence mode="wait">
                            {status === "loading" ? (
                                <motion.div
                                    key="loading"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Loader2 size={20} className="animate-spin" />
                                </motion.div>
                            ) : status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Check size={20} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <ArrowRight size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </form>
            <p className="text-center text-xs text-zinc-500 mt-4">
                Receba insights semanais sobre finanças e tecnologia. <br />
                <span className="text-zinc-600">Zero spam. Cancele quando quiser.</span>
            </p>
        </div>
    );
}
