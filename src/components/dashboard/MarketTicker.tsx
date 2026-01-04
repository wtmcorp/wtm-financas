"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";

export default function MarketTicker() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarket = async () => {
            try {
                const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL,SOL-BRL,GBP-BRL,JPY-BRL");
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
        const interval = setInterval(fetchMarket, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    const items = [
        { symbol: "DÓLAR", key: "USDBRL" },
        { symbol: "EURO", key: "EURBRL" },
        { symbol: "BITCOIN", key: "BTCBRL" },
        { symbol: "ETHEREUM", key: "ETHBRL" },
        { symbol: "SOLANA", key: "SOLBRL" },
        { symbol: "LIBRA", key: "GBPBRL" },
        { symbol: "YEN", key: "JPYBRL" },
    ];

    if (loading && !data) {
        return (
            <div className="w-full bg-black border-t border-white/10 h-10 flex items-center justify-center">
                <Loader2 size={14} className="animate-spin text-violet-500" />
            </div>
        );
    }

    return (
        <div className="w-full bg-black border-t border-white/10 h-10 flex items-center relative overflow-hidden z-30">
            {/* Label Pill */}
            <div className="absolute left-0 z-20 bg-black pr-6 h-full flex items-center">
                <div className="px-3 py-1 rounded-full border border-white/20 bg-white/[0.03] flex items-center gap-2 ml-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-violet-400 tracking-widest uppercase">
                        Mercado em tempo real
                    </span>
                </div>
            </div>

            {/* Gradient Fade for Ticker */}
            <div className="absolute left-[180px] z-20 w-24 h-full bg-gradient-to-r from-black to-transparent" />
            <div className="absolute right-0 z-20 w-24 h-full bg-gradient-to-l from-black to-transparent" />

            {/* Scrolling Content */}
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex items-center gap-16 whitespace-nowrap pl-[220px]"
            >
                {[...items, ...items, ...items, ...items].map((item, i) => {
                    const market = data?.[item.key];
                    if (!market) return null;

                    const pct = parseFloat(market.pctChange || "0");
                    const isUp = pct >= 0;

                    return (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                                {item.symbol}
                            </span>
                            <span className="text-xs font-black text-white tracking-tight">
                                R$ {parseFloat(market.bid || "0").toLocaleString('pt-BR', {
                                    minimumFractionDigits: item.key.includes('BTC') || item.key.includes('ETH') || item.key.includes('SOL') ? 0 : 2,
                                    maximumFractionDigits: item.key.includes('BTC') || item.key.includes('ETH') || item.key.includes('SOL') ? 0 : 2
                                })}
                            </span>
                            <div className={`px-1.5 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold ${isUp
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : 'bg-red-500/10 text-red-500'
                                }`}>
                                {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {isUp ? "+" : ""}{pct}%
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
