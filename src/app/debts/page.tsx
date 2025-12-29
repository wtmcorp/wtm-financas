"use client";

import { AlertTriangle, Plus, Trash2, CheckCircle, TrendingDown, Info, ShieldAlert, Target, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DebtPayoffCalculator from "@/components/tools/DebtPayoffCalculator";
import FinancialHacks from "@/components/finance/FinancialHacks";
import { Tooltip } from "@/components/ui/Tooltip";

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
    credit_card: { name: "Cartão de Crédito", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: "💳" },
    overdraft: { name: "Cheque Especial", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "🏦" },
    loan: { name: "Empréstimo", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: "💰" },
    financing: { name: "Financiamento", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "🏠" },
    other: { name: "Outros", color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/20", icon: "📋" },
};

export default function DebtsPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [minimumPayment, setMinimumPayment] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState<keyof typeof debtCategories>("credit_card");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, cubicBezier: [0.23, 1, 0.32, 1] } }
    };

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

    const sortedByRate = [...debts].sort((a, b) => b.interestRate - a.interestRate);
    const sortedByAmount = [...debts].sort((a, b) => a.amount - b.amount);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <motion.header variants={itemVariants} className="space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                        <ShieldAlert size={16} className="text-red-500" />
                        <span className="text-sm font-medium text-red-400">Sala de Guerra</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Gestão de <span className="gradient-text text-red-400">Dívidas</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Não ignore o problema. Ataque-o. Organize, priorize e elimine suas dívidas com estratégia militar.
                    </p>
                </motion.header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants} className="card-premium p-6 border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><AlertTriangle size={20} /></div>
                            <span className="text-sm font-bold text-red-200 uppercase tracking-wider">Dívida Total</span>
                        </div>
                        <div className="text-4xl font-black text-white">R$ {totalDebt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-premium p-6 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Target size={20} /></div>
                            <span className="text-sm font-bold text-yellow-200 uppercase tracking-wider">Mínimo Mensal</span>
                        </div>
                        <div className="text-4xl font-black text-white">R$ {totalMinimum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-premium p-6 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Info size={20} /></div>
                            <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">Qtd. Dívidas</span>
                        </div>
                        <div className="text-4xl font-black text-white">{debts.length}</div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Add Debt Form */}
                    <motion.div variants={itemVariants} className="card-premium p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Plus className="text-primary" /> Nova Dívida
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome (ex: Cartão Nubank)" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all" />
                                <select value={category} onChange={(e) => setCategory(e.target.value as keyof typeof debtCategories)} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all appearance-none">
                                    {Object.entries(debtCategories).map(([key, cat]) => (
                                        <option key={key} value={key}>{cat.icon} {cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor Total (R$)" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all" />
                                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="Juros (% a.m.)" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all" />
                                <input type="number" value={minimumPayment} onChange={(e) => setMinimumPayment(e.target.value)} placeholder="Mínimo (R$)" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all" />
                            </div>
                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all" />

                            <button onClick={addDebt} className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                                Adicionar ao Plano de Ataque
                            </button>
                        </div>
                    </motion.div>

                    {/* Strategy Panel */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {debts.length > 0 ? (
                            <>
                                <div className="card-premium p-6 border-red-500/20">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <TrendingDown className="text-red-500" /> Prioridade: Avalanche (Matemático)
                                    </h3>
                                    <p className="text-xs text-gray-400 mb-4">Foque nestas dívidas primeiro para pagar menos juros.</p>
                                    <div className="space-y-2">
                                        {sortedByRate.slice(0, 3).map((debt, index) => (
                                            <div key={debt.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                                                    <span className="text-white font-medium">{debt.name}</span>
                                                </div>
                                                <span className="text-red-400 font-bold">{debt.interestRate}% a.m.</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card-premium p-6 border-green-500/20">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <CheckCircle className="text-green-500" /> Prioridade: Bola de Neve (Psicológico)
                                    </h3>
                                    <p className="text-xs text-gray-400 mb-4">Quite estas primeiro para ganhar confiança rápido.</p>
                                    <div className="space-y-2">
                                        {sortedByAmount.slice(0, 3).map((debt, index) => (
                                            <div key={debt.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                                                    <span className="text-white font-medium">{debt.name}</span>
                                                </div>
                                                <span className="text-green-400 font-bold">R$ {debt.amount.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full card-premium flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Zona Livre de Dívidas</h3>
                                <p className="text-gray-400">Você está limpo! Use a aba de Investimentos para multiplicar seu patrimônio.</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Debts List */}
                {debts.length > 0 && (
                    <motion.div variants={itemVariants} className="card-premium p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Inventário de Dívidas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence mode="popLayout">
                                {debts.map(debt => (
                                    <motion.div
                                        key={debt.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`relative p-6 rounded-2xl border ${debtCategories[debt.category].bg} ${debtCategories[debt.category].border}`}
                                    >
                                        <button
                                            onClick={() => deleteDebt(debt.id)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">{debtCategories[debt.category].icon}</span>
                                            <div>
                                                <h4 className="font-bold text-white">{debt.name}</h4>
                                                <span className={`text-xs font-bold uppercase tracking-wider ${debtCategories[debt.category].color}`}>
                                                    {debtCategories[debt.category].name}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs text-gray-400 uppercase">Valor</span>
                                                <span className="text-xl font-black text-white">R$ {debt.amount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs text-gray-400 uppercase">Juros</span>
                                                <span className="text-sm font-bold text-red-400">{debt.interestRate}% a.m.</span>
                                            </div>
                                            {debt.dueDate && (
                                                <div className="pt-3 mt-3 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400">
                                                    <AlertTriangle size={12} />
                                                    Vence em: {new Date(debt.dueDate).toLocaleDateString('pt-BR')}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                <motion.div variants={itemVariants}>
                    <DebtPayoffCalculator />
                </motion.div>
            </div>
        </motion.div>
    );
}
