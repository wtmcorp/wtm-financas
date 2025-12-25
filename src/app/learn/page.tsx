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
            totalLessons: 3,
            completedLessons: 0,
            lessons: [
                {
                    id: "why-global",
                    title: "Por que investir no exterior?",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O Brasil representa menos de 1% da economia global. Ficar restrito aqui é correr o "Risco Brasil" desnecessariamente.</p>
                            <h3>Motivos para dolarizar:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Moeda Forte:</strong> O Dólar é a reserva de valor do mundo. O Real perde poder de compra historicamente.</li>
                                <li><strong>Maiores Empresas:</strong> Apple, Microsoft, Google, Amazon não estão na B3 (diretamente).</li>
                                <li><strong>Proteção:</strong> Em crises locais, o dólar costuma subir, protegendo seu patrimônio.</li>
                            </ul>
                        </div>
                    ),
                    quiz: {
                        question: "Qual a principal vantagem de investir no exterior?",
                        options: [
                            "Pagar mais impostos",
                            "Acessar moedas fortes e diluir o risco país",
                            "É mais fácil que investir no Brasil",
                            "Garantia de lucro rápido"
                        ],
                        correctAnswer: 1
                    }
                },
                {
                    id: "stocks-reits",
                    title: "Stocks e REITs",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Stocks (Ações Americanas)</h3>
                            <p>Funcionam como as ações no Brasil, mas em um mercado muito mais maduro e líquido. Você vira sócio das marcas que usa todo dia.</p>
                            <h3>REITs (Real Estate Investment Trusts)</h3>
                            <p>Os "primos" dos FIIs. São empresas que operam imóveis nos EUA. Diferente dos FIIs, eles podem se alavancar (tomar dívida) para crescer, o que aumenta o potencial de retorno (e o risco).</p>
                        </div>
                    ),
                    quiz: {
                        question: "O que são REITs?",
                        options: [
                            "Ações de tecnologia",
                            "Títulos de dívida do governo americano",
                            "Empresas que operam imóveis nos EUA (semelhantes a FIIs)",
                            "Criptomoedas"
                        ],
                        correctAnswer: 2
                    }
                },
                {
                    id: "how-to-global",
                    title: "Como começar?",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: <p>BDRs (na B3) vs Conta no Exterior (Avenue, Nomad, IBKR). Prós e contras de cada caminho...</p>
                }
            ]
        },
        {
            id: "crypto",
            title: "Criptoeconomia",
            description: "Bitcoin, Ethereum e DeFi. Entenda a nova economia digital e como investir com cautela.",
            icon: BrainCircuit,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 4,
            completedLessons: 0,
            lessons: [
                {
                    id: "bitcoin",
                    title: "Bitcoin: O Ouro Digital",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O Bitcoin (BTC) é a primeira moeda digital descentralizada e escassa do mundo. Não depende de governos ou bancos.</p>
                            <h3>Características:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Descentralização:</strong> A rede roda em milhares de computadores pelo mundo.</li>
                                <li><strong>Escassez:</strong> Só existirão 21 milhões de unidades. Impossível "imprimir" mais.</li>
                                <li><strong>Segurança:</strong> A Blockchain do Bitcoin nunca foi hackeada.</li>
                            </ul>
                        </div>
                    ),
                    quiz: {
                        question: "Qual o limite máximo de Bitcoins que existirão?",
                        options: [
                            "Infinito",
                            "100 milhões",
                            "21 milhões",
                            "Depende do governo"
                        ],
                        correctAnswer: 2
                    }
                },
                {
                    id: "ethereum",
                    title: "Ethereum e Smart Contracts",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Se o Bitcoin é o ouro digital, o Ethereum é o "petróleo" da internet descentralizada. Ele permite criar programas (Smart Contracts) que rodam sozinhos.</p>
                            <p>É a base para NFTs, DeFi (Finanças Descentralizadas) e o Metaverso.</p>
                        </div>
                    )
                },
                {
                    id: "security-crypto",
                    title: "Segurança: Not Your Keys...",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Hot Wallets vs Cold Wallets</h3>
                            <p>Deixar cripto na corretora é arriscado. O ideal é fazer a auto-custódia.</p>
                            <p><strong>Frase de ouro:</strong> "Not your keys, not your coins" (Sem suas chaves, sem suas moedas).</p>
                        </div>
                    ),
                    quiz: {
                        question: "Onde é o lugar mais seguro para guardar criptomoedas a longo prazo?",
                        options: [
                            "Na corretora (Exchange)",
                            "Em uma Cold Wallet (Carteira Fria/Hardware)",
                            "No banco",
                            "No email"
                        ],
                        correctAnswer: 1
                    }
                },
                {
                    id: "defi",
                    title: "DeFi: O Banco sem Banqueiro",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: <p>Como emprestar dinheiro e ganhar juros, fazer trocas e seguros sem intermediários...</p>
                }
            ]
        }
    ];

    const activeModuleData = modules.find(m => m.id === activeModule);

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <header className="reveal space-y-6 text-center md:text-left relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse-slow" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                            <GraduationCap size={16} className="text-primary animate-bounce" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Wtm Academy</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                            Domine o <br />
                            <span className="gradient-text">Jogo do Dinheiro</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-medium">
                            Educação financeira não é sobre economizar cafezinho. É sobre <span className="text-white">liberdade</span>. Escolha sua trilha e comece a evoluir seu patrimônio hoje.
                        </p>
                    </div>
                </header>

                {/* Progress Overview */}
                <div className="reveal card-premium p-10 bg-gradient-to-br from-[#0f0f13] via-[#13131a] to-[#1a1a2e] relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-pulse-slow" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                        <div className="flex items-center gap-8">
                            <div className="relative w-32 h-32 group">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
                                <svg className="w-full h-full transform -rotate-90 relative z-10">
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="text-primary"
                                        strokeDasharray="351.8"
                                        strokeDashoffset="281.4"
                                        strokeLinecap="round"
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(167,139,250,0.5))' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
                                    <span className="text-3xl font-black text-white">20%</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <BrainCircuit size={20} className="text-primary" />
                                    <h3 className="text-2xl font-black text-white tracking-tight">Nível 1: Aprendiz</h3>
                                </div>
                                <p className="text-gray-400 font-medium">Complete mais <span className="text-white">3 módulos</span> para atingir o nível <span className="text-primary">Estrategista</span>.</p>
                                <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
                                    <div className="w-1/5 h-full bg-primary shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 w-full md:w-auto">
                            {[
                                { label: 'Aulas', value: '6', icon: BookOpen },
                                { label: 'Módulos', value: '2', icon: TrendingUp },
                                { label: 'Certificados', value: '0', icon: ShieldCheck }
                            ].map((stat, i) => (
                                <div key={i} className="text-center px-8 py-5 bg-white/[0.03] rounded-[2rem] border border-white/5 hover:bg-white/[0.06] transition-all group">
                                    <stat.icon size={16} className="mx-auto mb-3 text-gray-500 group-hover:text-primary transition-colors" />
                                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
                                </div>
                            ))}
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
