"use client";

import { PiggyBank, ArrowUpRight, Target } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';

const SavingsCard = () => {
    const { getSavings, getMonthlyIncome } = useFinance();
    const savings = getSavings();
    const income = getMonthlyIncome();
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const savingsGoal = 20; // 20% savings goal

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
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Economia</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(savings)}</h3>
                </div>
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <PiggyBank className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
            </div>

            {/* Savings Rate Progress */}
            <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span className="flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        Taxa de economia
                    </span>
                    <span>{savingsRate.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${savingsRate >= savingsGoal
                                ? 'bg-green-500'
                                : savingsRate >= savingsGoal * 0.5
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                            }`}
                        style={{ width: `${Math.min((savingsRate / savingsGoal) * 100, 100)}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center text-sm">
                {savingsRate >= savingsGoal ? (
                    <span className="text-green-500 flex items-center font-medium">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Meta atingida! 🎉
                    </span>
                ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                        Meta: {savingsGoal}% da renda
                    </span>
                )}
            </div>
        </div>
    );
};

export default SavingsCard;
