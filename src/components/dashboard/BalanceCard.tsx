"use client";

import { Card } from "@/components/ui/Card";
import { Eye, EyeOff, Edit2, Check, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Sparkles, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function BalanceCard() {
    const [visible, setVisible] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [balance, setBalance] = useState(0);
    const [tempBalance, setTempBalance] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        // Load balance from localStorage
        const savedBalance = localStorage.getItem("wtm_balance");
        if (savedBalance) {
            setBalance(parseFloat(savedBalance));
        } else {
            setBalance(0);
        }
    }, []);

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
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-10 relative overflow-hidden group"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] -ml-24 -mb-24 group-hover:bg-blue-500/10 transition-all duration-1000" />

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Wallet className="text-primary" size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Seu Patrimônio</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Liquidez Total</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setVisible(!visible)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        {visible ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
                        >
                            <Edit2 size={20} />
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>
                            <button
                                onClick={handleSave}
                                className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition-all"
                            >
                                <Check size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10 mb-12">
                <div className="flex items-baseline gap-3">
                    <span className="text-primary text-4xl font-black tracking-tighter">R$</span>
                    <AnimatePresence mode="wait">
                        {isEditing ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="w-full max-w-[400px]"
                            >
                                <input
                                    type="number"
                                    value={tempBalance}
                                    onChange={(e) => setTempBalance(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                    className="bg-black/60 border-2 border-primary/50 rounded-[2rem] px-6 py-4 md:px-8 md:py-6 text-white text-3xl md:text-6xl font-black outline-none focus:border-primary w-full shadow-2xl backdrop-blur-xl"
                                    autoFocus
                                />
                            </motion.div>
                        ) : (
                            <motion.span
                                key={visible ? "visible" : "hidden"}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={handleEdit}
                                className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-none cursor-pointer hover:text-primary transition-colors"
                            >
                                {visible ? balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "••••••"}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                <div className="flex items-center gap-2 mt-4 text-green-400 text-sm font-black uppercase tracking-widest">
                    <TrendingUp size={16} />
                    +0.0% <span className="text-gray-600 ml-1">vs mês anterior</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5 relative z-10">
                <div className="space-y-3 group/item">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Entradas</span>
                        <ArrowUpRight size={14} className="text-green-500 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-transform" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-2xl font-black text-white tracking-tight">
                            R$ {revenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
                <div className="space-y-3 group/item">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Saídas</span>
                        <ArrowDownRight size={14} className="text-red-500 group-hover/item:translate-x-1 group-hover/item:translate-y-1 transition-transform" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        <span className="text-2xl font-black text-white tracking-tight">
                            R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={120} className="text-primary animate-pulse" />
            </div>
        </motion.div>
    );
}
