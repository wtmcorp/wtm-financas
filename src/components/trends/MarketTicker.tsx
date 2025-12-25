"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const data = [
    { symbol: "IBOV", value: "132.450", change: "+1.25%", positive: true },
    { symbol: "S&P 500", value: "4.780", change: "+0.45%", positive: true },
    { symbol: "NASDAQ", value: "15.050", change: "+0.80%", positive: true },
    { symbol: "DÓLAR", value: "R$ 4,92", change: "-0.30%", positive: false },
    { symbol: "EURO", value: "R$ 5,35", change: "-0.15%", positive: false },
    { symbol: "BTC", value: "$ 43.500", change: "+2.10%", positive: true },
    { symbol: "ETH", value: "$ 2.250", change: "+1.50%", positive: true },
    { symbol: "IFIX", value: "3.310", change: "+0.10%", positive: true },
    { symbol: "CDI", value: "11,65%", change: "0.00%", positive: null },
    { symbol: "IPCA", value: "4,68%", change: "+0.20%", positive: false }, // Inflation up is usually bad/red
];

export default function MarketTicker() {
    return (
        <div className="w-full bg-[#0f0f13] border-y border-white/5 overflow-hidden py-3">
            <div className="flex animate-marquee whitespace-nowrap hover:pause">
                {[...data, ...data].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mx-6">
                        <span className="font-bold text-gray-400 text-sm">{item.symbol}</span>
                        <span className="font-mono text-white font-medium">{item.value}</span>
                        <span className={`flex items-center text-xs font-bold ${item.positive === true ? "text-green-500" :
                                item.positive === false ? "text-red-500" : "text-gray-500"
                            }`}>
                            {item.positive === true && <TrendingUp size={12} className="mr-1" />}
                            {item.positive === false && <TrendingDown size={12} className="mr-1" />}
                            {item.positive === null && <Minus size={12} className="mr-1" />}
                            {item.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
