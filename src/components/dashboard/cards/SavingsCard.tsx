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
        <div className="card-premium p-8 group">
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Economia</p>
                    <h3 className="text-4xl font-black text-white tracking-tighter reveal">
                        {formatCurrency(savings)}
                    </h3>
                </div>
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                    <PiggyBank className="w-6 h-6" />
                </div>
            </div>

            <div className="space-y-4">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ease-out ${savingsRate >= savingsGoal
                            ? 'bg-green-500'
                            : savingsRate >= savingsGoal * 0.5
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                        style={{ width: `${Math.min((savingsRate / savingsGoal) * 100, 100)}%` }}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Taxa de Economia
                    </span>
                    <span className={`text-[10px] font-black uppercase ${savingsRate >= savingsGoal ? 'text-green-400' : 'text-gray-400'}`}>
                        {savingsRate.toFixed(1)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SavingsCard;
