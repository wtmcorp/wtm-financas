"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";

const tickerItems = [
    { label: "EURO", value: "R$ 6,41", change: "+0.894445%", trend: "up" },
    { label: "BITCOIN", value: "R$ 497.025", change: "+0.98%", trend: "up" },
    { label: "ETHEREUM", value: "R$ 17.106", change: "+0.746%", trend: "up" },
    { label: "SOLANA", value: "R$ 730", change: "+1.094%", trend: "up" },
    { label: "IBOV", value: "128.450", change: "+1.2%", trend: "up" },
    { label: "USD/BRL", value: "R$ 4,92", change: "-0.4%", trend: "down" },
];

export default function NewsTicker() {
    return (
        <div className="w-full bg-black border-b border-white/5 py-2.5 overflow-hidden relative flex items-center">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex items-center gap-16 whitespace-nowrap px-8"
            >
                {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-default">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                            {item.label}
                        </span>
                        <span className="text-[11px] font-black text-white tracking-tighter">
                            {item.value}
                        </span>
                        <div className={`flex items-center gap-1.5 text-[9px] font-black ${item.trend === 'up' ? 'text-green-400' :
                            item.trend === 'down' ? 'text-red-400' :
                                'text-gray-500'
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
