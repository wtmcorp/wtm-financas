"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useFinance } from '@/contexts/FinanceContext';
import { BarChart3 } from 'lucide-react';

const CashFlowChart = () => {
    const { getCashFlow } = useFinance();
    const data = getCashFlow();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative glass-panel p-8 rounded-[2.5rem] h-[450px]">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-primary" />
                            Fluxo de Caixa
                        </h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Entradas vs Saídas</p>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: -10,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                            </linearGradient>
                            <linearGradient id="colorSaida" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
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
                            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200">
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">{payload[0].payload.name}</div>
                                            <div className="space-y-2">
                                                {payload.map((entry: any, index: number) => (
                                                    <div key={index} className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color === 'url(#colorEntrada)' ? '#10b981' : '#ef4444' }} />
                                                            <span className="text-gray-300 text-sm font-medium">{entry.name}</span>
                                                        </div>
                                                        <span className="text-white font-bold">{formatCurrency(entry.value)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                            formatter={(value) => <span className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">{value}</span>}
                        />
                        <Bar dataKey="entrada" name="Entradas" fill="url(#colorEntrada)" radius={[6, 6, 0, 0]} style={{ filter: 'url(#glow)' }} />
                        <Bar dataKey="saida" name="Saídas" fill="url(#colorSaida)" radius={[6, 6, 0, 0]} style={{ filter: 'url(#glow)' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CashFlowChart;
