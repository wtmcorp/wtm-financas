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
            <div className="relative card-premium p-6 rounded-2xl h-[400px]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-indigo-400" />
                        Despesas por Categoria
                    </h3>
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
                                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                                        <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
                                    </linearGradient>
                                ))}
                            </defs>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} stroke="#13131a" strokeWidth={2} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{
                                    backgroundColor: '#13131a',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                    padding: '12px'
                                }}
                                labelStyle={{ color: '#f8f9fa', fontWeight: 600 }}
                                itemStyle={{ color: '#d1d5db' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value, entry: any) => {
                                    const percentage = ((entry.payload.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
                                    return (
                                        <span style={{ color: '#d1d5db', fontSize: '13px' }}>
                                            {value} <span style={{ color: '#9ca3af' }}>({percentage}%)</span>
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
