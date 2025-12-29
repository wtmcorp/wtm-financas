"use client";

import { Wallet, TrendingUp, TrendingDown, Sparkles, ArrowUpRight } from 'lucide-react';
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
            whileHover={{ y: -5 }}
            className="card-premium p-8 group relative overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500"
        >
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Patrimônio Total</p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-3">
                            {formatCurrency(balance)}
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider ${isPositive
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {Math.abs(change).toFixed(1)}%
                            </div>
                            <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">vs. mês anterior</span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-14 h-14 bg-white/[0.03] backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500 shadow-2xl">
                        <Wallet className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Sparkles size={14} className="text-yellow-500" />
                    <span>Inteligência Financeira Ativa</span>
                </div>
                <ArrowUpRight size={16} className="text-gray-700 group-hover:text-primary transition-colors" />
            </div>
        </motion.div>
    );
};

export default BalanceCard;
