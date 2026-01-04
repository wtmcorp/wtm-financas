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
import { TrendingUp, Sparkles, Sun, Moon, Cloud, Zap, Crown, ArrowUpRight, PieChart } from "lucide-react";
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
            className="min-h-screen bg-mesh pb-32 relative overflow-x-hidden"
        >
            <NewsTicker />

            <div className="p-4 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto space-y-8 md:space-y-16">

                    {/* Command Center Header */}
                    <motion.header
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 p-8 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group"
                    >
                        {/* Animated Background Elements */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                            <Crown size={400} className="text-primary rotate-12 animate-float" />
                        </div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
                        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none"></div>

                        <div className="relative z-10 space-y-10">
                            <div className="flex items-center gap-3">
                                <div className="px-5 py-2 bg-white/5 text-primary border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 backdrop-blur-md">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                    </span>
                                    Wtm Intelligence OS v2.5 • Elite Access
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                                    {greeting}, <br />
                                    <span className="gradient-text relative inline-block mt-2">
                                        {user?.name?.split(" ")[0] || "Comandante"}
                                    </span>
                                </h1>
                                <p className="text-gray-400 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed flex items-start gap-4">
                                    <Sparkles size={24} className="text-primary animate-pulse shrink-0 mt-1" />
                                    <span className="italic opacity-90">"{quote}"</span>
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6 pt-6">
                                <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md group/status cursor-default">
                                    <Zap size={20} className="text-yellow-500 fill-yellow-500/20 group-hover/status:scale-110 transition-transform" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Sistemas</span>
                                        <span className="text-xs font-black text-green-400 uppercase tracking-tighter">Operacional</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md group/sync cursor-default">
                                    <div className="flex flex-col items-end mr-2">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Saúde</span>
                                        <span className="text-xs font-black text-primary uppercase tracking-tighter">85%</span>
                                    </div>
                                    <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[85%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    {/* Metric Cards Grid */}
                    <motion.section
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                    >
                        <div className="group/card relative">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 -z-10"></div>
                            <BalanceCard />
                        </div>
                        <div className="group/card relative">
                            <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 -z-10"></div>
                            <ExpenseCard />
                        </div>
                        <div className="group/card relative">
                            <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 -z-10"></div>
                            <SavingsCard />
                        </div>
                    </motion.section>

                    {/* Main Dashboard Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                        {/* Left Column: Charts */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-12 lg:space-y-16">
                            <div className="card-premium p-8 md:p-12 border-t-4 border-t-primary relative group/chart overflow-hidden">
                                <div className="absolute top-8 right-8 p-4 bg-primary/10 rounded-2xl text-primary opacity-0 group-hover/chart:opacity-100 transition-all translate-y-4 group-hover/chart:translate-y-0 cursor-pointer hover:bg-primary hover:text-black">
                                    <ArrowUpRight size={24} />
                                </div>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h3 className="text-3xl font-black text-white tracking-tighter flex items-center gap-4">
                                            <TrendingUp className="text-primary" size={32} />
                                            Fluxo de Caixa
                                        </h3>
                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mt-3">Análise Estratégica de Capital</p>
                                    </div>
                                    <div className="hidden sm:flex px-5 py-2 bg-white/5 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-white/10 backdrop-blur-md items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        Live Analysis
                                    </div>
                                </div>
                                <div className="h-[400px]">
                                    <CashFlowChart />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                <div className="card-premium p-10 hover:border-primary/20 transition-colors">
                                    <h3 className="text-xl font-black text-white mb-10 tracking-tight flex items-center justify-between">
                                        Gastos por Categoria
                                        <PieChart size={20} className="text-gray-600" />
                                    </h3>
                                    <ExpenseChart />
                                </div>
                                <div className="card-premium p-10 hover:border-primary/20 transition-colors">
                                    <h3 className="text-xl font-black text-white mb-10 tracking-tight flex items-center justify-between">
                                        Evolução Patrimonial
                                        <TrendingUp size={20} className="text-gray-600" />
                                    </h3>
                                    <NetWorthChart />
                                </div>
                            </div>
                        </motion.div>


                        {/* Right Column: Actions & Feed */}
                        <motion.div variants={itemVariants} className="space-y-12 lg:space-y-16">
                            <DailyTip />
                            <HealthScore />
                            <AiInsights />
                            <GoalsWidget />
                            <QuickActions />

                            <div className="h-[550px]">
                                <NewsSection />
                            </div>

                            <div className="card-premium p-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Zap size={100} className="text-primary" />
                                </div>
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-2xl font-black text-white tracking-tight">Transações</h3>
                                    <button className="text-[10px] font-black text-primary hover:text-white uppercase tracking-[0.2em] transition-all hover:gap-2 flex items-center gap-1">
                                        Ver Tudo <ArrowUpRight size={12} />
                                    </button>
                                </div>
                                <div className="max-h-[450px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    <TransactionList limit={8} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
