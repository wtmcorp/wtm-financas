"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, BrainCircuit, Loader2, Plus } from "lucide-react";
import { useFinance } from "@/contexts/FinanceContext";
import TransactionModal from "@/components/finance/TransactionModal";

export default function AiInsights() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { transactions } = useFinance();

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
        }, 2000);
    };

    const insights = useMemo(() => {
        if (transactions.length === 0) return [];

        return [
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
    }, [transactions]);

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="card-premium p-6 md:p-8 space-y-6 md:space-y-8 overflow-hidden relative group h-full flex flex-col"
            >
                {/* Background Effects */}
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                    <BrainCircuit size={200} className="text-primary" />
                </div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <Sparkles size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">Insights de IA</h3>
                            <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Análise Cognitiva</p>
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

                <div className="space-y-3 md:space-y-4 relative z-10 flex-1">
                    {insights.length > 0 ? (
                        insights.map((insight, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all group/item cursor-pointer relative overflow-hidden"
                            >
                                <div className="flex gap-4 md:gap-5 relative z-10">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl ${insight.bg} ${insight.color} flex items-center justify-center border border-current/10 group-hover/item:scale-110 transition-transform`}>
                                        <insight.icon size={20} className="md:w-6 md:h-6" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[11px] md:text-sm font-black text-white group-hover/item:text-primary transition-colors uppercase tracking-tight">
                                                {insight.title}
                                            </h4>
                                            <span className="text-[7px] md:text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">{insight.tag}</span>
                                        </div>
                                        <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed font-medium group-hover/item:text-gray-400 transition-colors">
                                            {insight.description}
                                        </p>
                                    </div>
                                    <div className="self-center opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all">
                                        <ArrowRight size={16} className="text-primary" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="py-10 md:py-12 text-center space-y-6 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/10">
                            <p className="text-gray-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Aguardando dados para análise...</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest transition-all flex items-center gap-3 mx-auto"
                            >
                                <Plus size={14} />
                                Adicionar Transação
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || transactions.length === 0}
                    className="w-full py-4 md:py-5 bg-primary text-black rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(167,139,250,0.2)] active:scale-95 flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Sparkles size={16} className="group-hover/btn:animate-pulse" />
                    )}
                    {isGenerating ? "Processando..." : "Gerar Análise Preditiva"}
                </button>
            </motion.div>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
