"use client";

import BalanceCard from "@/components/dashboard/cards/BalanceCard";
import ExpenseCard from "@/components/dashboard/cards/ExpenseCard";
import SavingsCard from "@/components/dashboard/cards/SavingsCard";
import ExpenseChart from "@/components/dashboard/charts/ExpenseChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import NetWorthChart from "@/components/dashboard/charts/NetWorthChart";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionList from "@/components/finance/TransactionList";
import { TrendingUp, Sparkles, Info } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

export default function Home() {
    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="reveal space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-primary rounded-full" />
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                            Seu <span className="gradient-text">Império</span> Financeiro
                        </h1>
                    </div>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                        Gerencie seu patrimônio com a precisão de um banco e a elegância de uma galeria.
                    </p>
                </header>

                {/* Metric Cards Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal" style={{ animationDelay: '0.1s' }}>
                    <BalanceCard />
                    <ExpenseCard />
                    <SavingsCard />
                </section>

                {/* Charts Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal" style={{ animationDelay: '0.2s' }}>
                    <div className="card-premium p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white tracking-tight">Fluxo de Caixa</h3>
                            <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tempo Real</div>
                        </div>
                        <CashFlowChart />
                    </div>
                    <div className="card-premium p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white tracking-tight">Gastos por Categoria</h3>
                            <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">Distribuição</div>
                        </div>
                        <ExpenseChart />
                    </div>
                </section>

                {/* Bottom Row */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal" style={{ animationDelay: '0.3s' }}>
                    <div className="lg:col-span-2 card-premium p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white tracking-tight">Evolução do Patrimônio</h3>
                        </div>
                        <NetWorthChart />
                    </div>
                    <div className="space-y-6">
                        <QuickActions />
                    </div>
                </section>

                {/* Transactions */}
                <section className="reveal" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-white tracking-tighter">Transações Recentes</h2>
                        <button className="text-sm font-bold text-primary hover:underline">Ver Todas</button>
                    </div>
                    <TransactionList />
                </section>
            </div>
        </div>
    );
}
