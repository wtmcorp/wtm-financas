"use client";

import { useState } from "react";
import ModuleCard from "@/components/education/ModuleCard";
import LessonModal from "@/components/education/LessonModal";
import { GraduationCap, BookOpen, TrendingUp, ShieldCheck, Coins, Globe, BrainCircuit, Plane, Sparkles, ArrowUpRight, Target, Award, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLearnProgress } from "@/hooks/useLearnProgress";

export default function LearnPage() {
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const {
        progress,
        loading: progressLoading,
        markLessonComplete,
        canAccessLesson,
        getModuleProgress,
        getCompletedLessonsCount
    } = useLearnProgress();

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

    // Full Content Restored
    const modules = [
        {
            id: "fundamentals",
            title: "Fundamentos da Riqueza",
            description: "Aprenda a mentalidade e os primeiros passos para organizar sua vida financeira e sair das dívidas.",
            icon: ShieldCheck,
            level: "Iniciante" as const,
            progress: 80,
            totalLessons: 11,
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
                },
                {
                    id: "credit-vs-debit",
                    title: "Aula 8: Cartão de Crédito vs Débito",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O cartão de crédito é uma faca de dois gumes. Se usado corretamente, é uma ferramenta de enriquecimento. Se usado errado, é o caminho para a ruína.</p>
                            <h3>Vantagens do Crédito:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Milhas e Cashback:</strong> Recupere parte do que gasta.</li>
                                <li><strong>Seguros:</strong> Proteção de preço e garantia estendida.</li>
                                <li><strong>Fluxo de Caixa:</strong> Mantenha seu dinheiro rendendo enquanto usa o do banco.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: "hidden-costs",
                    title: "Aula 9: O Custo Oculto da Vida",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Muitas vezes focamos no preço da etiqueta, mas esquecemos dos custos de manutenção e depreciação.</p>
                            <h3>O Custo de um Carro:</h3>
                            <p>Não é apenas a parcela. É o IPVA, Seguro, Combustível, Manutenção e, principalmente, a <strong>Depreciação</strong>. Um carro de R$ 100k pode custar R$ 3k/mês no total.</p>
                        </div>
                    )
                },
                {
                    id: "negotiation-basics",
                    title: "Aula 10: Negociação de Contratos",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Tudo é negociável. Se você não pede, a resposta é sempre não.</p>
                            <h3>Como negociar o aluguel:</h3>
                            <p>Mostre que você é um bom pagador, apresente preços de imóveis similares na região e proponha um contrato mais longo em troca de um desconto no valor mensal.</p>
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
                        </div>
                    )
                },
                {
                    id: "debentures",
                    title: "Aula 4: Debêntures: Empreste para Empresas",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Debêntures são títulos de dívida emitidos por empresas para financiar seus projetos.</p>
                        </div>
                    )
                },
                {
                    id: "cri-cra",
                    title: "Aula 5: CRI e CRA",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Certificados de Recebíveis Imobiliários (CRI) e do Agronegócio (CRA).</p>
                        </div>
                    )
                },
                {
                    id: "fgc",
                    title: "Aula 6: O FGC: Sua Segurança",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O Fundo Garantidor de Créditos (FGC) é o que te faz dormir tranquilo.</p>
                            <p>Ele garante até <strong>R$ 250.000</strong> por CPF e por instituição financeira caso o banco quebre.</p>
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
                    id: "dividends-jcp",
                    title: "Aula 3: Dividendos e JCP",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>As empresas distribuem lucros de duas formas principais no Brasil.</p>
                        </div>
                    )
                },
                {
                    id: "buy-and-hold",
                    title: "Aula 4: Buy and Hold vs Trade",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Existem duas filosofias principais para lidar com ações.</p>
                        </div>
                    )
                },
                {
                    id: "portfolio-building",
                    title: "Aula 5: Montando sua Carteira",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Não coloque todos os ovos na mesma cesta.</p>
                        </div>
                    )
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
                    id: "tijolo-vs-papel",
                    title: "Aula 2: Tijolo vs Papel",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>FIIs de Tijolo</h3>
                            <p>Investem em imóveis físicos (shoppings, galpões, lajes corporativas).</p>
                        </div>
                    )
                },
                {
                    id: "vacancy-location",
                    title: "Aula 3: Vacância e Localização",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Os dois pilares de um bom FII de tijolo.</p>
                        </div>
                    )
                },
                {
                    id: "fofs",
                    title: "Aula 4: FOFs (Fundo de Fundos)",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>FOFs são fundos que compram cotas de outros fundos imobiliários.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: "options",
            title: "Opções: Alavancagem Inteligente",
            description: "Domine opções de ações para proteção e ganhos exponenciais. Aprenda calls, puts, e estratégias avançadas.",
            icon: TrendingUp,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 6,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-options",
                    title: "Aula 0: O Poder das Opções",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Opções são contratos que te dão o DIREITO (não a obrigação) de comprar ou vender um ativo a um preço fixo até uma data específica.</p>
                        </div>
                    )
                },
                {
                    id: "calls-puts",
                    title: "Aula 1: Calls e Puts - O Básico",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Call (Opção de Compra)</h3>
                            <p>Você aposta que o preço vai SUBIR.</p>
                        </div>
                    ),
                    quiz: {
                        question: "Se você acha que uma ação vai CAIR, qual opção você compra?",
                        options: [
                            "Call",
                            "Put",
                            "Strike",
                            "Premium"
                        ],
                        correctAnswer: 1
                    }
                }
            ]
        },
        {
            id: "international",
            title: "Investimentos Internacionais",
            description: "Diversifique globalmente: ETFs americanos, REITs, stocks, e proteção cambial.",
            icon: Globe,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 5,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-international",
                    title: "Aula 0: Por Que Investir Lá Fora?",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O Brasil representa menos de 3% da economia mundial. Investir apenas aqui é concentrar demais seu risco.</p>
                        </div>
                    )
                },
                {
                    id: "how-to-invest-abroad",
                    title: "Aula 1: Como Investir no Exterior",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Opção 1: BDRs (Brasil)</h3>
                            <p>Recibos de ações estrangeiras negociados na B3.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: "crypto",
            title: "Criptomoedas e Web3",
            description: "Bitcoin, Ethereum, DeFi, NFTs e o futuro descentralizado das finanças.",
            icon: Coins,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 7,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-crypto",
                    title: "Aula 0: A Revolução Cripto",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Criptomoedas são dinheiro digital descentralizado. Ninguém controla, nenhum governo pode imprimir mais.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: "tax-optimization",
            title: "Otimização Fiscal Avançada",
            description: "Estratégias legais para pagar menos impostos e maximizar seus ganhos líquidos.",
            icon: ShieldCheck,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 6,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-tax",
                    title: "Aula 0: Planejamento Tributário Legal",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Pagar menos impostos LEGALMENTE é inteligência financeira. Sonegar é crime. Planejar é direito.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: "unethical-hacks",
            title: "Hacks Antiéticos",
            description: "Exploração de brechas, táticas de guerrilha urbana e estratégias no limite da ética para acelerar resultados.",
            icon: BrainCircuit,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 30,
            completedLessons: 0,
            lessons: [
                {
                    id: "china-import",
                    title: "Hack 1: Importação Sem Imposto",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como comprar da China (AliExpress, Shopee) e minimizar as chances de ser taxado pela Receita Federal.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Fracionamento:</strong> Divida compras grandes em vários pacotes pequenos.</li>
                                <li><strong>Declaração:</strong> Peça ao vendedor para declarar valores abaixo de $50 (embora o limite tenha mudado, ainda ajuda no fluxo).</li>
                                <li><strong>Fretes Alternativos:</strong> Use métodos de envio que entram por estados com menor fiscalização.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: "student-discounts",
                    title: "Hack 2: Descontos de Estudante Eternos",
                    duration: "8 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como obter e-mails .edu para garantir descontos em Spotify, Apple, Adobe e softwares profissionais sem estar matriculado.</p>
                        </div>
                    )
                },
                {
                    id: "vpn-subscriptions",
                    title: "Hack 3: Assinaturas via VPN",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Pague o preço da Turquia, Argentina ou Índia em serviços como YouTube Premium, Netflix e Steam usando uma VPN e cartões globais.</p>
                        </div>
                    )
                },
                {
                    id: "refund-loop",
                    title: "Hack 4: O Loop do Reembolso",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Explorando políticas de satisfação garantida para testar produtos e cursos de alto ticket sem custo real.</p>
                        </div>
                    )
                },
                {
                    id: "credit-churning",
                    title: "Hack 5: Churning de Cartões",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como abrir e fechar contas estrategicamente para coletar bônus de adesão e milhas sem pagar anuidade.</p>
                        </div>
                    )
                },
                {
                    id: "price-errors",
                    title: "Hack 6: Monitoramento de Erros de Preço",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Uso de bots e grupos de alerta para comprar produtos com 90% de desconto devido a erros de sistema das lojas.</p>
                        </div>
                    )
                },
                {
                    id: "debt-negotiation",
                    title: "Hack 7: Liquidação de Dívidas por 1%",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>A tática do 'esquecimento': como deixar dívidas caducarem ou esperar feirões do Serasa para quitar valores altos por centavos.</p>
                        </div>
                    )
                },
                {
                    id: "paywall-bypass",
                    title: "Hack 8: Bypass de Paywalls",
                    duration: "5 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Técnicas de 'Inspect Element' e sites de cache para ler notícias e artigos pagos gratuitamente.</p>
                        </div>
                    )
                },
                {
                    id: "free-trials",
                    title: "Hack 9: Testes Grátis Infinitos",
                    duration: "7 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Uso de e-mails temporários e cartões virtuais descartáveis para nunca pagar por serviços de streaming ou SaaS.</p>
                        </div>
                    )
                },
                {
                    id: "resale-arbitrage",
                    title: "Hack 10: Arbitragem de Desapego",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como garimpar itens grátis ou subestimados em marketplaces locais e revender pelo valor de mercado.</p>
                        </div>
                    )
                },
                {
                    id: "hotel-upgrades",
                    title: "Hack 11: Upgrades de Hotel 'No Grito'",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Técnicas de engenharia social no check-in para conseguir suítes presidenciais pelo preço de quarto standard.</p>
                        </div>
                    )
                },
                {
                    id: "cashback-stacking",
                    title: "Hack 12: Stacking de Cashback",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como combinar cupons, sites de cashback e pontos do cartão para chegar a 30-40% de retorno em compras comuns.</p>
                        </div>
                    )
                },
                {
                    id: "referral-gaming",
                    title: "Hack 13: Gaming de Sistemas de Indicação",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Criação de redes de indicação próprias para ganhar créditos em apps de comida, transporte e bancos digitais.</p>
                        </div>
                    )
                },
                {
                    id: "price-match-exploit",
                    title: "Hack 14: Exploração de Price Match",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como forçar grandes varejistas a cobrirem preços de sites obscuros para garantir o menor valor possível.</p>
                        </div>
                    )
                },
                {
                    id: "abandoned-carts",
                    title: "Hack 15: O Desconto do Carrinho Abandonado",
                    duration: "5 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Táticas para forçar o envio de cupons de 15-20% apenas deixando itens no carrinho por 24 horas.</p>
                        </div>
                    )
                },
                {
                    id: "ghost-cards",
                    title: "Hack 16: Cartões Fantasma",
                    duration: "8 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Uso de geradores de cartão para validar contas de teste sem risco de cobrança real.</p>
                        </div>
                    )
                },
                {
                    id: "last-minute-travel",
                    title: "Hack 17: Viagens de Última Hora",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como aproveitar cancelamentos de última hora em cruzeiros e resorts por frações do preço original.</p>
                        </div>
                    )
                },
                {
                    id: "software-alternatives",
                    title: "Hack 18: Alternativas 'Open' de Luxo",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Onde encontrar versões comunitárias que superam softwares de R$ 5.000/ano.</p>
                        </div>
                    )
                },
                {
                    id: "stealth-trading",
                    title: "Hack 19: Trading em Modo Stealth",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como operar em mercados sem deixar rastros digitais ou vinculação direta de identidade.</p>
                        </div>
                    )
                },
                {
                    id: "gift-card-arbitrage",
                    title: "Hack 20: Arbitragem de Gift Cards",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Comprando cartões de presente com desconto de pessoas desesperadas por dinheiro vivo e usando pelo valor total.</p>
                        </div>
                    )
                },
                {
                    id: "ai-work-automation",
                    title: "Hack 21: Automação de Trabalho com IA",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como terceirizar 90% do seu emprego para IAs sem que seu chefe perceba, mantendo o salário integral.</p>
                        </div>
                    )
                },
                {
                    id: "one-per-customer",
                    title: "Hack 22: Bypassing de Limites de Compra",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Técnicas de mudança de IP e endereços virtuais para comprar itens limitados em massa.</p>
                        </div>
                    )
                },
                {
                    id: "tax-avoidance-loopholes",
                    title: "Hack 23: Brechas Legais de Imposto",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Diferença entre elisão e evasão: como usar holdings e offshores para proteger capital legalmente.</p>
                        </div>
                    )
                },
                {
                    id: "social-engineering-discounts",
                    title: "Hack 24: Descontos via Engenharia Social",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Scripts de conversação para convencer atendentes a liberar descontos 'exclusivos de gerente'.</p>
                        </div>
                    )
                },
                {
                    id: "glitch-deals-hunting",
                    title: "Hack 25: Caça a Glitches de Cupom",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como encontrar cupons que se acumulam indevidamente no checkout, gerando valores negativos ou zero.</p>
                        </div>
                    )
                },
                {
                    id: "digital-asset-squatting",
                    title: "Hack 26: Squatting de Ativos Digitais",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Identificando domínios e nomes de usuário de alto valor prestes a expirar para revenda posterior.</p>
                        </div>
                    )
                },
                {
                    id: "insurance-optimization",
                    title: "Hack 27: Otimização de Seguros",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como renegociar apólices anualmente usando cotações falsas de concorrentes para baixar o prêmio.</p>
                        </div>
                    )
                },
                {
                    id: "membership-sharing",
                    title: "Hack 28: Compartilhamento de Contas Master",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Criação de grupos de rateio para ferramentas caras (Ahrefs, Bloomberg Terminal, etc) via proxies.</p>
                        </div>
                    )
                },
                {
                    id: "warranty-extension-hacks",
                    title: "Hack 29: Extensão de Garantia 'Grátis'",
                    duration: "8 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como usar benefícios ocultos de cartões de crédito para triplicar a garantia de eletrônicos.</p>
                        </div>
                    )
                },
                {
                    id: "the-final-hack",
                    title: "Hack 30: A Mentalidade do Sistema",
                    duration: "30 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O hack definitivo: entender que as regras foram feitas para serem questionadas e que o sistema sempre tem uma porta dos fundos.</p>
                        </div>
                    )
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
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden p-6 md:p-20 rounded-[2.5rem] md:rounded-[3.5rem] glass-panel shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                >
                    <div className="absolute top-0 right-0 hidden md:block opacity-5 -mr-20 -mt-20">
                        <GraduationCap size={400} className="text-primary rotate-12" />
                    </div>

                    <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-6 md:space-y-8">
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <BrainCircuit size={14} className="text-primary animate-pulse md:w-[18px] md:h-[18px]" />
                            <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.3em]">WTM Academy: Intelligence Protocol</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] md:leading-[0.85]">
                            Domine o <br />
                            <span className="gradient-text">Capital</span>
                        </h1>
                        <p className="text-gray-400 text-base md:text-2xl max-w-3xl leading-relaxed font-medium">
                            A educação financeira é a única arma capaz de romper as correntes da mediocridade. Transforme conhecimento em patrimônio.
                        </p>

                        <div className="flex flex-wrap gap-3 md:gap-6 pt-2 md:pt-4">
                            {[
                                { label: "Aulas", value: "12/48", icon: Target },
                                { label: "Nível", value: "Intermediário", icon: Award },
                                { label: "Tempo", value: "14.5h", icon: BookOpen }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 bg-white/5 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-xl">
                                    <stat.icon size={14} className="text-primary md:w-4 md:h-4" />
                                    <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}:</span>
                                    <span className="text-xs md:text-sm font-black text-white">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.header>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((module) => (
                        <motion.div
                            key={module.id}
                            variants={itemVariants}
                            onClick={() => setActiveModule(module.id)}
                            className="cursor-pointer"
                        >
                            <ModuleCard
                                {...module}
                                progress={getModuleProgress(module.id, module.totalLessons)}
                                completedLessons={getCompletedLessonsCount(module.id)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Learning Path Progress */}
                <motion.div variants={itemVariants} className="glass-panel p-6 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Target size={100} className="md:w-[150px] md:h-[150px]" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
                        <div className="space-y-3 md:space-y-4 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Trilha de Maestria</h3>
                            <p className="text-gray-500 text-sm md:text-base font-medium max-w-md">Você está no caminho certo. Continue progredindo para desbloquear o módulo de <span className="text-primary font-bold">Estratégias Offshore</span>.</p>
                        </div>
                        <div className="flex-1 w-full max-w-xl space-y-3 md:space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Progresso Geral</span>
                                <span className="text-xl md:text-2xl font-black text-primary tracking-tighter">25%</span>
                            </div>
                            <div className="h-3 md:h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 md:p-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "25%" }}
                                    transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                                    className="h-full bg-gradient-to-r from-primary via-purple-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(167,139,250,0.4)]"
                                />
                            </div>
                        </div>
                        <button className="w-full md:w-auto px-8 py-4 md:px-10 md:py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 md:gap-3 group">
                            Continuar de onde parei <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform md:w-4 md:h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Lesson Modal */}
            {activeModuleData && (
                <LessonModal
                    onClose={() => setActiveModule(null)}
                    moduleTitle={activeModuleData.title}
                    moduleId={activeModuleData.id}
                    lessons={activeModuleData.lessons}
                    markLessonComplete={markLessonComplete}
                    canAccessLesson={canAccessLesson}
                />
            )}
        </motion.div>
    );
}
