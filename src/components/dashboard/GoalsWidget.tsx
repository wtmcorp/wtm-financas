"use client";

import { useState } from "react";
import { Plus, Target, Trash2, TrendingUp, ChevronRight, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Goal {
    id: number;
    name: string;
    target: number;
    current: number;
    color: string;
}

export default function GoalsWidget() {
    const [goals, setGoals] = useState<Goal[]>([
        { id: 1, name: "Reserva de Emergência", target: 15000, current: 5000, color: "from-green-500 to-emerald-600" },
        { id: 2, name: "Viagem Europa", target: 20000, current: 2500, color: "from-blue-500 to-cyan-600" },
    ]);
    const [showAdd, setShowAdd] = useState(false);
    const [newGoal, setNewGoal] = useState({ name: "", target: "", current: "" });

    const addGoal = () => {
        if (!newGoal.name || !newGoal.target) return;
        setGoals([...goals, {
            id: Date.now(),
            name: newGoal.name,
            target: Number(newGoal.target),
            current: Number(newGoal.current) || 0,
            color: "from-primary to-purple-600"
        }]);
        setNewGoal({ name: "", target: "", current: "" });
        setShowAdd(false);
    };

    const deleteGoal = (id: number) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 h-full flex flex-col relative overflow-hidden group"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10">
                        <Target size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Metas Financeiras</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Planejamento Estratégico</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${showAdd ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/5 border-white/10 text-primary hover:bg-primary hover:text-black hover:border-primary'}`}
                >
                    {showAdd ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            <AnimatePresence>
                {showAdd && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="overflow-hidden relative z-10"
                    >
                        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome da Meta</label>
                                <input
                                    placeholder="Ex: Reserva de Emergência"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                                    value={newGoal.name}
                                    onChange={e => setNewGoal({ ...newGoal, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Alvo (R$)</label>
                                    <input
                                        type="number"
                                        placeholder="0,00"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                                        value={newGoal.target}
                                        onChange={e => setNewGoal({ ...newGoal, target: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Atual (R$)</label>
                                    <input
                                        type="number"
                                        placeholder="0,00"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                                        value={newGoal.current}
                                        onChange={e => setNewGoal({ ...newGoal, current: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={addGoal}
                                className="w-full py-4 bg-primary text-black font-black text-[10px] rounded-xl uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
                            >
                                <Sparkles size={14} />
                                Criar Nova Meta
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-6 flex-1 relative z-10">
                <AnimatePresence mode="popLayout">
                    {goals.map((goal) => {
                        const progress = Math.min(100, (goal.current / goal.target) * 100);
                        return (
                            <motion.div
                                layout
                                key={goal.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group/item"
                            >
                                <div className="flex justify-between items-end mb-3">
                                    <div className="space-y-1">
                                        <h4 className="font-black text-white text-sm uppercase tracking-tight group-hover/item:text-primary transition-colors">{goal.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-gray-500">
                                                R$ {goal.current.toLocaleString()}
                                            </span>
                                            <ChevronRight size={10} className="text-gray-700" />
                                            <span className="text-[10px] font-bold text-gray-400">
                                                R$ {goal.target.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <span className="text-xs font-black text-primary block">{progress.toFixed(0)}%</span>
                                        </div>
                                        <button
                                            onClick={() => deleteGoal(goal.id)}
                                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-600 hover:bg-red-500/10 hover:text-red-400 transition-all opacity-0 group-hover/item:opacity-100"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                                        className={`h-full rounded-full bg-gradient-to-r ${goal.color} shadow-[0_0_10px_rgba(167,139,250,0.3)]`}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {goals.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-700 border border-white/10">
                            <Target size={32} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500">Nenhuma meta definida</p>
                            <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">Comece a planejar seu futuro hoje</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">No Caminho</span>
                </div>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors">
                    Ver Todas as Metas
                </button>
            </div>
        </motion.div>
    );
}
