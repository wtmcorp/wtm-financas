"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { TrendingUp, Wallet, Calendar, Plus, User, Heart, CheckCircle2, Check } from "lucide-react";

interface ChallengeData {
    checkedSlots1: number[]; // Indices 0-99
    checkedSlots2: number[]; // Indices 0-99
    history: { date: string; amount: number; person: 1 | 2; slotIndex: number }[];
}

export default function Challenge100k() {
    const [data, setData] = useState<ChallengeData>({ checkedSlots1: [], checkedSlots2: [], history: [] });
    const [loading, setLoading] = useState(true);

    const SLOTS_COUNT = 200;
    const STEP = 2.5;
    const TOTAL_PER_PERSON = (SLOTS_COUNT * (SLOTS_COUNT + 1) / 2) * STEP; // 50,250

    useEffect(() => {
        const docRef = doc(db, "challenges", "sofia-walter-100k-v5");

        const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const fetchedData = docSnap.data();
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

        try {
            await setDoc(doc(db, "challenges", "sofia-walter-100k-v5"), newData);
        } catch (error) {
            console.error("Erro ao atualizar slot:", error);
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
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const Grid = ({ personNum, checkedSlots, colorClass, icon: Icon, name }: { personNum: 1 | 2, checkedSlots: number[], colorClass: string, icon: any, name: string }) => {
        const saved = calculateSaved(checkedSlots);
        return (
            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${colorClass.replace('text-', 'bg-')}/20 rounded-xl flex items-center justify-center`}>
                            <Icon className={colorClass} size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">{name}</h3>
                    </div>
                    <div className="text-right">
                        <p className={`text-lg font-black ${colorClass}`}>
                            {saved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Meta: R$ 50.250</p>
                    </div>
                </div>

                <div className="grid grid-cols-10 gap-1.5">
                    {Array.from({ length: SLOTS_COUNT }).map((_, i) => {
                        const isChecked = (checkedSlots || []).includes(i);
                        const val = (i + 1) * STEP;
                        return (
                            <button
                                key={i}
                                onClick={() => toggleSlot(personNum, i)}
                                className={`aspect-square rounded-lg border flex items-center justify-center text-[7px] font-black transition-all duration-300 relative group ${isChecked
                                    ? 'bg-green-500 border-transparent text-black scale-110 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                    : 'bg-black/40 border-white/10 text-gray-600 hover:border-white/30'
                                    }`}
                                title={`R$ ${val}`}
                            >
                                {isChecked ? <Check size={12} strokeWidth={4} /> : val.toFixed(1)}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none z-20 whitespace-nowrap border border-white/10">
                                    Depósito: R$ {val.toFixed(2)}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                    <span>{(checkedSlots || []).length} de {SLOTS_COUNT} depósitos</span>
                    <span>{((saved / TOTAL_PER_PERSON) * 100).toFixed(1)}%</span>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary/20 via-transparent to-green-500/10 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={120} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-2">Desafio 100k - Walter & Sofia</h2>
                        <p className="text-5xl font-black text-white tracking-tighter">
                            {totalSaved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="text-gray-500 mt-2 font-medium italic">"O segredo é a constância, o prêmio é a liberdade."</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Progresso Total</p>
                            <div className="relative w-24 h-24">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                    <path className="text-white/5" strokeDasharray="100, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="text-green-500" strokeDasharray={`${progressTotal}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-black text-white">{progressTotal.toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl text-center">
                <p className="text-green-400 text-sm font-bold">
                    ✅ Clique no valor para marcar como feito. Valores de R$ 2,50 até R$ 500,00!
                </p>
            </div>

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

            <div className="bg-black/20 border border-white/5 p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Depósitos Recentes</h3>
                    <CheckCircle2 className="text-green-500/50" size={16} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(data.history || []).length === 0 ? (
                        <p className="col-span-2 text-gray-600 text-sm text-center py-4 italic">Nenhum depósito ainda. Vamos começar!</p>
                    ) : (
                        (data.history || []).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.person === 1 ? 'bg-primary/10 text-primary' : 'bg-pink-500/10 text-pink-500'}`}>
                                        {item.person === 1 ? <User size={18} /> : <Heart size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-base font-black text-white">
                                            {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-medium">
                                            {new Date(item.date).toLocaleDateString('pt-BR')} às {new Date(item.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-[9px] px-2 py-1 rounded-md font-black uppercase ${item.person === 1 ? 'bg-primary/20 text-primary' : 'bg-pink-500/20 text-pink-500'}`}>
                                    {item.person === 1 ? 'Walter' : 'Sofia'}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

