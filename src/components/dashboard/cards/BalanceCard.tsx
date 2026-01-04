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
            className="glass-card p-8 rounded-[2rem] relative overflow-hidden group"
        >
            {/* Subtle internal glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner shadow-white/5">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400 tracking-wide">Patrimônio Total</p>
                    </div>
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                    <ArrowUpRight size={20} />
                </button>
            </div>

            <div className="space-y-2 relative z-10">
                <h3 className="text-5xl font-bold text-white tracking-tighter">
                    {formatCurrency(balance)}
                </h3>

                <div className="flex items-center gap-3 pt-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${isPositive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
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
