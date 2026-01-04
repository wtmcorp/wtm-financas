"use client";

import { useState } from "react";
import { creditCardsData } from "@/data/creditCardsData";
import { CreditCard } from "@/data/types";
import CreditCard3D from "@/components/dashboard/cards/CreditCard3D";
import {
    Search,
    Filter,
    ArrowUpDown,
    Plane,
    DollarSign,
    Crown,
    ShieldCheck,
    X,
    Sparkles,
    CheckCircle2,
    ChevronRight,
    Trophy,
    ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

    // Wizard Logic
    const [wizardStep, setWizardStep] = useState(0);
    const [wizardAnswers, setWizardAnswers] = useState<any>({});

    const handleWizardAnswer = (key: string, value: any) => {
        setWizardAnswers({ ...wizardAnswers, [key]: value });
        setWizardStep(prev => prev + 1);
    };

    const getWizardResult = () => {
        let result = [...creditCardsData];
        if (wizardAnswers.income === "low") result = result.filter(c => c.minIncome <= 2000);
        else if (wizardAnswers.income === "medium") result = result.filter(c => c.minIncome <= 10000);
        else if (wizardAnswers.income === "high") result = result.filter(c => c.minIncome >= 10000);

        if (wizardAnswers.spending === "low") result = result.filter(c => c.annualFeeType !== "paid");

        if (wizardAnswers.feePreference === "zero") result = result.filter(c => c.annualFee === 0 || c.annualFeeType === "free");

        if (wizardAnswers.goal === "travel") {
            result = result.sort((a, b) => {
                const aVal = (a.milesRate || 0) + (a.loungeAccess === "unlimited" ? 5 : a.loungeAccess === "limited" ? 2 : 0);
                const bVal = (b.milesRate || 0) + (b.loungeAccess === "unlimited" ? 5 : b.loungeAccess === "limited" ? 2 : 0);
                return bVal - aVal;
            });
        } else if (wizardAnswers.goal === "cashback") {
            result = result.sort((a, b) => b.cashback - a.cashback);
        } else if (wizardAnswers.goal === "economy") {
            result = result.sort((a, b) => a.annualFee - b.annualFee);
        }
        return result.slice(0, 3);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative overflow-hidden p-8 md:p-20 rounded-[3.5rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                >
                    <div className="absolute top-0 right-0 hidden md:block opacity-5 -mr-20 -mt-20">
                        <Trophy size={400} className="text-primary rotate-12" />
                    </div>

                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <Crown size={18} className="text-yellow-500 animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">The Elite Collection</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85]">
                            Arsenal de <br />
                            <span className="gradient-text">Crédito</span>
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium">
                            Não é apenas um cartão. É sua chave para benefícios exclusivos, milhas ilimitadas e poder de compra estratégico.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-wrap gap-6 pt-12">
                        <button
                            onClick={() => setShowWizard(true)}
                            className="px-10 py-5 bg-primary text-black font-black rounded-2xl hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-4 shadow-[0_20px_50px_rgba(167,139,250,0.4)] group text-lg"
                        >
                            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                            Encontrar Meu Cartão Ideal
                        </button>
                        <div className="relative flex-1 max-w-xl group">
                            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Buscar por banco, nome ou benefício..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="relative w-full pl-16 pr-6 py-5 bg-black/40 border border-white/10 rounded-[1.5rem] text-white text-lg focus:outline-none focus:border-primary/50 focus:bg-black/60 transition-all placeholder:text-gray-700 backdrop-blur-xl"
                            />
                        </div>
                    </div>
                </motion.header>

                {/* Rankings Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Top Cashback", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10", tag: "Dinheiro de Volta", data: creditCardsData.filter(c => c.cashback > 0).sort((a, b) => b.cashback - a.cashback) },
                        { title: "Top Milhas", icon: Plane, color: "text-blue-400", bg: "bg-blue-500/10", tag: "Pontuação", data: creditCardsData.filter(c => c.miles).sort((a, b) => (b.milesRate || 0) - (a.milesRate || 0)) },
                        { title: "Top VIP", icon: Crown, color: "text-purple-400", bg: "bg-purple-500/10", tag: "Salas VIP", data: creditCardsData.filter(c => c.loungeAccess !== 'none').sort((a, b) => (a.loungeAccess === 'unlimited' ? -1 : 1)) }
                    ].map((rank, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card-premium p-8 space-y-6 border border-white/5 hover:border-white/10 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 ${rank.bg} rounded-xl ${rank.color}`}>
                                        <rank.icon size={22} />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{rank.title}</h3>
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-widest ${rank.bg} ${rank.color} px-2.5 py-1 rounded-md border border-white/5`}>{rank.tag}</span>
                            </div>
                            <div className="space-y-2">
                                {rank.data.slice(0, 5).map((card, idx) => (
                                    <div
                                        key={card.id}
                                        onClick={() => setSelectedCard(card)}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer group/item border border-transparent hover:border-white/5"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-black text-gray-600 group-hover/item:text-primary">0{idx + 1}</span>
                                            <span className="text-sm font-bold text-gray-400 group-hover/item:text-white transition-colors">{card.name}</span>
                                        </div>
                                        <ArrowUpRight size={16} className="text-gray-700 group-hover/item:text-primary transition-all" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Categories & Grid */}
                <div className="space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3 overflow-x-auto no-scrollbar">
                            {(["all", "premium", "intermediário", "básico"] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] whitespace-nowrap transition-all border ${activeCategory === cat
                                        ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105"
                                        : "bg-white/5 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {cat === "all" ? "Todos os Cartões" : cat}
                                </button>
                            ))}
                        </div>
                        <p className="hidden md:block text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            Exibindo {filteredCards.length} cartões
                        </p>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredCards.map((card) => (
                                <motion.div
                                    layout
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <CreditCard3D
                                        card={card}
                                        onClick={() => setSelectedCard(card)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Wizard Modal */}
                <AnimatePresence>
                    {showWizard && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-8 md:p-16 max-w-3xl w-full relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                            >
                                <button
                                    onClick={() => { setShowWizard(false); setWizardStep(0); }}
                                    className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-2xl text-gray-500 transition-all border border-white/10"
                                >
                                    <X size={24} />
                                </button>

                                <div className="relative z-10">
                                    {wizardStep === 0 && (
                                        <div className="space-y-10 text-center py-10">
                                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse border border-primary/20">
                                                <Sparkles size={48} />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">O Match Perfeito</h2>
                                                <p className="text-gray-400 text-lg">Responda 4 perguntas e deixe nossa inteligência encontrar seu próximo cartão.</p>
                                            </div>
                                            <button onClick={() => setWizardStep(1)} className="px-12 py-5 bg-primary text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(167,139,250,0.3)]">
                                                Começar Agora
                                            </button>
                                        </div>
                                    )}

                                    {wizardStep === 1 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black text-white tracking-tight">Qual sua renda mensal?</h3>
                                            <div className="grid gap-4">
                                                {[
                                                    { id: 'low', label: 'Até R$ 2.000', sub: 'Iniciando jornada' },
                                                    { id: 'medium', label: 'R$ 2.000 a R$ 10.000', sub: 'Benefícios intermediários' },
                                                    { id: 'high', label: 'Acima de R$ 10.000', sub: 'Experiência Premium' }
                                                ].map(opt => (
                                                    <button key={opt.id} onClick={() => handleWizardAnswer('income', opt.id)} className="p-6 bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl text-left border border-white/5 hover:border-primary/50 transition-all group">
                                                        <div className="font-black text-xl text-white group-hover:text-primary transition-colors">{opt.label}</div>
                                                        <div className="text-sm text-gray-500">{opt.sub}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {wizardStep === 2 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black text-white tracking-tight">Gasto mensal estimado?</h3>
                                            <div className="grid gap-4">
                                                {[
                                                    { id: 'low', label: 'Até R$ 2.000', sub: 'Uso essencial' },
                                                    { id: 'medium', label: 'R$ 2.000 a R$ 5.000', sub: 'Uso moderado' },
                                                    { id: 'high', label: 'Acima de R$ 5.000', sub: 'Uso intensivo' }
                                                ].map(opt => (
                                                    <button key={opt.id} onClick={() => handleWizardAnswer('spending', opt.id)} className="p-6 bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl text-left border border-white/5 hover:border-primary/50 transition-all group">
                                                        <div className="font-black text-xl text-white group-hover:text-primary transition-colors">{opt.label}</div>
                                                        <div className="text-sm text-gray-500">{opt.sub}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {wizardStep === 3 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black text-white tracking-tight">Aceita anuidade?</h3>
                                            <div className="grid gap-4">
                                                <button onClick={() => handleWizardAnswer('feePreference', 'zero')} className="p-6 bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl text-left border border-white/5 hover:border-primary/50 transition-all group">
                                                    <div className="font-black text-xl text-white group-hover:text-primary transition-colors">Não, quero anuidade zero</div>
                                                    <div className="text-sm text-gray-500">Foco em economia total</div>
                                                </button>
                                                <button onClick={() => handleWizardAnswer('feePreference', 'any')} className="p-6 bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl text-left border border-white/5 hover:border-primary/50 transition-all group">
                                                    <div className="font-black text-xl text-white group-hover:text-primary transition-colors">Sim, pelos benefícios</div>
                                                    <div className="text-sm text-gray-500">Aceito investir para ganhar mais</div>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {wizardStep === 4 && (
                                        <div className="space-y-8">
                                            <h3 className="text-3xl font-black text-white tracking-tight">Seu maior objetivo?</h3>
                                            <div className="grid gap-4">
                                                {[
                                                    { id: 'travel', label: 'Viagens & Milhas', icon: Plane, color: 'text-blue-400' },
                                                    { id: 'cashback', label: 'Dinheiro de Volta', icon: DollarSign, color: 'text-green-400' },
                                                    { id: 'economy', label: 'Economia & Taxas', icon: ShieldCheck, color: 'text-yellow-400' }
                                                ].map(opt => (
                                                    <button key={opt.id} onClick={() => handleWizardAnswer('goal', opt.id)} className="p-6 bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl text-left border border-white/5 hover:border-primary/50 transition-all flex items-center gap-6 group">
                                                        <div className={`w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center ${opt.color} group-hover:scale-110 transition-transform`}><opt.icon size={28} /></div>
                                                        <div>
                                                            <div className="font-black text-xl text-white group-hover:text-primary transition-colors">{opt.label}</div>
                                                            <div className="text-sm text-gray-500">Foco total em {opt.label.toLowerCase()}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {wizardStep === 5 && (
                                        <div className="space-y-12">
                                            <div className="text-center space-y-2">
                                                <h3 className="text-4xl font-black text-white tracking-tighter">Seu Arsenal Recomendado</h3>
                                                <p className="text-gray-400">Estes são os cartões que mais combinam com você.</p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {getWizardResult().map(card => (
                                                    <div key={card.id} className="transform hover:scale-105 transition-all">
                                                        <CreditCard3D card={card} onClick={() => { setSelectedCard(card); setShowWizard(false); }} />
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => { setShowWizard(false); setWizardStep(0); }} className="w-full py-5 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all rounded-2xl font-black uppercase tracking-widest text-xs border border-white/5">
                                                Explorar Todos os Cartões
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Card Details Modal */}
                <AnimatePresence>
                    {selectedCard && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] max-w-5xl w-full relative overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                            >
                                <button
                                    onClick={() => setSelectedCard(null)}
                                    className="absolute top-8 right-8 z-50 p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-2xl text-gray-500 transition-all border border-white/10"
                                >
                                    <X size={24} />
                                </button>

                                {/* Left: Visual */}
                                <div className="w-full md:w-[40%] bg-gradient-to-b from-white/[0.05] to-transparent p-12 flex flex-col items-center justify-center relative border-r border-white/5">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                                    <div className="transform scale-125 rotate-6 hover:rotate-0 transition-all duration-700 z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                                        <CreditCard3D card={selectedCard} />
                                    </div>
                                    <div className="mt-16 text-center z-10 space-y-3">
                                        <h2 className="text-4xl font-black text-white tracking-tighter">{selectedCard.name}</h2>
                                        <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 inline-block">
                                            {selectedCard.bank}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="flex-1 p-12 space-y-10 overflow-y-auto max-h-[80vh] custom-scrollbar">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-2">Anuidade</div>
                                            <div className="text-2xl font-black text-white">
                                                {selectedCard.annualFee === 0 ? "Grátis" : `R$ ${selectedCard.annualFee}`}
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-2">Renda Mínima</div>
                                            <div className="text-2xl font-black text-white">
                                                R$ {selectedCard.minIncome.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                                            <Crown size={22} className="text-yellow-500" />
                                            Benefícios de Elite
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedCard.benefits.concat(selectedCard.exclusiveBenefits || []).map((benefit, i) => (
                                                <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                                                    <span className="text-sm text-gray-400 font-medium leading-relaxed">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedCard.loungeAccess !== "none" && (
                                        <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-3xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                                <Plane size={80} />
                                            </div>
                                            <h4 className="font-black text-purple-400 mb-3 flex items-center gap-3 uppercase tracking-widest text-xs">
                                                <Plane size={18} /> Acesso VIP Global
                                            </h4>
                                            <p className="text-gray-300 leading-relaxed">
                                                {selectedCard.loungeAccess === "unlimited" ? "Acesso ilimitado e gratuito" : "Acessos exclusivos"}
                                                através do programa <span className="text-white font-bold">{selectedCard.loungeType?.join(" & ")}</span>.
                                            </p>
                                        </div>
                                    )}

                                    <a
                                        href={selectedCard.applyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-6 bg-white text-black font-black rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-3 text-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95 group"
                                    >
                                        Solicitar Cartão Agora
                                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
