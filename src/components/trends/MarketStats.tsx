"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from "lucide-react";

const stats = {
    gainers: [
        { symbol: "PETR4", price: "R$ 38,42", change: "+4.2%" },
        { symbol: "VALE3", price: "R$ 65,10", change: "+3.8%" },
        { symbol: "ITUB4", price: "R$ 32,15", change: "+2.9%" },
    ],
    losers: [
        { symbol: "MGLU3", price: "R$ 2,15", change: "-5.4%" },
        { symbol: "AMER3", price: "R$ 0,54", change: "-4.8%" },
        { symbol: "LREN3", price: "R$ 16,30", change: "-3.2%" },
    ]
};

export default function MarketStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gainers */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-panel p-6"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                        <TrendingUp size={20} />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Maiores Altas</h3>
                </div>
                <div className="space-y-4">
                    {stats.gainers.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-black text-white">{item.symbol}</span>
                                <span className="text-xs text-gray-500 font-mono">{item.price}</span>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-500 font-black text-xs">
                                <ArrowUp size={12} />
                                {item.change}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Losers */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-panel p-6"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                        <TrendingDown size={20} />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Maiores Baixas</h3>
                </div>
                <div className="space-y-4">
                    {stats.losers.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-black text-white">{item.symbol}</span>
                                <span className="text-xs text-gray-500 font-mono">{item.price}</span>
                            </div>
                            <div className="flex items-center gap-1 text-red-500 font-black text-xs">
                                <ArrowDown size={12} />
                                {item.change}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
