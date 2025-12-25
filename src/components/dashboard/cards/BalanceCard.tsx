"use client";

import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
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
        <div className="card-premium p-6 md:p-8 group">
            <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Saldo Total</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter reveal">
                        {formatCurrency(balance)}
                    </h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Wallet className="w-6 h-6 text-primary" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider ${isPositive
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
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
