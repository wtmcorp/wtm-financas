"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

import StarField from "@/components/ui/StarField";

export default function LoginPage() {
    const router = useRouter();
    const { login, resetPassword } = useAuth();
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
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Email ou senha incorretos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0a0a14]">
            {/* Background Decorative Elements */}
            <StarField />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[440px]"
            >
                <div className="text-center mb-10 space-y-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center mb-8"
                    >
                        <Logo size="md" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Que bom ver você de novo.</h2>
                    <p className="text-gray-400 font-medium text-lg">Pronto para dar mais um passo rumo à sua liberdade?</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="glass-panel p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group magical-border"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                                Endereço de Email
                            </label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-violet-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-4 py-5 text-white outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all font-medium placeholder:text-gray-600 text-lg"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                                    Senha de Acesso
                                </label>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!email) {
                                            setError("Digite seu email para recuperar a senha");
                                            return;
                                        }
                                        try {
                                            await resetPassword(email);
                                            alert("Email de recuperação enviado! Verifique sua caixa de entrada.");
                                        } catch (err: any) {
                                            setError(err.message || "Erro ao enviar email de recuperação");
                                        }
                                    }}
                                    className="text-[10px] font-black text-violet-400 uppercase tracking-widest hover:text-violet-300 transition-colors"
                                >
                                    Esqueceu?
                                </button>
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-violet-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-4 py-5 text-white outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all font-medium placeholder:text-gray-600 text-lg"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-xs font-bold text-center flex items-center justify-center gap-2"
                                >
                                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-black py-5 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] text-sm uppercase tracking-widest"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Acessar Minha Conta</span>
                                    <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                            Ainda não possui acesso?{" "}
                            <Link href="/register" className="text-white hover:text-violet-400 font-black transition-colors ml-1">
                                SOLICITAR REGISTRO
                            </Link>
                        </p>
                    </div>
                </motion.div>

                <p className="text-[10px] text-gray-700 text-center mt-12 font-black uppercase tracking-[0.4em]">
                    WTM CORPS © 2026 • Wtm Finanças v2.0
                </p>
            </motion.div>
        </div>
    );
}
