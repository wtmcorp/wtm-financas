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
            className="card-premium p-10 group relative overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-500"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-red-500/10 transition-all duration-700" />

            <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)] ${isOverBudget ? 'bg-red-500' : 'bg-orange-500'}`} />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">GASTOS DO MÊS</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-5xl font-black text-white tracking-tighter leading-none">
                            {formatCurrency(expenses)}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${isOverBudget
                                ? 'text-red-400 bg-red-500/10 border-red-500/20'
                                : 'text-gray-500 bg-white/5 border-white/10'}`}>
                                {percentage.toFixed(0)}% DO ORÇAMENTO
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`w-16 h-16 bg-white/[0.03] backdrop-blur-xl rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-2xl ${isOverBudget
                    ? 'border-red-500/20 text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/40'
                    : 'border-orange-500/20 text-orange-400 group-hover:bg-orange-500/10 group-hover:border-orange-500/40'}`}>
                    <CreditCard className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
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
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        {isOverBudget && <AlertCircle size={14} className="text-red-500" />}
                        {isOverBudget ? 'LIMITE EXCEDIDO' : `${formatCurrency(budget - expenses)} RESTANTES`}
                    </span>
                    <ArrowUpRight size={20} className="text-gray-800 group-hover:text-red-500 transition-all" />
                </div>
            </div>
        </motion.div>
    );
};

export default ExpenseCard;
