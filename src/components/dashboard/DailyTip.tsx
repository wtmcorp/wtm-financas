"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [tip, setTip] = useState(tips[0]);

    useEffect(() => {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        setTip(randomTip);
    }, []);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-8 relative overflow-hidden group h-full flex flex-col justify-between"
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Lightbulb size={100} className="text-primary" />
            </div>

            <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/5">
                            <Sparkles size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Intelligence OS</span>
                            <span className="text-xs font-black text-white uppercase tracking-widest">Insight do Dia</span>
                        </div>
                    </div>
                    <span className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-primary uppercase tracking-widest backdrop-blur-xl">
                        {tip.category}
                    </span>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight">{tip.title}</h3>
                    <p className="text-base text-gray-400 font-medium leading-relaxed max-w-md">
                        {tip.content}
                    </p>
                </div>
            </div>

            <button
                onClick={() => router.push('/learn')}
                className="relative z-10 flex items-center gap-2 text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-all group/btn mt-6"
            >
                Saber mais <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
}
