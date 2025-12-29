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
import { TrendingUp, Sparkles, Sun, Moon, Cloud, Zap, Crown, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

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

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">

                {/* Command Center Header */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 p-8 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group"
                >
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                        <Crown size={300} className="text-primary rotate-12 animate-float" />
                    </div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 bg-white/5 text-primary border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Wtm Intelligence OS v2.0
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                                {greeting}, <br />
                                <span className="gradient-text relative inline-block mt-2">
                                    {user?.name?.split(" ")[0] || "Comandante"}
                                </span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed flex items-center gap-3">
                                <Sparkles size={20} className="text-primary animate-pulse" />
                                <span className="italic opacity-80">"{quote}"</span>
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md group/status">
                                <Zap size={18} className="text-yellow-500 fill-yellow-500/20 group-hover/status:scale-110 transition-transform" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status: <span className="text-green-400">Operacional</span></span>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md group/sync">
                                <Cloud size={18} className="text-blue-400 fill-blue-400/20 group-hover/sync:scale-110 transition-transform" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cloud: <span className="text-white">Sincronizado</span></span>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Metric Cards Grid */}
                <motion.section
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="group/card relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 -z-10"></div>
                        <BalanceCard />
                    </div>
                    <div className="group/card relative">
                        <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 -z-10"></div>
                        <ExpenseCard />
                    </div>
                    <div className="group/card relative">
                        <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 -z-10"></div>
                        <SavingsCard />
                    </div>
                </motion.section>

                {/* Main Dashboard Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Charts */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 space-y-12">
                        <div className="card-premium p-10 border-t-4 border-t-primary relative group/chart">
                            <div className="absolute top-6 right-6 p-3 bg-primary/10 rounded-xl text-primary opacity-0 group-hover/chart:opacity-100 transition-all translate-y-2 group-hover/chart:translate-y-0">
                                <ArrowUpRight size={20} />
                            </div>
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                                        <TrendingUp className="text-primary" size={28} />
                                        Fluxo de Caixa
                                    </h3>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mt-2">Análise de Entradas e Saídas</p>
                                </div>
                                <div className="px-4 py-1.5 bg-white/5 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest border border-white/10 backdrop-blur-md">Live Data</div>
                            </div>
                            <CashFlowChart />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="card-premium p-10">
                                <h3 className="text-xl font-black text-white mb-8 tracking-tight">Gastos por Categoria</h3>
                                <ExpenseChart />
                            </div>
                            <div className="card-premium p-10">
                                <h3 className="text-xl font-black text-white mb-8 tracking-tight">Evolução Patrimonial</h3>
                                <NetWorthChart />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Actions & Feed */}
                    <motion.div variants={itemVariants} className="space-y-12">
                        <QuickActions />

                        <div className="card-premium p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-white tracking-tight">Transações Recentes</h3>
                                <button className="text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-colors">Ver Tudo</button>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
                                <TransactionList limit={6} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
