"use client";

import { useState } from "react";
import {
    Calculator, Calendar, DollarSign, TrendingUp, Home, Car,
    Percent, PieChart, Coffee, Fuel, Clock, Lock, User,
    BookOpen, Lightbulb, Plane, Briefcase, AlertCircle
} from "lucide-react";
import Calculators from "@/components/tools/Calculators";

import MoreCalculators from "@/components/tools/MoreCalculators";

export default function ToolsPage() {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);

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

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="reveal space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-primary rounded-full" />
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                            Central de <span className="gradient-text">Utilidades</span>
                        </h1>
                    </div>
                    <p className="text-gray-500 text-lg font-medium max-w-2xl">
                        40 ferramentas inteligentes para simplificar suas decisões financeiras e produtividade diária.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal" style={{ animationDelay: '0.1s' }}>
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setSelectedTool(tool.id)}
                            className="card-premium p-6 text-left group hover:scale-[1.02]"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors border border-primary/20">
                                <tool.icon className="text-primary" size={24} />
                            </div>
                            <h3 className="text-white font-black text-lg tracking-tight mb-2 group-hover:text-primary transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                {tool.desc}
                            </p>
                        </button>
                    ))}
                </div>
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
                            <Calculators type={selectedTool} />
                            <MoreCalculators type={selectedTool} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import { Wrench, X, Check } from "lucide-react";
