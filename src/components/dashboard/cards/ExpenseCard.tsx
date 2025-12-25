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
        <div className="card-premium p-6 md:p-8 group relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className={`w-1 h-4 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-orange-500'}`} />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Gastos do Mês</p>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter reveal">
                        {formatCurrency(expenses)}
                    </h3>
                </div>
                <div className={`w-12 h-12 glass rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-lg shadow-black/20 ${isOverBudget
                    ? 'border-red-500/20 text-red-400 group-hover:bg-red-500/10'
                    : 'border-orange-500/20 text-orange-400 group-hover:bg-orange-500/10'}`}>
                    <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                        className={`h-full transition-all duration-1000 ease-out relative ${isOverBudget
                            ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                            : percentage > 80
                                ? 'bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                                : 'bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                            }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        {isOverBudget && <AlertCircle size={12} className="text-red-500" />}
                        {isOverBudget ? 'Limite Excedido' : `${formatCurrency(budget - expenses)} restantes`}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border ${isOverBudget
                        ? 'text-red-400 bg-red-500/10 border-red-500/20'
                        : 'text-gray-400 bg-white/5 border-white/10'}`}>
                        {percentage.toFixed(0)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;
