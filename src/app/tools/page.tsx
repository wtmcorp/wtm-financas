"use client";

import { useState } from "react";
import ExpenseTracker from "@/components/tools/ExpenseTracker";
import BudgetCalculator from "@/components/tools/BudgetCalculator";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import LoanCalculator from "@/components/tools/LoanCalculator";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import InvestmentTools from "@/components/tools/new/InvestmentTools";
import WorkAndTaxTools from "@/components/tools/new/WorkAndTaxTools";
import LifestyleTools from "@/components/tools/new/LifestyleTools";
import { Tooltip } from "@/components/ui/Tooltip";
import { Wrench, TrendingUp, Briefcase, Heart, Calculator, Search } from "lucide-react";

export default function ToolsPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const tabs = [
        { id: "all", label: "Todas", icon: Wrench },
        { id: "invest", label: "Investimentos", icon: TrendingUp },
        { id: "work", label: "Trabalho & Impostos", icon: Briefcase },
        { id: "lifestyle", label: "Estilo de Vida", icon: Heart },
        { id: "basic", label: "Essenciais", icon: Calculator },
    ];

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                            <Wrench size={28} />
                        </div>
                        Arsenal Financeiro
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        +30 ferramentas profissionais para dominar seu dinheiro.
                    </p>
                </div>

                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar ferramenta..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap
                            ${activeTab === tab.id
                                ? 'bg-primary text-black shadow-[0_0_20px_rgba(255,215,0,0.2)]'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}
                        `}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-12">
                {(activeTab === "all" || activeTab === "basic") && (
                    <section className="space-y-6">
                        <Tooltip text="Ferramentas fundamentais para organizar sua vida financeira diária, desde o controle de gastos até simulações de empréstimos.">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Calculator className="text-primary" /> Ferramentas Essenciais
                                </h2>
                                <p className="text-sm text-gray-500">O básico bem feito para quem quer sair do zero e dominar o orçamento.</p>
                            </div>
                        </Tooltip>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="lg:col-span-2">
                                <ExpenseTracker />
                            </div>
                            <BudgetCalculator />
                            <CompoundInterestCalculator />
                            <CurrencyConverter />
                            <LoanCalculator />
                        </div>
                    </section>
                )}

                {(activeTab === "all" || activeTab === "invest") && (
                    <section className="space-y-6">
                        <Tooltip text="Calculadoras para investidores que buscam maximizar dividendos, calcular preço médio e planejar a independência financeira (FIRE).">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <TrendingUp className="text-primary" /> Investimentos de Elite
                                </h2>
                                <p className="text-sm text-gray-500">Ferramentas avançadas para quem já investe e quer otimizar a rentabilidade.</p>
                            </div>
                        </Tooltip>
                        <InvestmentTools />
                    </section>
                )}

                {(activeTab === "all" || activeTab === "work") && (
                    <section className="space-y-6">
                        <Tooltip text="Tudo o que você precisa para entender seu salário líquido, benefícios como FGTS e 13º, e planejar suas férias.">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Briefcase className="text-primary" /> Trabalho & Carreira
                                </h2>
                                <p className="text-sm text-gray-500">Calcule seu valor real de mercado e planeje sua transição de carreira ou aposentadoria.</p>
                            </div>
                        </Tooltip>
                        <WorkAndTaxTools />
                    </section>
                )}

                {(activeTab === "all" || activeTab === "lifestyle") && (
                    <section className="space-y-6">
                        <Tooltip text="Analise o custo real dos seus hábitos, gerencie assinaturas e planeje viagens sem estourar o orçamento.">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Heart className="text-primary" /> Estilo de Vida & Hábitos
                                </h2>
                                <p className="text-sm text-gray-500">Veja como seus pequenos gastos diários impactam seu futuro milionário.</p>
                            </div>
                        </Tooltip>
                        <LifestyleTools />
                    </section>
                )}
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    🚀 <strong>Dica de Ouro:</strong> A consistência é o segredo da riqueza. Use estas ferramentas para planejar cada passo e veja seu patrimônio explodir.
                </p>
            </div>
        </div>
    );
}
