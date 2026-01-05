"use client";

import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

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
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-card p-8 rounded-[2rem] relative overflow-hidden group cursor-pointer"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Subtle internal glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <motion.div
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-lg shadow-violet-500/10"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Wallet size={26} strokeWidth={2.5} />
                    </motion.div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 tracking-wide uppercase">Patrimônio Total</p>
                        <p className="text-xs text-gray-600 font-medium mt-0.5">Saldo consolidado</p>
                    </div>
                </div>
                <motion.button
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowUpRight size={20} />
                </motion.button>
            </div>

            <div className="space-y-3 relative z-10">
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter">
                    <AnimatedNumber
                        value={balance}
                        decimals={2}
                        prefix="R$ "
                        duration={1500}
                    />
                </h3>

                <div className="flex items-center gap-3 pt-2">
                    <motion.div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${isPositive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(change).toFixed(1)}%
                    </motion.div>
                    <span className="text-xs text-gray-500 font-medium">vs. mês anterior</span>
                </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </motion.div>
    );
};

export default BalanceCard;
