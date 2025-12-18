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
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                {/* Header */}
                <header className="animate-in">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                                Dashboard Financeiro
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base flex items-center gap-2 mt-1">
                                <Sparkles className="w-4 h-4 text-indigo-400" />
                                Gerencie suas finanças com inteligência
                            </p>
                        </div>
                    </div>
                </header>

                {/* Metric Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-in">
                    <Tooltip text="Seu saldo total disponível em todas as contas conectadas.">
                        <div><BalanceCard /></div>
                    </Tooltip>
                    <Tooltip text="Total de gastos registrados no mês atual.">
                        <div><ExpenseCard /></div>
                    </Tooltip>
                    <Tooltip text="Valor total economizado ou investido este mês.">
                        <div><SavingsCard /></div>
                    </Tooltip>
                </section>

                {/* Charts Row */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 animate-in">
                    <Tooltip text="Visualização das entradas e saídas de dinheiro ao longo do tempo.">
                        <div><CashFlowChart /></div>
                    </Tooltip>
                    <Tooltip text="Distribuição dos seus gastos por categoria (Moradia, Lazer, etc).">
                        <div><ExpenseChart /></div>
                    </Tooltip>
                </section>

                {/* Net Worth & Quick Actions */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 animate-in">
                    <div className="lg:col-span-2">
                        <NetWorthChart />
                    </div>
                    <QuickActions />
                </section>

                {/* Transactions */}
                <section className="animate-in">
                    <TransactionList />
                </section>
            </div>
        </div>
    );
}
