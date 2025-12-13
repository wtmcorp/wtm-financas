"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, Calendar, Percent } from "lucide-react";

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

        if (monthly > 0) {
            totalAmount += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
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
        <div className="space-y-6">
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="text-primary" size={20} />
                    Simulador de Juros Compostos
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                    Descubra o poder dos juros compostos nos seus investimentos a longo prazo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-300 flex items-center gap-2">
                            <DollarSign size={14} /> Valor Inicial
                        </label>
                        <input
                            type="number"
                            value={initialAmount}
                            onChange={(e) => setInitialAmount(e.target.value)}
                            placeholder="Ex: 1000.00"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300 flex items-center gap-2">
                            <Calendar size={14} /> Aporte Mensal
                        </label>
                        <input
                            type="number"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(e.target.value)}
                            placeholder="Ex: 500.00"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300 flex items-center gap-2">
                            <Percent size={14} /> Taxa de Juros (Anual)
                        </label>
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="Ex: 10.5"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300 flex items-center gap-2">
                            <Calendar size={14} /> Período (Anos)
                        </label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            placeholder="Ex: 5"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg transition-colors"
                >
                    Calcular Resultado
                </button>
            </div>

            {result && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-xl p-6">
                        <div className="text-blue-400 text-sm font-medium mb-2">Total Investido</div>
                        <div className="text-2xl font-bold text-white mb-2">
                            R$ {result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-gray-400">Dinheiro que saiu do seu bolso</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-xl p-6">
                        <div className="text-green-400 text-sm font-medium mb-2">Total em Juros</div>
                        <div className="text-2xl font-bold text-white mb-2">
                            R$ {result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-gray-400">Lucro obtido com o tempo</div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6">
                        <div className="text-primary text-sm font-medium mb-2">Montante Final</div>
                        <div className="text-2xl font-bold text-white mb-2">
                            R$ {result.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-gray-400">Total acumulado no período</div>
                    </div>
                </div>
            )}
        </div>
    );
}
