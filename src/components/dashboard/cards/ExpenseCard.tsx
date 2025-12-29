"use client";

import { CreditCard, AlertCircle, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';
import { motion } from 'framer-motion';

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
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 group relative overflow-hidden border border-white/5 hover:border-red-500/20 transition-all duration-500"
        >
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-red-500/20 transition-all duration-700" />

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOverBudget ? 'bg-red-500' : 'bg-orange-500'}`} />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Gastos do Mês</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            {formatCurrency(expenses)}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${isOverBudget
                                ? 'text-red-400 bg-red-500/10 border-red-500/20'
                                : 'text-gray-400 bg-white/5 border-white/10'}`}>
                                {percentage.toFixed(0)}% do orçamento
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className={`absolute inset-0 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isOverBudget ? 'bg-red-500/20' : 'bg-orange-500/20'}`} />
                    <div className={`relative w-14 h-14 bg-white/[0.03] backdrop-blur-md rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-2xl ${isOverBudget
                        ? 'border-red-500/20 text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/40'
                        : 'border-orange-500/20 text-orange-400 group-hover:bg-orange-500/10 group-hover:border-orange-500/40'}`}>
                        <CreditCard className="w-7 h-7 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full relative ${isOverBudget
                            ? 'bg-gradient-to-r from-red-600 to-red-400'
                            : percentage > 80
                                ? 'bg-gradient-to-r from-orange-600 to-orange-400'
                                : 'bg-gradient-to-r from-green-600 to-green-400'
                            }`}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                    </motion.div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        {isOverBudget && <AlertCircle size={12} className="text-red-500" />}
                        {isOverBudget ? 'Limite Excedido' : `${formatCurrency(budget - expenses)} restantes`}
                    </span>
                    <ArrowUpRight size={16} className="text-gray-700 group-hover:text-red-500 transition-colors" />
                </div>
            </div>
        </motion.div>
    );
};

export default ExpenseCard;
