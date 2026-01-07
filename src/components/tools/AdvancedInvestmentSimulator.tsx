"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    BarChart3,
    PieChart,
    ArrowRight,
    Info,
    Sparkles,
    Target,
    Zap,
    AlertCircle,
    CheckCircle2,
    Calculator,
    RefreshCw
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

export default function AdvancedInvestmentSimulator() {
    const [initialAmount, setInitialAmount] = useState(1000);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [years, setYears] = useState(10);
    const [scenarios, setScenarios] = useState([
        { name: "Poupança", rate: 6.17, color: "#ef4444", active: true },
        { name: "Tesouro Selic", rate: 11.75, color: "#eab308", active: true },
        { name: "CDB 120% CDI", rate: 14.1, color: "#22c55e", active: true },
        { name: "Ações/FIIs", rate: 18.5, color: "#a855f7", active: true }
    ]);

    const [data, setData] = useState<any[]>([]);

    const calculateData = () => {
        const newData = [];
        for (let year = 0; year <= years; year++) {
            const point: any = { year };
            scenarios.forEach(scenario => {
                if (scenario.active) {
                    const monthlyRate = Math.pow(1 + scenario.rate / 100, 1 / 12) - 1;
                    const months = year * 12;

                    // Future Value Formula: FV = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
                    const fvInitial = initialAmount * Math.pow(1 + monthlyRate, months);
                    const fvMonthly = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

                    point[scenario.name] = year === 0 ? initialAmount : Math.round(fvInitial + (months > 0 ? fvMonthly : 0));
                }
            });
            newData.push(point);
        }
        setData(newData);
    };

    useEffect(() => {
        calculateData();
    }, [initialAmount, monthlyContribution, years, scenarios]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 md:p-12 relative overflow-hidden group"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-primary/10 transition-all duration-1000" />

            <div className="relative z-10 space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl shadow-primary/20">
                            <Calculator size={28} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">Simulador Avançado</h2>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Projeção de Longo Prazo</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={calculateData}
                            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all"
                        >
                            <RefreshCw size={20} />
                        </button>
                        <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
                            IA Powered Insights
                        </div>
                    </div>
                </div>

                {/* Controls Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest block">Investimento Inicial</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black">R$</span>
                            <input
                                type="number"
                                value={initialAmount}
                                onChange={(e) => setInitialAmount(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white font-black outline-none focus:border-primary/50 transition-all"
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={initialAmount}
                            onChange={(e) => setInitialAmount(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest block">Aporte Mensal</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black">R$</span>
                            <input
                                type="number"
                                value={monthlyContribution}
                                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white font-black outline-none focus:border-primary/50 transition-all"
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="20000"
                            step="100"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest block">Tempo (Anos): {years}</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-black outline-none focus:border-primary/50 transition-all"
                            />
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="40"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>

                {/* Chart Section */}
                <div className="h-[400px] w-full bg-black/20 rounded-[2rem] p-6 border border-white/5">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                {scenarios.map(s => (
                                    <linearGradient key={s.name} id={`color${s.name}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                                    </linearGradient>
                                ))}
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis
                                dataKey="year"
                                stroke="#666"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}a`}
                            />
                            <YAxis
                                stroke="#666"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `R$ ${val / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '1rem',
                                    padding: '1rem'
                                }}
                                itemStyle={{ fontSize: '12px', fontWeight: '900' }}
                                formatter={(value: number) => [formatCurrency(value), ""]}
                                labelFormatter={(label) => `Ano ${label}`}
                            />
                            <Legend verticalAlign="top" height={36} />
                            {scenarios.map(s => s.active && (
                                <Area
                                    key={s.name}
                                    type="monotone"
                                    dataKey={s.name}
                                    stroke={s.color}
                                    fillOpacity={1}
                                    fill={`url(#color${s.name})`}
                                    strokeWidth={3}
                                    animationDuration={1500}
                                />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Scenario Toggles */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {scenarios.map((scenario, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const next = [...scenarios];
                                next[i].active = !next[i].active;
                                setScenarios(next);
                            }}
                            className={`
                                p-4 rounded-2xl border transition-all flex flex-col gap-2 text-left
                                ${scenario.active
                                    ? 'bg-white/5 border-white/20'
                                    : 'bg-transparent border-white/5 opacity-40 grayscale'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scenario.color }} />
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{scenario.rate}% a.a</span>
                            </div>
                            <div className="text-sm font-black text-white">{scenario.name}</div>
                            <div className="text-lg font-black text-primary">
                                {data.length > 0 && formatCurrency(data[data.length - 1][scenario.name])}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Comparison Insights */}
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Sparkles size={32} className="text-primary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-black text-white uppercase tracking-tight">Insight da IA</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Ao escolher <span className="text-green-400 font-bold">CDB 120% CDI</span> em vez da poupança, você terá
                            <span className="text-white font-black"> {formatCurrency((data[data.length - 1]?.["CDB 120% CDI"] || 0) - (data[data.length - 1]?.["Poupança"] || 0))} </span>
                            a mais em {years} anos. O tempo é seu maior aliado nos juros compostos.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
