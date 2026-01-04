"use client";

import { PiggyBank, Target, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';
import { motion } from 'framer-motion';

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
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-10 group relative overflow-hidden border border-white/5 hover:border-green-500/30 transition-all duration-500"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-green-500/10 transition-all duration-700" />

            <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">ECONOMIA</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-5xl font-black text-white tracking-tighter leading-none">
                            {formatCurrency(savings)}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${savingsRate >= savingsGoal
                                ? 'text-green-400 bg-green-500/10 border-green-500/20'
                                : 'text-gray-500 bg-white/5 border-white/10'}`}>
                                {savingsRate.toFixed(1)}% DE TAXA
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-16 h-16 bg-white/[0.03] backdrop-blur-xl rounded-2xl flex items-center justify-center border border-green-500/20 text-green-400 group-hover:bg-green-500/10 group-hover:border-green-500/40 transition-all duration-500 shadow-2xl">
                    <PiggyBank className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((savingsRate / savingsGoal) * 100, 100)}%` }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                        className={`h-full relative ${savingsRate >= savingsGoal
                            ? 'bg-gradient-to-r from-green-600 to-green-400'
                            : savingsRate >= savingsGoal * 0.5
                                ? 'bg-gradient-to-r from-yellow-600 to-yellow-400'
                                : 'bg-gradient-to-r from-red-600 to-red-400'
                            }`}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                    </motion.div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} className="text-gray-400" />
                        META: {savingsGoal}%
                    </span>
                    <ArrowUpRight size={20} className="text-gray-800 group-hover:text-green-500 transition-all" />
                </div>
            </div>
        </motion.div>
    );
};

export default SavingsCard;
