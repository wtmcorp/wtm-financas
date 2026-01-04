"use client";

import { useState, useMemo } from "react";
import {
    Calculator, Calendar, DollarSign, TrendingUp, Home, Car,
    Percent, PieChart, Coffee, Fuel, Clock, Lock, User,
    BookOpen, Lightbulb, Plane, Briefcase, AlertCircle, Search, X, Check, Wrench, Globe, ArrowRight, Sparkles
} from "lucide-react";
import Calculators from "@/components/tools/Calculators";
import MoreCalculators from "@/components/tools/MoreCalculators";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import { motion, AnimatePresence } from "framer-motion";

export default function ToolsPage() {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Todas");

    const tools = [
        // --- Original Tools ---
        { id: "net-salary", icon: DollarSign, title: "Salário Líquido", desc: "Calcule descontos de INSS e IRRF", category: "Trabalho" },
        { id: "vacation", icon: Calendar, title: "Férias", desc: "Estime o valor das suas férias + 1/3", category: "Trabalho" },
        { id: "thirteenth", icon: Calculator, title: "13º Salário", desc: "Calcule o valor proporcional", category: "Trabalho" },
        { id: "termination", icon: Briefcase, title: "Rescisão", desc: "Estimativa de verbas rescisórias", category: "Trabalho" },
        { id: "loan", icon: Home, title: "Financiamento", desc: "Simule parcelas de imóveis/veículos", category: "Crédito" },
        { id: "compound-interest", icon: TrendingUp, title: "Juros Compostos", desc: "Projeção de investimentos", category: "Investimentos" },
        { id: "fire", icon: TrendingUp, title: "FIRE", desc: "Anos para independência financeira", category: "Investimentos" },
        { id: "rent-vs-buy", icon: Home, title: "Alugar vs Comprar", desc: "Qual vale mais a pena?", category: "Crédito" },
        { id: "uber-vs-car", icon: Car, title: "Uber vs Carro", desc: "Comparativo de custos mensais", category: "Utilidades" },
        { id: "rate-converter", icon: Percent, title: "Conversor de Taxas", desc: "Mensal ↔ Anual", category: "Investimentos" },
        { id: "inflation", icon: TrendingUp, title: "Inflação", desc: "Poder de compra no futuro", category: "Investimentos" },
        { id: "budget-50-30-20", icon: PieChart, title: "Regra 50/30/20", desc: "Divisão ideal do orçamento", category: "Orçamento" },
        { id: "fuel", icon: Fuel, title: "Álcool vs Gasolina", desc: "Qual compensa abastecer?", category: "Utilidades" },
        { id: "overtime", icon: Clock, title: "Horas Extras", desc: "Cálculo do valor da hora", category: "Trabalho" },
        { id: "investor-profile", icon: User, title: "Perfil Investidor", desc: "Descubra seu perfil de risco", category: "Investimentos" },
        { id: "glossary", icon: BookOpen, title: "Glossário", desc: "Termos financeiros explicados", category: "Educação" },
        { id: "tips", icon: Lightbulb, title: "Dica do Dia", desc: "Conselhos financeiros rápidos", category: "Educação" },
        { id: "trip", icon: Plane, title: "Viagem", desc: "Quanto guardar para viajar", category: "Orçamento" },

        // --- Financial & Productivity Tools ---
        { id: "currency-converter", icon: Globe, title: "Conversor de Moedas", desc: "Taxas de câmbio mundiais em tempo real", category: "Utilidades" },
        { id: "amortization", icon: Calculator, title: "Amortização", desc: "Simule economia com parcelas antecipadas", category: "Crédito" },
        { id: "card-interest", icon: Percent, title: "Juros de Cartão", desc: "O custo de pagar o mínimo", category: "Crédito" },
        { id: "investment-compare", icon: TrendingUp, title: "Comparador", desc: "CDB vs LCI vs LCA vs Tesouro", category: "Investimentos" },
        { id: "savings-yield", icon: TrendingUp, title: "Rendimento Poupança", desc: "Simule o retorno da poupança", category: "Investimentos" },
        { id: "cdi-vs-savings", icon: TrendingUp, title: "CDI vs Poupança", desc: "Comparativo de rentabilidade", category: "Investimentos" },
        { id: "roi", icon: Percent, title: "ROI", desc: "Retorno sobre Investimento", category: "Negócios" },
        { id: "profit-margin", icon: DollarSign, title: "Margem de Lucro", desc: "Calcule sua margem real", category: "Negócios" },
        { id: "break-even", icon: TrendingUp, title: "Ponto de Equilíbrio", desc: "Quando começa a lucrar?", category: "Negócios" },
        { id: "discount", icon: Percent, title: "Calc. de Desconto", desc: "Valor final com desconto", category: "Utilidades" },
        { id: "raise", icon: TrendingUp, title: "Calc. de Aumento", desc: "Novo salário com %", category: "Trabalho" },
        { id: "price-per-unit", icon: DollarSign, title: "Qual compensa?", desc: "Preço por quantidade", category: "Utilidades" },
        { id: "rule-of-three", icon: Calculator, title: "Regra de Três", desc: "Cálculo proporcional simples", category: "Utilidades" },
        { id: "business-days", icon: Calendar, title: "Dias Úteis", desc: "Contagem de dias de trabalho", category: "Trabalho" },
        { id: "hour-sum", icon: Clock, title: "Soma de Horas", desc: "Adicione horas e minutos", category: "Utilidades" },
        { id: "receipt", icon: Briefcase, title: "Gerador de Recibo", desc: "Crie um recibo simples", category: "Negócios" },
        { id: "cpf-validator", icon: Check, title: "Validador CPF", desc: "Verifique se é válido", category: "Utilidades" },
        { id: "cnpj-validator", icon: Check, title: "Validador CNPJ", desc: "Verifique se é válido", category: "Utilidades" },
        { id: "pomodoro", icon: Clock, title: "Pomodoro Timer", desc: "Foco e produtividade", category: "Utilidades" },
    ];

    const categories = ["Todas", ...Array.from(new Set(tools.map(t => t.category)))];

    const filteredTools = useMemo(() => {
        return tools.filter(tool => {
            const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "Todas" || tool.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-7xl mx-auto space-y-12">
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="space-y-8 p-8 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="px-4 py-1.5 bg-white/5 text-primary border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 backdrop-blur-md">
                                    <Sparkles size={14} className="animate-pulse" />
                                    Wtm Utility Hub
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                                Central de <br />
                                <span className="gradient-text">Utilidades</span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                                <span className="text-white font-black">{tools.length}</span> ferramentas profissionais para automatizar sua vida financeira e produtividade.
                            </p>
                        </div>

                        <div className="relative w-full md:w-[450px] group">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="O que você precisa calcular?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="relative w-full bg-black/60 border border-white/10 rounded-[2rem] pl-16 pr-14 py-6 text-white text-lg focus:border-primary/50 outline-none transition-all placeholder:text-gray-600 backdrop-blur-xl"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.header>

                {/* Featured Tools */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.slice(0, 3).map((tool) => (
                        <motion.button
                            key={`featured-${tool.id}`}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedTool(tool.id)}
                            className="p-6 rounded-[2rem] bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-white/10 text-left relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <tool.icon size={60} />
                            </div>
                            <div className="relative z-10 space-y-2">
                                <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest">Destaque</span>
                                <h3 className="text-xl font-black text-white">{tool.title}</h3>
                                <p className="text-xs text-gray-400 font-medium">{tool.desc}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Categories Filter */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${activeCategory === cat
                                ? "bg-primary text-black border-primary shadow-[0_10px_30px_rgba(167,139,250,0.3)] scale-105"
                                : "bg-white/5 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="popLayout">
                    {filteredTools.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {filteredTools.map((tool) => (
                                <motion.button
                                    layout
                                    key={tool.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -8 }}
                                    onClick={() => setSelectedTool(tool.id)}
                                    className="card-premium p-8 text-left group relative overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/15 transition-all duration-700" />

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-white/[0.03] backdrop-blur-md rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-all duration-500 border border-white/5 group-hover:border-primary/20 group-hover:rotate-6 group-hover:scale-110 shadow-2xl">
                                            <tool.icon className="text-gray-400 group-hover:text-primary transition-colors" size={32} />
                                        </div>
                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-primary/50 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">{tool.category}</span>
                                            <h3 className="text-white font-black text-2xl tracking-tighter leading-none group-hover:text-white transition-colors">
                                                {tool.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm font-medium leading-relaxed group-hover:text-gray-400 transition-colors line-clamp-2">
                                                {tool.desc}
                                            </p>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Acessar Ferramenta</span>
                                            <ArrowRight size={18} className="text-primary" />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-white/5"
                        >
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                                <Search className="text-gray-700" size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3">Nenhuma ferramenta encontrada</h3>
                            <p className="text-gray-500 text-lg">Tente buscar por outros termos ou explore as categorias.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selectedTool && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="card-premium w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10"
                        >
                            <button
                                onClick={() => setSelectedTool(null)}
                                className="absolute top-8 right-8 w-12 h-12 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-2xl flex items-center justify-center text-gray-500 transition-all border border-white/10 active:scale-90 z-50"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative">
                                {selectedTool === "currency-converter" ? (
                                    <CurrencyConverter />
                                ) : (
                                    <div className="space-y-8">
                                        <Calculators type={selectedTool} />
                                        <MoreCalculators type={selectedTool} />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
