"use client";

import { Tooltip } from "@/components/ui/Tooltip";

const sectors = [
    { name: "Finanças", change: 2.5, size: "col-span-2 row-span-2", tickers: ["ITUB4", "BBDC4", "BBAS3"] },
    { name: "Varejo", change: -1.2, size: "col-span-1 row-span-1", tickers: ["MGLU3", "LREN3"] },
    { name: "Energia", change: 0.8, size: "col-span-1 row-span-1", tickers: ["ELET3", "CPFE3"] },
    { name: "Tecnologia", change: 3.1, size: "col-span-1 row-span-2", tickers: ["TOTV3", "LWSA3"] },
    { name: "Saúde", change: -0.5, size: "col-span-1 row-span-1", tickers: ["RDOR3", "HAPV3"] },
    { name: "Imóveis", change: 1.0, size: "col-span-1 row-span-1", tickers: ["CYRE3", "EZTC3"] },
    { name: "Commodities", change: 1.8, size: "col-span-2 row-span-1", tickers: ["VALE3", "PETR4"] },
];

export default function MarketOverview() {
    const getColor = (change: number) => {
        if (change > 2) return "bg-green-600 hover:bg-green-500";
        if (change > 0) return "bg-green-800 hover:bg-green-700";
        if (change === 0) return "bg-gray-700 hover:bg-gray-600";
        if (change > -2) return "bg-red-800 hover:bg-red-700";
        return "bg-red-600 hover:bg-red-500";
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Mapa do Mercado (B3)</h3>
            <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[400px]">
                {sectors.map((sector) => (
                    <div
                        key={sector.name}
                        className={`${sector.size} ${getColor(sector.change)} rounded-2xl p-4 flex flex-col justify-center items-center transition-all cursor-pointer group relative overflow-hidden border border-white/5`}
                    >
                        <div className="text-center z-10">
                            <span className="text-sm md:text-base font-bold text-white block mb-1">{sector.name}</span>
                            <span className="text-xs md:text-sm font-medium text-white/90">
                                {sector.change > 0 ? "+" : ""}{sector.change}%
                            </span>
                        </div>

                        {/* Hover Overlay with Tickers */}
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-center">
                            <p className="text-xs text-gray-400 mb-2 font-bold uppercase">Principais Ativos</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {sector.tickers.map(t => (
                                    <span key={t} className="text-xs font-mono text-white bg-white/10 px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
