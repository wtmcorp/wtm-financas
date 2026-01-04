"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, BrainCircuit, Zap } from "lucide-react";

export default function AiInsights() {
    const insights = [
        {
            icon: TrendingUp,
            title: "Oportunidade de Investimento",
            description: "Seu saldo em conta está 20% acima da sua reserva. Considere alocar em FIIs para renda passiva.",
            color: "text-green-400",
            bg: "bg-green-500/10",
            tag: "Patrimônio"
        },
        {
            icon: AlertTriangle,
            title: "Alerta de Gastos",
            description: "Seus gastos com 'Lazer' este mês já atingiram 85% do orçamento planejado.",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            tag: "Orçamento"
        },
        {
            icon: Lightbulb,
            title: "Dica de Economia",
            description: "Você pagou R$ 45 em taxas bancárias este mês. Mude para o pacote essencial e economize.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            tag: "Eficiência"
        }
    ];

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 space-y-8 overflow-hidden relative group"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                <BrainCircuit size={200} className="text-primary" />
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Sparkles size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Insights de IA</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Análise Financeira Cognitiva</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Live</span>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {insights.map((insight, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all group/item cursor-pointer relative overflow-hidden"
                    >
                        <div className="flex gap-5 relative z-10">
                            <div className={`w-12 h-12 shrink-0 rounded-xl ${insight.bg} ${insight.color} flex items-center justify-center border border-current/10 group-hover/item:scale-110 transition-transform`}>
                                <insight.icon size={24} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black text-white group-hover/item:text-primary transition-colors uppercase tracking-tight">
                                        {insight.title}
                                    </h4>
                                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">{insight.tag}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed font-medium group-hover/item:text-gray-400 transition-colors">
                                    {insight.description}
                                </p>
                            </div>
                            <div className="self-center opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all">
                                <ArrowRight size={18} className="text-primary" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-5 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(167,139,250,0.2)] active:scale-95 flex items-center justify-center gap-3 group/btn">
                <Zap size={16} className="group-hover/btn:animate-pulse" />
                Gerar Nova Análise Preditiva
            </button>
        </motion.div>
    );
}
