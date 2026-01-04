"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";

const tickerItems = [
    { label: "IBOV", value: "128.450", change: "+1.2%", trend: "up" },
    { label: "USD/BRL", value: "4,92", change: "-0.4%", trend: "down" },
    { label: "BTC/USD", value: "43.200", change: "+2.5%", trend: "up" },
    { label: "SELIC", value: "11.25%", change: "0.0%", trend: "neutral" },
    { label: "IPCA", value: "4.62%", change: "+0.1%", trend: "up" },
    { label: "S&P 500", value: "4.890", change: "+0.8%", trend: "up" },
    { label: "PETR4", value: "38.42", change: "+1.5%", trend: "up" },
    { label: "VALE3", value: "68.90", change: "-1.1%", trend: "down" },
];

export default function NewsTicker() {
    return (
        <div className="w-full bg-[#0a0a0c]/80 backdrop-blur-md border-y border-white/5 py-3 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10" />

            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex items-center gap-12 whitespace-nowrap px-12"
            >
                {[...tickerItems, ...tickerItems].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-default">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                            {item.label}
                        </span>
                        <span className="text-sm font-black text-white tracking-tighter">
                            {item.value}
                        </span>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black ${item.trend === 'up' ? 'bg-green-500/10 text-green-400' :
                                item.trend === 'down' ? 'bg-red-500/10 text-red-400' :
                                    'bg-white/5 text-gray-500'
                            }`}>
                            {item.trend === 'up' ? <TrendingUp size={10} /> :
                                item.trend === 'down' ? <TrendingDown size={10} /> :
                                    <Zap size={10} />}
                            {item.change}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
