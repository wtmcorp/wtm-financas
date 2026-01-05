"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useFinance } from '@/contexts/FinanceContext';
import { TrendingUp, TrendingDown, Target, Sparkles, ArrowRight, PieChart, Wallet, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MonthlyClosingCard() {
    const { getMonthlyIncome, getMonthlyExpenses, getSavings, getMonthlySavingsRate, getTopExpenseCategory } = useFinance();
    const router = useRouter();

    const income = getMonthlyIncome();
    const expenses = getMonthlyExpenses();
    const savings = getSavings();
    const savingsRate = getMonthlySavingsRate();
    const topCategory = getTopExpenseCategory();

    const isPositive = savings >= 0;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 relative overflow-hidden group h-full flex flex-col"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                <PieChart size={200} className="text-primary" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Fechamento Mensal</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Análise de Performance</p>
                    </div>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">
                        {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Taxa de Poupança</p>
                    <div className="flex items-end gap-2">
                        <span className={`text-2xl font-black tracking-tighter ${savingsRate >= 20 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {savingsRate.toFixed(1)}%
                        </span>
                        <Sparkles size={14} className="text-primary mb-1 animate-pulse" />
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Resultado Líquido</p>
                    <div className="flex items-center gap-2">
                        <span className={`text-xl font-black tracking-tighter ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            R$ {savings.toLocaleString('pt-BR')}
                        </span>
                        {isPositive ? <TrendingUp size={16} className="text-green-400" /> : <TrendingDown size={16} className="text-red-400" />}
                    </div>
                </div>
            </div>

            <div className="space-y-4 flex-1 relative z-10">
                {topCategory && (
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group/item hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
                                <TrendingDown size={18} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Maior Gasto</p>
                                <h4 className="text-sm font-black text-white uppercase">{topCategory.name}</h4>
                            </div>
                        </div>
                        <span className="text-sm font-black text-white">R$ {topCategory.amount.toLocaleString('pt-BR')}</span>
                    </div>
                )}

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group/item hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <Wallet size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Status do Mês</p>
                            <h4 className="text-sm font-black text-white uppercase">
                                {savingsRate >= 30 ? 'Excelente' : savingsRate >= 10 ? 'Bom' : 'Atenção'}
                            </h4>
                        </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
            </div>

            <button
                onClick={() => router.push('/trends')}
                className="w-full mt-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-gray-500 hover:text-white transition-all flex items-center justify-center gap-4 group uppercase tracking-[0.3em] relative z-10"
            >
                RELATÓRIO COMPLETO
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
}
