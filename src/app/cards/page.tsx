"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { creditCardsData } from "@/data/creditCardsData";
import { CreditCard } from "@/data/types";
import { ArrowUpDown, CreditCard as CreditCardIcon, Award, DollarSign, TrendingUp, Star, Info, Plane, Coffee, ShieldCheck, Lightbulb, CheckCircle2, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip } from "@/components/ui/Tooltip";

export default function CardsPage() {
    const [cards, setCards] = useState(creditCardsData);
    const [filter, setFilter] = useState<"all" | "básico" | "intermediário" | "premium" | "sem anuidade">("all");
    const [featureFilter, setFeatureFilter] = useState<"all" | "lounge" | "cashback" | "miles">("all");
    const [sortBy, setSortBy] = useState<"default" | "miles" | "cashback" | "yield" | "top">("default");
    const { user } = useAuth();

    const filteredCards = cards.filter(card => {
        const matchesCategory = filter === "all" ||
            (filter === "sem anuidade" ? card.annualFee === 0 : card.category === filter);
        const matchesFeature = featureFilter === "all" ||
            (featureFilter === "lounge" && card.loungeAccess !== "none") ||
            (featureFilter === "cashback" && card.cashback > 0) ||
            (featureFilter === "miles" && card.miles);
        return matchesCategory && matchesFeature;
    }).sort((a, b) => {
        if (sortBy === "miles") return (b.milesRate || 0) - (a.milesRate || 0);
        if (sortBy === "cashback") return b.cashback - a.cashback;
        if (sortBy === "yield") {
            // Simple heuristic for yield sorting based on string content
            const getYieldValue = (s?: string) => {
                if (!s) return 0;
                const match = s.match(/(\d+)%/);
                return match ? parseInt(match[1]) : 0;
            };
            return getYieldValue(b.yield) - getYieldValue(a.yield);
        }
        if (sortBy === "top") {
            // "Top" ranking: Premium > Intermediário > Básico, then by income
            const tierScore = { "premium": 3, "intermediário": 2, "básico": 1 };
            if (tierScore[b.category] !== tierScore[a.category]) {
                return tierScore[b.category] - tierScore[a.category];
            }
            return b.minIncome - a.minIncome;
        }
        return 0; // Default order
    });

    const recommendedCards = cards
        .filter(card => user?.income && card.minIncome <= user.income)
        .sort((a, b) => b.minIncome - a.minIncome)
        .slice(0, 2);

    // Highlights logic
    const topMiles = [...cards].sort((a, b) => (b.milesRate || 0) - (a.milesRate || 0)).slice(0, 3);
    const topCashback = [...cards].sort((a, b) => b.cashback - a.cashback).slice(0, 3);
    const topYield = [...cards].filter(c => c.yield).sort((a, b) => {
        const getYieldValue = (s?: string) => {
            if (!s) return 0;
            const match = s.match(/(\d+)%/);
            return match ? parseInt(match[1]) : 0;
        };
        return getYieldValue(b.yield) - getYieldValue(a.yield);
    }).slice(0, 3);

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="reveal space-y-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-primary rounded-full" />
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                    Arsenal de <span className="gradient-text">Cartões</span>
                                </h1>
                            </div>
                            <p className="text-gray-500 text-lg font-medium">
                                Estratégia pura. Encontre o cartão que trabalha para você.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {(["all", "básico", "intermediário", "premium", "sem anuidade"] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat
                                        ? "bg-primary text-black"
                                        : "bg-white/5 text-gray-500 hover:text-white border border-white/5"
                                        }`}
                                >
                                    {cat === "all" ? "Todos" : cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Highlights Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal" style={{ animationDelay: '0.1s' }}>
                    <div className="card-premium p-8 group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                                <Plane size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-tight">Top Milhas</h3>
                        </div>
                        <div className="space-y-4">
                            {topMiles.map((card, i) => (
                                <div key={card.id} className="flex items-center justify-between group/item">
                                    <span className="text-sm text-gray-500 group-hover/item:text-gray-300 transition-colors">{card.name}</span>
                                    <span className="text-xs font-black text-blue-400">{card.milesRate} pts/$</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-premium p-8 group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 border border-green-500/20">
                                <DollarSign size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-tight">Top Cashback</h3>
                        </div>
                        <div className="space-y-4">
                            {topCashback.map((card, i) => (
                                <div key={card.id} className="flex items-center justify-between group/item">
                                    <span className="text-sm text-gray-500 group-hover/item:text-gray-300 transition-colors">{card.name}</span>
                                    <span className="text-xs font-black text-green-400">{card.cashback}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-premium p-8 group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/20">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-tight">Top Rendimento</h3>
                        </div>
                        <div className="space-y-4">
                            {topYield.map((card, i) => (
                                <div key={card.id} className="flex items-center justify-between group/item">
                                    <span className="text-sm text-gray-500 group-hover/item:text-gray-300 transition-colors">{card.name}</span>
                                    <span className="text-xs font-black text-purple-400">{card.yield}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Filters & Sorting Bar */}
                <div className="reveal glass rounded-3xl p-2 flex flex-col md:flex-row items-center justify-between gap-4" style={{ animationDelay: '0.2s' }}>
                    <div className="flex flex-wrap gap-1 p-1">
                        {(["all", "lounge", "cashback", "miles"] as const).map((feat) => (
                            <button
                                key={feat}
                                onClick={() => setFeatureFilter(feat)}
                                className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${featureFilter === feat
                                    ? "bg-white text-black shadow-xl"
                                    : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                {feat === "all" ? "Tudo" : feat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 px-4">
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Ordenar</span>
                        <div className="flex gap-2">
                            <button onClick={() => setSortBy("top")} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${sortBy === "top" ? "bg-primary text-black" : "bg-white/5 text-gray-500"}`} title="Top Ranking">🏆</button>
                            <button onClick={() => setSortBy("miles")} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${sortBy === "miles" ? "bg-blue-500 text-white" : "bg-white/5 text-gray-500"}`} title="Milhas">✈️</button>
                            <button onClick={() => setSortBy("cashback")} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${sortBy === "cashback" ? "bg-green-500 text-white" : "bg-white/5 text-gray-500"}`} title="Cashback">💲</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Intelligence */}
                    <div className="lg:col-span-1 space-y-8 reveal" style={{ animationDelay: '0.3s' }}>
                        <div className="card-premium p-8 border-primary/20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                                    <Star size={20} className="fill-primary" />
                                </div>
                                <h2 className="text-xl font-black text-white tracking-tight">Recomendados</h2>
                            </div>
                            <div className="space-y-4">
                                {recommendedCards.map(card => (
                                    <div key={card.id} className="glass-light p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-white group-hover:text-primary transition-colors">{card.name}</h3>
                                            <div className="w-6 h-4 rounded-sm shadow-sm" style={{ backgroundColor: card.color }}></div>
                                        </div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{card.category}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card-premium p-8 border-yellow-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                                    <Zap size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white tracking-tight">Dicas de Crédito</h3>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    { title: "Pague em dia", desc: "O histórico é 35% do seu score." },
                                    { title: "Open Finance", desc: "Compartilhe dados para provar renda." },
                                    { title: "Uso Consciente", desc: "Mantenha o uso abaixo de 30% do limite." }
                                ].map((tip, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-white">{tip.title}</p>
                                            <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 reveal" style={{ animationDelay: '0.4s' }}>
                        {filteredCards.map((card) => (
                            <div key={card.id} className="card-premium p-8 group flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{card.bank}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{card.name}</h3>
                                    </div>
                                    <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-gray-400 border border-white/5 uppercase tracking-widest">
                                        {card.brand}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-8 py-6 border-y border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Anuidade</p>
                                        <p className="text-sm font-bold text-white">{card.annualFee === 0 ? "Grátis" : `R$ ${card.annualFee}`}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Renda Mínima</p>
                                        <p className="text-sm font-bold text-white">R$ {card.minIncome.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {card.cashback > 0 && (
                                        <div className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-black rounded-full border border-green-500/10 uppercase tracking-widest">
                                            {card.cashback}% Cashback
                                        </div>
                                    )}
                                    {card.miles && (
                                        <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded-full border border-blue-500/10 uppercase tracking-widest">
                                            {card.milesRate} pts/$
                                        </div>
                                    )}
                                    {card.loungeAccess !== "none" && (
                                        <div className="px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-black rounded-full border border-purple-500/10 uppercase tracking-widest">
                                            Sala VIP
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={card.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto block w-full py-4 bg-white text-black text-center text-[10px] font-black rounded-2xl hover:bg-primary transition-all uppercase tracking-[0.2em] active:scale-95 shadow-xl"
                                >
                                    Solicitar Arsenal
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
