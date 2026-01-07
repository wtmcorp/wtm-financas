"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinance } from '@/contexts/FinanceContext';
import { TrendingUp } from 'lucide-react';

const NetWorthChart = () => {
    const { getNetWorth } = useFinance();
    const data = getNetWorth();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative glass-panel p-8 rounded-[2.5rem] h-[450px]">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-primary" />
                            Evolução do Patrimônio
                        </h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Projeção de Crescimento</p>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.6} />
                                <stop offset="50%" stopColor="#a78bfa" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                            </linearGradient>
                            <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }}
                            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200">
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{payload[0].payload.name}</div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                                                <div className="text-2xl font-black text-white">
                                                    {formatCurrency(payload[0].value as number)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="valor"
                            stroke="#a78bfa"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorValor)"
                            animationDuration={2000}
                            style={{ filter: 'url(#glow-line)' }}
                            dot={{ r: 4, fill: '#a78bfa', strokeWidth: 2, stroke: '#13131a' }}
                            activeDot={{ r: 6, fill: '#fff', stroke: '#a78bfa', strokeWidth: 3 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default NetWorthChart;
