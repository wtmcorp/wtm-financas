"use client";

import { useState, useEffect } from "react";
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
        const interval = setInterval(fetchMarket, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="w-full bg-[#0f0f13] border-y border-white/5 overflow-hidden py-3 flex justify-center">
            <Loader2 size={16} className="animate-spin text-primary" />
        </div>
    );

    if (!data) return null;

    const items = [
        { symbol: "DÓLAR", key: "USDBRL" },
        { symbol: "EURO", key: "EURBRL" },
        { symbol: "BTC", key: "BTCBRL" },
        { symbol: "ETH", key: "ETHBRL" },
        { symbol: "SOL", key: "SOLBRL" },
        { symbol: "LIBRA", key: "GBPBRL" },
        { symbol: "YEN", key: "JPYBRL" },
    ];

    return (
        <div className="w-full bg-[#0f0f13] border-y border-white/5 overflow-hidden py-3">
            <div className="flex animate-marquee whitespace-nowrap hover:pause">
                {[...items, ...items].map((item, i) => {
                    const market = data[item.key];
                    if (!market) return null;

                    const pct = parseFloat(market.pctChange || "0");
                    const isUp = pct >= 0;

                    return (
                        <div key={i} className="flex items-center gap-2 mx-6">
                            <span className="font-bold text-gray-400 text-sm">{item.symbol}</span>
                            <span className="font-mono text-white font-medium">
                                R$ {parseFloat(market.bid || "0").toLocaleString('pt-BR', {
                                    minimumFractionDigits: item.key.includes('BTC') || item.key.includes('ETH') || item.key.includes('SOL') ? 0 : 2,
                                    maximumFractionDigits: item.key.includes('BTC') || item.key.includes('ETH') || item.key.includes('SOL') ? 0 : 2
                                })}
                            </span>
                            <span className={`flex items-center text-xs font-bold ${isUp ? "text-green-500" : "text-red-500"}`}>
                                {isUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                                {isUp ? "+" : ""}{pct}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
