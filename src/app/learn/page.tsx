"use client";

import { useState } from "react";
import ModuleCard from "@/components/education/ModuleCard";
import LessonModal from "@/components/education/LessonModal";
import { GraduationCap, BookOpen, TrendingUp, ShieldCheck, Coins, Globe, BrainCircuit } from "lucide-react";

export default function LearnPage() {
    const [activeModule, setActiveModule] = useState<string | null>(null);

    // Mock Data for Modules
    const modules = [
        {
            id: "fundamentals",
            title: "Fundamentos da Riqueza",
            description: "Aprenda a mentalidade e os primeiros passos para organizar sua vida financeira e sair das dívidas.",
            icon: ShieldCheck,
            level: "Iniciante" as const,
            progress: 80,
            totalLessons: 5,
            completedLessons: 4,
            lessons: [
                {
                    id: "mindset",
                    title: "Mentalidade de Investidor",
                    duration: "10 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Para construir riqueza, o primeiro passo não é ganhar mais, mas pensar diferente. A mentalidade de escassez foca no que falta; a de abundância foca no que pode ser criado.</p>
                            <h3>1. Pague-se Primeiro</h3>
                            <p>Antes de pagar contas ou gastar, separe uma parte para o seu futuro. Trate seu investimento como um boleto obrigatório.</p>
                            <h3>2. Ativos vs Passivos</h3>
                            <p>Ativos colocam dinheiro no seu bolso (ações, imóveis de aluguel). Passivos tiram dinheiro (carro caro, assinaturas não usadas). Foque em acumular ativos.</p>
                        </div>
                    )
                },
                {
                    id: "budget",
                    title: "O Orçamento Blindado",
                    duration: "15 min",
                    type: "article" as const,
                    completed: true,
                    content: <p>Conteúdo sobre como criar um orçamento que funciona...</p>
                },
                {
                    id: "emergency",
                    title: "Reserva de Emergência",
                    duration: "12 min",
                    type: "article" as const,
                    completed: true,
                    content: <p>Por que você precisa de 6 meses de custo de vida guardados...</p>
                },
                {
                    id: "debt",
                    title: "Matando Dívidas",
                    duration: "20 min",
                    type: "article" as const,
                    completed: true,
                    content: <p>Estratégias Avalanche e Bola de Neve explicadas...</p>
                },
                {
                    id: "goals",
                    title: "Definindo Metas Claras",
                    duration: "8 min",
                    type: "article" as const,
                    completed: false,
                    content: <p>Como transformar sonhos em metas financeiras tangíveis...</p>
                }
            ]
        },
        {
            id: "fixed-income",
            title: "Mestre da Renda Fixa",
            description: "Entenda onde investir com segurança: CDB, Tesouro Direto, LCI/LCA e como bater a poupança.",
            icon: BookOpen,
            level: "Iniciante" as const,
            progress: 30,
            totalLessons: 6,
            completedLessons: 2,
            lessons: [
                {
                    id: "selic-cdi",
                    title: "O que é Selic e CDI?",
                    duration: "15 min",
                    type: "article" as const,
                    completed: true,
                    content: <p>A sopa de letrinhas explicada de forma simples...</p>
                },
                {
                    id: "tesouro",
                    title: "Tesouro Direto: Empreste para o Governo",
                    duration: "18 min",
                    type: "article" as const,
                    completed: true,
                    content: <p>Selic, IPCA+ ou Prefixado? Qual escolher?</p>
                }
            ]
        },
        {
            id: "stocks",
            title: "Ações e Renda Variável",
            description: "Torne-se sócio das maiores empresas do Brasil e do mundo. Aprenda a analisar e escolher ações.",
            icon: TrendingUp,
            level: "Intermediário" as const,
            progress: 0,
            totalLessons: 8,
            completedLessons: 0,
            lessons: []
        },
        {
            id: "fiis",
            title: "Vivendo de Renda com FIIs",
            description: "Invista em imóveis sem precisar comprar um apartamento. Receba aluguéis mensais isentos de IR.",
            icon: Coins,
            level: "Intermediário" as const,
            progress: 0,
            totalLessons: 5,
            completedLessons: 0,
            lessons: []
        },
        {
            id: "global",
            title: "Investidor Global",
            description: "Proteja seu patrimônio investindo em Dólar, Stocks e REITs. A importância da diversificação internacional.",
            icon: Globe,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 4,
            completedLessons: 0,
            isLocked: true,
            lessons: []
        },
        {
            id: "crypto",
            title: "Criptoeconomia",
            description: "Bitcoin, Ethereum e DeFi. Entenda a nova economia digital e como investir com cautela.",
            icon: BrainCircuit,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 6,
            completedLessons: 0,
            isLocked: true,
            lessons: []
        }
    ];

    const activeModuleData = modules.find(m => m.id === activeModule);

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <header className="reveal space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <GraduationCap size={16} className="text-primary" />
                        <span className="text-sm font-medium text-primary">Wtm Academy</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Domine o <span className="gradient-text">Jogo do Dinheiro</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Educação financeira não é sobre economizar cafezinho. É sobre liberdade. Escolha sua trilha e comece a evoluir.
                    </p>
                </header>

                {/* Progress Overview */}
                <div className="reveal card-premium p-8 bg-gradient-to-r from-[#0f0f13] to-[#1a1a2e]" style={{ animationDelay: '0.1s' }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray="251.2" strokeDashoffset="200" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-2xl font-black text-white">20%</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Nível 1: Aprendiz</h3>
                                <p className="text-sm text-gray-400">Complete mais 3 módulos para avançar.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="text-center px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-2xl font-black text-white">6</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Aulas</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-2xl font-black text-white">2</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Módulos</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-2xl font-black text-white">0</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Certificados</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal" style={{ animationDelay: '0.2s' }}>
                    {modules.map((module) => (
                        <ModuleCard
                            key={module.id}
                            {...module}
                            onClick={() => setActiveModule(module.id)}
                        />
                    ))}
                </div>

                {/* Active Lesson Modal */}
                {activeModule && activeModuleData && (
                    <LessonModal
                        moduleTitle={activeModuleData.title}
                        lessons={activeModuleData.lessons}
                        onClose={() => setActiveModule(null)}
                    />
                )}
            </div>
        </div>
    );
}
