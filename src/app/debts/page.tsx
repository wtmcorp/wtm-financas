<<<<<<< HEAD
"use client";

import { AlertTriangle, Plus, Trash2, CheckCircle, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DebtPayoffCalculator from "@/components/tools/DebtPayoffCalculator";
import FinancialHacks from "@/components/finance/FinancialHacks";



interface Debt {
    id: number;
    name: string;
    amount: number;
    interestRate: number;
    minimumPayment: number;
    dueDate: string;
    category: "credit_card" | "loan" | "financing" | "overdraft" | "other";
}

const debtCategories = {
    credit_card: { name: "Cartão de Crédito", color: "bg-red-500", icon: "💳" },
    overdraft: { name: "Cheque Especial", color: "bg-orange-500", icon: "🏦" },
    loan: { name: "Empréstimo Pessoal", color: "bg-yellow-500", icon: "💰" },
    financing: { name: "Financiamento", color: "bg-blue-500", icon: "🏠" },
    other: { name: "Outros", color: "bg-gray-500", icon: "📋" },
};

export default function DebtsPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [minimumPayment, setMinimumPayment] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState<keyof typeof debtCategories>("credit_card");

    useEffect(() => {
        const saved = localStorage.getItem("wtm_debts");
        if (saved) {
            setDebts(JSON.parse(saved));
        }
    }, []);

    const addDebt = () => {
        if (!name || !amount) return;

        const newDebt: Debt = {
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            interestRate: parseFloat(interestRate) || 0,
            minimumPayment: parseFloat(minimumPayment) || 0,
            dueDate,
            category
        };

        const updated = [...debts, newDebt];
        setDebts(updated);
        localStorage.setItem("wtm_debts", JSON.stringify(updated));

        setName("");
        setAmount("");
        setInterestRate("");
        setMinimumPayment("");
        setDueDate("");
    };

    const deleteDebt = (id: number) => {
        const updated = debts.filter(d => d.id !== id);
        setDebts(updated);
        localStorage.setItem("wtm_debts", JSON.stringify(updated));
    };

    const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
    const totalMinimum = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

    // Sort by interest rate (highest first) for avalanche method
    const sortedByRate = [...debts].sort((a, b) => b.interestRate - a.interestRate);

    // Sort by amount (lowest first) for snowball method
    const sortedByAmount = [...debts].sort((a, b) => a.amount - b.amount);

    return (
        <div className="p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <AlertTriangle size={28} />
                    Gerenciador de Dívidas
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Organize suas dívidas e crie um plano para quitá-las
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 rounded-xl p-6">
                    <div className="text-red-400 text-sm font-medium mb-2">Total em Dívidas</div>
                    <div className="text-3xl font-bold text-white">R$ {totalDebt.toFixed(2)}</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 rounded-xl p-6">
                    <div className="text-yellow-400 text-sm font-medium mb-2">Pagamento Mínimo Total</div>
                    <div className="text-3xl font-bold text-white">R$ {totalMinimum.toFixed(2)}</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-xl p-6">
                    <div className="text-blue-400 text-sm font-medium mb-2">Número de Dívidas</div>
                    <div className="text-3xl font-bold text-white">{debts.length}</div>
                </div>
            </div>

            {/* Add Debt Form */}
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Adicionar Dívida</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome da dívida (ex: Cartão Nubank)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as keyof typeof debtCategories)}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    >
                        {Object.entries(debtCategories).map(([key, cat]) => (
                            <option key={key} value={key}>{cat.icon} {cat.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Valor total (R$)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Taxa de juros mensal (%)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="number"
                        value={minimumPayment}
                        onChange={(e) => setMinimumPayment(e.target.value)}
                        placeholder="Pagamento mínimo (R$)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                </div>
                <button
                    onClick={addDebt}
                    className="w-full mt-4 bg-primary hover:bg-primary/90 text-black font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    Adicionar Dívida
                </button>
            </div>

            {/* Payment Strategies */}
            {debts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingDown className="text-red-500" size={20} />
                            Método Avalanche (Maior Juros)
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Pague primeiro as dívidas com maior taxa de juros para economizar mais
                        </p>
                        <div className="space-y-2">
                            {sortedByRate.map((debt, index) => (
                                <div key={debt.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">
                                            {index + 1}. {debt.name}
                                        </span>
                                        <span className="text-sm font-bold text-red-400">{debt.interestRate}% a.m.</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={20} />
                            Método Bola de Neve (Menor Valor)
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Pague primeiro as menores dívidas para ganhar motivação
                        </p>
                        <div className="space-y-2">
                            {sortedByAmount.map((debt, index) => (
                                <div key={debt.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">
                                            {index + 1}. {debt.name}
                                        </span>
                                        <span className="text-sm font-bold text-green-400">R$ {debt.amount.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Debts List */}
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Suas Dívidas</h3>
                <div className="space-y-3">
                    {debts.length === 0 ? (
                        <div className="text-center py-12">
                            <CheckCircle size={64} className="mx-auto mb-4 text-green-500 opacity-20" />
                            <p className="text-gray-400">Nenhuma dívida cadastrada! 🎉</p>
                            <p className="text-sm text-gray-500 mt-2">Adicione suas dívidas para criar um plano de pagamento</p>
                        </div>
                    ) : (
                        debts.map(debt => (
                            <motion.div
                                key={debt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/5 border border-white/10 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-base font-bold text-white">{debt.name}</span>
                                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
                                                {debtCategories[debt.category].icon} {debtCategories[debt.category].name}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                            <div>
                                                <span className="text-gray-500">Valor:</span>
                                                <span className="text-red-400 font-bold ml-2">R$ {debt.amount.toFixed(2)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Juros:</span>
                                                <span className="text-yellow-400 font-bold ml-2">{debt.interestRate}% a.m.</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Mínimo:</span>
                                                <span className="text-white font-bold ml-2">R$ {debt.minimumPayment.toFixed(2)}</span>
                                            </div>
                                            {debt.dueDate && (
                                                <div>
                                                    <span className="text-gray-500">Vencimento:</span>
                                                    <span className="text-white font-bold ml-2">
                                                        {new Date(debt.dueDate).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteDebt(debt.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Debt Payoff Calculator */}
            <DebtPayoffCalculator />



            {/* Financial Hacks Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-primary mb-3">💡 Dicas de Ouro para Sair do Vermelho</h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">1.</span>
                            <span><strong>Negocie TUDO:</strong> Ligue para os credores no final do mês. As metas dos atendentes batem nessa época e eles liberam mais descontos.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">2.</span>
                            <span><strong>Troque a dívida:</strong> Se você paga 14% no cheque especial, pegue um empréstimo consignado a 2% para quitar. A diferença é brutal.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">3.</span>
                            <span><strong>Cancele serviços inúteis:</strong> Tarifas bancárias (mude para conta essencial gratuita), TV a cabo que não assiste, anuidade de cartão.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">4.</span>
                            <span><strong>Venda o passivo:</strong> Tem um carro que só dá gasto? Venda, quite as dívidas e ande de Uber/Transporte público até se reerguer.</span>
                        </li>
                    </ul>
                </div>

                <FinancialHacks />
            </div>
        </div>
    );
}
=======
"use client";

import { AlertTriangle, Plus, Trash2, CheckCircle, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DebtPayoffCalculator from "@/components/tools/DebtPayoffCalculator";
import FinancialHacks from "@/components/finance/FinancialHacks";



interface Debt {
    id: number;
    name: string;
    amount: number;
    interestRate: number;
    minimumPayment: number;
    dueDate: string;
    category: "credit_card" | "loan" | "financing" | "overdraft" | "other";
}

const debtCategories = {
    credit_card: { name: "Cartão de Crédito", color: "bg-red-500", icon: "💳" },
    overdraft: { name: "Cheque Especial", color: "bg-orange-500", icon: "🏦" },
    loan: { name: "Empréstimo Pessoal", color: "bg-yellow-500", icon: "💰" },
    financing: { name: "Financiamento", color: "bg-blue-500", icon: "🏠" },
    other: { name: "Outros", color: "bg-gray-500", icon: "📋" },
};

export default function DebtsPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [minimumPayment, setMinimumPayment] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState<keyof typeof debtCategories>("credit_card");

    useEffect(() => {
        const saved = localStorage.getItem("wtm_debts");
        if (saved) {
            setDebts(JSON.parse(saved));
        }
    }, []);

    const addDebt = () => {
        if (!name || !amount) return;

        const newDebt: Debt = {
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            interestRate: parseFloat(interestRate) || 0,
            minimumPayment: parseFloat(minimumPayment) || 0,
            dueDate,
            category
        };

        const updated = [...debts, newDebt];
        setDebts(updated);
        localStorage.setItem("wtm_debts", JSON.stringify(updated));

        setName("");
        setAmount("");
        setInterestRate("");
        setMinimumPayment("");
        setDueDate("");
    };

    const deleteDebt = (id: number) => {
        const updated = debts.filter(d => d.id !== id);
        setDebts(updated);
        localStorage.setItem("wtm_debts", JSON.stringify(updated));
    };

    const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
    const totalMinimum = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

    // Sort by interest rate (highest first) for avalanche method
    const sortedByRate = [...debts].sort((a, b) => b.interestRate - a.interestRate);

    // Sort by amount (lowest first) for snowball method
    const sortedByAmount = [...debts].sort((a, b) => a.amount - b.amount);

    return (
        <div className="p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <AlertTriangle size={28} />
                    Gerenciador de Dívidas
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Organize suas dívidas e crie um plano para quitá-las
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 rounded-xl p-6">
                    <div className="text-red-400 text-sm font-medium mb-2">Total em Dívidas</div>
                    <div className="text-3xl font-bold text-white">R$ {totalDebt.toFixed(2)}</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 rounded-xl p-6">
                    <div className="text-yellow-400 text-sm font-medium mb-2">Pagamento Mínimo Total</div>
                    <div className="text-3xl font-bold text-white">R$ {totalMinimum.toFixed(2)}</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-xl p-6">
                    <div className="text-blue-400 text-sm font-medium mb-2">Número de Dívidas</div>
                    <div className="text-3xl font-bold text-white">{debts.length}</div>
                </div>
            </div>

            {/* Add Debt Form */}
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Adicionar Dívida</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome da dívida (ex: Cartão Nubank)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as keyof typeof debtCategories)}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    >
                        {Object.entries(debtCategories).map(([key, cat]) => (
                            <option key={key} value={key}>{cat.icon} {cat.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Valor total (R$)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Taxa de juros mensal (%)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="number"
                        value={minimumPayment}
                        onChange={(e) => setMinimumPayment(e.target.value)}
                        placeholder="Pagamento mínimo (R$)"
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                    />
                </div>
                <button
                    onClick={addDebt}
                    className="w-full mt-4 bg-primary hover:bg-primary/90 text-black font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    Adicionar Dívida
                </button>
            </div>

            {/* Payment Strategies */}
            {debts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingDown className="text-red-500" size={20} />
                            Método Avalanche (Maior Juros)
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Pague primeiro as dívidas com maior taxa de juros para economizar mais
                        </p>
                        <div className="space-y-2">
                            {sortedByRate.map((debt, index) => (
                                <div key={debt.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">
                                            {index + 1}. {debt.name}
                                        </span>
                                        <span className="text-sm font-bold text-red-400">{debt.interestRate}% a.m.</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={20} />
                            Método Bola de Neve (Menor Valor)
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Pague primeiro as menores dívidas para ganhar motivação
                        </p>
                        <div className="space-y-2">
                            {sortedByAmount.map((debt, index) => (
                                <div key={debt.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">
                                            {index + 1}. {debt.name}
                                        </span>
                                        <span className="text-sm font-bold text-green-400">R$ {debt.amount.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Debts List */}
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Suas Dívidas</h3>
                <div className="space-y-3">
                    {debts.length === 0 ? (
                        <div className="text-center py-12">
                            <CheckCircle size={64} className="mx-auto mb-4 text-green-500 opacity-20" />
                            <p className="text-gray-400">Nenhuma dívida cadastrada! 🎉</p>
                            <p className="text-sm text-gray-500 mt-2">Adicione suas dívidas para criar um plano de pagamento</p>
                        </div>
                    ) : (
                        debts.map(debt => (
                            <motion.div
                                key={debt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/5 border border-white/10 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-base font-bold text-white">{debt.name}</span>
                                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
                                                {debtCategories[debt.category].icon} {debtCategories[debt.category].name}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                            <div>
                                                <span className="text-gray-500">Valor:</span>
                                                <span className="text-red-400 font-bold ml-2">R$ {debt.amount.toFixed(2)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Juros:</span>
                                                <span className="text-yellow-400 font-bold ml-2">{debt.interestRate}% a.m.</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Mínimo:</span>
                                                <span className="text-white font-bold ml-2">R$ {debt.minimumPayment.toFixed(2)}</span>
                                            </div>
                                            {debt.dueDate && (
                                                <div>
                                                    <span className="text-gray-500">Vencimento:</span>
                                                    <span className="text-white font-bold ml-2">
                                                        {new Date(debt.dueDate).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteDebt(debt.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Debt Payoff Calculator */}
            <DebtPayoffCalculator />



            {/* Financial Hacks Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-primary mb-3">💡 Dicas de Ouro para Sair do Vermelho</h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">1.</span>
                            <span><strong>Negocie TUDO:</strong> Ligue para os credores no final do mês. As metas dos atendentes batem nessa época e eles liberam mais descontos.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">2.</span>
                            <span><strong>Troque a dívida:</strong> Se você paga 14% no cheque especial, pegue um empréstimo consignado a 2% para quitar. A diferença é brutal.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">3.</span>
                            <span><strong>Cancele serviços inúteis:</strong> Tarifas bancárias (mude para conta essencial gratuita), TV a cabo que não assiste, anuidade de cartão.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">4.</span>
                            <span><strong>Venda o passivo:</strong> Tem um carro que só dá gasto? Venda, quite as dívidas e ande de Uber/Transporte público até se reerguer.</span>
                        </li>
                    </ul>
                </div>

                <FinancialHacks />
            </div>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
