"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";

export default function MarketTicker() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [clickCount, setClickCount] = useState(0);

    const handleSecretTrigger = useCallback(() => {
        setClickCount(prev => {
            const newCount = prev + 1;
            if (newCount >= 4) {
                window.dispatchEvent(new CustomEvent("open-secret-sales-area"));
                return 0;
            }
            return newCount;
        });

        // Reset click count after 2 seconds of inactivity
        const timer = setTimeout(() => setClickCount(0), 2000);
        return () => clearTimeout(timer);
    }, []);

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
            <div className="w-full bg-background border-t border-white/10 h-10 flex items-center justify-center">
                <Loader2 size={14} className="animate-spin text-violet-500" />
            </div>
        );
    }

    return (
        <div className="w-full bg-background border-t border-white/10 h-10 flex items-center relative overflow-hidden z-30">
            {/* Label Pill with Gradient Fade */}
            <div className="absolute left-0 z-20 bg-gradient-to-r from-background via-background/95 to-transparent pr-12 md:pr-20 h-full flex items-center">
                <div
                    onClick={handleSecretTrigger}
                    className="px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-md flex items-center gap-1.5 md:gap-2 ml-2 md:ml-4 cursor-pointer hover:bg-white/10 transition-colors active:scale-95 select-none"
                >
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[7px] md:text-[9px] font-black text-primary tracking-widest uppercase whitespace-nowrap">
                        Mercado Live
                    </span>
                </div>
            </div>

            {/* Right Gradient Fade */}
            <div className="absolute right-0 z-20 w-16 md:w-24 h-full bg-gradient-to-l from-background to-transparent" />

            {/* Scrolling Content */}
            <div className="flex-1 overflow-hidden h-full flex items-center ml-[100px] md:ml-[180px]">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex items-center gap-12 md:gap-16 whitespace-nowrap"
                >
                    {/* Quadruple the items for seamless loop on any screen size */}
                    {[...items, ...items, ...items, ...items].map((item, i) => {
                        const market = data?.[item.key];
                        if (!market) return null;

                        const pct = parseFloat(market.pctChange || "0");
                        const isUp = pct >= 0;

                        return (
                            <div key={i} className="flex items-center gap-2 md:gap-3">
                                <span className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                                    {item.symbol}
                                </span>
                                <span className="text-[10px] md:text-xs font-black text-white tracking-tight">
                                    R$ {parseFloat(market.bid || "0").toLocaleString('pt-BR', {
                                        minimumFractionDigits: item.key.includes('BTC') || item.key.includes('ETH') || item.key.includes('SOL') ? 0 : 2,
                                        maximumFractionDigits: item.key.includes('BTC') || item.key.includes('ETH') || item.key.includes('SOL') ? 0 : 2
                                    })}
                                </span>
                                <div className={`px-1 md:px-1.5 py-0.5 rounded flex items-center gap-0.5 md:gap-1 text-[8px] md:text-[9px] font-bold ${isUp
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
        </div>
    );
}
