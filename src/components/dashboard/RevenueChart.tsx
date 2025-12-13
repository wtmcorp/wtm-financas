"use client";

import { Card } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const fullData = [
    { name: "Ago", receita: 3500, despesa: 2100 },
    { name: "Set", receita: 3800, despesa: 2200 },
    { name: "Out", receita: 4200, despesa: 2500 },
    { name: "Nov", receita: 4000, despesa: 2400 },
    { name: "Dez", receita: 5500, despesa: 3000 },
    { name: "Jan", receita: 4000, despesa: 2400 },
    { name: "Fev", receita: 3000, despesa: 1398 },
    { name: "Mar", receita: 2000, despesa: 9800 },
    { name: "Abr", receita: 2780, despesa: 3908 },
    { name: "Mai", receita: 1890, despesa: 4800 },
    { name: "Jun", receita: 2390, despesa: 3800 },
    { name: "Jul", receita: 3490, despesa: 4300 },
];

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
        <Card className="h-72 w-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm text-gray-400">Fluxo de Caixa</h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="p-1 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors text-white"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-gray-500 font-medium">
                        {visibleData[0].name} - {visibleData[visibleData.length - 1].name}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={startIndex >= fullData.length - windowSize}
                        className="p-1 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors text-white"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visibleData}>
                        <XAxis
                            dataKey="name"
                            stroke="#555"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }}
                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                        />
                        <Bar dataKey="receita" fill="#d4af37" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="despesa" fill="#333" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
