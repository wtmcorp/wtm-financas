"use client";

import { Card } from "@/components/ui/Card";
import { Eye, EyeOff, Edit2, Check } from "lucide-react";
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
        <Card className="bg-gradient-to-br from-card to-black border-primary/20">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Saldo Geral</span>
                    {!isEditing ? (
                        <button onClick={handleEdit} className="text-primary hover:text-primary/80 transition-colors">
                            <Edit2 size={14} />
                        </button>
                    ) : (
                        <button onClick={handleSave} className="text-green-500 hover:text-green-400 transition-colors">
                            <Check size={14} />
                        </button>
                    )}
                </div>
                <button onClick={() => setVisible(!visible)} className="text-primary">
                    {visible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
            </div>

            <div className="flex items-baseline gap-1">
                <span className="text-primary text-2xl font-bold">R$</span>
                {isEditing ? (
                    <input
                        type="number"
                        value={tempBalance}
                        onChange={(e) => setTempBalance(e.target.value)}
                        className="bg-black/50 border border-primary/50 rounded-lg p-1 text-white text-2xl font-bold outline-none focus:border-primary w-48"
                        autoFocus
                    />
                ) : (
                    <span className="text-4xl font-bold text-white tracking-tight">
                        {visible ? balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "••••••"}
                    </span>
                )}
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-xs">Renda Mensal</span>
                    <span className="text-white font-medium">
                        R$ {revenues.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex gap-4 text-sm">
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Receitas (Mês)</span>
                    <span className="text-green-500 font-medium">+ R$ {revenues.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Despesas (Mês)</span>
                    <span className="text-red-500 font-medium">- R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
        </Card>
    );
}
