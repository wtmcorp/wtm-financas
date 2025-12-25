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
        <div className="card-premium p-6 md:p-8 group relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 bg-green-500 rounded-full" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Economia</p>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter reveal">
                        {formatCurrency(savings)}
                    </h3>
                </div>
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-green-500/20 text-green-400 group-hover:bg-green-500/10 transition-all duration-300 shadow-lg shadow-black/20">
                    <PiggyBank className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                        className={`h-full transition-all duration-1000 ease-out relative ${savingsRate >= savingsGoal
                            ? 'bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                            : savingsRate >= savingsGoal * 0.5
                                ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]'
                                : 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                            }`}
                        style={{ width: `${Math.min((savingsRate / savingsGoal) * 100, 100)}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Target size={12} className="text-gray-400" />
                        Taxa de Economia
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border ${savingsRate >= savingsGoal
                        ? 'text-green-400 bg-green-500/10 border-green-500/20'
                        : 'text-gray-400 bg-white/5 border-white/10'}`}>
                        {savingsRate.toFixed(1)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SavingsCard;
