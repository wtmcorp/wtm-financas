"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const tickerItems = [
    { label: "DÓLAR", value: "R$ 5,42", change: "-1.722078%", trend: "down" },
    { label: "EURO", value: "R$ 6,41", change: "+0.894445%", trend: "up" },
    { label: "BITCOIN", value: "R$ 497.025", change: "+0.98%", trend: "up" },
    { label: "ETHEREUM", value: "R$ 17.106", change: "+0.746%", trend: "up" },
    { label: "SOLANA", value: "R$ 730", change: "+1.094%", trend: "up" },
];

export default function NewsTicker() {
    return (
        <div className="w-full bg-black border-y border-white/10 h-12 flex items-center relative overflow-hidden z-30">
            {/* Label Pill */}
            <div className="absolute left-6 z-20 bg-black pr-6 h-full flex items-center">
                <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.03] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-violet-400 tracking-widest uppercase">
                        Mercado em tempo real
                    </span>
                </div>
            </div>

            {/* Gradient Fade for Ticker */}
            <div className="absolute left-[240px] z-20 w-24 h-full bg-gradient-to-r from-black to-transparent" />
            <div className="absolute right-0 z-20 w-24 h-full bg-gradient-to-l from-black to-transparent" />

            {/* Scrolling Content */}
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex items-center gap-16 whitespace-nowrap pl-[280px]"
            >
                {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            {item.label}
                        </span>
                        <span className="text-sm font-black text-white tracking-tight">
                            {item.value}
                        </span>
                        <div className={`px-1.5 py-0.5 rounded flex items-center gap-1 text-[10px] font-bold ${item.trend === 'up'
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : 'bg-red-500/10 text-red-500'
                            }`}>
                            {item.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {item.change}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
