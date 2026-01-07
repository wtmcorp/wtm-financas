"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { TrendingUp, Wallet, Calendar, Plus, User, Heart, CheckCircle2, Check, Sparkles, Trophy, ArrowUpRight, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChallengeData {
    checkedSlots1: number[]; // Indices 0-199
    checkedSlots2: number[]; // Indices 0-199
    history: { date: string; amount: number; person: 1 | 2; slotIndex: number }[];
}

export default function Challenge100k() {
    const [data, setData] = useState<ChallengeData>({ checkedSlots1: [], checkedSlots2: [], history: [] });
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    const SLOTS_COUNT = 200;
    const STEP = 2.5;
    const TOTAL_PER_PERSON = (SLOTS_COUNT * (SLOTS_COUNT + 1) / 2) * STEP; // 50,250
    const DOC_ID = "sofia-walter-100k-v5";

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
            } else {
                const initialData = { checkedSlots1: [], checkedSlots2: [], history: [] };
                setDoc(docRef, initialData);
                setData(initialData);
            }
            setLoading(false);
        }, (error) => {
            console.error("Firestore error:", error);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const toggleSlot = async (person: 1 | 2, index: number) => {
        setSyncing(true);

        // Optimistic Update
        const prevData = { ...data };
        const newData = { ...data };
        const slots = person === 1 ? [...(newData.checkedSlots1 || [])] : [...(newData.checkedSlots2 || [])];
        const isChecking = !slots.includes(index);
        const amount = (index + 1) * STEP;

        if (isChecking) {
            slots.push(index);
            newData.history = [
                { date: new Date().toISOString(), amount, person, slotIndex: index },
                ...(newData.history || [])
            ].slice(0, 50);
        } else {
            const idx = slots.indexOf(index);
            if (idx > -1) {
                slots.splice(idx, 1);
                newData.history = (newData.history || []).filter(h => !(h.person === person && h.slotIndex === index));
            }
        }

        if (person === 1) newData.checkedSlots1 = slots;
        else newData.checkedSlots2 = slots;

        setData(newData);

        try {
            await setDoc(doc(db, "challenges", DOC_ID), newData);
        } catch (error) {
            console.error("Erro ao atualizar slot:", error);
            setData(prevData); // Rollback on error
        } finally {
            setSyncing(false);
        }
    };

    const calculateSaved = (slots: number[]) => (slots || []).reduce((sum, idx) => sum + (idx + 1) * STEP, 0);

    const saved1 = calculateSaved(data.checkedSlots1);
    const saved2 = calculateSaved(data.checkedSlots2);
    const totalSaved = saved1 + saved2;
    const TOTAL_GOAL = TOTAL_PER_PERSON * 2;
    const progressTotal = (totalSaved / TOTAL_GOAL) * 100;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(167,139,250,0.3)]"></div>
                <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Sincronizando Cofre...</p>
            </div>
        );
    }

    const Grid = ({ personNum, checkedSlots, colorClass, icon: Icon, name }: { personNum: 1 | 2, checkedSlots: number[], colorClass: string, icon: any, name: string }) => {
        const saved = calculateSaved(checkedSlots);
        const progress = (saved / TOTAL_PER_PERSON) * 100;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 space-y-8 relative overflow-hidden group"
            >
                <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
                    <Icon size={120} />
                </div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${colorClass.replace('text-', 'bg-')}/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl`}>
                            <Icon className={colorClass} size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{name}</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ativo no Desafio</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-3xl font-black ${colorClass} tracking-tighter`}>
                            {saved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <div className="flex items-center justify-end gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                            <span>Meta: R$ 50.250</span>
                            <div className="w-1 h-1 rounded-full bg-gray-800" />
                            <span className="text-white">{progress.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className={`h-full bg-gradient-to-r ${personNum === 1 ? 'from-primary to-blue-500' : 'from-pink-500 to-rose-600'} rounded-full shadow-[0_0_15px_rgba(167,139,250,0.3)]`}
                    />
                </div>

                <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 relative z-10">
                    {Array.from({ length: SLOTS_COUNT }).map((_, i) => {
                        const isChecked = (checkedSlots || []).includes(i);
                        const val = (i + 1) * STEP;
                        return (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.1, zIndex: 20 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleSlot(personNum, i)}
                                className={`aspect-square rounded-md border flex items-center justify-center text-[6px] font-black transition-all duration-300 relative group ${isChecked
                                    ? 'bg-green-500 border-transparent text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                    : 'bg-white/[0.03] border-white/5 text-gray-700 hover:border-white/20 hover:bg-white/[0.08]'
                                    }`}
                            >
                                {isChecked ? <Check size={10} strokeWidth={4} /> : i + 1}

                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-30 whitespace-nowrap border border-white/10 shadow-2xl transition-all translate-y-2 group-hover:translate-y-0">
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 text-[8px] uppercase font-black tracking-widest">Depósito {i + 1}</span>
                                        <span className="font-black text-primary">R$ {val.toFixed(2)}</span>
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {(checkedSlots || []).length} de {SLOTS_COUNT} Completos
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-yellow-500" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Faltam R$ {(TOTAL_PER_PERSON - saved).toLocaleString('pt-BR')}
                        </span>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="space-y-12">
            {/* Main Progress Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-10 md:p-16 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-pink-500/10 opacity-50" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <Sparkles size={16} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Patrimônio em Construção</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">Total Acumulado pelo Casal</h2>
                            <p className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                                {totalSaved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                        </div>
                        <p className="text-gray-400 text-lg font-medium italic max-w-md">
                            "O segredo é a constância, o prêmio é a nossa liberdade."
                        </p>
                    </div>

                    <div className="relative">
                        <div className="w-48 h-48 md:w-64 md:h-64 relative">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle className="text-white/5" strokeWidth="8" stroke="currentColor" fill="none" r="40" cx="50" cy="50" />
                                <motion.circle
                                    initial={{ strokeDasharray: "0, 251.2" }}
                                    animate={{ strokeDasharray: `${(progressTotal * 251.2) / 100}, 251.2` }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="text-primary"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    r="40" cx="50" cy="50"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">{progressTotal.toFixed(0)}%</span>
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Concluído</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Instructions */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-green-400 text-[10px] font-black uppercase tracking-widest">
                        Clique no número para marcar o depósito realizado
                    </p>
                </div>
                {syncing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-primary animate-pulse"
                    >
                        <ArrowUpRight size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Sincronizando...</span>
                    </motion.div>
                )}
            </div>

            {/* Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Grid
                    personNum={1}
                    checkedSlots={data.checkedSlots1}
                    colorClass="text-primary"
                    icon={User}
                    name="WALTER"
                />
                <Grid
                    personNum={2}
                    checkedSlots={data.checkedSlots2}
                    colorClass="text-pink-500"
                    icon={Heart}
                    name="SOFIA"
                />
            </div>

            {/* History Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-10 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <History size={150} />
                </div>

                <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                            <History size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Linha do Tempo</h3>
                    </div>
                    <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        Últimos 50 depósitos
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    <AnimatePresence mode="popLayout">
                        {(data.history || []).length === 0 ? (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-gray-600 text-sm text-center py-12 italic font-medium"
                            >
                                O cofre está vazio. Que tal fazer o primeiro depósito hoje? 🚀
                            </motion.p>
                        ) : (
                            (data.history || []).map((item, idx) => (
                                <motion.div
                                    key={`${item.date}-${item.slotIndex}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center justify-between p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group/item"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover/item:scale-110 ${item.person === 1 ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-pink-500/10 text-pink-500 border border-pink-500/20'}`}>
                                            {item.person === 1 ? <User size={24} /> : <Heart size={24} />}
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-white tracking-tight">
                                                {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">
                                                <Calendar size={12} />
                                                <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] ${item.person === 1 ? 'bg-primary/20 text-primary' : 'bg-pink-500/20 text-pink-500'}`}>
                                            {item.person === 1 ? 'Walter' : 'Sofia'}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

