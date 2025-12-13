"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Clock, Briefcase, ShoppingBag, Wrench, Globe, ChevronDown, ChevronUp } from "lucide-react";

interface IncomeIdea {
    id: string;
    title: string;
    description: string;
    category: "Rápida" | "Serviços" | "Digital" | "Alimentação";
    difficulty: "Fácil" | "Médio" | "Difícil";
    potentialEarnings: string;
    icon: any;
    steps: string[];
    calculator?: {
        label: string;
        unitPrice: number;
        unitLabel: string;
    };
}

const incomeIdeas: IncomeIdea[] = [
    {
        id: "venda-usados",
        title: "Venda de Itens Parados",
        description: "Transforme roupas, eletrônicos e móveis antigos em dinheiro rápido.",
        category: "Rápida",
        difficulty: "Fácil",
        potentialEarnings: "R$ 100 - R$ 2.000",
        icon: ShoppingBag,
        steps: [
            "Separe tudo que não usa há mais de 6 meses.",
            "Tire fotos boas (luz do dia, fundo neutro).",
            "Anuncie na OLX, Facebook Marketplace e Enjoei.",
            "Responda rápido aos interessados."
        ],
        calculator: {
            label: "Estimativa de Venda",
            unitPrice: 50,
            unitLabel: "itens vendidos (média R$ 50)"
        }
    },
    {
        id: "marido-aluguel",
        title: "Pequenos Reparos (Marido de Aluguel)",
        description: "Instalação de cortinas, troca de chuveiro, montagem de móveis.",
        category: "Serviços",
        difficulty: "Médio",
        potentialEarnings: "R$ 100 - R$ 300 por dia",
        icon: Wrench,
        steps: [
            "Liste o que você sabe fazer (pintura, elétrica básica, montagem).",
            "Faça um cartão digital e mande no grupo do condomínio/bairro.",
            "Cobre um preço justo (pesquise a média da região).",
            "Seja pontual e limpo."
        ],
        calculator: {
            label: "Ganhos por Serviço",
            unitPrice: 120,
            unitLabel: "serviços realizados"
        }
    },
    {
        id: "entregas",
        title: "Entregas por App",
        description: "Use sua moto ou bicicleta para entregar comida ou encomendas.",
        category: "Serviços",
        difficulty: "Fácil",
        potentialEarnings: "R$ 50 - R$ 150 por dia",
        icon: Clock,
        steps: [
            "Cadastre-se no iFood, Rappi ou Uber Eats.",
            "Tenha os documentos em dia.",
            "Aproveite horários de pico (almoço e jantar).",
            "Use equipamentos de segurança."
        ],
        calculator: {
            label: "Ganhos por Entrega",
            unitPrice: 8,
            unitLabel: "entregas realizadas"
        }
    },
    {
        id: "doces-salgados",
        title: "Venda de Doces/Salgados",
        description: "Brigadeiros, bolos de pote ou salgados para festas.",
        category: "Alimentação",
        difficulty: "Médio",
        potentialEarnings: "R$ 200 - R$ 1.000 por semana",
        icon: DollarSign,
        steps: [
            "Comece com receitas que você já domina.",
            "Ofereça degustação para amigos e vizinhos.",
            "Crie um Instagram com fotos bonitas dos produtos.",
            "Aceite encomendas para festas."
        ],
        calculator: {
            label: "Lucro Estimado",
            unitPrice: 3,
            unitLabel: "unidades vendidas (lucro)"
        }
    },
    {
        id: "freelancer",
        title: "Freelancer Digital",
        description: "Redação, design, edição de vídeo ou suporte virtual.",
        category: "Digital",
        difficulty: "Médio",
        potentialEarnings: "R$ 500 - R$ 3.000 por mês",
        icon: Globe,
        steps: [
            "Crie perfil no Workana, 99Freelas ou VintePila.",
            "Monte um portfólio simples (pode ser no Google Drive).",
            "Comece cobrando menos para ganhar avaliações.",
            "Cumpra os prazos rigorosamente."
        ],
        calculator: {
            label: "Ganhos por Projeto",
            unitPrice: 150,
            unitLabel: "projetos concluídos"
        }
    }
];

export default function ExtraIncomeIdeas() {
    const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
    const [calculatorInput, setCalculatorInput] = useState<string>("");

    const calculateEarnings = (unitPrice: number) => {
        const quantity = parseFloat(calculatorInput) || 0;
        return (quantity * unitPrice).toFixed(2);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="text-yellow-400" size={24} />
                Ideias de Renda Extra
            </h3>
            <p className="text-gray-400 text-sm mb-6">
                Opções práticas para começar hoje e colocar dinheiro no bolso.
            </p>

            <div className="grid gap-4">
                {incomeIdeas.map((idea) => (
                    <div key={idea.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <button
                            onClick={() => {
                                setSelectedIdea(selectedIdea === idea.id ? null : idea.id);
                                setCalculatorInput("");
                            }}
                            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <idea.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">{idea.title}</h4>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">
                                            {idea.category}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded ${idea.difficulty === "Fácil" ? "bg-green-500/20 text-green-400" :
                                                idea.difficulty === "Médio" ? "bg-yellow-500/20 text-yellow-400" :
                                                    "bg-red-500/20 text-red-400"
                                            }`}>
                                            {idea.difficulty}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {selectedIdea === idea.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                        </button>

                        <AnimatePresence>
                            {selectedIdea === idea.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-white/10"
                                >
                                    <div className="p-4 space-y-4">
                                        <p className="text-gray-300">{idea.description}</p>

                                        <div>
                                            <h5 className="font-bold text-white mb-2">Como Começar:</h5>
                                            <ul className="space-y-2">
                                                {idea.steps.map((step, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                                                        <span className="text-primary mt-1">•</span>
                                                        {step}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-400">Potencial de Ganhos:</span>
                                                <span className="text-green-400 font-bold">{idea.potentialEarnings}</span>
                                            </div>

                                            {idea.calculator && (
                                                <div className="mt-4 pt-4 border-t border-white/10">
                                                    <label className="text-sm text-white font-medium block mb-2">
                                                        Calculadora de Ganhos:
                                                    </label>
                                                    <div className="flex gap-3 items-end">
                                                        <div className="flex-1">
                                                            <input
                                                                type="number"
                                                                value={calculatorInput}
                                                                onChange={(e) => setCalculatorInput(e.target.value)}
                                                                placeholder="0"
                                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-primary/50"
                                                            />
                                                            <span className="text-xs text-gray-500 mt-1 block">
                                                                {idea.calculator.unitLabel}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1 text-right">
                                                            <span className="text-xs text-gray-400 block mb-1">Você ganha:</span>
                                                            <span className="text-xl font-bold text-primary">
                                                                R$ {calculateEarnings(idea.calculator.unitPrice)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
