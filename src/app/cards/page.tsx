"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { creditCardsData, CreditCard } from "@/data/creditCardsData";
import { ArrowUpDown, CreditCard as CreditCardIcon, Award, DollarSign, TrendingUp, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function CardsPage() {
    const [cards, setCards] = useState(creditCardsData);
    const [filter, setFilter] = useState<"all" | "cashback" | "miles">("all");
    const [sortBy, setSortBy] = useState<"annualFee" | "interestRate" | "cashback">("annualFee");
    const { user } = useAuth();

    const userIncome = user?.income || 0;

    const handleSort = (key: "annualFee" | "interestRate" | "cashback") => {
        const sorted = [...cards].sort((a, b) => {
            if (key === "cashback") {
                return b[key] - a[key]; // Maior cashback primeiro
            }
            return a[key] - b[key]; // Menor taxa/anuidade primeiro
        });
        setCards(sorted);
        setSortBy(key);
    };

    const filteredCards = cards.filter(card => {
        if (filter === "cashback") return card.cashback > 0;
        if (filter === "miles") return card.miles;
        return true;
    });

    const recommendedCards = creditCardsData
        .filter(card => card.minIncome <= userIncome)
        .sort((a, b) => {
            // Priorizar cartões com cashback ou milhas
            const scoreA = (a.cashback * 10) + (a.miles ? 5 : 0) - (a.annualFee / 100);
            const scoreB = (b.cashback * 10) + (b.miles ? 5 : 0) - (b.annualFee / 100);
            return scoreB - scoreA;
        })
        .slice(0, 3);

    return (
        <div className="p-6 space-y-6 pb-24">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Cartões de Crédito</h1>
                <p className="text-gray-400 text-sm">Compare e encontre o melhor cartão para você</p>
            </header>

            {/* Recomendações */}
            {userIncome > 0 && recommendedCards.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Star className="text-primary" size={20} />
                        <h2 className="text-lg font-bold text-white">Recomendados para Você</h2>
                    </div>
                    <div className="grid gap-3">
                        {recommendedCards.map(card => (
                            <Card key={card.id} className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.color }}></div>
                                            <h3 className="font-bold text-white">{card.name}</h3>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-2">{card.bank} • {card.brand}</p>
                                        <div className="flex gap-3 text-xs mb-3">
                                            {card.cashback > 0 && (
                                                <span className="text-green-400">💰 {card.cashback}% cashback</span>
                                            )}
                                            {card.miles && (
                                                <span className="text-blue-400">✈️ {card.milesRate}x milhas</span>
                                            )}
                                        </div>
                                        <a
                                            href={card.applyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-white/10 hover:bg-white/20 text-white text-xs py-1.5 px-3 rounded-md transition-colors"
                                        >
                                            Solicitar Cartão
                                        </a>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Anuidade</p>
                                        <p className="font-bold text-white">
                                            {card.annualFee === 0 ? "Grátis" : `R$ ${card.annualFee}`}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === "all" ? "bg-primary text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setFilter("cashback")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === "cashback" ? "bg-primary text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                >
                    💰 Cashback
                </button>
                <button
                    onClick={() => setFilter("miles")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === "miles" ? "bg-primary text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                >
                    ✈️ Milhas
                </button>
            </div>

            {/* Tabela de Comparação */}
            <Card className="overflow-hidden p-0">
                <div className="p-4 border-b border-white/10">
                    <h3 className="font-bold text-white">Comparação Completa</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-left">Cartão</th>
                                <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("annualFee")}>
                                    <div className="flex items-center gap-1">
                                        Anuidade <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("interestRate")}>
                                    <div className="flex items-center gap-1">
                                        Taxa % <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("cashback")}>
                                    <div className="flex items-center gap-1">
                                        Cashback <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-4 py-3">Milhas</th>
                                <th className="px-4 py-3">Benefícios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCards.map((card) => (
                                <tr key={card.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }}></div>
                                            <div>
                                                <p className="font-medium text-white">{card.name}</p>
                                                <p className="text-xs text-gray-500">{card.bank}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={card.annualFee === 0 ? "text-green-400 font-medium" : "text-gray-300"}>
                                            {card.annualFee === 0 ? "Grátis" : `R$ ${card.annualFee}`}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">{card.interestRate}%</td>
                                    <td className="px-4 py-3">
                                        {card.cashback > 0 ? (
                                            <span className="text-green-400 font-medium">{card.cashback}%</span>
                                        ) : (
                                            <span className="text-gray-600">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {card.miles ? (
                                            <span className="text-blue-400">{card.milesRate}x</span>
                                        ) : (
                                            <span className="text-gray-600">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="max-w-xs">
                                            <p className="text-xs text-gray-400 line-clamp-2">
                                                {card.benefits.join(" • ")}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Informações Úteis */}
            <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
                    <div className="flex items-start gap-3">
                        <DollarSign className="text-green-400 mt-1" size={24} />
                        <div>
                            <h3 className="font-bold text-white mb-1">Melhor Cashback</h3>
                            <p className="text-sm text-gray-300">
                                {creditCardsData.reduce((max, card) => card.cashback > max.cashback ? card : max).name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Até {Math.max(...creditCardsData.map(c => c.cashback))}% de volta
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                    <div className="flex items-start gap-3">
                        <TrendingUp className="text-blue-400 mt-1" size={24} />
                        <div>
                            <h3 className="font-bold text-white mb-1">Menor Taxa</h3>
                            <p className="text-sm text-gray-300">
                                {creditCardsData.reduce((min, card) => card.interestRate < min.interestRate ? card : min).name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {Math.min(...creditCardsData.map(c => c.interestRate))}% ao mês
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
