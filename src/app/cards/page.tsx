"use client";

import { useState } from "react";
import { creditCardsData } from "@/data/creditCardsData";
import { CreditCard } from "@/data/types";
import CreditCard3D from "@/components/dashboard/cards/CreditCard3D";
import {
    Search,
    Filter,
    ArrowUpDown,
    Zap,
    Plane,
    DollarSign,
    Crown,
    ShieldCheck,
    X,
    Sparkles,
    CheckCircle2,
    ChevronRight,
    Trophy
} from "lucide-react";

export default function CardsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
    const [activeCategory, setActiveCategory] = useState<"all" | "premium" | "intermediário" | "básico">("all");
    const [showWizard, setShowWizard] = useState(false);

    // Filtering logic
    const filteredCards = creditCardsData.filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.bank.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "all" || card.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Wizard Logic (Simple Matcher)
    const [wizardStep, setWizardStep] = useState(0);
    const [wizardAnswers, setWizardAnswers] = useState<any>({});

    const handleWizardAnswer = (key: string, value: any) => {
        setWizardAnswers({ ...wizardAnswers, [key]: value });
        setWizardStep(prev => prev + 1);
    };

    const getWizardResult = () => {
        // Simple heuristic based on answers
        let result = creditCardsData.filter(c => c.category === "básico"); // Default

        if (wizardAnswers.income === "high") {
            result = creditCardsData.filter(c => c.category === "premium");
            if (wizardAnswers.goal === "travel") {
                result = result.sort((a, b) => (b.milesRate || 0) - (a.milesRate || 0));
            } else {
                result = result.sort((a, b) => b.cashback - a.cashback);
            }
        } else if (wizardAnswers.income === "medium") {
            result = creditCardsData.filter(c => c.category === "intermediário");
        }

        return result.slice(0, 3);
    };

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <header className="reveal space-y-6 text-center md:text-left relative">
                    <div className="absolute top-0 right-0 hidden md:block opacity-20">
                        <Trophy size={120} className="text-primary rotate-12" />
                    </div>

                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                            <Crown size={16} className="text-yellow-500" />
                            <span className="text-sm font-medium text-gray-300">A Elite dos Cartões</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
                            Arsenal de <span className="gradient-text">Crédito</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                            Não é apenas plástico. É acesso, poder e estratégia. Escolha a ferramenta certa para construir seu império.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            onClick={() => setShowWizard(true)}
                            className="px-8 py-4 bg-primary text-black font-bold rounded-2xl hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_30px_rgba(167,139,250,0.3)]"
                        >
                            <Sparkles size={20} />
                            Encontrar Meu Cartão Ideal
                        </button>
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por banco, nome ou benefício..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary/50 transition-all"
                            />
                        </div>
                    </div>
                </header>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar reveal" style={{ animationDelay: '0.1s' }}>
                    {(["all", "premium", "intermediário", "básico"] as const).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all ${activeCategory === cat
                                ? "bg-white text-black"
                                : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat === "all" ? "Todos os Cartões" : cat}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 reveal" style={{ animationDelay: '0.2s' }}>
                    {filteredCards.map((card) => (
                        <CreditCard3D
                            key={card.id}
                            card={card}
                            onClick={() => setSelectedCard(card)}
                        />
                    ))}
                </div>

                {/* Wizard Modal */}
                {showWizard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-2xl w-full relative overflow-hidden">
                            <button
                                onClick={() => { setShowWizard(false); setWizardStep(0); }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative z-10">
                                {wizardStep === 0 && (
                                    <div className="space-y-8 text-center py-8">
                                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
                                            <Sparkles size={40} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Vamos encontrar sua arma secreta</h2>
                                        <p className="text-gray-400">Responda 3 perguntas rápidas para descobrirmos o cartão perfeito para o seu momento.</p>
                                        <button onClick={() => setWizardStep(1)} className="btn-premium w-full max-w-xs mx-auto">
                                            Começar
                                        </button>
                                    </div>
                                )}

                                {wizardStep === 1 && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-white">Qual sua renda mensal aproximada?</h3>
                                        <div className="grid gap-4">
                                            <button onClick={() => handleWizardAnswer('income', 'low')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-primary/50 transition-all">
                                                <div className="font-bold text-white">Até R$ 2.000</div>
                                                <div className="text-sm text-gray-500">Estou começando a construir patrimônio</div>
                                            </button>
                                            <button onClick={() => handleWizardAnswer('income', 'medium')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-primary/50 transition-all">
                                                <div className="font-bold text-white">R$ 2.000 a R$ 10.000</div>
                                                <div className="text-sm text-gray-500">Busco benefícios intermediários</div>
                                            </button>
                                            <button onClick={() => handleWizardAnswer('income', 'high')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-primary/50 transition-all">
                                                <div className="font-bold text-white">Acima de R$ 10.000</div>
                                                <div className="text-sm text-gray-500">Quero o melhor que existe (Black/Infinite)</div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {wizardStep === 2 && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-white">O que você mais valoriza?</h3>
                                        <div className="grid gap-4">
                                            <button onClick={() => handleWizardAnswer('goal', 'travel')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-primary/50 transition-all flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400"><Plane /></div>
                                                <div>
                                                    <div className="font-bold text-white">Viagens & Milhas</div>
                                                    <div className="text-sm text-gray-500">Salas VIP e passagens aéreas</div>
                                                </div>
                                            </button>
                                            <button onClick={() => handleWizardAnswer('goal', 'cashback')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-primary/50 transition-all flex items-center gap-4">
                                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400"><DollarSign /></div>
                                                <div>
                                                    <div className="font-bold text-white">Dinheiro de Volta</div>
                                                    <div className="text-sm text-gray-500">Cashback na fatura ou conta</div>
                                                </div>
                                            </button>
                                            <button onClick={() => handleWizardAnswer('goal', 'economy')} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 hover:border-primary/50 transition-all flex items-center gap-4">
                                                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400"><ShieldCheck /></div>
                                                <div>
                                                    <div className="font-bold text-white">Economia</div>
                                                    <div className="text-sm text-gray-500">Sem anuidade e taxas baixas</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {wizardStep === 3 && (
                                    <div className="space-y-8">
                                        <div className="text-center">
                                            <h3 className="text-2xl font-bold text-white mb-2">Encontramos seus pares perfeitos</h3>
                                            <p className="text-gray-400">Baseado no seu perfil, estes são os campeões.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {getWizardResult().map(card => (
                                                <div key={card.id} className="transform scale-90 hover:scale-100 transition-transform">
                                                    <CreditCard3D card={card} onClick={() => { setSelectedCard(card); setShowWizard(false); }} />
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => { setShowWizard(false); setWizardStep(0); }} className="w-full py-4 text-gray-500 hover:text-white transition-colors">
                                            Fechar e Explorar Tudo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Card Details Modal */}
                {selectedCard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-4xl w-full relative overflow-hidden flex flex-col md:flex-row my-8">
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Left: Visual */}
                            <div className="w-full md:w-1/3 bg-white/5 p-8 flex flex-col items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                                <div className="transform scale-110 rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                                    <CreditCard3D card={selectedCard} />
                                </div>
                                <div className="mt-8 text-center z-10 space-y-2">
                                    <h2 className="text-2xl font-black text-white">{selectedCard.name}</h2>
                                    <p className="text-primary font-bold">{selectedCard.bank}</p>
                                </div>
                            </div>

                            {/* Right: Details */}
                            <div className="flex-1 p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Anuidade</div>
                                        <div className="text-xl font-bold text-white">
                                            {selectedCard.annualFee === 0 ? "Grátis" : `R$ ${selectedCard.annualFee}`}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Renda Mínima</div>
                                        <div className="text-xl font-bold text-white">
                                            R$ {selectedCard.minIncome.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Crown size={18} className="text-yellow-500" />
                                        Benefícios Exclusivos
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedCard.benefits.concat(selectedCard.exclusiveBenefits || []).map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {selectedCard.loungeAccess !== "none" && (
                                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                                        <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                                            <Plane size={18} /> Acesso a Salas VIP
                                        </h4>
                                        <p className="text-sm text-gray-300">
                                            {selectedCard.loungeAccess === "unlimited" ? "Acesso Ilimitado" : "Acessos Limitados"}
                                            via {selectedCard.loungeType?.join(", ")}.
                                        </p>
                                    </div>
                                )}

                                <a
                                    href={selectedCard.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-primary transition-all flex items-center justify-center gap-2 text-lg shadow-xl active:scale-95"
                                >
                                    Solicitar Cartão Agora
                                    <ChevronRight size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
