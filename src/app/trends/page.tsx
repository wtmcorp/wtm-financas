"use client";

import NewsFeed from "@/components/trends/NewsFeed";
import MarketOverview from "@/components/trends/Heatmap";
import MarketStats from "@/components/trends/MarketStats";
import { TrendingUp, CalendarDays, Globe2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function TrendsPage() {
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
            className="min-h-screen bg-mesh pb-32"
        >
            {/* Ticker is full width */}


            <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12">

                {/* Header */}
                {/* Header */}
                <motion.header variants={itemVariants} className="relative p-8 md:p-12 rounded-[3rem] glass-panel overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -mr-32 -mt-32 group-hover:bg-blue-500/20 transition-all duration-1000" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between gap-8">
                        <div className="space-y-6 max-w-2xl">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Market Data</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                                Radar de <br />
                                <span className="gradient-text from-blue-400 via-cyan-400 to-purple-400">Tendências</span>
                            </h1>
                            <p className="text-gray-400 text-sm md:text-lg max-w-xl leading-relaxed font-medium border-l-2 border-white/10 pl-4">
                                Monitoramento em tempo real dos principais indicadores globais para decisões <span className="text-white font-bold">estratégicas</span>.
                            </p>
                        </div>

                        {/* Mini Market Pulse in Header */}
                        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                            {[
                                { label: "S&P 500", value: "4,783.45", change: "+0.45%", up: true },
                                { label: "Bitcoin", value: "$43,250", change: "-1.20%", up: false },
                                { label: "Dólar", value: "R$ 4.92", change: "-0.15%", up: false },
                                { label: "CDI", value: "11.75%", change: "0.00%", up: true },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-lg font-black text-white tracking-tight">{stat.value}</p>
                                    <p className={`text-[10px] font-bold ${stat.up ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                                        {stat.up ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
                                        {stat.change}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Content: News & Overview */}
                    <div className="lg:col-span-2 space-y-12">
                        <NewsFeed />
                        <MarketStats />
                        <MarketOverview />
                    </div>

                    {/* Sidebar: Calendar & Indicators */}
                    <div className="space-y-10">

                        {/* Economic Calendar */}
                        <motion.div variants={itemVariants} className="glass-panel p-8 bg-gradient-to-br from-[#0f0f13] to-[#1a1a2e] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <CalendarDays className="text-primary" size={20} />
                                    </div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Calendário</h3>
                                </div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">Próximos 7 Dias</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { date: "Hoje", time: "14:00", event: "Decisão de Juros (Fed)", impact: "high", country: "USA" },
                                    { date: "Amanhã", time: "09:00", event: "IPCA-15 (Brasil)", impact: "medium", country: "BRA" },
                                    { date: "Sex", time: "10:30", event: "Payroll (Emprego EUA)", impact: "high", country: "USA" },
                                    { date: "Seg", time: "08:00", event: "Boletim Focus", impact: "low", country: "BRA" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-primary/30 hover:bg-white/[0.06] transition-all cursor-pointer group/item"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-center min-w-[45px] py-1 px-2 rounded-lg bg-black/40 border border-white/5">
                                                <span className="block text-[9px] text-gray-500 font-black uppercase tracking-tighter">{item.date}</span>
                                                <span className="block text-xs font-black text-white">{item.time}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover/item:text-primary transition-colors line-clamp-1">{item.event}</p>
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{item.country}</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-2`}>
                                            <div className={`w-2 h-2 rounded-full ${item.impact === 'high' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' :
                                                item.impact === 'medium' ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]' :
                                                    'bg-green-500'
                                                }`} />
                                            {item.impact === 'high' && <AlertTriangle size={12} className="text-red-500 animate-pulse" />}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Fear & Greed Index */}
                        <motion.div variants={itemVariants} className="glass-panel p-8 bg-gradient-to-b from-[#0f0f13] to-black relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-white tracking-tight">Sentimento</h3>
                                <Info size={16} className="text-gray-600 hover:text-white cursor-help transition-colors" />
                            </div>

                            <div className="relative h-48 flex items-center justify-center">
                                {/* Gauge Background */}
                                <svg className="w-48 h-48 transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="80"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="text-white/5"
                                        strokeDasharray="251.2 502.4"
                                        strokeLinecap="round"
                                    />
                                    {/* Gauge Progress */}
                                    <motion.circle
                                        initial={{ strokeDashoffset: 251.2 }}
                                        animate={{ strokeDashoffset: 251.2 - (251.2 * 0.65) }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        cx="96"
                                        cy="96"
                                        r="80"
                                        stroke="url(#gauge-gradient)"
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray="251.2 502.4"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ef4444" />
                                            <stop offset="50%" stopColor="#eab308" />
                                            <stop offset="100%" stopColor="#22c55e" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                                    <motion.span
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                        className="text-5xl font-black text-white tracking-tighter"
                                    >
                                        65
                                    </motion.span>
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em]">Ganância</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="flex gap-3">
                                    <AlertCircle size={18} className="text-primary shrink-0" />
                                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                        O mercado está em zona de <span className="text-white">otimismo</span>. Investidores demonstram apetite por risco elevado.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}
