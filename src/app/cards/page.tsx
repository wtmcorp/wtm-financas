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
    const [filter, setFilter] = useState<"all" | "básico" | "intermediário" | "premium">("all");
    const [featureFilter, setFeatureFilter] = useState<"all" | "lounge" | "cashback" | "miles">("all");
    const [sortBy, setSortBy] = useState<"default" | "miles" | "cashback" | "yield" | "top">("default");
    const { user } = useAuth();

    const filteredCards = cards.filter(card => {
        const matchesCategory = filter === "all" || card.category === filter;
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
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        <CreditCardIcon className="text-primary" size={32} />
                        Arsenal de Cartões
                    </h1>
                    <p className="text-gray-400 mt-1">Encontre o cartão perfeito para o seu estilo de vida e renda.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {(["all", "básico", "intermediário", "premium"] as const).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${filter === cat
                                ? "bg-primary text-black border-transparent shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {cat === "all" ? "Todos" : cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* Highlights Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-transparent p-6 rounded-[2rem] border border-blue-500/20">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Plane className="text-blue-400" size={20} />
                        Top Milhas
                    </h3>
                    <div className="space-y-3">
                        {topMiles.map((card, i) => (
                            <div key={card.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">{i + 1}. {card.name}</span>
                                <span className="text-blue-400 font-bold">{card.milesRate} pts/$</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-transparent p-6 rounded-[2rem] border border-green-500/20">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <DollarSign className="text-green-400" size={20} />
                        Top Cashback
                    </h3>
                    <div className="space-y-3">
                        {topCashback.map((card, i) => (
                            <div key={card.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">{i + 1}. {card.name}</span>
                                <span className="text-green-400 font-bold">{card.cashback}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-transparent p-6 rounded-[2rem] border border-purple-500/20">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="text-purple-400" size={20} />
                        Top Rendimento
                    </h3>
                    <div className="space-y-3">
                        {topYield.length > 0 ? topYield.map((card, i) => (
                            <div key={card.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">{i + 1}. {card.name}</span>
                                <span className="text-purple-400 font-bold text-xs">{card.yield}</span>
                            </div>
                        )) : (
                            <p className="text-gray-600 text-xs italic">Nenhum destaque encontrado.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Feature Filters & Sorting */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 rounded-2xl border border-white/10 p-2">
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {(["all", "lounge", "cashback", "miles"] as const).map((feat) => (
                        <button
                            key={feat}
                            onClick={() => setFeatureFilter(feat)}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${featureFilter === feat
                                ? "bg-white text-black"
                                : "text-gray-400 hover:bg-white/5"
                                }`}
                        >
                            {feat === "all" && "Sem Filtro"}
                            {feat === "lounge" && <><Plane size={14} /> Sala VIP</>}
                            {feat === "cashback" && <><DollarSign size={14} /> Cashback</>}
                            {feat === "miles" && <><TrendingUp size={14} /> Milhas</>}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    <span className="text-xs text-gray-500 font-bold uppercase whitespace-nowrap pl-2">Ordenar por:</span>
                    <button onClick={() => setSortBy("top")} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors whitespace-nowrap ${sortBy === "top" ? "bg-primary text-black" : "bg-black/40 text-gray-400"}`}>🏆 Top</button>
                    <button onClick={() => setSortBy("miles")} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors whitespace-nowrap ${sortBy === "miles" ? "bg-blue-500 text-white" : "bg-black/40 text-gray-400"}`}>✈️ Milhas</button>
                    <button onClick={() => setSortBy("cashback")} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors whitespace-nowrap ${sortBy === "cashback" ? "bg-green-500 text-white" : "bg-black/40 text-gray-400"}`}>💲 Cashback</button>
                    <button onClick={() => setSortBy("yield")} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors whitespace-nowrap ${sortBy === "yield" ? "bg-purple-500 text-white" : "bg-black/40 text-gray-400"}`}>📈 Rendimento</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Recommendations & Tips */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-primary/20 to-transparent p-6 rounded-[2rem] border border-primary/20">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Star className="text-yellow-400 fill-yellow-400" size={20} />
                            Recomendados para Você
                        </h2>
                        <div className="space-y-4">
                            {recommendedCards.length > 0 ? recommendedCards.map(card => (
                                <Tooltip key={card.id} text={`Ideal para sua renda de R$ ${user?.income?.toLocaleString()}. Benefício principal: ${card.cashback > 0 ? card.cashback + '% cashback' : card.milesRate + 'x milhas'}.`}>
                                    <div className="bg-black/40 border border-white/10 p-4 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-white group-hover:text-primary transition-colors">{card.name}</h3>
                                                <p className="text-xs text-gray-500">{card.bank}</p>
                                            </div>
                                            <div className="w-8 h-5 rounded" style={{ backgroundColor: card.color }}></div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                                            <Award size={12} />
                                            {card.category}
                                        </div>
                                    </div>
                                </Tooltip>
                            )) : (
                                <p className="text-gray-500 text-sm italic">Complete seu perfil com sua renda para ver recomendações personalizadas.</p>
                            )}
                        </div>
                    </div>

                    {/* Credit Tips Section */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-[2rem]">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Zap size={18} className="text-yellow-400" />
                            Como Aumentar seu Limite
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="text-yellow-400 shrink-0" size={16} />
                                <p className="text-xs text-gray-400"><strong>Pague em dia:</strong> O histórico de pagamento é o fator mais importante para o score.</p>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="text-yellow-400 shrink-0" size={16} />
                                <p className="text-xs text-gray-400"><strong>Use o cartão:</strong> Concentre seus gastos no cartão que deseja aumentar o limite.</p>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="text-yellow-400 shrink-0" size={16} />
                                <p className="text-xs text-gray-400"><strong>Atualize sua renda:</strong> Mantenha seus dados atualizados no app do banco.</p>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="text-yellow-400 shrink-0" size={16} />
                                <p className="text-xs text-gray-400"><strong>Open Finance:</strong> Compartilhe seus dados de outros bancos para provar sua capacidade financeira.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-[2rem]">
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                            <Lightbulb size={18} className="text-blue-400" />
                            Dica de Ouro
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Se você não consegue aprovação para cartões premium, comece com cartões de <strong>Limite Garantido</strong> (como o do PagBank ou Inter). Você investe um valor e ele vira limite na hora!
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCards.map((card) => (
                        <Card key={card.id} className="p-6 bg-black/40 border-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative z-10 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.color }}></div>
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{card.bank}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors">{card.name}</h3>
                                    </div>
                                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400 border border-white/10">
                                        {card.brand}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Anuidade</p>
                                        <p className="text-sm font-bold text-white">
                                            {card.annualFee === 0 ? "Grátis" : `R$ ${card.annualFee}/ano`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Renda Mínima</p>
                                        <p className="text-sm font-bold text-white">R$ {card.minIncome.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Principais Benefícios</p>
                                    <div className="flex flex-wrap gap-2">
                                        {card.cashback > 0 && (
                                            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-md border border-green-500/20 flex items-center gap-1">
                                                <DollarSign size={10} /> {card.cashback}% Cashback
                                            </span>
                                        )}
                                        {card.miles && (
                                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-md border border-blue-500/20 flex items-center gap-1">
                                                <Plane size={10} /> {card.milesRate} pts/$
                                            </span>
                                        )}
                                        {card.yield && (
                                            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold rounded-md border border-purple-500/20 flex items-center gap-1">
                                                <TrendingUp size={10} /> {card.yield}
                                            </span>
                                        )}
                                        {card.loungeAccess !== "none" && (
                                            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold rounded-md border border-purple-500/20 flex items-center gap-1">
                                                <Coffee size={10} /> {card.loungeAccess === "unlimited" ? "Sala VIP Ilimitada" : "Sala VIP"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {card.exclusiveBenefits && (
                                    <div className="pt-2">
                                        <div className="flex items-center gap-1 mb-2">
                                            <ShieldCheck size={12} className="text-primary" />
                                            <span className="text-[10px] font-bold text-primary uppercase">Exclusivo</span>
                                        </div>
                                        <ul className="text-[11px] text-gray-400 space-y-1">
                                            {card.exclusiveBenefits.slice(0, 2).map((b, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <a
                                    href={card.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 bg-white text-black text-center text-xs font-black rounded-xl hover:bg-primary transition-all uppercase tracking-widest"
                                >
                                    Solicitar Cartão
                                </a>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
