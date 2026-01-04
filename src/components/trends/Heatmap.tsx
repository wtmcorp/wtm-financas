"use client";

import { motion } from "framer-motion";

const sectors = [
    { name: "Finanças", change: 2.5, size: "col-span-2 row-span-2", tickers: ["ITUB4", "BBDC4", "BBAS3", "SANB11"] },
    { name: "Varejo", change: -1.2, size: "col-span-1 row-span-1", tickers: ["MGLU3", "LREN3", "AMER3"] },
    { name: "Energia", change: 0.8, size: "col-span-1 row-span-1", tickers: ["ELET3", "CPFE3", "EQTL3"] },
    { name: "Tecnologia", change: 3.1, size: "col-span-1 row-span-2", tickers: ["TOTV3", "LWSA3", "CASH3"] },
    { name: "Saúde", change: -0.5, size: "col-span-1 row-span-1", tickers: ["RDOR3", "HAPV3", "FLRY3"] },
    { name: "Imóveis", change: 1.0, size: "col-span-1 row-span-1", tickers: ["CYRE3", "EZTC3", "MRVE3"] },
    { name: "Commodities", change: 1.8, size: "col-span-2 row-span-1", tickers: ["VALE3", "PETR4", "CSNA3", "GGBR4"] },
];

export default function MarketOverview() {
    const getColor = (change: number) => {
        if (change > 2) return "bg-emerald-500/20 border-emerald-500/40 text-emerald-400";
        if (change > 0) return "bg-emerald-500/10 border-emerald-500/20 text-emerald-500";
        if (change === 0) return "bg-gray-500/10 border-gray-500/20 text-gray-400";
        if (change > -2) return "bg-red-500/10 border-red-500/20 text-red-500";
        return "bg-red-500/20 border-red-500/40 text-red-400";
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-white tracking-tight">Mapa do Mercado (B3)</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Alta</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Baixa</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
                {sectors.map((sector, i) => (
                    <motion.div
                        key={sector.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`${sector.size} ${getColor(sector.change)} rounded-[2rem] p-6 flex flex-col justify-between items-center transition-all cursor-pointer group relative overflow-hidden border backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98]`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="text-center z-10 space-y-2">
                            <span className="text-sm md:text-lg font-black uppercase tracking-tighter block">{sector.name}</span>
                            <span className="text-xl md:text-2xl font-black block">
                                {sector.change > 0 ? "+" : ""}{sector.change}%
                            </span>
                        </div>

                        {/* Tickers List */}
                        <div className="flex flex-wrap gap-2 justify-center z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                            {sector.tickers.slice(0, 3).map(t => (
                                <span key={t} className="text-[9px] font-black bg-black/20 px-2 py-1 rounded-lg border border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Hover Overlay Detail */}
                        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 text-center translate-y-4 group-hover:translate-y-0">
                            <p className="text-[10px] text-primary mb-4 font-black uppercase tracking-[0.2em]">Composição do Setor</p>
                            <div className="grid grid-cols-2 gap-3 w-full">
                                {sector.tickers.map(t => (
                                    <div key={t} className="bg-white/5 border border-white/10 p-2 rounded-xl text-[10px] font-black text-white">
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
