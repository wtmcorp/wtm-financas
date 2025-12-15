"use client";

import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm font-medium text-blue-100">Saldo Total</p>
                        <h3 className="text-3xl font-bold mt-1">{formatCurrency(balance)}</h3>
                    </div>
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <Wallet className="w-6 h-6" />
                    </div>
                </div>
                <div className="flex items-center text-sm">
                    <span className={`flex items-center font-medium ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
                        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                        {Math.abs(change).toFixed(1)}%
                    </span>
                    <span className="text-blue-100 ml-2">vs. período anterior</span>
                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
