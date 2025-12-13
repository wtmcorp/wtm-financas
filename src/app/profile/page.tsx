<<<<<<< HEAD
"use client";

import { User, Mail, Phone, Calendar, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, logout, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <User size={28} />
                    Meu Perfil
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Gerencie suas informações pessoais
                </p>
            </div>

            <div className="bg-card border border-white/10 rounded-xl p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <User size={48} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <span className="text-sm text-gray-400">Membro desde {new Date(user.createdAt).getFullYear()}</span>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                        <Mail className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-white font-medium">{user.email}</p>
                        </div>
                    </div>

                    {user.phone && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                            <Phone className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Telefone</p>
                                <p className="text-white font-medium">{user.phone}</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                        <Calendar className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Data de Cadastro</p>
                            <p className="text-white font-medium">
                                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                        <Shield className="text-green-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Status da Conta</p>
                            <p className="text-white font-medium flex items-center gap-2">
                                Ativa e Segura
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors font-medium border border-red-500/30"
                    >
                        <LogOut size={20} />
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    );
}
=======
"use client";

import { User, Mail, Phone, Calendar, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, logout, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <User size={28} />
                    Meu Perfil
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Gerencie suas informações pessoais
                </p>
            </div>

            <div className="bg-card border border-white/10 rounded-xl p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <User size={48} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <span className="text-sm text-gray-400">Membro desde {new Date(user.createdAt).getFullYear()}</span>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                        <Mail className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-white font-medium">{user.email}</p>
                        </div>
                    </div>

                    {user.phone && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                            <Phone className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Telefone</p>
                                <p className="text-white font-medium">{user.phone}</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                        <Calendar className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Data de Cadastro</p>
                            <p className="text-white font-medium">
                                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                        <Shield className="text-green-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Status da Conta</p>
                            <p className="text-white font-medium flex items-center gap-2">
                                Ativa e Segura
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors font-medium border border-red-500/30"
                    >
                        <LogOut size={20} />
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
