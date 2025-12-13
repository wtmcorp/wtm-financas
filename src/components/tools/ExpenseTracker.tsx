"use client";

import { Plus, Trash2, TrendingDown, TrendingUp, Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Transaction {
    id: number;
    description: string;
    amount: number;
    category: string;
    type: "income" | "expense";
    date: string;
}

const categories = [
    { name: "Salário", type: "income", color: "bg-green-500", icon: "💰" },
    { name: "Extra", type: "income", color: "bg-emerald-500", icon: "💎" },
    { name: "Alimentação", type: "expense", color: "bg-orange-500", icon: "🍔" },
    { name: "Transporte", type: "expense", color: "bg-blue-500", icon: "🚗" },
    { name: "Moradia", type: "expense", color: "bg-purple-500", icon: "🏠" },
    { name: "Lazer", type: "expense", color: "bg-pink-500", icon: "🎮" },
    { name: "Saúde", type: "expense", color: "bg-red-500", icon: "💊" },
    { name: "Educação", type: "expense", color: "bg-yellow-500", icon: "📚" },
    { name: "Outros", type: "expense", color: "bg-gray-500", icon: "📦" },
];

export default function ExpenseTracker() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"income" | "expense">("expense");
    const [category, setCategory] = useState("Alimentação");

    useEffect(() => {
        const saved = localStorage.getItem("wtm_transactions");
        if (saved) {
            setTransactions(JSON.parse(saved));
        }
    }, []);

    const addTransaction = () => {
        if (!description || !amount) return;

        const newTransaction: Transaction = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            category,
            type,
            date: new Date().toISOString().split('T')[0]
        };

        const updated = [newTransaction, ...transactions];
        setTransactions(updated);
        localStorage.setItem("wtm_transactions", JSON.stringify(updated));

        setDescription("");
        setAmount("");
    };

    const deleteTransaction = (id: number) => {
        const updated = transactions.filter(t => t.id !== id);
        setTransactions(updated);
        localStorage.setItem("wtm_transactions", JSON.stringify(updated));
    };

    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    const filteredCategories = categories.filter(c => c.type === type || (type === "expense" && c.type === "expense") || (type === "income" && c.type === "income"));

    // Ensure category matches type when switching
    useEffect(() => {
        const firstValidCategory = categories.find(c => c.type === type);
        if (firstValidCategory) {
            setCategory(firstValidCategory.name);
        }
    }, [type]);

    return (
        <div className="space-y-6">
            {/* Resumo do Fluxo */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                        <ArrowUpCircle size={16} />
                        <span className="text-xs font-medium">Entradas</span>
                    </div>
                    <span className="text-lg font-bold text-white">R$ {totalIncome.toFixed(2)}</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-red-400 mb-1">
                        <ArrowDownCircle size={16} />
                        <span className="text-xs font-medium">Saídas</span>
                    </div>
                    <span className="text-lg font-bold text-white">R$ {totalExpenses.toFixed(2)}</span>
                </div>
                <div className={`border rounded-xl p-4 flex flex-col items-center justify-center text-center ${balance >= 0 ? 'bg-blue-500/10 border-blue-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
                    <div className={`flex items-center gap-2 mb-1 ${balance >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                        <Wallet size={16} />
                        <span className="text-xs font-medium">Saldo</span>
                    </div>
                    <span className={`text-lg font-bold ${balance >= 0 ? 'text-white' : 'text-orange-200'}`}>R$ {balance.toFixed(2)}</span>
                </div>
            </div>

            {/* Adicionar Transação */}
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Novo Lançamento</h3>

                {/* Tipo de Transação Toggle */}
                <div className="flex bg-black/50 p-1 rounded-lg mb-4">
                    <button
                        onClick={() => setType("income")}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${type === "income" ? "bg-green-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                    >
                        <ArrowUpCircle size={16} />
                        Entrada
                    </button>
                    <button
                        onClick={() => setType("expense")}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${type === "expense" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                    >
                        <ArrowDownCircle size={16} />
                        Saída
                    </button>
                </div>

                <div className="space-y-3">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição (ex: Salário, Aluguel)"
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Valor (R$)"
                            className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        >
                            {filteredCategories.map(cat => (
                                <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={addTransaction}
                        className={`w-full font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${type === 'income' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        <Plus size={18} />
                        {type === 'income' ? 'Adicionar Entrada' : 'Adicionar Saída'}
                    </button>
                </div>
            </div>

            {/* Histórico */}
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Histórico</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {transactions.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-8">Nenhum lançamento ainda</p>
                    ) : (
                        transactions.map(t => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-white">{t.description}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${t.type === 'income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {categories.find(c => c.name === t.category)?.icon} {t.category}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                                        {t.type === 'income' ? '+' : '-'}R$ {t.amount.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => deleteTransaction(t.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
