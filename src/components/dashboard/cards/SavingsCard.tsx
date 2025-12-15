"use client";

import { PiggyBank, Target, TrendingUp, Sparkles } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';

const SavingsCard = () => {
    const { getSavings, getMonthlyIncome } = useFinance();
    const savings = getSavings();
    const income = getMonthlyIncome();
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const savingsGoal = 20;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative card-premium p-6 rounded-2xl overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm font-medium text-gray-400 mb-2">Economia</p>
                            <h3 className="text-3xl md:text-4xl font-bold text-white number-animate">{formatCurrency(savings)}</h3>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-500/50">
                            <PiggyBank className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Savings Rate Progress */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Taxa de economia
                            </span>
                            <span className="font-semibold">{savingsRate.toFixed(1)}%</span>
                        </div>
                        <div className="h-2.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <div
                                className={`h-full transition-all duration-700 ease-out ${savingsRate >= savingsGoal
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                                        : savingsRate >= savingsGoal * 0.5
                                            ? 'bg-gradient-to-r from-yellow-500 to-amber-600'
                                            : 'bg-gradient-to-r from-red-500 to-orange-600'
                                    }`}
                                style={{ width: `${Math.min((savingsRate / savingsGoal) * 100, 100)}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {savingsRate >= savingsGoal ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-400 font-medium text-sm">Meta atingida!</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400 text-sm">
                                    Meta: <span className="text-white font-semibold">{savingsGoal}%</span> da renda
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingsCard;
