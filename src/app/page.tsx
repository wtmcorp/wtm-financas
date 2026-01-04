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
import { TrendingUp, Sparkles, Zap, Crown, ArrowUpRight, PieChart, LayoutDashboard, Activity, Target, Brain, Shield, Rocket } from "lucide-react";
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

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("BOM DIA");
        else if (hour < 18) setGreeting("BOA TARDE");
        else setGreeting("BOA NOITE");
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, cubicBezier: [0.23, 1, 0.32, 1] } }
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
            className="min-h-screen bg-black pb-32 relative overflow-hidden"
        >
            <NewsTicker />

            {/* Background Decorative Elements */}
            <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="p-6 md:p-12 lg:p-16 relative z-10">
                <div className="max-w-[1600px] mx-auto space-y-20">

                    {/* Hero Section - Intelligence Protocol Style */}
                    <motion.section variants={itemVariants} className="space-y-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-xl">
                            <Brain size={14} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">WTM INTELLIGENCE PROTOCOL: ACTIVE</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
                                {greeting}, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-purple-500">
                                    {user?.name?.split(" ")[0] || "COMANDANTE"}
                                </span>
                            </h1>
                            <p className="text-gray-500 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed">
                                Sua trajetória rumo à liberdade financeira está sendo processada com <span className="text-white font-black">inteligência preditiva</span> de nível elite.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-4 px-8 py-5 bg-white/[0.03] rounded-[2rem] border border-white/10 backdrop-blur-xl group cursor-default hover:border-primary/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 group-hover:scale-110 transition-transform">
                                    <Shield size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">SISTEMAS</span>
                                    <span className="text-sm font-black text-white uppercase tracking-tighter">OPERACIONAL</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-8 py-5 bg-white/[0.03] rounded-[2rem] border border-white/10 backdrop-blur-xl group cursor-default hover:border-primary/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Activity size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">SAÚDE FINANCEIRA</span>
                                    <span className="text-sm font-black text-white uppercase tracking-tighter">85% SCORE</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Main Metrics Grid */}
                    <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <BalanceCard />
                        <ExpenseCard />
                        <SavingsCard />
                    </motion.section>

                    {/* Intelligence Hub Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Column: Analysis & History (8 cols) */}
                        <div className="lg:col-span-8 space-y-12">
                            <motion.div variants={itemVariants} className="card-premium p-10 border border-white/5 relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h3 className="text-3xl font-black text-white tracking-tighter flex items-center gap-4 uppercase">
                                            <TrendingUp className="text-primary" size={32} />
                                            Fluxo de Caixa
                                        </h3>
                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mt-3">ANÁLISE ESTRATÉGICA DE CAPITAL</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        LIVE ANALYSIS
                                    </div>
                                </div>
                                <div className="h-[450px]">
                                    <CashFlowChart />
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants} className="card-premium p-10 border border-white/5">
                                    <h3 className="text-xl font-black text-white mb-10 tracking-tight flex items-center justify-between uppercase">
                                        Categorias
                                        <PieChart size={20} className="text-gray-600" />
                                    </h3>
                                    <ExpenseChart />
                                </motion.div>
                                <motion.div variants={itemVariants} className="card-premium p-10 border border-white/5">
                                    <h3 className="text-xl font-black text-white mb-10 tracking-tight flex items-center justify-between uppercase">
                                        Patrimônio
                                        <TrendingUp size={20} className="text-gray-600" />
                                    </h3>
                                    <NetWorthChart />
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants} className="card-premium p-10 border border-white/5">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-4 uppercase">
                                        <LayoutDashboard size={24} className="text-primary" />
                                        Transações Recentes
                                    </h3>
                                    <button
                                        onClick={() => router.push('/transactions')}
                                        className="text-[10px] font-black text-primary hover:text-white uppercase tracking-[0.2em] transition-all flex items-center gap-2 group"
                                    >
                                        VER HISTÓRICO <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                                <TransactionList limit={8} />
                            </motion.div>
                        </div>

                        {/* Right Column: Intelligence & Control (4 cols) */}
                        <div className="lg:col-span-4 space-y-12">
                            <motion.div variants={itemVariants}>
                                <DailyTip />
                            </motion.div>
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
                            <motion.div variants={itemVariants} className="h-[600px]">
                                <NewsSection />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons - Intelligence Style */}
            <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] border-2 border-white/20"
                >
                    <Zap size={24} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] border-2 border-white/20"
                >
                    <Activity size={24} />
                </motion.button>
            </div>
        </motion.div>
    );
}
