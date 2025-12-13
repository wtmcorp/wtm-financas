<<<<<<< HEAD
"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";

export default function LoanCalculator() {
    const [amount, setAmount] = useState("10000");
    const [rate, setRate] = useState("2");
    const [months, setMonths] = useState("12");

    const principal = parseFloat(amount) || 0;
    const monthlyRate = (parseFloat(rate) || 0) / 100;
    const numMonths = parseInt(months) || 1;

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numMonths)) / (Math.pow(1 + monthlyRate, numMonths) - 1);
    const totalPayment = monthlyPayment * numMonths;
    const totalInterest = totalPayment - principal;

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                Calculadora de Empréstimo
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Valor do Empréstimo (R$)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Taxa Mensal (%)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            step="0.1"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Prazo (meses)</label>
                        <input
                            type="number"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Parcela Mensal</span>
                        <span className="text-lg font-bold text-white">R$ {isNaN(monthlyPayment) ? "0.00" : monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total a Pagar</span>
                        <span className="text-lg font-bold text-yellow-400">R$ {isNaN(totalPayment) ? "0.00" : totalPayment.toFixed(2)}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total de Juros</span>
                        <span className="text-lg font-bold text-red-400">R$ {isNaN(totalInterest) ? "0.00" : totalInterest.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
=======
"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";

export default function LoanCalculator() {
    const [amount, setAmount] = useState("10000");
    const [rate, setRate] = useState("2");
    const [months, setMonths] = useState("12");

    const principal = parseFloat(amount) || 0;
    const monthlyRate = (parseFloat(rate) || 0) / 100;
    const numMonths = parseInt(months) || 1;

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numMonths)) / (Math.pow(1 + monthlyRate, numMonths) - 1);
    const totalPayment = monthlyPayment * numMonths;
    const totalInterest = totalPayment - principal;

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                Calculadora de Empréstimo
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Valor do Empréstimo (R$)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Taxa Mensal (%)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            step="0.1"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Prazo (meses)</label>
                        <input
                            type="number"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Parcela Mensal</span>
                        <span className="text-lg font-bold text-white">R$ {isNaN(monthlyPayment) ? "0.00" : monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total a Pagar</span>
                        <span className="text-lg font-bold text-yellow-400">R$ {isNaN(totalPayment) ? "0.00" : totalPayment.toFixed(2)}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total de Juros</span>
                        <span className="text-lg font-bold text-red-400">R$ {isNaN(totalInterest) ? "0.00" : totalInterest.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
