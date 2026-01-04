"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, Calendar, Percent, Sparkles, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompoundInterestCalculator() {
    const [initialAmount, setInitialAmount] = useState("");
    const [monthlyContribution, setMonthlyContribution] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<{
        totalInvested: number;
        totalInterest: number;
        totalAmount: number;
    } | null>(null);

    const calculate = () => {
        const principal = parseFloat(initialAmount) || 0;
        const monthly = parseFloat(monthlyContribution) || 0;
        const rate = parseFloat(interestRate) || 0;
        const timeYears = parseFloat(years) || 0;

        if (timeYears <= 0) return;

        const monthlyRate = rate / 100 / 12;
        const months = timeYears * 12;

        let totalAmount = principal * Math.pow(1 + monthlyRate, months);

        if (monthlyRate > 0) {
            totalAmount += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        } else {
            totalAmount += monthly * months;
        }

        const totalInvested = principal + (monthly * months);
        const totalInterest = totalAmount - totalInvested;

        setResult({
            totalInvested,
            totalInterest,
            totalAmount
        });
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium p-8 md:p-10 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <TrendingUp size={200} className="text-primary" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10">
                            <Sparkles size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight uppercase">Máquina de Juros Compostos</h3>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Wealth Acceleration Simulator</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <DollarSign size={12} className="text-primary" /> Valor Inicial
                            </label>
                            <input
                                type="number"
                                value={initialAmount}
                                onChange={(e) => setInitialAmount(e.target.value)}
                                placeholder="0,00"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Zap size={12} className="text-primary" /> Aporte Mensal
                            </label>
                            <input
                                type="number"
                                value={monthlyContribution}
                                onChange={(e) => setMonthlyContribution(e.target.value)}
                                placeholder="0,00"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Percent size={12} className="text-primary" /> Taxa Anual (%)
                            </label>
                            <input
                                type="number"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                placeholder="10.0"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Calendar size={12} className="text-primary" /> Período (Anos)
                            </label>
                            <input
                                type="number"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                                placeholder="10"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        onClick={calculate}
                        className="w-full py-6 bg-primary text-black font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] hover:bg-white transition-all shadow-[0_20px_40px_rgba(167,139,250,0.2)] active:scale-95 flex items-center justify-center gap-3 group/btn"
                    >
                        Executar Simulação de Longo Prazo
                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="card-premium p-8 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-4">Total Investido</p>
                            <p className="text-3xl font-black text-white tracking-tighter">
                                R$ {result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <div className="mt-4 h-1 w-full bg-blue-500/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[60%]" />
                            </div>
                        </div>

                        <div className="card-premium p-8 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
                            <p className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-4">Juros Acumulados</p>
                            <p className="text-3xl font-black text-white tracking-tighter">
                                R$ {result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <div className="mt-4 h-1 w-full bg-green-500/10 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[80%]" />
                            </div>
                        </div>

                        <div className="card-premium p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-4">Montante Final</p>
                            <p className="text-3xl font-black text-white tracking-tighter">
                                R$ {result.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <div className="mt-4 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-full" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
