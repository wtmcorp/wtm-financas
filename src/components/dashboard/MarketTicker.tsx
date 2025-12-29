"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Loader2, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MarketTicker() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarket = async () => {
            try {
                const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL");
                const json = await res.json();
                if (json && !json.status) {
                    setData(json);
                }
            } catch (error) {
                console.error("Error fetching market data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMarket();
        const interval = setInterval(fetchMarket, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="flex items-center gap-3 text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] h-10">
            <Loader2 size={12} className="animate-spin" />
            Sincronizando Mercados...
        </div>
    );

    if (!data) return null;

    const items = [
        { label: "Dólar", key: "USDBRL", icon: "🇺🇸" },
        { label: "Euro", key: "EURBRL", icon: "🇪🇺" },
        { label: "Bitcoin", key: "BTCBRL", icon: "₿" },
    ];

    return (
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2 h-10">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 shrink-0">
                <Globe size={12} className="text-primary animate-pulse" />
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">Global Live</span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-8"
                >
                    {items.map((item) => {
                        const market = data[item.key];
                        if (!market) return null;

                        const pct = parseFloat(market.pctChange || "0");
                        const isUp = pct >= 0;

                        return (
                            <div key={item.key} className="flex items-center gap-3 whitespace-nowrap group cursor-default">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter group-hover:text-gray-300 transition-colors">
                                        {item.label}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-white tracking-tight">
                                            R$ {parseFloat(market.bid || "0").toLocaleString('pt-BR', {
                                                minimumFractionDigits: item.key === 'BTCBRL' ? 0 : 2,
                                                maximumFractionDigits: item.key === 'BTCBRL' ? 0 : 2
                                            })}
                                        </span>
                                        <span className={`flex items-center text-[10px] font-black px-1.5 py-0.5 rounded-md ${isUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                            }`}>
                                            {isUp ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                                            {isUp ? "+" : ""}{pct}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

