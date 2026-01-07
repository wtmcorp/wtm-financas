"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useFinance } from '@/contexts/FinanceContext';
import { PieChart as PieChartIcon } from 'lucide-react';

const ExpenseChart = () => {
    const { getExpensesByCategory } = useFinance();
    const data = getExpensesByCategory();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative glass-panel p-8 rounded-[2.5rem] h-[450px]">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                            <PieChartIcon className="w-6 h-6 text-primary" />
                            Despesas por Categoria
                        </h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Distribuição de Gastos</p>
                    </div>
                </div>
                {data.length === 0 ? (
                    <div className="flex items-center justify-center h-[300px]">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <PieChartIcon className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                Nenhuma despesa registrada ainda
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Adicione transações para visualizar o gráfico
                            </p>
                        </div>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                {data.map((entry, index) => (
                                    <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                                        <stop offset="50%" stopColor={entry.color} stopOpacity={0.6} />
                                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.9} />
                                    </linearGradient>
                                ))}
                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                                    <feOffset dx="0" dy="4" result="offsetblur" />
                                    <feComponentTransfer>
                                        <feFuncA type="linear" slope="0.5" />
                                    </feComponentTransfer>
                                    <feMerge>
                                        <feMergeNode />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={5}
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={1500}
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={`url(#gradient-${index})`}
                                        style={{ filter: 'url(#shadow)', cursor: 'pointer', outline: 'none' }}
                                        className="hover:opacity-80 transition-opacity"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                                                    <span className="text-white font-bold">{data.name}</span>
                                                </div>
                                                <div className="text-2xl font-black text-white">
                                                    {formatCurrency(data.value)}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value, entry: any) => {
                                    const percentage = ((entry.payload.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
                                    return (
                                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-2">
                                            {value} <span className="text-primary/60">{percentage}%</span>
                                        </span>
                                    );
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default ExpenseChart;
