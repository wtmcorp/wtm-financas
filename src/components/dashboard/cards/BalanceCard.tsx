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
            className="card-premium p-10 group relative overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(167,139,250,1)]" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">PATRIMÔNIO TOTAL</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-5xl font-black text-white tracking-tighter leading-none">
                            {formatCurrency(balance)}
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider ${isPositive
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {Math.abs(change).toFixed(1)}%
                            </div>
                            <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">MÊS ANTERIOR</span>
                        </div>
                    </div>
                </div>
                <div className="w-16 h-16 bg-white/[0.03] backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500 shadow-2xl">
                    <Wallet className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <Sparkles size={16} className="text-yellow-500" />
                    <span>INTELIGÊNCIA ATIVA</span>
                </div>
                <ArrowUpRight size={20} className="text-gray-800 group-hover:text-primary transition-all" />
            </div>
        </motion.div>
    );
};

export default BalanceCard;
