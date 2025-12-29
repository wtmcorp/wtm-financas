"use client";

import { useState } from "react";
import ModuleCard from "@/components/education/ModuleCard";
import LessonModal from "@/components/education/LessonModal";
import { GraduationCap, BookOpen, TrendingUp, ShieldCheck, Coins, Globe, BrainCircuit, Plane } from "lucide-react";
import { motion } from "framer-motion";

export default function LearnPage() {
    const [activeModule, setActiveModule] = useState<string | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, cubicBezier: [0.23, 1, 0.32, 1] } }
    };

    // Mock Data for Modules
    const modules = [
        {
            id: "fundamentals",
            title: "Fundamentos da Riqueza",
            description: "Aprenda a mentalidade e os primeiros passos para organizar sua vida financeira e sair das dívidas.",
            icon: ShieldCheck,
            level: "Iniciante" as const,
            progress: 80,
            totalLessons: 8,
            completedLessons: 4,
            lessons: [
                {
                    id: "intro-wealth",
                    title: "Aula 0: O Despertar Financeiro",
                    duration: "5 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Bem-vindo à sua jornada rumo à liberdade financeira. Antes de falarmos de números, precisamos falar de propósito. Por que você quer ser rico?</p>
                            <p>Riqueza sem propósito é apenas um número. Nesta aula, vamos alinhar suas expectativas e entender que o dinheiro é uma ferramenta, não o fim.</p>
                            <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
                                <h4 className="text-primary font-bold mb-2">O que você vai aprender neste módulo:</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                    <li>Como reprogramar sua mente para a abundância.</li>
                                    <li>A diferença crucial entre ativos e passivos.</li>
                                    <li>Como criar um orçamento que não te sufoca.</li>
                                    <li>O passo a passo para sair das dívidas.</li>
                                </ul>
                            </div>
                        </div>
                    )
                },
                {
                    id: "mindset",
                    title: "Aula 1: Mentalidade de Investidor",
                    duration: "10 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Para construir riqueza, o primeiro passo não é ganhar mais, mas pensar diferente. A mentalidade de escassez foca no que falta; a de abundância foca no que pode ser criado.</p>
                            <h3>1. Pague-se Primeiro</h3>
                            <p>Antes de pagar contas ou gastar, separe uma parte para o seu futuro. Trate seu investimento como um boleto obrigatório. Se você esperar sobrar dinheiro no fim do mês, nunca sobrará.</p>
                            <h3>2. Ativos vs Passivos</h3>
                            <p>Ativos colocam dinheiro no seu bolso (ações, imóveis de aluguel, negócios). Passivos tiram dinheiro (carro caro, assinaturas não usadas, roupas de marca parceladas). Foque em acumular ativos.</p>
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                <p className="text-yellow-500 text-sm font-medium"><strong>Dica de Ouro:</strong> Sua casa própria, se você mora nela e paga manutenção, é um passivo. Ela só se torna um ativo se gerar renda.</p>
                            </div>
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
                    title: "Aula 2: O Orçamento Blindado",
                    duration: "15 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Um orçamento não serve para te impedir de gastar, mas para te dar permissão para gastar com o que realmente importa.</p>
                            <h3>A Regra 50-30-20</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>50% Necessidades:</strong> Aluguel, comida, contas básicas.</li>
                                <li><strong>30% Desejos:</strong> Lazer, hobbies, saídas.</li>
                                <li><strong>20% Futuro:</strong> Investimentos e quitação de dívidas.</li>
                            </ul>
                            <p>Se suas necessidades ultrapassam 50%, você tem um problema de custo de vida ou de renda. Ajuste ou aumente sua renda.</p>
                        </div>
                    ),
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
                    title: "Aula 3: Reserva de Emergência",
                    duration: "12 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>A reserva de emergência é o seu seguro contra o caos. Sem ela, qualquer imprevisto te joga de volta nas dívidas.</p>
                            <h3>Quanto guardar?</h3>
                            <p>O ideal é ter entre 6 a 12 meses do seu <strong>custo de vida</strong> (não do seu salário) guardados em um lugar de fácil acesso (liquidez imediata).</p>
                            <h3>Onde deixar?</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Tesouro Selic</li>
                                <li>CDB de Liquidez Diária (100% CDI)</li>
                                <li>Contas remuneradas de bancos sólidos</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: "debt",
                    title: "Aula 4: Matando Dívidas",
                    duration: "20 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Dívidas com juros altos (cartão de crédito, cheque especial) são o câncer da sua vida financeira. Elas precisam ser eliminadas antes de começar a investir pesado.</p>
                            <h3>Estratégia Bola de Neve</h3>
                            <p>Pague a dívida menor primeiro para ganhar motivação psicológica, depois use o valor que sobrava para atacar a próxima.</p>
                            <h3>Estratégia Avalanche</h3>
                            <p>Pague a dívida com o maior juro primeiro. Matematicamente é a melhor opção, pois você economiza mais dinheiro no longo prazo.</p>
                        </div>
                    )
                },
                {
                    id: "goals",
                    title: "Aula 5: Definindo Metas Claras",
                    duration: "8 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Quem não sabe para onde vai, qualquer caminho serve. Suas metas precisam ser SMART:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>S (Específica):</strong> "Quero R$ 10.000" em vez de "Quero ser rico".</li>
                                <li><strong>M (Mensurável):</strong> Você consegue acompanhar o progresso.</li>
                                <li><strong>A (Atingível):</strong> Seja realista, mas ambicioso.</li>
                                <li><strong>R (Relevante):</strong> Tem que fazer sentido para sua vida.</li>
                                <li><strong>T (Temporal):</strong> "Até dezembro de 2026".</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: "compound-interest",
                    title: "Aula 6: O Poder dos Juros Compostos",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Einstein chamou os juros compostos de a "oitava maravilha do mundo". É o dinheiro trabalhando para você, onde os juros de hoje rendem juros amanhã.</p>
                            <h3>A Fórmula do Enriquecimento</h3>
                            <p className="text-2xl font-black text-center py-4 bg-white/5 rounded-xl">Tempo + Aportes Constantes + Rentabilidade = Fortuna.</p>
                            <p>O fator mais importante é o <strong>Tempo</strong>. Quanto mais cedo você começa, menos esforço precisa fazer no futuro. O segundo mais importante é o <strong>Aporte</strong> (quanto você investe todo mês).</p>
                        </div>
                    )
                },
                {
                    id: "inflation",
                    title: "Aula 7: Inflação: O Inimigo Invisível",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>A inflação é o aumento generalizado dos preços. Ela corrói o seu poder de compra. R$ 100 hoje compram muito menos do que compravam há 10 anos.</p>
                            <p>Seu investimento precisa render <strong>acima da inflação</strong> (ganho real). Se a inflação é 5% e seu investimento rende 5%, você não ganhou nada, apenas manteve o valor.</p>
                        </div>
                    )
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
            totalLessons: 7,
            completedLessons: 2,
            lessons: [
                {
                    id: "intro-fixed",
                    title: "Aula 0: O que é Renda Fixa?",
                    duration: "8 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Investir em Renda Fixa é basicamente emprestar dinheiro para alguém (Governo, Banco ou Empresa) em troca de juros.</p>
                            <p>É o porto seguro do investidor, ideal para objetivos de curto e médio prazo ou para a reserva de emergência.</p>
                        </div>
                    )
                },
                {
                    id: "selic-cdi",
                    title: "Aula 1: O que é Selic e CDI?",
                    duration: "15 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>A Selic é a taxa básica de juros da economia brasileira, definida pelo Banco Central. O CDI (Certificado de Depósito Interbancário) é uma taxa que anda colada na Selic e é usada pelos bancos.</p>
                            <p>Quando a Selic sobe, a Renda Fixa paga mais. Quando cai, paga menos.</p>
                        </div>
                    ),
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
                    title: "Aula 2: Tesouro Direto: Empreste para o Governo",
                    duration: "18 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>O Tesouro Direto é o investimento mais seguro do país. Você empresta dinheiro para o Governo Federal.</p>
                            <h3>Principais Títulos:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Tesouro Selic:</strong> Ideal para reserva de emergência.</li>
                                <li><strong>Tesouro IPCA+:</strong> Protege contra a inflação. Ideal para aposentadoria.</li>
                                <li><strong>Tesouro Prefixado:</strong> Você sabe exatamente quanto vai receber no final.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: "cdb-lci-lca",
                    title: "Aula 3: CDB, LCI e LCA",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Aqui você empresta para os bancos.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>CDB:</strong> Certificado de Depósito Bancário. Tem imposto de renda.</li>
                                <li><strong>LCI/LCA:</strong> Letras de Crédito Imobiliário/Agronegócio. São <strong>isentas de IR</strong> para pessoa física.</li>
                            </ul>
                            <p>Sempre compare o rendimento líquido (após impostos) para saber qual vale mais a pena.</p>
                        </div>
                    )
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
            totalLessons: 6,
            completedLessons: 1,
            lessons: [
                {
                    id: "intro-stocks",
                    title: "Aula 0: O Mundo da Renda Variável",
                    duration: "10 min",
                    type: "article" as const,
                    completed: true,
                    content: (
                        <div className="space-y-6">
                            <p>Na Renda Variável, você não sabe exatamente quanto vai ganhar. O risco é maior, mas o potencial de retorno também.</p>
                            <p>É aqui que a verdadeira riqueza é construída no longo prazo, através da participação no lucro de grandes empresas.</p>
                        </div>
                    )
                },
                {
                    id: "stocks-intro",
                    title: "Aula 1: O que é uma Ação?",
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
                            <p>2. <strong>Dividendos:</strong> Parte do lucro da empresa distribuída aos acionistas (isento de IR no Brasil atualmente).</p>
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
                    title: "Aula 2: Análise Fundamentalista Básica",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Não compre ações como se fosse loteria. Analise os fundamentos da empresa.</p>
                            <h3>Principais Indicadores</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>P/L (Preço sobre Lucro):</strong> Em quantos anos o lucro da empresa paga o preço da ação.</li>
                                <li><strong>P/VP (Preço sobre Valor Patrimonial):</strong> Quanto o mercado paga pelo patrimônio líquido. Abaixo de 1.0 indica desconto.</li>
                                <li><strong>Dividend Yield (DY):</strong> Quanto a ação pagou de proventos nos últimos 12 meses.</li>
                                <li><strong>ROE (Retorno sobre Patrimônio):</strong> Mede a eficiência da empresa em gerar lucro.</li>
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
            totalLessons: 5,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-fiis",
                    title: "Aula 0: O que são FIIs?",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Fundos Imobiliários (FIIs) são condomínios de investidores que reúnem recursos para investir no mercado imobiliário.</p>
                            <p>É a forma mais fácil e barata de investir em imóveis de altíssima qualidade (shoppings, galpões, prédios comerciais) e receber aluguel todo mês.</p>
                        </div>
                    )
                },
                {
                    id: "fiis-intro",
                    title: "Aula 1: A Mágica dos FIIs",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>FIIs são obrigados por lei a distribuir 95% do lucro semestral aos cotistas. Na prática, a maioria paga mensalmente.</p>
                            <h3>Vantagens:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Liquidez:</strong> Venda suas cotas em segundos.</li>
                                <li><strong>Acessibilidade:</strong> Comece com menos de R$ 100,00.</li>
                                <li><strong>Isenção de IR:</strong> Rendimentos mensais isentos para pessoas físicas.</li>
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
                }
            ]
        }
    ];

    const activeModuleData = modules.find(m => m.id === activeModule);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <motion.header variants={itemVariants} className="space-y-6 text-center md:text-left relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden">
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
                </motion.header>

                {/* Progress Overview */}
                <motion.div variants={itemVariants} className="card-premium p-10 bg-gradient-to-br from-[#0f0f13] via-[#13131a] to-[#1a1a2e] relative overflow-hidden">
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
                </motion.div>

                {/* Modules Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <ModuleCard
                            key={module.id}
                            {...module}
                            onClick={() => setActiveModule(module.id)}
                        />
                    ))}
                </motion.div>

                {/* Active Lesson Modal */}
                {activeModule && activeModuleData && (
                    <LessonModal
                        moduleTitle={activeModuleData.title}
                        lessons={activeModuleData.lessons}
                        onClose={() => setActiveModule(null)}
                    />
                )}
            </div>
        </motion.div>
    );
}
