"use client";

import { TrendingUp, TrendingDown, AlertCircle, ExternalLink, Globe, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MARKET_NEWS = [
    {
        id: 1,
        source: "Bloomberg",
        title: "Fed sinaliza possível corte de juros em 2026",
        time: "2h atrás",
        type: "positive"
    },
    {
        id: 2,
        source: "Valor Econômico",
        title: "Ibovespa fecha em alta impulsionada por commodities",
        time: "4h atrás",
        type: "positive"
    },
    {
        id: 3,
        source: "Reuters",
        title: "Petróleo recua com aumento de estoques nos EUA",
        time: "5h atrás",
        type: "negative"
    },
    {
        id: 4,
        source: "InfoMoney",
        title: "Novas regras para fundos imobiliários entram em vigor",
        time: "6h atrás",
        type: "neutral"
    },
    {
        id: 5,
        source: "Exame",
        title: "Criptomoedas registram forte volume de negociação",
        time: "7h atrás",
        type: "positive"
    }
];

export default function NewsSection() {
    const [lastUpdate, setLastUpdate] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setLastUpdate(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="card-premium p-8 h-full border border-white/5 hover:border-primary/10 transition-all group/news">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">
                        Giro do Mercado
                    </h3>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-green-400 flex items-center gap-1.5 uppercase font-black tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Live
                    </span>
                    <span className="text-[9px] text-gray-600 flex items-center gap-1 font-bold mt-1">
                        <Clock size={8} /> {lastUpdate}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                {MARKET_NEWS.map((news, idx) => (
                    <motion.div
                        key={news.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group cursor-pointer relative"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded-md border border-primary/10">
                                {news.source}
                            </span>
                            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">{news.time}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-300 group-hover:text-white transition-all leading-relaxed pr-6">
                            {news.title}
                        </h4>
                        <ArrowRight size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        <div className="w-full h-px bg-white/5 mt-4 group-last:hidden" />
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] text-[10px] font-black text-gray-500 hover:text-white rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] border border-white/5 hover:border-white/20 group/btn">
                Ver todas as notícias
                <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
            </button>
        </div>
    );
}

