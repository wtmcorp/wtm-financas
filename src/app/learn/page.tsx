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
                    ),
                    quiz: {
                        question: "O que é um Ativo financeiro?",
                        options: [
                            "Algo que tira dinheiro do seu bolso (ex: carro)",
                            "Algo que coloca dinheiro no seu bolso (ex: ações)",
                            "Qualquer bem que você possui",
                            "Dinheiro guardado embaixo do colchão"
                        ],
                        correctAnswer: 1
                    }
                },
                {
                    id: "budget",
                    title: "O Orçamento Blindado",
                    duration: "15 min",
                    type: "article" as const,
                    completed: true,
                    content: <p>Conteúdo sobre como criar um orçamento que funciona...</p>,
                    quiz: {
                        question: "Qual a regra recomendada para divisão de renda?",
                        options: [
                            "50-30-20 (Necessidades, Desejos, Investimentos)",
                            "80-20 (Gastos, Investimentos)",
                            "100-0 (Gastar tudo)",
                            "60-40 (Necessidades, Lazer)"
                        ],
                        correctAnswer: 0
                    }
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
                    content: <p>A sopa de letrinhas explicada de forma simples...</p>,
                    quiz: {
                        question: "O que acontece com a Renda Fixa quando a Selic sobe?",
                        options: [
                            "Ela rende menos",
                            "Ela rende mais",
                            "Não muda nada",
                            "Ela perde valor"
                        ],
                        correctAnswer: 1
                    }
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
            progress: 10,
            totalLessons: 4,
            completedLessons: 1,
            lessons: [
                {
                    id: "stocks-intro",
                    title: "O que é uma Ação?",
                    duration: "10 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Uma ação é a menor fração do capital social de uma empresa. Ao comprar uma ação, você se torna sócio dela, participando dos seus lucros (dividendos) e riscos.</p>
                            <h3>Tipos de Ações</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Ordinárias (ON - Final 3):</strong> Dão direito a voto nas assembleias. Ex: PETR3, VALE3.</li>
                                <li><strong>Preferenciais (PN - Final 4):</strong> Têm preferência no recebimento de dividendos, mas sem voto. Ex: PETR4, ITUB4.</li>
                                <li><strong>Units (Final 11):</strong> Pacotes com ações ON e PN misturadas. Ex: TAEE11.</li>
                            </ul>
                            <h3>Como ganho dinheiro?</h3>
                            <p>1. <strong>Valorização:</strong> Comprar barato e vender caro.</p>
                            <p>2. <strong>Dividendos:</strong> Parte do lucro da empresa distribuída aos acionistas (isento de IR).</p>
                        </div>
                    ),
                    quiz: {
                        question: "Qual tipo de ação dá direito a voto nas assembleias?",
                        options: [
                            "Preferenciais (PN)",
                            "Ordinárias (ON)",
                            "Units",
                            "Fundos Imobiliários"
                        ],
                        correctAnswer: 1
                    }
                },
                {
                    id: "analysis",
                    title: "Análise Fundamentalista Básica",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Não compre ações como se fosse loteria. Analise os fundamentos da empresa.</p>
                            <h3>Principais Indicadores</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>P/L (Preço sobre Lucro):</strong> Em quantos anos o lucro da empresa paga o preço da ação. Quanto menor, "mais barata" (teoricamente).</li>
                                <li><strong>P/VP (Preço sobre Valor Patrimonial):</strong> Quanto o mercado paga pelo patrimônio líquido. Abaixo de 1.0 indica desconto.</li>
                                <li><strong>Dividend Yield (DY):</strong> Quanto a ação pagou de proventos nos últimos 12 meses em relação ao preço atual.</li>
                                <li><strong>ROE (Retorno sobre Patrimônio):</strong> Mede a eficiência da empresa em gerar lucro com o dinheiro dos sócios.</li>
                            </ul>
                        </div>
                    ),
                    quiz: {
                        question: "O que indica um P/VP abaixo de 1.0?",
                        options: [
                            "A empresa está cara",
                            "A empresa está sendo negociada abaixo do seu valor patrimonial (desconto)",
                            "A empresa vai falir",
                            "A empresa paga muitos dividendos"
                        ],
                        correctAnswer: 1
                    }
                },
                {
                    id: "home-broker",
                    title: "Operando o Home Broker",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: <p>Guia prático de como enviar ordens de compra e venda...</p>
                },
                {
                    id: "risks",
                    title: "Gestão de Risco",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: <p>Diversificação, Stop Loss e como não perder tudo...</p>
                }
            ]
        },
        {
            id: "fiis",
            title: "Vivendo de Renda com FIIs",
            description: "Invista em imóveis sem precisar comprar um apartamento. Receba aluguéis mensais isentos de IR.",
            icon: Coins,
            level: "Intermediário" as const,
            progress: 0,
            totalLessons: 3,
            completedLessons: 0,
            lessons: [
                {
                    id: "fiis-intro",
                    title: "A Mágica dos Fundos Imobiliários",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>FIIs são fundos que investem no mercado imobiliário. Eles são obrigados por lei a distribuir 95% do lucro semestral aos cotistas (na prática, pagam todo mês).</p>
                            <h3>Vantagens sobre Imóveis Físicos</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Liquidez:</strong> Venda suas cotas em segundos na bolsa.</li>
                                <li><strong>Acessibilidade:</strong> Comece com R$ 10,00 ou R$ 100,00.</li>
                                <li><strong>Isenção de IR:</strong> Os rendimentos mensais são isentos para PF.</li>
                                <li><strong>Diversificação:</strong> Com uma cota, você pode ser dono de pedaços de 10 shoppings ou 20 galpões logísticos.</li>
                            </ul>
                        </div>
                    ),
                    quiz: {
                        question: "Qual a porcentagem mínima do lucro que os FIIs devem distribuir?",
                        options: [
                            "50%",
                            "80%",
                            "95%",
                            "100%"
                        ],
                        correctAnswer: 2
                    }
                },
                {
                    id: "types-fiis",
                    title: "Tijolo vs Papel",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>FIIs de Tijolo</h3>
                            <p>Investem em imóveis reais: Shoppings, Galpões Logísticos, Lajes Corporativas, Hospitais. Ganham com aluguel e valorização do imóvel.</p>
                            <h3>FIIs de Papel</h3>
                            <p>Investem em dívida imobiliária (CRI, LCI). Funcionam como uma "Renda Fixa turbinada". Pagam dividendos altos, mas não costumam valorizar tanto a cota.</p>
                            <h3>Fiagro</h3>
                            <p>Primos dos FIIs, mas focados no Agronegócio. Investem em terras ou dívidas de produtores rurais.</p>
                        </div>
                    )
                },
                {
                    id: "analysis-fiis",
                    title: "Como escolher um FII?",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: <p>Vacância, Cap Rate, Localização e Qualidade dos inquilinos...</p>
                }
            ]
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
