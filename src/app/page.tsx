"use client";

import { useState, useEffect } from "react";
import BalanceCard from "@/components/dashboard/cards/BalanceCard";
import ExpenseCard from "@/components/dashboard/cards/ExpenseCard";
import SavingsCard from "@/components/dashboard/cards/SavingsCard";
import ExpenseChart from "@/components/dashboard/charts/ExpenseChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import NetWorthChart from "@/components/dashboard/charts/NetWorthChart";
import QuickActions from "@/components/dashboard/QuickActions";
import NewsSection from "@/components/dashboard/NewsSection";
import TransactionList from "@/components/finance/TransactionList";
import { TrendingUp, Sparkles, Zap, Crown, ArrowUpRight, PieChart, LayoutDashboard, Activity, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import HealthScore from "@/components/dashboard/HealthScore";
import AiInsights from "@/components/dashboard/AiInsights";
import GoalsWidget from "@/components/dashboard/GoalsWidget";
import DailyTip from "@/components/dashboard/DailyTip";
import NewsTicker from "@/components/dashboard/NewsTicker";

import { useRouter } from "next/navigation";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [greeting, setGreeting] = useState("");
    const [quote, setQuote] = useState("");

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

        const quotes = [
            "O dinheiro é um excelente servo, mas um péssimo mestre.",
            "Não trabalhe pelo dinheiro, faça o dinheiro trabalhar por você.",
            "Investir em conhecimento rende sempre os melhores juros.",
            "A riqueza não consiste em ter grandes possessões, mas em ter poucas necessidades.",
            "O segredo para ficar rico é o juro composto."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, cubicBezier: [0.23, 1, 0.32, 1] } }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(167,139,250,0.3)]"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-[#050505] pb-32 relative overflow-x-hidden"
        >
            <NewsTicker />

            <div className="p-4 md:p-8 lg:p-12">
                <div className="max-w-[1600px] mx-auto space-y-12">

                    {/* Header Section - Refined */}
                    <motion.header
                        variants={itemVariants}
                        className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 backdrop-blur-md">
                                    <Activity size={12} className="animate-pulse" />
                                    Wtm Inteligência OS v2.5 • Acesso Elite
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                {greeting}, <br />
                                <span className="gradient-text">{user?.name?.split(" ")[0] || "Comandante"}</span>
                            </h1>
                            <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-medium italic opacity-80">
                                "{quote}"
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] rounded-3xl border border-white/5 backdrop-blur-xl group cursor-default">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                                    <Zap size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Sistemas</span>
                                    <span className="text-xs font-black text-white uppercase tracking-tighter">Operacional</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] rounded-3xl border border-white/5 backdrop-blur-xl group cursor-default">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <Activity size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Saúde Financeira</span>
                                    <span className="text-xs font-black text-white uppercase tracking-tighter">85% Score</span>
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    {/* Top Grid: Main Metrics & Daily Insight */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <motion.div variants={itemVariants} className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <BalanceCard />
                            <ExpenseCard />
                            <SavingsCard />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <DailyTip />
                        </motion.div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Column: Charts & Analysis (8 cols) */}
                        <div className="lg:col-span-8 space-y-8">
                            <motion.div variants={itemVariants} className="card-premium p-8 md:p-10 border-t-4 border-t-primary relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                                            <TrendingUp className="text-primary" size={24} />
                                            Fluxo de Caixa
                                        </h3>
                                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em] mt-2">Análise Estratégica de Capital</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest border border-white/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        Live Analysis
                                    </div>
                                </div>
                                <div className="h-[400px]">
                                    <CashFlowChart />
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants} className="card-premium p-8">
                                    <h3 className="text-lg font-black text-white mb-8 tracking-tight flex items-center justify-between">
                                        Gastos por Categoria
                                        <PieChart size={18} className="text-gray-600" />
                                    </h3>
                                    <ExpenseChart />
                                </motion.div>
                                <motion.div variants={itemVariants} className="card-premium p-8">
                                    <h3 className="text-lg font-black text-white mb-8 tracking-tight flex items-center justify-between">
                                        Evolução Patrimonial
                                        <TrendingUp size={18} className="text-gray-600" />
                                    </h3>
                                    <NetWorthChart />
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants} className="card-premium p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                                        <LayoutDashboard size={20} className="text-primary" />
                                        Últimas Transações
                                    </h3>
                                    <button
                                        onClick={() => router.push('/transactions')}
                                        className="text-[10px] font-black text-primary hover:text-white uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                                    >
                                        Ver Histórico Completo <ArrowUpRight size={14} />
                                    </button>
                                </div>
                                <TransactionList limit={6} />
                            </motion.div>
                        </div>

                        {/* Right Column: Intelligence & Goals (4 cols) */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div variants={itemVariants}>
                                <HealthScore />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <AiInsights />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <GoalsWidget />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <QuickActions />
                            </motion.div>
                            <motion.div variants={itemVariants} className="h-[500px]">
                                <NewsSection />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
