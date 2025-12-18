"use client";

import { useState, useEffect } from "react";
import { Lock, Heart, Coins } from "lucide-react";
import Challenge100k from "@/components/tools/Challenge100k";

export default function PrivatePage() {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem("wtm_private_auth");
        if (auth === "true") {
            setIsAuthorized(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "sofiaewalter100k") {
            setIsAuthorized(true);
            localStorage.setItem("wtm_private_auth", "true");
            setError("");
        } else {
            setError("Senha incorreta. Tente novamente.");
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/30">
                            <Lock className="text-primary" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Desafio Privado</h1>
                        <p className="text-gray-400 text-sm">
                            Acesso exclusivo para o casal
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite a senha secreta..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        {error && (
                            <p className="text-red-400 text-xs text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Heart size={18} fill="currentColor" />
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/20 to-transparent p-8 rounded-3xl border border-primary/20">
                <div>
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        <Heart className="text-primary fill-primary" size={32} />
                        Desafio Privado
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Nosso cantinho especial para realizar nossos sonhos.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Meta Final</p>
                        <p className="text-xl font-bold text-primary">R$ 100.000,00</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <Coins className="text-primary" size={24} />
                    </div>
                </div>
            </div>

            <Challenge100k />

            <div className="text-center py-10 opacity-50">
                <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                    Feito com <Heart size={14} className="text-primary fill-primary" /> para o nosso futuro.
                </p>
            </div>
        </div>
    );
}
