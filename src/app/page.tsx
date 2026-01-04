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
import { TrendingUp, Activity, PlusCircle, ArrowUpRight, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import HealthScore from "@/components/dashboard/HealthScore";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import DailyTip from "@/components/dashboard/DailyTip";
import { useRouter } from "next/navigation";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Bom dia");
        else if (hour < 18) setGreeting("Boa tarde");
        else setGreeting("Boa noite");
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen pb-32 px-6 lg:px-10 py-8 max-w-[1920px] mx-auto"
        >
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] -z-10" />

                <div className="space-y-3">
                    <div className="flex items-center gap-4 mb-1">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                            <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em]">Intelligence OS • Terminal</span>
                        </div>
                        <div className="h-4 w-px bg-white/10" />
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <span className="text-white/40">USD</span>
                                <span className="text-emerald-400">R$ 5,12</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-white/40">BTC</span>
                                <span className="text-emerald-400">R$ 482K</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                        {greeting}, <span className="gradient-text from-violet-400 to-indigo-400">{user?.name?.split(" ")[0]}</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-lg max-w-2xl font-medium leading-relaxed">
                        Sua saúde financeira está <span className="text-emerald-400 font-bold">estável</span>. Você tem <span className="text-white font-bold underline decoration-violet-500/50 underline-offset-4 cursor-pointer hover:text-violet-400 transition-colors">3 novas recomendações</span> da I.A.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="group px-6 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-[11px] font-black text-white uppercase tracking-widest transition-all flex items-center gap-3">
                        <Filter size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                        Filtrar Dados
                    </button>
                    <button className="group px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-[11px] font-black text-white uppercase tracking-widest transition-all shadow-lg shadow-violet-500/20 flex items-center gap-3 active:scale-95">
                        <PlusCircle size={14} />
                        Nova Transação
                    </button>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column - Main Content (8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Cards Row */}
                    <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <BalanceCard />
                        <ExpenseCard />
                        <SavingsCard />
                    </motion.section>

                    {/* Charts Section */}
                    <motion.section variants={itemVariants} className="glass-card p-8 rounded-3xl border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <TrendingUp className="text-violet-500" size={20} />
                                Fluxo de Caixa
                            </h3>
                            <div className="flex gap-2">
                                {['1S', '1M', '3M', '1A'].map((period) => (
                                    <button key={period} className="px-3 py-1 rounded-lg text-xs font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-[350px]">
                            <CashFlowChart />
                        </div>
                    </motion.section>

                    {/* Secondary Charts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="glass-card p-6 rounded-3xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-6">Despesas por Categoria</h3>
                            <ExpenseChart />
                        </motion.div>
                        <motion.div variants={itemVariants} className="glass-card p-6 rounded-3xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-6">Evolução Patrimonial</h3>
                            <NetWorthChart />
                        </motion.div>
                    </div>

                    {/* Recent Transactions */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl border border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Últimas Transações</h3>
                            <button onClick={() => router.push('/transactions')} className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors">
                                Ver todas <ArrowUpRight size={16} />
                            </button>
                        </div>
                        <TransactionList limit={5} />
                    </motion.div>
                </div>

                {/* Right Column - Sidebar Widgets (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.div variants={itemVariants}>
                        <HealthScore />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <DashboardTabs />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <QuickActions />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <DailyTip />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
