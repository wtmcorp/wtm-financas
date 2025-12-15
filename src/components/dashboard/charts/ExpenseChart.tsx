"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useFinance } from '@/contexts/FinanceContext';

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
        <div className="h-[350px] w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Despesas por Categoria</h3>
            {data.length === 0 ? (
                <div className="flex items-center justify-center h-[250px]">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        Nenhuma despesa registrada ainda.<br />
                        <span className="text-sm">Adicione transações para visualizar o gráfico.</span>
                    </p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                padding: '12px'
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value, entry: any) => {
                                const percentage = ((entry.payload.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
                                return `${value} (${percentage}%)`;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ExpenseChart;
