"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, Wallet, TrendingUp, Calendar, Info } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Dados do orçamento salvos no perfil (se existirem)
    // Nota: O tipo User no AuthContext precisaria ser atualizado para incluir 'budget', 
    // mas como o Firestore é flexível, podemos acessar se estiver lá, ou fazer um cast.
    const budget = (user as any).budget;

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
                <User className="text-primary" />
                Meu Painel
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Perfil Card */}
                <div className="bg-card border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Perfil</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Nome</label>
                            <p className="text-white font-medium">{user.name}</p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Email</label>
                            <p className="text-white font-medium">{user.email}</p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Renda Mensal</label>
                            <p className="text-primary font-bold text-lg">
                                R$ {user.income?.toFixed(2) || "0.00"}
                            </p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Membro desde</label>
                            <p className="text-gray-300 text-sm">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Orçamento Card */}
                <div className="bg-card border border-white/10 rounded-xl p-6 md:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Wallet className="text-primary" size={20} />
                        Meu Orçamento
                    </h2>

                    {budget ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Tooltip text="50% da sua renda deve ser destinada a gastos essenciais como aluguel, luz e alimentação.">
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                        <div className="text-blue-400 text-sm font-medium mb-1">Necessidades (50%)</div>
                                        <div className="text-2xl font-bold text-white">R$ {budget.needs?.toFixed(2)}</div>
                                    </div>
                                </Tooltip>
                                <Tooltip text="30% da sua renda pode ser usada para lazer, hobbies e desejos pessoais.">
                                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                                        <div className="text-purple-400 text-sm font-medium mb-1">Desejos (30%)</div>
                                        <div className="text-2xl font-bold text-white">R$ {budget.wants?.toFixed(2)}</div>
                                    </div>
                                </Tooltip>
                                <Tooltip text="20% da sua renda deve ser investida para o seu futuro e reserva de emergência.">
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                        <div className="text-primary text-sm font-medium mb-1">Investimentos (20%)</div>
                                        <div className="text-2xl font-bold text-white">R$ {budget.savings?.toFixed(2)}</div>
                                    </div>
                                </Tooltip>
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar size={12} />
                                Última atualização: {new Date(budget.lastUpdated).toLocaleString()}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <p>Você ainda não salvou um orçamento.</p>
                            <button
                                onClick={() => router.push("/#tools")}
                                className="mt-4 text-primary hover:underline"
                            >
                                Ir para Calculadora
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
