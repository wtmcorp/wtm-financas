"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Email ou senha incorretos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-card to-background">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="text-primary" size={32} />
                        <h1 className="text-3xl font-bold text-primary">Wtm Corps</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h2>
                    <p className="text-gray-400">Faça login para acessar suas finanças</p>
                </div>

                <div className="bg-card border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Sua senha"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                    Entrando...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Não tem uma conta?{" "}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Criar conta
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
