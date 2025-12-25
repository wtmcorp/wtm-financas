"use client";

import { useState, useMemo } from "react";
import {
    Calculator, Calendar, DollarSign, TrendingUp, Home, Car,
    Percent, PieChart, Coffee, Fuel, Clock, Lock, User,
    BookOpen, Lightbulb, Plane, Briefcase, AlertCircle, Search, X, Check, Wrench, Globe
} from "lucide-react";
import Calculators from "@/components/tools/Calculators";
import MoreCalculators from "@/components/tools/MoreCalculators";
import CurrencyConverter from "@/components/tools/CurrencyConverter";

export default function ToolsPage() {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const tools = [
        // --- Original 20 Tools ---
        { id: "net-salary", icon: DollarSign, title: "Salário Líquido", desc: "Calcule descontos de INSS e IRRF" },
        { id: "vacation", icon: Calendar, title: "Férias", desc: "Estime o valor das suas férias + 1/3" },
        { id: "thirteenth", icon: Calculator, title: "13º Salário", desc: "Calcule o valor proporcional" },
        { id: "termination", icon: Briefcase, title: "Rescisão", desc: "Estimativa de verbas rescisórias" },
        { id: "loan", icon: Home, title: "Financiamento", desc: "Simule parcelas de imóveis/veículos" },
        { id: "compound-interest", icon: TrendingUp, title: "Juros Compostos", desc: "Projeção de investimentos" },
        { id: "fire", icon: TrendingUp, title: "FIRE", desc: "Anos para independência financeira" },
        { id: "rent-vs-buy", icon: Home, title: "Alugar vs Comprar", desc: "Qual vale mais a pena?" },
        { id: "uber-vs-car", icon: Car, title: "Uber vs Carro", desc: "Comparativo de custos mensais" },
        { id: "rate-converter", icon: Percent, title: "Conversor de Taxas", desc: "Mensal ↔ Anual" },
        { id: "inflation", icon: TrendingUp, title: "Inflação", desc: "Poder de compra no futuro" },
        { id: "budget-50-30-20", icon: PieChart, title: "Regra 50/30/20", desc: "Divisão ideal do orçamento" },
        { id: "bbq", icon: Coffee, title: "Churrasco", desc: "Calcule carnes e bebidas" },
        { id: "fuel", icon: Fuel, title: "Álcool vs Gasolina", desc: "Qual compensa abastecer?" },
        { id: "overtime", icon: Clock, title: "Horas Extras", desc: "Cálculo do valor da hora" },
        { id: "password", icon: Lock, title: "Gerador de Senha", desc: "Crie senhas seguras" },
        { id: "investor-profile", icon: User, title: "Perfil Investidor", desc: "Descubra seu perfil de risco" },
        { id: "glossary", icon: BookOpen, title: "Glossário", desc: "Termos financeiros explicados" },
        { id: "tips", icon: Lightbulb, title: "Dica do Dia", desc: "Conselhos financeiros rápidos" },
        { id: "trip", icon: Plane, title: "Viagem", desc: "Quanto guardar para viajar" },

        // --- NEW 20 Tools ---
        { id: "currency-converter", icon: Globe, title: "Conversor de Moedas", desc: "Taxas de câmbio mundiais em tempo real" },
        { id: "savings-yield", icon: TrendingUp, title: "Rendimento Poupança", desc: "Simule o retorno da poupança" },
        { id: "cdi-vs-savings", icon: TrendingUp, title: "CDI vs Poupança", desc: "Comparativo de rentabilidade" },
        { id: "roi", icon: Percent, title: "ROI", desc: "Retorno sobre Investimento" },
        { id: "profit-margin", icon: DollarSign, title: "Margem de Lucro", desc: "Calcule sua margem real" },
        { id: "break-even", icon: TrendingUp, title: "Ponto de Equilíbrio", desc: "Quando começa a lucrar?" },
        { id: "discount", icon: Percent, title: "Calc. de Desconto", desc: "Valor final com desconto" },
        { id: "raise", icon: TrendingUp, title: "Calc. de Aumento", desc: "Novo salário com %" },
        { id: "price-per-unit", icon: DollarSign, title: "Qual compensa?", desc: "Preço por quantidade" },
        { id: "rule-of-three", icon: Calculator, title: "Regra de Três", desc: "Cálculo proporcional simples" },
        { id: "business-days", icon: Calendar, title: "Dias Úteis", desc: "Contagem de dias de trabalho" },
        { id: "hour-sum", icon: Clock, title: "Soma de Horas", desc: "Adicione horas e minutos" },
        { id: "receipt", icon: Briefcase, title: "Gerador de Recibo", desc: "Crie um recibo simples" },
        { id: "cpf-validator", icon: Check, title: "Validador CPF", desc: "Verifique se é válido" },
        { id: "cnpj-validator", icon: Check, title: "Validador CNPJ", desc: "Verifique se é válido" },
        { id: "pomodoro", icon: Clock, title: "Pomodoro Timer", desc: "Foco e produtividade" },
        { id: "unit-converter", icon: Calculator, title: "Conversor Medidas", desc: "Peso, Distância, etc." },
        { id: "tip-calc", icon: DollarSign, title: "Gorjeta", desc: "Dividir conta e 10%" },
        { id: "pizza-calc", icon: Coffee, title: "Calc. de Pizza", desc: "Quantas pizzas pedir?" },
        { id: "qr-code", icon: Calculator, title: "Gerador QR Code", desc: "Crie códigos QR" },
        { id: "number-draw", icon: Calculator, title: "Sorteio", desc: "Sorteador de números" },
    ];

    const filteredTools = useMemo(() => {
        return tools.filter(tool =>
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="reveal space-y-8 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse-slow" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(167,139,250,0.5)]" />
                                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                    Central de <br />
                                    <span className="gradient-text">Utilidades</span>
                                </h1>
                            </div>
                            <p className="text-gray-400 text-lg font-medium max-w-2xl leading-relaxed">
                                <span className="text-white font-black">{tools.length}</span> ferramentas inteligentes projetadas para simplificar suas decisões financeiras e maximizar sua produtividade.
                            </p>
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={22} />
                            <input
                                type="text"
                                placeholder="Buscar ferramenta..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-[1.5rem] pl-14 pr-12 py-5 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-600 focus:bg-black/60 focus:shadow-[0_0_30px_rgba(167,139,250,0.15)]"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal" style={{ animationDelay: '0.1s' }}>
                        {filteredTools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setSelectedTool(tool.id)}
                                className="card-premium p-8 text-left group hover:scale-[1.03] transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />

                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500 border border-primary/20 group-hover:rotate-6 group-hover:scale-110">
                                    <tool.icon className="text-primary" size={28} />
                                </div>
                                <h3 className="text-white font-black text-xl tracking-tight mb-3 group-hover:text-primary transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed group-hover:text-gray-400 transition-colors">
                                    {tool.desc}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                    Abrir Ferramenta
                                    <Wrench size={10} />
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 reveal">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <Search className="text-gray-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Nenhuma ferramenta encontrada</h3>
                        <p className="text-gray-500">Tente buscar por outros termos ou palavras-chave.</p>
                    </div>
                )}
            </div>

            {selectedTool && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="card-premium w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setSelectedTool(null)}
                            className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all border border-white/10 active:scale-90"
                        >
                            <X size={20} />
                        </button>

                        <div className="mt-4">
                            {selectedTool === "currency-converter" ? (
                                <CurrencyConverter />
                            ) : (
                                <>
                                    <Calculators type={selectedTool} />
                                    <MoreCalculators type={selectedTool} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

