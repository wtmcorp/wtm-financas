"use client";

import { ArrowRight, TrendingUp, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface InvestmentCardProps {
    title: string;
    rate: string;
    period: string;
    type: "RDB" | "CDB" | "Tesouro" | "LCI";
    profitability: number; // Net profit percentage estimate
    simulationAmount: number;
}

export default function InvestmentCard({ title, rate, period, type, profitability, simulationAmount }: InvestmentCardProps) {
    const finalValue = simulationAmount * (1 + profitability / 100);
    const profit = finalValue - simulationAmount;

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="card-premium p-8 relative overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-[#0f0f13] to-[#1a1a2e]"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="px-3 py-1 bg-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 rounded-lg border border-white/5 inline-block mb-2 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                            {type}
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="text-4xl font-black text-white tracking-tighter">
                        {rate}
                    </div>
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Rentabilidade Alvo</div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                            <Clock size={12} /> Prazo
                        </div>
                        <div className="text-sm font-bold text-white">{period}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                            <ShieldCheck size={12} /> Líquido
                        </div>
                        <div className="text-sm font-bold text-green-400">+{profitability.toFixed(2)}%</div>
                    </div>
                </div>

                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 group-hover:border-primary/10 transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Resultado Estimado</span>
                        <Sparkles size={14} className="text-primary animate-pulse" />
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Final</div>
                            <div className="text-2xl font-black text-white tracking-tighter">
                                R$ {finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Lucro</div>
                            <div className="text-lg font-black text-green-500 tracking-tighter">
                                +R$ {profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 bg-white/5 hover:bg-primary hover:text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-white/5 hover:border-primary group/btn">
                    Investir Agora <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
