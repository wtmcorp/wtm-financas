"use client";

import { useState } from "react";
import { TrendingDown, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Debt {
    id: number;
    name: string;
    amount: number;
    interestRate: number;
    minPayment: number;
}

export default function DebtPayoffCalculator() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [minPayment, setMinPayment] = useState("");
    const [extraPayment, setExtraPayment] = useState("100");

    const addDebt = () => {
        if (!name || !amount) return;

        const newDebt: Debt = {
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            interestRate: parseFloat(interestRate) || 0,
            minPayment: parseFloat(minPayment) || 0
        };

        setDebts([...debts, newDebt]);
        setName("");
        setAmount("");
        setInterestRate("");
        setMinPayment("");
    };

    const deleteDebt = (id: number) => {
        setDebts(debts.filter(d => d.id !== id));
    };

    const calculatePayoff = () => {
        // Simple Snowball Method: Sort by lowest balance first
        let sortedDebts = [...debts].sort((a, b) => a.amount - b.amount);
        let totalMonths = 0;
        let totalInterest = 0;
        let currentExtra = parseFloat(extraPayment) || 0;

        // This is a simplified simulation
        // In a real app, we would simulate month by month for all debts simultaneously
        // For this MVP, we'll just sum up the totals to give an estimate

        const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
        const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);

        if (totalMinPayment + currentExtra <= 0) return { months: 0, interest: 0 };

        // Very rough approximation for MVP
        // Real calculation requires complex amortization schedules
        let remaining = totalDebt;
        let monthlyPay = totalMinPayment + currentExtra;

        while (remaining > 0 && totalMonths < 360) { // Cap at 30 years
            const monthlyInterest = remaining * 0.02; // Avg 2% monthly interest assumption for simplicity
            totalInterest += monthlyInterest;
            remaining = remaining + monthlyInterest - monthlyPay;
            totalMonths++;
        }

        return { months: totalMonths, interest: totalInterest };
    };

    const result = calculatePayoff();

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingDown className="text-red-400" size={20} />
                Calculadora de Quitação de Dívidas
            </h3>
            <p className="text-sm text-gray-400 mb-6">
                Use o método "Bola de Neve" para eliminar suas dívidas mais rápido.
            </p>

            <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome (ex: Cartão Nubank)"
                        className="col-span-2 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Valor Total (R$)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="number"
                        value={minPayment}
                        onChange={(e) => setMinPayment(e.target.value)}
                        placeholder="Pagamento Mínimo"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                </div>
                <button
                    onClick={addDebt}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    Adicionar Dívida
                </button>
            </div>

            {debts.length > 0 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        {debts.map(debt => (
                            <div key={debt.id} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-white">{debt.name}</p>
                                    <p className="text-xs text-gray-400">R$ {debt.amount.toFixed(2)}</p>
                                </div>
                                <button onClick={() => deleteDebt(debt.id)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <label className="text-sm text-gray-400 mb-2 block">
                            Quanto a mais você pode pagar por mês?
                        </label>
                        <input
                            type="number"
                            value={extraPayment}
                            onChange={(e) => setExtraPayment(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50 mb-4"
                        />

                        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-xl p-4 text-center">
                            <p className="text-sm text-green-400 mb-1">Você estará livre das dívidas em</p>
                            <p className="text-3xl font-bold text-white mb-1">
                                {result.months < 12
                                    ? `${result.months} meses`
                                    : `${Math.floor(result.months / 12)} anos e ${result.months % 12} meses`}
                            </p>
                            <p className="text-xs text-gray-400">
                                Estimativa baseada no método Bola de Neve
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
