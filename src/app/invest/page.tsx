"use client";

import { useState } from "react";
import BankTable from "@/components/finance/BankTable";
import InvestmentCard from "@/components/finance/InvestmentCard";
import {
    Calculator,
    Info,
    TrendingUp,
    Shield,
    Award,
    Target,
    ArrowRight,
    Sparkles,
    ChevronRight,
    DollarSign,
    BarChart3,
    PieChart,
    ArrowUpRight,
    AlertTriangle,
    CheckCircle2,
    BookOpen,
    Activity
} from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";

export default function InvestPage() {
    const [simulationAmount, setSimulationAmount] = useState<string>("1000");
    const amount = parseFloat(simulationAmount) || 0;

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
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden p-10 md:p-20 rounded-[3.5rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                >
                    <div className="absolute top-0 right-0 hidden md:block opacity-5 -mr-20 -mt-20">
                        <BarChart3 size={400} className="text-primary rotate-12" />
                    </div>

                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <Sparkles size={18} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Wealth Multiplier Engine</span>
                        </div>
                        <h1 className="text-4xl md:text-9xl font-black text-white tracking-tighter leading-[0.85]">
                            Central de <br />
                            <span className="gradient-text">Investimentos</span>
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium">
                            Compare, simule e escolha onde seu dinheiro vai trabalhar mais por você. Do porto seguro da Renda Fixa à explosão da Renda Variável.
                        </p>
                    </div>
                </motion.header>

                {/* Simulation Control Panel */}
                <motion.div
                    variants={itemVariants}
                    className="card-premium p-8 md:p-12 bg-gradient-to-r from-[#0f0f13] to-[#1a1a2e] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                        <DollarSign size={150} />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 w-full space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block mb-2">
                                    Capital para Simulação
                                </label>
                                <div className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={12} /> Real-time Simulation
                                </div>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black text-3xl group-focus-within:text-white transition-colors">R$</span>
                                <input
                                    type="number"
                                    value={simulationAmount}
                                    onChange={(e) => setSimulationAmount(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-[2rem] pl-20 pr-8 py-8 text-white font-black text-4xl md:text-5xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-800 backdrop-blur-xl"
                                    placeholder="0,00"
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-auto">
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mb-6 text-center lg:text-left">Atalhos Rápidos</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                                {[1000, 5000, 10000, 50000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setSimulationAmount(val.toString())}
                                        className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-primary hover:text-black border border-white/5 hover:border-primary transition-all font-black text-sm whitespace-nowrap shadow-xl"
                                    >
                                        R$ {val.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <CompoundInterestCalculator />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Tables and Cards */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Liquidity Section */}
                        <motion.section variants={itemVariants} className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                                        <Activity className="text-blue-400" size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-white tracking-tight">Liquidez Diária</h2>
                                        <p className="text-gray-500 font-medium">Onde deixar sua reserva de emergência hoje.</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                                    <CheckCircle2 size={12} /> FGC Garantido
                                </div>
                            </div>

                            <div className="card-premium overflow-hidden border-white/5">
                                <BankTable />
                            </div>
                        </motion.section>

                        {/* Long Term Section */}
                        <motion.section variants={itemVariants} className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-2xl shadow-purple-500/10">
                                    <Target className="text-purple-400" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight">Médio & Longo Prazo</h2>
                                    <p className="text-gray-500 font-medium">Estratégias para aceleração de patrimônio.</p>
                                </div>
                            </div>

                            <div className="grid gap-8 sm:grid-cols-2">
                                <InvestmentCard
                                    title="RDB Planejado"
                                    rate="112% CDI"
                                    period="2 anos"
                                    type="RDB"
                                    profitability={12.5}
                                    simulationAmount={amount}
                                />
                                <InvestmentCard
                                    title="Tesouro Selic 2029"
                                    rate="Selic + 0.17%"
                                    period="2029"
                                    type="Tesouro"
                                    profitability={24.4}
                                    simulationAmount={amount}
                                />
                                <InvestmentCard
                                    title="CDB Black"
                                    rate="130% CDI"
                                    period="3 anos"
                                    type="CDB"
                                    profitability={48.2}
                                    simulationAmount={amount}
                                />
                                <InvestmentCard
                                    title="LCI/LCA Isento"
                                    rate="98% CDI"
                                    period="1 ano"
                                    type="LCI"
                                    profitability={13.0}
                                    simulationAmount={amount}
                                />
                            </div>
                        </motion.section>
                    </div>

                    {/* Right Column: Insights & Education */}
                    <div className="space-y-12">

                        {/* Performance Ranking */}
                        <motion.div variants={itemVariants} className="card-premium p-8 border-green-500/10 bg-gradient-to-b from-green-500/5 to-transparent relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <TrendingUp size={100} />
                            </div>

                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-green-500/10 rounded-xl text-green-400 border border-green-500/20">
                                    <Award size={24} />
                                </div>
                                <h3 className="text-xl font-black text-white tracking-tight uppercase">Ranking de Retorno</h3>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { label: "CDB 120% CDI", rate: "13.5%", color: "bg-green-500", width: "95%" },
                                    { label: "Tesouro Selic", rate: "11.7%", color: "bg-yellow-500", width: "85%" },
                                    { label: "Poupança", rate: "6.17%", color: "bg-red-500", width: "45%", warning: true }
                                ].map((item, i) => (
                                    <div key={i} className={`space-y-3 ${item.warning ? 'opacity-50' : ''}`}>
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-black text-white uppercase tracking-wider">{item.label}</span>
                                            <span className={`text-lg font-black ${item.warning ? 'text-red-400' : 'text-green-400'}`}>~{item.rate}</span>
                                        </div>
                                        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: item.width }}
                                                transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                                className={`h-full ${item.color} rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4">
                                <AlertTriangle size={20} className="text-red-500 shrink-0 mt-1" />
                                <p className="text-xs text-red-300 leading-relaxed font-bold">
                                    A inflação acumulada está em ~4.5%. A poupança mal cobre a inflação, resultando em ganho real quase nulo. Saia da inércia!
                                </p>
                            </div>
                        </motion.div>

                        {/* Knowledge Hub */}
                        <motion.div variants={itemVariants} className="card-premium p-8 space-y-8">
                            <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                                <BookOpen size={22} className="text-primary" />
                                Dicionário do Investidor
                            </h3>

                            <div className="space-y-6">
                                {[
                                    { term: "CDI", desc: "Taxa que os bancos usam para emprestar dinheiro entre si. Segue a Selic de perto." },
                                    { term: "Liquidez", desc: "A velocidade com que você consegue transformar o investimento em dinheiro na mão." },
                                    { term: "FGC", desc: "Fundo Garantidor de Créditos. Segura até R$ 250 mil por CPF e instituição." }
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-help">
                                        <span className="text-primary font-black text-xs uppercase tracking-widest block mb-1 group-hover:text-white transition-colors">{item.term}</span>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                                Ver Glossário Completo <ArrowUpRight size={14} />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
