"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, onSnapshot, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import {
    TrendingUp,
    User,
    Heart,
    Check,
    Sparkles,
    Trophy,
    Cloud,
    AlertCircle,
    Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface ChallengeData {
    checkedSlots1: number[];
    checkedSlots2: number[];
    history: { date: string; amount: number; person: 1 | 2; slotIndex: number }[];
}

export default function Challenge100k() {
    const { user } = useAuth();
    const [data, setData] = useState<ChallengeData>({ checkedSlots1: [], checkedSlots2: [], history: [] });
    const [loading, setLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
    const [activeTab, setActiveTab] = useState<1 | 2>(1);

    const SLOTS_COUNT = 200;
    const STEP = 2.5;
    const TOTAL_PER_PERSON = (SLOTS_COUNT * (SLOTS_COUNT + 1) / 2) * STEP; // 50,250
    const DOC_ID = "sofia-walter-100k-v5";

    const milestones = [
        { label: "Início", range: [0, 39] },
        { label: "Evolução", range: [40, 79] },
        { label: "Consistência", range: [80, 119] },
        { label: "Foco", range: [120, 159] },
        { label: "Reta Final", range: [160, 199] },
    ];

    useEffect(() => {
        const docRef = doc(db, "challenges", DOC_ID);

        const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const fetchedData = docSnap.data() as ChallengeData;
                setData({
                    checkedSlots1: Array.isArray(fetchedData.checkedSlots1) ? fetchedData.checkedSlots1 : [],
                    checkedSlots2: Array.isArray(fetchedData.checkedSlots2) ? fetchedData.checkedSlots2 : [],
                    history: Array.isArray(fetchedData.history) ? fetchedData.history : []
                });
                setSyncStatus('synced');
            } else {
                // Se não existe, tenta criar o inicial
                setDoc(docRef, { checkedSlots1: [], checkedSlots2: [], history: [] }, { merge: true });
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore Error:", err);
            setSyncStatus('error');
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const toggleSlot = async (person: 1 | 2, index: number) => {
        // Se não houver usuário, nem tenta salvar
        if (!user) {
            alert("Sessão expirada ou não identificado. Por favor, faça login novamente.");
            return;
        }

        setSyncStatus('syncing');
        const docRef = doc(db, "challenges", DOC_ID);
        const amount = (index + 1) * STEP;
        const isChecked = person === 1
            ? data.checkedSlots1.includes(index)
            : data.checkedSlots2.includes(index);

        try {
            const updateData: any = {
                [person === 1 ? 'checkedSlots1' : 'checkedSlots2']: isChecked ? arrayRemove(index) : arrayUnion(index)
            };

            if (!isChecked) {
                updateData.history = arrayUnion({
                    date: new Date().toISOString(),
                    amount,
                    person,
                    slotIndex: index
                });
            }

            // setDoc com merge: true é mais robusto que updateDoc
            await setDoc(docRef, updateData, { merge: true });
            setSyncStatus('synced');
        } catch (err: any) {
            console.error("Save Error:", err);
            setSyncStatus('error');

            // Mensagem mais detalhada para ajudar no diagnóstico
            if (err.code === 'permission-denied') {
                alert("Erro de Permissão: Você está logado, mas o banco de dados não autorizou a gravação. Verifique as regras do Firebase.");
            } else {
                alert("Erro ao salvar: " + (err.message || "Verifique sua conexão."));
            }
        }
    };

    const calculateSaved = (slots: number[]) => (slots || []).reduce((sum, idx) => sum + (idx + 1) * STEP, 0);
    const saved1 = calculateSaved(data.checkedSlots1);
    const saved2 = calculateSaved(data.checkedSlots2);
    const totalSaved = saved1 + saved2;
    const progressTotal = (totalSaved / (TOTAL_PER_PERSON * 2)) * 100;

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center space-y-6">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Acessando Cofre...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 md:p-12 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Trophy size={200} className="text-primary rotate-12" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${syncStatus === 'synced' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                    syncStatus === 'syncing' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                        'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                {syncStatus === 'synced' ? <CloudCheck size={12} /> :
                                    syncStatus === 'syncing' ? <Cloud size={12} className="animate-bounce" /> :
                                        <AlertCircle size={12} />}
                                <span className="text-[9px] font-black uppercase tracking-widest">
                                    {syncStatus === 'synced' ? 'Sincronizado' :
                                        syncStatus === 'syncing' ? 'Salvando...' : 'Erro de Acesso'}
                                </span>
                            </div>
                            {!user && (
                                <div className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[9px] font-black uppercase tracking-widest animate-pulse">
                                    Sessão Offline - Faça Login
                                </div>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                            R$ {totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </h1>
                        <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Patrimônio do Casal</p>

                        <div className="flex gap-6 pt-4">
                            <div className="flex items-center gap-3">
                                <User className="text-primary" size={20} />
                                <div>
                                    <p className="text-[10px] text-gray-500 font-black uppercase">Walter</p>
                                    <p className="text-lg font-black text-white">R$ {saved1.toLocaleString('pt-BR')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Heart className="text-pink-500" size={20} />
                                <div>
                                    <p className="text-[10px] text-gray-500 font-black uppercase">Sofia</p>
                                    <p className="text-lg font-black text-white">R$ {saved2.toLocaleString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-40 h-40 md:w-48 md:h-48">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle className="text-white/5" strokeWidth="8" stroke="currentColor" fill="none" r="42" cx="50" cy="50" />
                            <motion.circle
                                initial={{ strokeDasharray: "0, 263.8" }}
                                animate={{ strokeDasharray: `${(progressTotal * 263.8) / 100}, 263.8` }}
                                transition={{ duration: 1.5 }}
                                className="text-primary"
                                strokeWidth="8"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                r="42" cx="50" cy="50"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-white">{progressTotal.toFixed(0)}%</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Selector */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setActiveTab(1)}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 1 ? 'bg-primary text-black' : 'bg-white/5 text-gray-500'
                        }`}
                >
                    Walter
                </button>
                <button
                    onClick={() => setActiveTab(2)}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 2 ? 'bg-pink-500 text-white' : 'bg-white/5 text-gray-500'
                        }`}
                >
                    Sofia
                </button>
            </div>

            {/* Grid Sections */}
            <div className="space-y-12">
                {milestones.map((milestone, mIdx) => (
                    <div key={mIdx} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">{milestone.label}</h3>
                            <div className="flex-1 h-px bg-white/5" />
                        </div>

                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                            {Array.from({ length: milestone.range[1] - milestone.range[0] + 1 }).map((_, i) => {
                                const idx = milestone.range[0] + i;
                                const isChecked = activeTab === 1
                                    ? (data.checkedSlots1 || []).includes(idx)
                                    : (data.checkedSlots2 || []).includes(idx);
                                const val = (idx + 1) * STEP;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => toggleSlot(activeTab, idx)}
                                        className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all group relative ${isChecked
                                                ? activeTab === 1 ? 'bg-primary border-transparent text-black' : 'bg-pink-500 border-transparent text-white'
                                                : 'bg-white/[0.02] border-white/5 text-gray-600 hover:border-white/20'
                                            }`}
                                    >
                                        {isChecked ? (
                                            <Check size={16} strokeWidth={4} />
                                        ) : (
                                            <span className="text-[10px] font-black">{val % 1 === 0 ? val : val.toFixed(1)}</span>
                                        )}

                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[8px] rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50">
                                            R$ {val.toFixed(2)}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* History */}
            <div className="glass-panel p-8">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Atividade Recente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(data.history || []).slice(-20).reverse().map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.person === 1 ? 'bg-primary/10 text-primary' : 'bg-pink-500/10 text-pink-500'}`}>
                                    {item.person === 1 ? <User size={14} /> : <Heart size={14} />}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-white">R$ {item.amount.toLocaleString('pt-BR')}</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                            <span className={`text-[8px] px-2 py-1 rounded-md font-black uppercase ${item.person === 1 ? 'bg-primary/20 text-primary' : 'bg-pink-500/20 text-pink-500'}`}>
                                {item.person === 1 ? 'Walter' : 'Sofia'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CloudCheck({ size }: { size: number }) {
    return (
        <div className="flex items-center gap-1">
            <Cloud size={size} />
            <Check size={size - 4} className="text-green-400" />
        </div>
    );
}
