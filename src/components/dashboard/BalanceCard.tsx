"use client";

import { Card } from "@/components/ui/Card";
import { Eye, EyeOff, Edit2, Check, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function BalanceCard() {
    const [visible, setVisible] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [balance, setBalance] = useState(0);
    const [tempBalance, setTempBalance] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        // Load balance from localStorage or default to calculation based on income
        const savedBalance = localStorage.getItem("wtm_balance");
        if (savedBalance) {
            setBalance(parseFloat(savedBalance));
        } else if (user?.income) {
            setBalance(user.income * 1.5); // Initial estimate
        }
    }, [user]);

    const handleEdit = () => {
        setTempBalance(balance.toString());
        setIsEditing(true);
    };

    const handleSave = () => {
        const newBalance = parseFloat(tempBalance);
        if (!isNaN(newBalance) && newBalance >= 0) {
            setBalance(newBalance);
            localStorage.setItem("wtm_balance", newBalance.toString());
            setIsEditing(false);
        }
    };

    const revenues = user?.income || 0;
    const expenses = revenues * 0.4; // Estimate

    return (
        <div className="card-premium p-8">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <Wallet className="text-primary" size={20} />
                    </div>
                    <div>
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Saldo Geral</span>
                        <div className="flex items-center gap-2">
                            {!isEditing ? (
                                <button onClick={handleEdit} className="text-gray-500 hover:text-primary transition-colors">
                                    <Edit2 size={12} />
                                </button>
                            ) : (
                                <button onClick={handleSave} className="text-green-500 hover:text-green-400 transition-colors">
                                    <Check size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setVisible(!visible)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors">
                    {visible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
                <span className="text-primary text-3xl font-black tracking-tighter">R$</span>
                {isEditing ? (
                    <input
                        type="number"
                        value={tempBalance}
                        onChange={(e) => setTempBalance(e.target.value)}
                        className="bg-black/50 border border-primary/50 rounded-2xl p-2 text-white text-4xl font-black outline-none focus:border-primary w-full max-w-[240px]"
                        autoFocus
                    />
                ) : (
                    <span className="text-6xl font-black text-white tracking-tighter reveal">
                        {visible ? balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "••••••"}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div className="space-y-1">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Receitas</span>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-white font-bold">R$ {revenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Despesas</span>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        <span className="text-white font-bold">R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
