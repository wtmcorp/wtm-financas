"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
    const router = useRouter();
    const { register: authRegister } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        if (formData.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        try {
            await authRegister(
                formData.email,
                formData.password,
                formData.name,
                formData.phone
            );
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Erro ao criar conta. Tente novamente.");
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
                    <h2 className="text-2xl font-bold text-white mb-2">Criar Conta</h2>
                    <p className="text-gray-400">Cadastre-se para começar sua jornada financeira</p>
                </div>

                <div className="bg-card border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nome Completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Seu nome completo"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Telefone (opcional)
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="(11) 99999-9999"
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
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirmar Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Digite a senha novamente"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Criando conta..." : "Criar Conta"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Já tem uma conta?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Fazer Login
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                    Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
                </p>
            </div>
        </div>
    );
}
