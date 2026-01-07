"use client";

import { useState } from "react";
import { Plus, Minus, Wallet, Info, Target, TrendingUp, Sparkles, ChevronRight, ArrowUpRight, Trash2, Calendar, DollarSign } from "lucide-react";
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
            layout
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            className="glass-panel p-8 space-y-6 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${color}`}>
                        <Icon size={28} />
                    </div>
                    <div>
                        <h3 className="font-black text-white text-xl tracking-tight uppercase">{title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Target size={12} className="text-gray-600" />
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Meta: R$ {target.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-white tracking-tighter">
                        R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${progress >= 100 ? 'text-green-400' : 'text-primary'}`}>
                        {progress.toFixed(1)}% Concluído
                    </div>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                        className={`h-full bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-[0_0_15px_rgba(167,139,250,0.3)]`}
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-4 relative z-10">
                <button
                    onClick={() => onRemove(id)}
                    className="flex-1 py-4 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 border border-white/5 hover:border-red-500/20 transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95"
                >
                    <Minus size={16} /> Retirar
                </button>
                <button
                    onClick={() => onAdd(id)}
                    className="flex-1 py-4 rounded-xl bg-primary text-black hover:bg-white transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-primary/10"
                >
                    <Plus size={16} /> Alocar
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
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Header Section */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden p-10 md:p-20 rounded-[3.5rem] bg-gradient-to-br from-card via-background to-card border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                >
                    <div className="absolute top-0 right-0 hidden md:block opacity-5 -mr-20 -mt-20">
                        <Target size={400} className="text-primary rotate-12" />
                    </div>

                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <Sparkles size={18} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Strategic Capital Allocation</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85]">
                            Gestão por <br />
                            <span className="gradient-text">Envelopes</span>
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium">
                            Distribua seu capital com intenção. Cada real tem um destino definido para a construção da sua liberdade financeira.
                        </p>
                    </div>
                </motion.header>

                {/* Control Panel */}
                <motion.div
                    variants={itemVariants}
                    className="glass-panel p-10 bg-gradient-to-br from-card to-background relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Target size={150} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="space-y-4">
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">Total Acumulado nos Envelopes</p>
                            <div className="text-6xl md:text-7xl font-black text-white tracking-tighter">
                                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                            <div className="flex items-center gap-3 text-green-400 text-sm font-black uppercase tracking-widest">
                                <TrendingUp size={18} />
                                +12% vs last month
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">Valor da Transação</label>
                                <div className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={12} /> Instant Allocation
                                </div>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black text-3xl group-focus-within:text-white transition-colors">R$</span>
                                <input
                                    type="number"
                                    value={transactionAmount}
                                    onChange={(e) => setTransactionAmount(e.target.value)}
                                    className="w-full bg-card/40 border border-white/10 rounded-[2rem] pl-20 pr-8 py-8 text-white font-black text-4xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-xl"
                                    placeholder="0,00"
                                />
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <Info size={16} className="text-primary shrink-0" />
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                    Ajuste o valor acima e utilize os botões nos envelopes para distribuir seu capital.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Envelopes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                {/* Footer Stats */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { label: "Envelopes Ativos", value: goals.length, icon: Wallet },
                        { label: "Meta Total", value: `R$ ${goals.reduce((acc, g) => acc + g.target, 0).toLocaleString()}`, icon: Target },
                        { label: "Próxima Revisão", value: "Em 12 dias", icon: Calendar }
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel p-8 flex items-center gap-6 group hover:border-primary/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:scale-110 transition-transform">
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
