"use client";

import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BalanceCard = () => {
    const { getBalance } = useFinance();
    const [balance, setBalance] = useState(0);
    const [prevBalance, setPrevBalance] = useState(0);

    useEffect(() => {
        const currentBalance = getBalance();
        setPrevBalance(balance);
        setBalance(currentBalance);
    }, [getBalance]);

    const change = prevBalance !== 0 ? ((balance - prevBalance) / prevBalance) * 100 : 0;
    const isPositive = change >= 0;

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
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                        <Wallet size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Patrimônio Total</p>
                        <p className="text-xs text-gray-500">Atualizado agora</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
                    <ArrowUpRight size={18} />
                </button>
            </div>

            <div className="space-y-4">
                <h3 className="text-4xl font-bold text-white tracking-tight">
                    {formatCurrency(balance)}
                </h3>

                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${isPositive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(change).toFixed(1)}%
                    </div>
                    <span className="text-xs text-gray-500 font-medium">vs. mês anterior</span>
                </div>
            </div>
        </motion.div>
    );
};

export default BalanceCard;
