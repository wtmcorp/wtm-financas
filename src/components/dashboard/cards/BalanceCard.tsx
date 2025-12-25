"use client";

import { Wallet, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';
import { useEffect, useState } from 'react';

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
        <div className="card-premium p-6 md:p-8 group relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary rounded-full" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Saldo Total</p>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter reveal flex items-center gap-3">
                        {formatCurrency(balance)}
                        <Sparkles className="w-5 h-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
                    </h3>
                </div>
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 shadow-lg shadow-black/20">
                    <Wallet className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
            </div>

            <div className="flex items-center gap-3 relative z-10">
                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider border ${isPositive
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(change).toFixed(1)}%
                </div>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">vs. mês anterior</span>
            </div>
        </div>
    );
};

export default BalanceCard;
