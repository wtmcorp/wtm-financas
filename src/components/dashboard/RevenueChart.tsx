"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFinance } from "@/contexts/FinanceContext";
import { BarChart3, TrendingUp, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function RevenueChart() {
    const { getCashFlow } = useFinance();
    const fullData = useMemo(() => getCashFlow(), [getCashFlow]);
    const [startIndex, setStartIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const windowSize = 6;

    const handlePrev = () => setStartIndex(prev => Math.max(0, prev - 1));
    const handleNext = () => setStartIndex(prev => Math.min(fullData.length - windowSize, prev + 1));

    const visibleData = useMemo(() => {
        if (fullData.length <= windowSize) return fullData;
        return fullData.slice(startIndex, startIndex + windowSize);
    }, [fullData, startIndex]);

    const maxValue = Math.max(...visibleData.map(d => Math.max(d.entrada, d.saida)), 1);

    const growth = useMemo(() => {
        if (fullData.length < 2) return 0;
        const current = fullData[fullData.length - 1].entrada;
        const prev = fullData[fullData.length - 2].entrada;
        if (prev === 0) return 0;
        return ((current - prev) / prev) * 100;
    }, [fullData]);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 md:p-8 h-full flex flex-col relative overflow-hidden group"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10">
                        <BarChart3 size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">Fluxo de Caixa</h3>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">Compare seus ganhos e gastos dia a dia para manter o equilíbrio.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-xl border border-white/10">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg disabled:opacity-20 transition-all text-white"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center gap-2 px-2">
                        <Calendar size={12} className="text-primary" />
                        <span className="text-[9px] text-white font-black uppercase tracking-widest whitespace-nowrap">
                            {visibleData.length > 0 ? `${visibleData[0].name} - ${visibleData[visibleData.length - 1].name}` : "Sem dados"}
                        </span>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={fullData.length <= windowSize || startIndex >= fullData.length - windowSize}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg disabled:opacity-20 transition-all text-white"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full min-h-[200px] relative z-10 flex items-end justify-between gap-2 md:gap-4 px-2">
                {visibleData.map((data, index) => {
                    const incomeHeight = (data.entrada / maxValue) * 100;
                    const expenseHeight = (data.saida / maxValue) * 100;

                    return (
                        <div
                            key={index}
                            className="flex-1 h-full flex flex-col justify-end items-center gap-2 group/bar relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Tooltip */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 z-50 min-w-[140px]"
                                    >
                                        <div className="glass-panel p-3 rounded-xl border border-white/10 shadow-2xl bg-[#0A0A0A]/90 backdrop-blur-xl">
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 text-center border-b border-white/5 pb-2">
                                                {data.name}
                                            </p>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase">Entrada</span>
                                                    </div>
                                                    <span className="text-[10px] font-black text-white">
                                                        {(data.entrada / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase">Saída</span>
                                                    </div>
                                                    <span className="text-[10px] font-black text-white">
                                                        {(data.saida / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#0A0A0A] border-r border-b border-white/10" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Bars Container */}
                            <div className="w-full flex items-end justify-center gap-1 h-[180px]">
                                {/* Income Bar */}
                                <div className="w-full max-w-[20px] h-full flex items-end relative">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${incomeHeight}%` }}
                                        transition={{ duration: 1, type: "spring", bounce: 0 }}
                                        className="w-full bg-primary rounded-t-sm relative group-hover/bar:brightness-110 transition-all"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                                    </motion.div>
                                </div>

                                {/* Expense Bar */}
                                <div className="w-full max-w-[20px] h-full flex items-end relative">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${expenseHeight}%` }}
                                        transition={{ duration: 1, delay: 0.1, type: "spring", bounce: 0 }}
                                        className="w-full bg-white/10 rounded-t-sm relative group-hover/bar:bg-white/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* X Axis Label */}
                            <span className={`text-[9px] font-black uppercase tracking-wider transition-colors mt-2 ${hoveredIndex === index ? 'text-white' : 'text-gray-600'}`}>
                                {data.name.slice(0, 3)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Entrada</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Saída</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                    <TrendingUp size={12} />
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                </div>
            </div>
        </motion.div>
    );
}
