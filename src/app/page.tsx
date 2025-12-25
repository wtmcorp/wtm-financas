"use client";

import { useState, useEffect } from "react";
import BalanceCard from "@/components/dashboard/cards/BalanceCard";
import ExpenseCard from "@/components/dashboard/cards/ExpenseCard";
import SavingsCard from "@/components/dashboard/cards/SavingsCard";
import ExpenseChart from "@/components/dashboard/charts/ExpenseChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import NetWorthChart from "@/components/dashboard/charts/NetWorthChart";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionList from "@/components/finance/TransactionList";
import { TrendingUp, Sparkles, Info, Sun, Moon, Cloud, Zap, Crown } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
    const { user } = useAuth();
    const [greeting, setGreeting] = useState("");
    const [quote, setQuote] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Bom dia");
        else if (hour < 18) setGreeting("Boa tarde");
        else setGreeting("Boa noite");

        const quotes = [
            "O dinheiro é um excelente servo, mas um péssimo mestre.",
            "Não trabalhe pelo dinheiro, faça o dinheiro trabalhar por você.",
            "Investir em conhecimento rende sempre os melhores juros.",
            "A riqueza não consiste em ter grandes possessões, mas em ter poucas necessidades.",
            "O segredo para ficar rico é o juro composto."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Command Center Header */}
                <header className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f0f13] to-[#1a1a2e] border border-white/10 p-8 md:p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Crown size={200} className="text-primary rotate-12" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Sistema Operacional Financeiro
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                {greeting}, <span className="gradient-text">{user?.name?.split(" ")[0] || "Comandante"}</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-2xl font-medium leading-relaxed flex items-center gap-2">
                                <Sparkles size={16} className="text-yellow-500" />
                                "{quote}"
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                <Zap size={16} className="text-yellow-500" />
                                <span className="text-sm font-bold text-gray-300">Status: <span className="text-green-400">Operacional</span></span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                <Cloud size={16} className="text-blue-400" />
                                <span className="text-sm font-bold text-gray-300">Sincronização: <span className="text-white">Automática</span></span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Metric Cards Grid - 3D Effect */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal" style={{ animationDelay: '0.1s' }}>
                    <div className="transform hover:-translate-y-2 transition-transform duration-300">
                        <BalanceCard />
                    </div>
                    <div className="transform hover:-translate-y-2 transition-transform duration-300">
                        <ExpenseCard />
                    </div>
                    <div className="transform hover:-translate-y-2 transition-transform duration-300">
                        <SavingsCard />
                    </div>
                </section>

                {/* Main Dashboard Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Charts */}
                    <div className="lg:col-span-2 space-y-8 reveal" style={{ animationDelay: '0.2s' }}>
                        <div className="card-premium p-8 border-t-4 border-t-primary">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                        <TrendingUp className="text-primary" />
                                        Fluxo de Caixa
                                    </h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Entradas vs Saídas</p>
                                </div>
                                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-white/5">Tempo Real</div>
                            </div>
                            <CashFlowChart />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="card-premium p-8">
                                <h3 className="text-lg font-bold text-white mb-6">Gastos por Categoria</h3>
                                <ExpenseChart />
                            </div>
                            <div className="card-premium p-8">
                                <h3 className="text-lg font-bold text-white mb-6">Evolução Patrimonial</h3>
                                <NetWorthChart />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions & Feed */}
                    <div className="space-y-8 reveal" style={{ animationDelay: '0.3s' }}>
                        <QuickActions />

                        <div className="card-premium p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Transações Recentes</h3>
                                <button className="text-xs font-bold text-primary hover:underline">Ver Tudo</button>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                                <TransactionList limit={5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
