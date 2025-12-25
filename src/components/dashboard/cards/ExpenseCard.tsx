"use client";

import { CreditCard, AlertCircle, TrendingDown } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';

const ExpenseCard = () => {
    const { getMonthlyExpenses } = useFinance();
    const expenses = getMonthlyExpenses();
    const budget = 5000;
    const percentage = (expenses / budget) * 100;
    const isOverBudget = percentage > 100;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="card-premium p-6 md:p-8 group">
            <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Gastos do Mês</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter reveal">
                        {formatCurrency(expenses)}
                    </h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${isOverBudget
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                    <CreditCard className="w-6 h-6" />
                </div>
            </div>

            <div className="space-y-4">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ease-out ${isOverBudget
                            ? 'bg-red-500'
                            : percentage > 80
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {isOverBudget ? 'Limite Excedido' : `${formatCurrency(budget - expenses)} restantes`}
                    </span>
                    <span className={`text-[10px] font-black uppercase ${isOverBudget ? 'text-red-400' : 'text-gray-400'}`}>
                        {percentage.toFixed(0)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;
