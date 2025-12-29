"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

export default function AiInsights() {
    const insights = [
        {
            icon: TrendingUp,
            title: "Oportunidade de Investimento",
            description: "Seu saldo em conta está 20% acima da sua reserva. Considere alocar em FIIs para renda passiva.",
            color: "text-green-400",
            bg: "bg-green-500/10"
        },
        {
            icon: AlertTriangle,
            title: "Alerta de Gastos",
            description: "Seus gastos com 'Lazer' este mês já atingiram 85% do orçamento planejado.",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },
        {
            icon: Lightbulb,
            title: "Dica de Economia",
            description: "Você pagou R$ 45 em taxas bancárias este mês. Mude para o pacote essencial e economize.",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        }
    ];

    return (
        <div className="card-premium p-6 space-y-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={80} className="text-primary" />
            </div>

            <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Insights da IA</h3>
                    <p className="text-xs text-gray-500">Análise inteligente do seu perfil</p>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {insights.map((insight, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group cursor-pointer"
                    >
                        <div className="flex gap-4">
                            <div className={`w-10 h-10 shrink-0 rounded-xl ${insight.bg} ${insight.color} flex items-center justify-center`}>
                                <insight.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                    {insight.title}
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {insight.description}
                                </p>
                            </div>
                            <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight size={16} className="text-primary" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-3 bg-primary text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                GERAR NOVA ANÁLISE
            </button>
        </div>
    );
}
