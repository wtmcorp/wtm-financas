"use client";

import { Card } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, YAxis, CartesianGrid } from "recharts";
import { ChevronLeft, ChevronRight, BarChart3, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fullData = [
    { name: "Ago", receita: 3500, despesa: 2100 },
    { name: "Set", receita: 3800, despesa: 2200 },
    { name: "Out", receita: 4200, despesa: 2500 },
    { name: "Nov", receita: 4000, despesa: 2400 },
    { name: "Dez", receita: 5500, despesa: 3000 },
    { name: "Jan", receita: 4000, despesa: 2400 },
    { name: "Fev", receita: 3000, despesa: 1398 },
    { name: "Mar", receita: 2000, despesa: 1800 },
    { name: "Abr", receita: 2780, despesa: 2100 },
    { name: "Mai", receita: 1890, despesa: 1500 },
    { name: "Jun", receita: 2390, despesa: 1900 },
    { name: "Jul", receita: 3490, despesa: 2300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f0f13]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">{label}</p>
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                            <span className="text-xs font-bold text-gray-400">Receita</span>
                        </div>
                        <span className="text-sm font-black text-white">R$ {payload[0].value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <span className="text-xs font-bold text-gray-400">Despesa</span>
                        </div>
                        <span className="text-sm font-black text-white">R$ {payload[1].value.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default function RevenueChart() {
    const [startIndex, setStartIndex] = useState(5); // Start showing from Jan (index 5)
    const windowSize = 6;

    const handlePrev = () => {
        setStartIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setStartIndex(prev => Math.min(fullData.length - windowSize, prev + 1));
    };

    const visibleData = fullData.slice(startIndex, startIndex + windowSize);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 h-full flex flex-col relative overflow-hidden group"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-center mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Cash Flow</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Financial Evolution</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl border border-white/10">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg disabled:opacity-20 transition-all text-white"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div className="flex items-center gap-2 px-2">
                        <Calendar size={12} className="text-primary" />
                        <span className="text-[10px] text-white font-black uppercase tracking-widest">
                            {visibleData[0].name} - {visibleData[visibleData.length - 1].name}
                        </span>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={startIndex >= fullData.length - windowSize}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg disabled:opacity-20 transition-all text-white"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[250px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visibleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            stroke="#444"
                            fontSize={10}
                            fontWeight="900"
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#444"
                            fontSize={10}
                            fontWeight="900"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `R$ ${value}`}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                        />
                        <Bar dataKey="receita" fill="#a78bfa" radius={[6, 6, 0, 0]} barSize={24}>
                            {visibleData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fillOpacity={0.8} />
                            ))}
                        </Bar>
                        <Bar dataKey="despesa" fill="#333" radius={[6, 6, 0, 0]} barSize={24}>
                            {visibleData.map((entry, index) => (
                                <Cell key={`cell-exp-${index}`} fillOpacity={0.5} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Receita</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-800" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Despesa</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                    <TrendingUp size={14} />
                    Growth: +12.5%
                </div>
            </div>
        </motion.div>
    );
}
