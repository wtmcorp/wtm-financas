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
        <div className="relative group">
            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity ${isOverBudget ? 'bg-gradient-to-r from-red-500 to-orange-600' : 'bg-gradient-to-r from-orange-500 to-amber-600'
                }`}></div>
            <div className="relative card-premium p-6 rounded-2xl overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl ${isOverBudget ? 'bg-gradient-to-br from-red-500/10 to-orange-600/10' : 'bg-gradient-to-br from-orange-500/10 to-amber-600/10'
                    }`}></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm font-medium text-gray-400 mb-2">Gastos do Mês</p>
                            <h3 className="text-3xl md:text-4xl font-bold text-white number-animate">{formatCurrency(expenses)}</h3>
                        </div>
                        <div className={`p-3 rounded-xl shadow-lg ${isOverBudget
                                ? 'bg-gradient-to-br from-red-500 to-orange-600 shadow-red-500/50'
                                : 'bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/50'
                            }`}>
                            <CreditCard className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Budget Progress Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Orçamento Mensal</span>
                            <span className="font-semibold">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="h-2.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <div
                                className={`h-full transition-all duration-700 ease-out ${isOverBudget
                                        ? 'bg-gradient-to-r from-red-500 to-orange-600'
                                        : percentage > 80
                                            ? 'bg-gradient-to-r from-orange-500 to-amber-600'
                                            : 'bg-gradient-to-r from-emerald-500 to-green-600'
                                    }`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isOverBudget ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 rounded-lg">
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                <span className="text-red-400 font-medium text-sm">Acima do orçamento</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <TrendingDown className="w-4 h-4 text-emerald-400" />
                                <span className="text-gray-400 text-sm">
                                    <span className="text-emerald-400 font-semibold">{formatCurrency(budget - expenses)}</span> restante
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;
