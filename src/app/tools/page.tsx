"use client";

import { useState } from "react";
import {
    Calculator, Calendar, DollarSign, TrendingUp, Home, Car,
    Percent, PieChart, Coffee, Fuel, Clock, Lock, User,
    BookOpen, Lightbulb, Plane, Briefcase, AlertCircle
} from "lucide-react";
import Calculators from "@/components/tools/Calculators";

export default function ToolsPage() {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);

    const tools = [
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
    ];

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-white flex items-center gap-3">
                    <Wrench className="text-primary" size={32} />
                    Ferramentas & Calculadoras
                </h1>
                <p className="text-gray-400 mt-1">20 utilitários para facilitar sua vida financeira.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.id)}
                        className="bg-card border border-white/10 p-6 rounded-2xl hover:border-primary/50 hover:bg-white/5 transition-all text-left group"
                    >
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <tool.icon className="text-primary" size={20} />
                        </div>
                        <h3 className="text-white font-bold mb-1">{tool.title}</h3>
                        <p className="text-xs text-gray-400">{tool.desc}</p>
                    </button>
                ))}
            </div>

            {selectedTool && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-6 relative animate-in zoom-in-95">
                        <button
                            onClick={() => setSelectedTool(null)}
                            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <Calculators type={selectedTool} />
                    </div>
                </div>
            )}
        </div>
    );
}

import { Wrench, X } from "lucide-react";
