"use client";

import { TrendingUp, TrendingDown, AlertCircle, ExternalLink, Globe, Clock } from "lucide-react";
import { useState, useEffect } from "react";

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
        <div className="bg-card border border-white/10 rounded-[2rem] p-6 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="text-primary" size={24} />
                    Giro do Mercado
                </h3>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 flex items-center gap-1 uppercase font-bold tracking-widest">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Ao vivo
                    </span>
                    <span className="text-[9px] text-gray-600 flex items-center gap-1">
                        <Clock size={8} /> {lastUpdate}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {MARKET_NEWS.map((news) => (
                    <div key={news.id} className="group cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">
                                {news.source}
                            </span>
                            <span className="text-[10px] text-gray-500">{news.time}</span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-snug">
                            {news.title}
                        </h4>
                        <div className="w-full h-px bg-white/5 mt-3 group-last:hidden" />
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                Ver todas as notícias <ExternalLink size={12} />
            </button>
        </div>
    );
}

