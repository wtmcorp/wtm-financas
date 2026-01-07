"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Target, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function QuickStatsWidget() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        netWorth: 0,
        savingsRate: 0,
        monthlyGrowth: 0,
        investmentROI: 0
    });

    useEffect(() => {
        // Calculate stats from user data and transactions
        const storedBalance = localStorage.getItem("wtm_balance");
        const balance = storedBalance ? parseFloat(storedBalance) : 0;
        const income = user?.income || 0;

        // Mock calculations (replace with real data)
        const expenses = income * 0.4;
        const savings = income - expenses;
        const savingsRate = income > 0 ? (savings / income) * 100 : 0;

        setStats({
            netWorth: isNaN(balance) ? 0 : balance,
            savingsRate: isNaN(savingsRate) ? 0 : savingsRate,
            monthlyGrowth: 12.5, // Mock data
            investmentROI: 8.3 // Mock data
        });
    }, [user]);

    const statCards = [
        {
            label: "Patrimônio Líquido",
            value: `R$ ${stats.netWorth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            change: stats.monthlyGrowth,
            icon: Wallet,
            color: "from-blue-500 to-cyan-600",
            trend: stats.monthlyGrowth >= 0
        },
        {
            label: "Taxa de Poupança",
            value: `${stats.savingsRate.toFixed(1)}%`,
            change: 5.2,
            icon: PiggyBank,
            color: "from-green-500 to-emerald-600",
            trend: true
        },
        {
            label: "Crescimento Mensal",
            value: `${stats.monthlyGrowth >= 0 ? '+' : ''}${stats.monthlyGrowth.toFixed(1)}%`,
            change: stats.monthlyGrowth,
            icon: TrendingUp,
            color: "from-purple-500 to-pink-600",
            trend: stats.monthlyGrowth >= 0
        },
        {
            label: "ROI Investimentos",
            value: `${stats.investmentROI.toFixed(1)}%`,
            change: 2.1,
            icon: Zap,
            color: "from-yellow-500 to-orange-600",
            trend: true
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-panel p-6 relative overflow-hidden group cursor-pointer"
                >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <stat.icon size={24} className="text-white" />
                    </div>

                    {/* Label */}
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">
                        {stat.label}
                    </div>

                    {/* Value */}
                    <div className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                        {stat.value}
                    </div>

                    {/* Change Indicator */}
                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.trend ? (
                            <ArrowUpRight size={14} />
                        ) : (
                            <ArrowDownRight size={14} />
                        )}
                        <span>{stat.change >= 0 ? '+' : ''}{stat.change.toFixed(1)}%</span>
                        <span className="text-gray-600 ml-1">vs mês anterior</span>
                    </div>

                    {/* Sparkline Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </div>
    );
}
