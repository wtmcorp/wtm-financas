"use client";

import { AlertTriangle, Plus, Trash2, CheckCircle, TrendingDown, Info, ShieldAlert, Target, ArrowUpRight, Sparkles, Calendar, DollarSign, ShieldX } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DebtPayoffCalculator from "@/components/tools/DebtPayoffCalculator";
import FinancialHacks from "@/components/finance/FinancialHacks";
import { Tooltip } from "@/components/ui/Tooltip";

import { useRouter } from "next/navigation";

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
    const router = useRouter();
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
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden p-10 md:p-20 rounded-[3.5rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                >
                    <div className="absolute top-0 right-0 hidden md:block opacity-5 -mr-20 -mt-20">
                        <ShieldX size={400} className="text-red-500 rotate-12" />
                    </div>

                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
                            <ShieldAlert size={18} className="text-red-500 animate-pulse" />
                            <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em]">War Room: Debt Elimination</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85]">
                            Plano de <br />
                            <span className="gradient-text text-red-500">Ataque</span>
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium">
                            Não ignore o problema. Ataque-o. Organize, priorize e elimine suas dívidas com estratégia militar e precisão matemática.
                        </p>
                    </div>
                </motion.header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Dívida Total", value: totalDebt, icon: AlertTriangle, color: "red", desc: "Total liability exposure" },
                        { label: "Mínimo Mensal", value: totalMinimum, icon: Target, color: "yellow", desc: "Required monthly outflow" },
                        { label: "Qtd. Dívidas", value: debts.length, icon: Info, color: "blue", desc: "Active debt contracts", isCount: true }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={`card-premium p-8 border-${stat.color}-500/20 bg-gradient-to-br from-${stat.color}-500/5 to-transparent group hover:border-${stat.color}-500/40 transition-all`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-4 bg-${stat.color}-500/10 rounded-2xl text-${stat.color}-400 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-right">
                                    <p className={`text-[10px] font-black text-${stat.color}-400 uppercase tracking-[0.2em]`}>{stat.label}</p>
                                    <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-1">{stat.desc}</p>
                                </div>
                            </div>
                            <div className="text-5xl font-black text-white tracking-tighter">
                                {stat.isCount ? stat.value : `R$ ${stat.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Add Debt Form */}
                    <motion.div variants={itemVariants} className="card-premium p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Plus size={150} />
                        </div>

                        <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <Plus className="text-primary" size={24} />
                            </div>
                            Nova Dívida
                        </h3>

                        <div className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Identificação</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Cartão Nubank" className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary/50 transition-all backdrop-blur-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Categoria</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value as keyof typeof debtCategories)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary/50 transition-all appearance-none backdrop-blur-xl">
                                        {Object.entries(debtCategories).map(([key, cat]) => (
                                            <option key={key} value={key} className="bg-[#0f0f13]">{cat.icon} {cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Valor Total</label>
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="R$ 0,00" className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary/50 transition-all backdrop-blur-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Juros (% a.m.)</label>
                                    <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="0.00%" className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary/50 transition-all backdrop-blur-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Mínimo</label>
                                    <input type="number" value={minimumPayment} onChange={(e) => setMinimumPayment(e.target.value)} placeholder="R$ 0,00" className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary/50 transition-all backdrop-blur-xl" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Data de Vencimento</label>
                                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary/50 transition-all backdrop-blur-xl" />
                            </div>

                            <button onClick={addDebt} className="w-full py-5 bg-primary text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all active:scale-95 shadow-xl shadow-primary/10 flex items-center justify-center gap-3">
                                <Target size={16} /> Adicionar ao Plano de Ataque
                            </button>
                        </div>
                    </motion.div>

                    {/* Strategy Panel */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        {debts.length > 0 ? (
                            <>
                                <div className="card-premium p-8 border-red-500/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <TrendingDown size={100} />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                                            <TrendingDown size={20} />
                                        </div>
                                        Avalanche (Matemático)
                                    </h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 relative z-10">Prioridade por taxa de juros (Economia Máxima)</p>
                                    <div className="space-y-3 relative z-10">
                                        {sortedByRate.slice(0, 3).map((debt, index) => (
                                            <div key={debt.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group/item">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-black border border-red-500/20">{index + 1}</span>
                                                    <div>
                                                        <span className="text-sm font-black text-white block uppercase tracking-tight">{debt.name}</span>
                                                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Target Priority</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-black text-red-400 block">{debt.interestRate}% a.m.</span>
                                                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Interest Rate</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card-premium p-8 border-green-500/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <CheckCircle size={100} />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                                            <CheckCircle size={20} />
                                        </div>
                                        Bola de Neve (Psicológico)
                                    </h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 relative z-10">Prioridade por menor valor (Vitórias Rápidas)</p>
                                    <div className="space-y-3 relative z-10">
                                        {sortedByAmount.slice(0, 3).map((debt, index) => (
                                            <div key={debt.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group/item">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center text-xs font-black border border-green-500/20">{index + 1}</span>
                                                    <div>
                                                        <span className="text-sm font-black text-white block uppercase tracking-tight">{debt.name}</span>
                                                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Quick Win</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-black text-green-400 block">R$ {debt.amount.toLocaleString()}</span>
                                                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Total Amount</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full card-premium flex flex-col items-center justify-center p-12 text-center space-y-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-24 h-24 bg-green-500/10 rounded-[2rem] flex items-center justify-center text-green-500 border border-green-500/20 shadow-2xl shadow-green-500/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <CheckCircle size={48} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Zona de Liberdade</h3>
                                    <p className="text-gray-500 font-medium mt-2 max-w-xs mx-auto">Você está livre de dívidas! Seu capital agora está pronto para ser multiplicado.</p>
                                </div>
                                <button
                                    onClick={() => router.push('/invest')}
                                    className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all flex items-center gap-3"
                                >
                                    Ir para Investimentos <ArrowUpRight size={14} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Debts List */}
                {debts.length > 0 && (
                    <motion.div variants={itemVariants} className="card-premium p-10">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-black text-white tracking-tight uppercase">Inventário de Passivos</h3>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total:</span>
                                <span className="text-sm font-black text-white">{debts.length} Itens</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {debts.map(debt => (
                                    <motion.div
                                        key={debt.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 group/card ${debtCategories[debt.category].bg} ${debtCategories[debt.category].border} hover:shadow-2xl`}
                                    >
                                        <button
                                            onClick={() => deleteDebt(debt.id)}
                                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover/card:opacity-100"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="text-4xl w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/card:scale-110 transition-transform">
                                                {debtCategories[debt.category].icon}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white text-lg uppercase tracking-tight">{debt.name}</h4>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${debtCategories[debt.category].color}`}>
                                                    {debtCategories[debt.category].name}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end p-4 bg-black/20 rounded-2xl border border-white/5">
                                                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Exposure</span>
                                                <span className="text-2xl font-black text-white tracking-tighter">R$ {debt.amount.toLocaleString()}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                                                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mb-1">Interest</span>
                                                    <span className="text-sm font-black text-red-400">{debt.interestRate}% a.m.</span>
                                                </div>
                                                <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                                                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mb-1">Minimum</span>
                                                    <span className="text-sm font-black text-white">R$ {debt.minimumPayment.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            {debt.dueDate && (
                                                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={12} className="text-primary" />
                                                        Vencimento
                                                    </div>
                                                    <span className="text-white">{new Date(debt.dueDate).toLocaleDateString('pt-BR')}</span>
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
