"use client";

import { useState } from "react";
import { Plus, Minus, Wallet, Info, Target, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
    id: string;
    title: string;
    amount: number;
    target: number;
    color: string;
    icon: React.ElementType;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
}

function Envelope({ id, title, amount, target, color, icon: Icon, onAdd, onRemove }: EnvelopeProps) {
    const progress = Math.min((amount / target) * 100, 100);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            className="card-premium p-6 space-y-4 group hover:border-primary/30 transition-all"
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 ${color}`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">{title}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Meta: R$ {target.toLocaleString()}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-white">
                        R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-xs font-bold ${progress >= 100 ? 'text-green-400' : 'text-primary'}`}>
                        {progress.toFixed(1)}% concluído
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_10px_rgba(167,139,250,0.3)]`}
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    onClick={() => onRemove(id)}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-white/5 hover:border-red-500/20 transition-all font-bold text-sm flex items-center justify-center gap-2 active:scale-95"
                >
                    <Minus size={16} /> Tirar
                </button>
                <button
                    onClick={() => onAdd(id)}
                    className="flex-1 py-3 rounded-xl bg-primary text-black hover:bg-primary/90 transition-all font-bold text-sm flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/10"
                >
                    <Plus size={16} /> Colocar
                </button>
            </div>
        </motion.div>
    );
}

export default function GoalsPage() {
    const [transactionAmount, setTransactionAmount] = useState<string>("100");
    const [amounts, setAmounts] = useState({
        moradia: 1200,
        investimentos: 500,
        lazer: 300,
        educacao: 200,
        reserva: 1000
    });

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

    const handleAdd = (id: string) => {
        const value = parseFloat(transactionAmount);
        if (!isNaN(value) && value > 0) {
            setAmounts(prev => ({
                ...prev,
                [id as keyof typeof amounts]: prev[id as keyof typeof amounts] + value
            }));
        }
    };

    const handleRemove = (id: string) => {
        const value = parseFloat(transactionAmount);
        if (!isNaN(value) && value > 0) {
            setAmounts(prev => ({
                ...prev,
                [id as keyof typeof amounts]: Math.max(0, prev[id as keyof typeof amounts] - value)
            }));
        }
    };

    const total = Object.values(amounts).reduce((acc, curr) => acc + curr, 0);

    const goals = [
        { id: "moradia", title: "Moradia & Contas", target: 3000, color: "text-blue-400", icon: Wallet },
        { id: "investimentos", title: "Investimentos", target: 5000, color: "text-green-400", icon: TrendingUp },
        { id: "reserva", title: "Reserva de Emergência", target: 10000, color: "text-yellow-400", icon: Target },
        { id: "educacao", title: "Educação & Cursos", target: 2000, color: "text-purple-400", icon: Sparkles },
        { id: "lazer", title: "Lazer & Viagens", target: 1500, color: "text-pink-400", icon: ChevronRight },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                <motion.header variants={itemVariants} className="text-center md:text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
                        <Target size={16} className="text-primary" />
                        <span className="text-sm font-medium text-primary">Gestão por Envelopes</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Organizador de <span className="gradient-text">Metas</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Distribua seu capital com intenção. Cada real tem um destino definido para o seu futuro.
                    </p>
                </motion.header>

                {/* Main Stats & Control */}
                <motion.div variants={itemVariants} className="card-premium p-8 bg-gradient-to-br from-[#0f0f13] to-[#1a1a2e]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-2">
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Acumulado nos Envelopes</p>
                            <div className="text-5xl font-black text-white">
                                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                            <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                                <TrendingUp size={16} />
                                +12% em relação ao mês anterior
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Valor da Transação</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-xl transition-colors group-focus-within:text-white">R$</span>
                                <input
                                    type="number"
                                    value={transactionAmount}
                                    onChange={(e) => setTransactionAmount(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-5 text-white font-bold text-2xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="0,00"
                                />
                            </div>
                            <p className="text-[10px] text-gray-500 text-center italic">
                                Ajuste o valor acima e clique em "Colocar" ou "Tirar" nos envelopes abaixo.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map((goal) => (
                        <Envelope
                            key={goal.id}
                            id={goal.id}
                            title={goal.title}
                            target={goal.target}
                            amount={amounts[goal.id as keyof typeof amounts]}
                            color={goal.color}
                            icon={goal.icon}
                            onAdd={handleAdd}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
