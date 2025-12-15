"use client";

import { CreditCard, ArrowDownRight, AlertCircle } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';

const ExpenseCard = () => {
    const { getMonthlyExpenses } = useFinance();
    const expenses = getMonthlyExpenses();
    const budget = 5000; // This could be made dynamic later
    const percentage = (expenses / budget) * 100;
    const isOverBudget = percentage > 100;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gastos do Mês</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(expenses)}</h3>
                </div>
                <div className={`p-2 rounded-lg ${isOverBudget ? 'bg-red-50 dark:bg-red-900/20' : 'bg-orange-50 dark:bg-orange-900/20'}`}>
                    <CreditCard className={`w-6 h-6 ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`} />
                </div>
            </div>

            {/* Budget Progress Bar */}
            <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Orçamento</span>
                    <span>{percentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${isOverBudget
                                ? 'bg-red-500'
                                : percentage > 80
                                    ? 'bg-orange-500'
                                    : 'bg-green-500'
                            }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center text-sm">
                {isOverBudget ? (
                    <span className="text-red-500 flex items-center font-medium">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Acima do orçamento
                    </span>
                ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                        {formatCurrency(budget - expenses)} restante
                    </span>
                )}
            </div>
        </div>
    );
};

export default ExpenseCard;
