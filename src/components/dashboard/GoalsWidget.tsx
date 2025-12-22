"use client";

import { useState } from "react";
import { Plus, Target, Trash2 } from "lucide-react";

interface Goal {
    id: number;
    name: string;
    target: number;
    current: number;
    color: string;
}

export default function GoalsWidget() {
    const [goals, setGoals] = useState<Goal[]>([
        { id: 1, name: "Reserva de Emergência", target: 15000, current: 5000, color: "bg-green-500" },
        { id: 2, name: "Viagem Europa", target: 20000, current: 2500, color: "bg-blue-500" },
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
            color: "bg-primary"
        }]);
        setNewGoal({ name: "", target: "", current: "" });
        setShowAdd(false);
    };

    const deleteGoal = (id: number) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    return (
        <div className="bg-card border border-white/10 rounded-[2rem] p-6 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="text-primary" size={24} />
                    Metas Financeiras
                </h3>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-primary"
                >
                    <Plus size={20} />
                </button>
            </div>

            {showAdd && (
                <div className="mb-6 p-4 bg-white/5 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                    <input
                        placeholder="Nome da meta (ex: Carro Novo)"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary/50 outline-none"
                        value={newGoal.name}
                        onChange={e => setNewGoal({ ...newGoal, name: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Alvo (R$)"
                            className="w-1/2 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary/50 outline-none"
                            value={newGoal.target}
                            onChange={e => setNewGoal({ ...newGoal, target: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Atual (R$)"
                            className="w-1/2 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary/50 outline-none"
                            value={newGoal.current}
                            onChange={e => setNewGoal({ ...newGoal, current: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={addGoal}
                        className="w-full py-2 bg-primary text-black font-bold text-xs rounded-lg uppercase tracking-wider hover:bg-primary/90 transition-colors"
                    >
                        Adicionar Meta
                    </button>
                </div>
            )}

            <div className="space-y-5">
                {goals.map((goal) => {
                    const progress = Math.min(100, (goal.current / goal.target) * 100);
                    return (
                        <div key={goal.id} className="group">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h4 className="font-bold text-white text-sm">{goal.name}</h4>
                                    <p className="text-xs text-gray-400">
                                        R$ {goal.current.toLocaleString()} de R$ {goal.target.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-primary">{progress.toFixed(0)}%</span>
                                    <button
                                        onClick={() => deleteGoal(goal.id)}
                                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${goal.color} transition-all duration-1000 ease-out`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
                {goals.length === 0 && (
                    <p className="text-center text-gray-500 text-sm py-4">Nenhuma meta definida. Adicione uma!</p>
                )}
            </div>
        </div>
    );
}
