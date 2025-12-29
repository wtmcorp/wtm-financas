"use client";

import MarketTicker from "@/components/trends/MarketTicker";
import NewsFeed from "@/components/trends/NewsFeed";
import MarketOverview from "@/components/trends/Heatmap";
import { TrendingUp, CalendarDays, Globe2 } from "lucide-react";

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
            <MarketTicker />

            <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <motion.header variants={itemVariants} className="space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                        <Globe2 size={16} className="text-blue-500" />
                        <span className="text-sm font-medium text-blue-400">Global Markets</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Radar de <span className="gradient-text text-blue-400">Tendências</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Fique à frente do mercado. Notícias, cotações e análises em tempo real para tomar as melhores decisões.
                    </p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal" style={{ animationDelay: '0.1s' }}>

                    {/* Main Content: News & Overview */}
                    <div className="lg:col-span-2 space-y-12">
                        <NewsFeed />
                        <MarketOverview />
                    </div>

                    {/* Sidebar: Calendar & Indicators */}
                    <div className="space-y-8">

                        {/* Economic Calendar */}
                        <div className="card-premium p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <CalendarDays className="text-primary" />
                                <h3 className="text-lg font-bold text-white">Calendário Econômico</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { date: "Hoje", time: "14:00", event: "Decisão de Juros (Fed)", impact: "high", country: "USA" },
                                    { date: "Amanhã", time: "09:00", event: "IPCA-15 (Brasil)", impact: "medium", country: "BRA" },
                                    { date: "Sex", time: "10:30", event: "Payroll (Emprego EUA)", impact: "high", country: "USA" },
                                    { date: "Seg", time: "08:00", event: "Boletim Focus", impact: "low", country: "BRA" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="text-center min-w-[40px]">
                                                <span className="block text-[10px] text-gray-500 font-bold uppercase">{item.date}</span>
                                                <span className="block text-sm font-bold text-white">{item.time}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white line-clamp-1">{item.event}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">{item.country}</p>
                                            </div>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${item.impact === 'high' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                            item.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                            }`} title={`Impacto: ${item.impact}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fear & Greed Index */}
                        <div className="card-premium p-6 bg-gradient-to-b from-[#0f0f13] to-black">
                            <h3 className="text-lg font-bold text-white mb-6">Índice de Medo e Ganância</h3>
                            <div className="relative h-32 flex items-end justify-center pb-4">
                                {/* Semi-circle Gauge */}
                                <div className="absolute top-4 w-40 h-20 bg-gray-800 rounded-t-full overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-50" />
                                </div>
                                <div className="absolute top-4 w-40 h-20 flex items-end justify-center">
                                    <div className="w-1 h-20 bg-white origin-bottom transform rotate-45 transition-transform duration-1000" style={{ transform: 'rotate(20deg)' }} />
                                </div>
                                <div className="absolute bottom-4 text-center">
                                    <span className="text-3xl font-black text-green-500">65</span>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Ganância</span>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-500">
                                O mercado está otimista. Investidores estão comprando mais ativos de risco.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}
