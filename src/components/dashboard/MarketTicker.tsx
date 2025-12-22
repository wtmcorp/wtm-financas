"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";

export default function MarketTicker() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarket = async () => {
            try {
                const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL");
                const json = await res.json();
                setData(json);
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

    if (loading) return (
        <div className="flex items-center gap-2 text-xs text-gray-500 animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            Carregando dados do mercado...
        </div>
    );

    if (!data) return null;

    const items = [
        { label: "Dólar", key: "USDBRL" },
        { label: "Euro", key: "EURBRL" },
        { label: "Bitcoin", key: "BTCBRL" },
    ];

    return (
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
            {items.map((item) => {
                const market = data[item.key];
                const pct = parseFloat(market.pctChange);
                const isUp = pct >= 0;

                return (
                    <div key={item.key} className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-xs font-bold text-gray-400 uppercase">{item.label}</span>
                        <span className="text-sm font-mono font-bold text-white">
                            R$ {parseFloat(market.bid).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: item.key === 'BTCBRL' ? 0 : 2 })}
                        </span>
                        <span className={`flex items-center text-[10px] font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                            {isUp ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
                            {isUp ? "+" : ""}{pct}%
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
