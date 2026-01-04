"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
    {
        title: "Regra dos 50-30-20",
        content: "Divida sua renda: 50% para necessidades, 30% para desejos e 20% para investimentos.",
        category: "Estratégia"
    },
    {
        title: "Pague-se Primeiro",
        content: "Trate seus investimentos como o primeiro boleto do mês. Não espere sobrar para investir.",
        category: "Mentalidade"
    },
    {
        title: "Reserva de Emergência",
        content: "Tenha pelo menos 6 meses do seu custo de vida guardados em um ativo de liquidez diária.",
        category: "Segurança"
    },
    {
        title: "Juros Compostos",
        content: "O tempo é seu maior aliado. Começar hoje com pouco é melhor do que começar amanhã com muito.",
        category: "Investimento"
    },
    {
        title: "Dívidas de Juros Altos",
        content: "Elimine dívidas de cartão de crédito e cheque especial antes de começar a investir pesado.",
        category: "Dívidas"
    }
];

export default function DailyTip() {
    const [tip, setTip] = useState(tips[0]);

    useEffect(() => {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        setTip(randomTip);
    }, []);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 relative overflow-hidden group h-full flex flex-col justify-between"
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Lightbulb size={100} className="text-primary" />
            </div>

            <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <Sparkles size={20} />
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Insight do Dia</span>
                    </div>
                    <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black text-primary uppercase tracking-widest">
                        {tip.category}
                    </span>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-black text-white tracking-tight">{tip.title}</h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                        {tip.content}
                    </p>
                </div>
            </div>

            <button className="relative z-10 flex items-center gap-2 text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-all group/btn mt-6">
                Saber mais <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
}
