"use client";

import { useFinance } from '@/contexts/FinanceContext';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export default function NetWorthChart() {
    const { getNetWorth } = useFinance();
    const [showProjection, setShowProjection] = useState(false);
    const rawData = useMemo(() => getNetWorth(), [getNetWorth]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Generate Projection Data
    const data = useMemo(() => {
        if (!showProjection || rawData.length === 0) return rawData;

        const lastValue = rawData[rawData.length - 1].valor;
        const projectedData = [...rawData];
        const growthRate = 0.01; // 1% monthly growth

        for (let i = 1; i <= 6; i++) {
            projectedData.push({
                name: `Mês +${i}`,
                valor: lastValue * Math.pow(1 + growthRate, i)
            });
        }
        return projectedData;
    }, [rawData, showProjection]);

    // Calculate dimensions and scales
    const maxValue = Math.max(...data.map(d => d.valor), 1);
    const minValue = Math.min(...data.map(d => d.valor), 0);
    const range = maxValue - minValue;

    // Generate SVG path for the line
    const getPath = (dataset: typeof data) => {
        if (dataset.length < 2) return "";

        const points = dataset.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((d.valor - minValue) / range) * 80 - 10; // Leave 10% padding top/bottom
            return `${x},${y}`;
        });

        return `M ${points.join(" L ")}`;
    };

    // Generate SVG path for the area (closed shape)
    const getAreaPath = (dataset: typeof data) => {
        const linePath = getPath(dataset);
        if (!linePath) return "";
        // Close the path properly
        const lastX = (dataset.length - 1) / (data.length - 1) * 100;
        const firstX = 0;
        return `${linePath} L ${lastX},100 L ${firstX},100 Z`;
    };

    return (
        <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative glass-panel p-8 rounded-[2.5rem] h-[450px] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-primary" />
                            Evolução do Patrimônio
                        </h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">
                            {showProjection ? "Incluindo Projeção (6 Meses)" : "Histórico Real"}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowProjection(!showProjection)}
                            className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${showProjection
                                ? "bg-primary text-black border-primary"
                                : "bg-white/5 text-gray-500 border-white/10 hover:text-white"
                                }`}
                        >
                            {showProjection ? "Ocultar Projeção" : "Simular Futuro"}
                        </button>
                        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-2xl font-black text-white tracking-tight">
                                R$ {(data[data.length - 1]?.valor || 0).toLocaleString('pt-BR', { notation: "compact" })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 relative w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Area Fill (Full Data including projection) */}
                        <motion.path
                            d={getAreaPath(data)}
                            fill="url(#areaGradient)"
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: 1, pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />

                        {/* Line (Real Data) */}
                        <motion.path
                            d={getPath(rawData)}
                            fill="none"
                            stroke="#a78bfa"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Line (Projection - Dashed) */}
                        {showProjection && (
                            <motion.path
                                d={getPath(data)} // This draws the full line, but we mask it or just draw the full line dashed?
                                // Actually, let's just draw the segment from the last real point to the end
                                // But simpler: Draw the full line dashed, and overlay the real line solid.
                                fill="none"
                                stroke="#a78bfa"
                                strokeWidth="0.8"
                                strokeDasharray="2 2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                transition={{ duration: 1 }}
                            />
                        )}

                        {/* Interactive Points */}
                        {data.map((d, i) => {
                            const x = (i / (data.length - 1)) * 100;
                            const y = 100 - ((d.valor - minValue) / range) * 80 - 10;
                            const isProjected = i >= rawData.length;

                            return (
                                <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                                    {/* Invisible Hit Area */}
                                    <circle cx={x} cy={y} r="5" fill="transparent" className="cursor-pointer" />

                                    {/* Visible Dot */}
                                    <motion.circle
                                        cx={x}
                                        cy={y}
                                        r={hoveredIndex === i ? 1.5 : 0.8}
                                        fill={isProjected ? "#a78bfa" : "#fff"}
                                        stroke="#a78bfa"
                                        strokeWidth={hoveredIndex === i ? 0.5 : 0}
                                        animate={{ r: hoveredIndex === i ? 1.5 : 0.8 }}
                                        className="pointer-events-none"
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Tooltip Overlay */}
                    {hoveredIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-0 left-0 pointer-events-none"
                            style={{
                                left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
                                top: `${100 - ((data[hoveredIndex].valor - minValue) / range) * 80 - 10}%`,
                                transform: 'translate(-50%, -120%)'
                            }}
                        >
                            <div className="glass-panel px-4 py-3 rounded-xl border border-white/10 shadow-2xl bg-[#0A0A0A]/90 backdrop-blur-xl whitespace-nowrap">
                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">
                                    {data[hoveredIndex].name} {hoveredIndex >= rawData.length && "(Projeção)"}
                                </p>
                                <p className="text-lg font-black text-white tracking-tight">
                                    R$ {data[hoveredIndex].valor.toLocaleString('pt-BR')}
                                </p>
                            </div>
                            <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent absolute left-1/2 -translate-x-1/2 top-full" />
                        </motion.div>
                    )}
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-between mt-4 px-2">
                    {data.map((d, i) => (
                        <span key={i} className={`text-[9px] font-black uppercase tracking-widest ${i >= rawData.length ? 'text-primary/50' : 'text-gray-600'}`}>
                            {d.name.slice(0, 3)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
