"use client";

import { PiggyBank, Target, ArrowUpRight } from 'lucide-react';
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
            whileHover={{ y: -4 }}
            className="glass-card p-6 rounded-3xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <PiggyBank size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Economia</p>
                        <p className="text-xs text-gray-500">Meta: {savingsGoal}% da renda</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
                    <ArrowUpRight size={18} />
                </button>
            </div>

            <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
                    {formatCurrency(savings)}
                </h3>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-emerald-400">
                            {savingsRate.toFixed(1)}% poupado
                        </span>
                        <span className="text-gray-500">
                            {savingsRate >= savingsGoal ? "Meta atingida" : "Em progresso"}
                        </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((savingsRate / savingsGoal) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SavingsCard;
