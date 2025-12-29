"use client";

import { useState } from "react";
import ModuleCard from "@/components/education/ModuleCard";
import LessonModal from "@/components/education/LessonModal";
import { GraduationCap, BookOpen, TrendingUp, ShieldCheck, Coins, Globe, BrainCircuit, Plane } from "lucide-react";
import { motion } from "framer-motion";
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
                            <p>Com opções, você pode ganhar dinheiro em mercados em alta, em queda, ou até parados. É a ferramenta mais versátil do mercado financeiro.</p>
                            <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                                <h4 className="text-yellow-500 font-bold mb-2">⚠️ Atenção:</h4>
                                <p className="text-gray-300">Opções podem multiplicar seus ganhos, mas também suas perdas. Nunca opere sem entender completamente.</p>
                            </div>
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
                            <p>Você aposta que o preço vai SUBIR. Compra o direito de adquirir a ação a um preço fixo (strike).</p>
                            <p><strong>Exemplo:</strong> PETR4 está R$ 30. Você compra uma call strike R$ 32 por R$ 1. Se PETR4 subir para R$ 40, você lucra R$ 7 por ação (R$ 40 - R$ 32 - R$ 1).</p>

                            <h3>Put (Opção de Venda)</h3>
                            <p>Você aposta que o preço vai CAIR. Compra o direito de vender a ação a um preço fixo.</p>
                            <p><strong>Exemplo:</strong> VALE3 está R$ 70. Você compra uma put strike R$ 68 por R$ 2. Se VALE3 cair para R$ 60, você lucra R$ 6 por ação (R$ 68 - R$ 60 - R$ 2).</p>
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
                            <h3>Vantagens:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Diversificação:</strong> Proteção contra crises locais.</li>
                                <li><strong>Acesso a gigantes:</strong> Apple, Microsoft, Google, Amazon.</li>
                                <li><strong>Moeda forte:</strong> Dólar se valoriza em crises.</li>
                                <li><strong>Dividendos em dólar:</strong> Renda passiva internacional.</li>
                            </ul>
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
                            <p>Recibos de ações estrangeiras negociados na B3. Mais fácil, mas com menos opções e taxas maiores.</p>

                            <h3>Opção 2: Conta Internacional (Recomendado)</h3>
                            <p>Abra conta em corretoras como Avenue, Nomad, ou Interactive Brokers. Acesso total ao mercado americano.</p>

                            <h3>Passo a Passo:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Escolha a corretora</li>
                                <li>Envie documentos (RG, CPF, comprovante)</li>
                                <li>Transfira dólares (via remessa internacional)</li>
                                <li>Comece comprando ETFs (ex: SPY, VOO)</li>
                            </ul>
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
                            <h3>Bitcoin (BTC)</h3>
                            <p>O ouro digital. Limitado a 21 milhões de unidades. Reserva de valor contra inflação.</p>

                            <h3>Ethereum (ETH)</h3>
                            <p>Plataforma para contratos inteligentes. Base de DeFi, NFTs e Web3.</p>

                            <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                                <h4 className="text-red-500 font-bold mb-2">⚠️ Risco Altíssimo:</h4>
                                <p className="text-gray-300">Cripto é extremamente volátil. Pode cair 50% em dias. Invista apenas o que pode perder.</p>
                            </div>
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
                            <h3>Investimentos Isentos de IR:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>LCI/LCA:</strong> Totalmente isentos para pessoa física.</li>
                                <li><strong>CRI/CRA:</strong> Isentos, mas mais arriscados.</li>
                                <li><strong>Dividendos:</strong> Isentos no Brasil (por enquanto).</li>
                                <li><strong>FIIs:</strong> Rendimentos mensais isentos.</li>
                                <li><strong>Poupança:</strong> Isenta, mas rende pouco.</li>
                            </ul>

                            <h3>Holding Familiar:</h3>
                            <p>Criar uma empresa para gerir patrimônio pode reduzir impostos sobre herança e doações.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: "real-estate",
            title: "Imóveis e Renda Passiva",
            description: "Invista em imóveis físicos, fundos imobiliários e arbitragem de aluguel.",
            icon: Coins,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 5,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-real-estate",
                    title: "Aula 0: Imóveis Como Investimento",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Imóveis geram renda passiva (aluguel) e se valorizam no longo prazo. Mas exigem capital alto e têm baixa liquidez.</p>
                            <h3>Quando Vale a Pena:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Yield (aluguel/preço) acima de 0,5% ao mês</li>
                                <li>Localização premium ou em desenvolvimento</li>
                                <li>Você tem capital para entrada (mínimo 30%)</li>
                                <li>Pode lidar com vacância e manutenção</li>
                            </ul>

                            <h3>Alternativa: FIIs</h3>
                            <p>Fundos Imobiliários oferecem exposição a imóveis sem as dores de cabeça de ser proprietário.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: "entrepreneurship",
            title: "Empreendedorismo Financeiro",
            description: "Crie negócios escaláveis, infoprodutos e múltiplas fontes de renda.",
            icon: BrainCircuit,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 6,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-entrepreneurship",
                    title: "Aula 0: Renda Ativa vs Passiva",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Renda ativa: Você troca tempo por dinheiro (salário, freelance).</p>
                            <p>Renda passiva: Seu dinheiro ou sistemas trabalham por você.</p>

                            <h3>Fontes de Renda Passiva:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Dividendos:</strong> Ações e FIIs pagando mensalmente.</li>
                                <li><strong>Infoprodutos:</strong> Cursos, ebooks vendendo no automático.</li>
                                <li><strong>Royalties:</strong> Livros, músicas, patentes.</li>
                                <li><strong>Negócios automatizados:</strong> E-commerce, SaaS.</li>
                            </ul>
                        </div>
                    )
                }
            ]
        },
        {
            id: "behavioral-finance",
            title: "Psicologia do Investidor",
            description: "Domine suas emoções, evite vieses cognitivos e tome decisões racionais.",
            icon: BrainCircuit,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 5,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-behavioral",
                    title: "Aula 0: O Maior Inimigo é Você",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>90% dos investidores perdem dinheiro não por falta de conhecimento, mas por falta de controle emocional.</p>

                            <h3>Vieses Cognitivos Mortais:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>FOMO (Fear of Missing Out):</strong> Comprar no topo porque "todo mundo está comprando".</li>
                                <li><strong>Aversão à Perda:</strong> Segurar ações caindo porque "não quero realizar o prejuízo".</li>
                                <li><strong>Viés de Confirmação:</strong> Buscar apenas informações que confirmam sua tese.</li>
                                <li><strong>Efeito Manada:</strong> Seguir a multidão sem análise própria.</li>
                            </ul>

                            <h3>Como Vencer:</h3>
                            <p>Tenha um plano, siga-o religiosamente, e ignore o ruído do mercado.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: "macroeconomics",
            title: "Macroeconomia para Investidores",
            description: "Entenda juros, inflação, câmbio e ciclos econômicos para antecipar movimentos.",
            icon: TrendingUp,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 6,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-macro",
                    title: "Aula 0: A Dança dos Juros",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>A taxa Selic é a mãe de todos os investimentos no Brasil. Quando ela sobe ou desce, tudo muda.</p>

                            <h3>Selic Alta (Acima de 10%):</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Renda Fixa fica atrativa</li>
                                <li>Bolsa tende a cair (empresas pagam mais juros)</li>
                                <li>Imóveis desvalorizam (financiamento caro)</li>
                                <li>Dólar pode cair (capital estrangeiro entra)</li>
                            </ul>

                            <h3>Selic Baixa (Abaixo de 5%):</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Renda Fixa rende pouco</li>
                                <li>Bolsa tende a subir (crédito barato)</li>
                                <li>Imóveis se valorizam</li>
                                <li>Dólar pode subir (capital sai)</li>
                            </ul>
                        </div>
                    )
                }
            ]
        },
        {
            id: "retirement",
            title: "Aposentadoria Milionária",
            description: "Planeje sua independência financeira e pare de trabalhar antes dos 50.",
            icon: Plane,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 5,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-retirement",
                    title: "Aula 0: A Regra dos 4%",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Para viver de renda, você precisa de 25x seu custo de vida anual investido.</p>

                            <h3>Exemplo:</h3>
                            <p>Se você gasta R$ 10.000/mês (R$ 120.000/ano), precisa de R$ 3.000.000 investidos.</p>
                            <p>Sacando 4% ao ano (R$ 120.000), seu patrimônio se mantém infinitamente (considerando inflação).</p>

                            <h3>Como Chegar Lá:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Aumente sua renda</li>
                                <li>Reduza gastos desnecessários</li>
                                <li>Invista a diferença consistentemente</li>
                                <li>Reinvista dividendos</li>
                                <li>Seja paciente (leva 10-20 anos)</li>
                            </ul>
                        </div>
                    )
                }
            ]
        },
        {
            id: "alternative",
            title: "Investimentos Alternativos",
            description: "Explore arte, vinhos, relógios, carros clássicos e outros ativos exóticos.",
            icon: Coins,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 4,
            completedLessons: 0,
            lessons: [
                {
                    id: "intro-alternative",
                    title: "Aula 0: Além de Ações e Imóveis",
                    duration: "10 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Investimentos alternativos são ativos não tradicionais que podem diversificar e proteger contra inflação.</p>

                            <h3>Opções:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Ouro:</strong> Proteção contra crises e inflação.</li>
                                <li><strong>Arte:</strong> Quadros de artistas renomados se valorizam.</li>
                                <li><strong>Vinhos:</strong> Safras raras podem render 10-20% ao ano.</li>
                                <li><strong>Relógios de luxo:</strong> Rolex, Patek Philippe mantêm valor.</li>
                                <li><strong>Carros clássicos:</strong> Ferrari, Porsche vintage.</li>
                            </ul>

                            <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                                <p className="text-gray-300"><strong>Atenção:</strong> Exigem conhecimento especializado e têm baixa liquidez.</p>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: "unethical-tricks",
            title: "⚠️ Truques Antiéticos",
            description: "APENAS EDUCACIONAL: Estratégias controversas, brechas legais e táticas agressivas. Use com responsabilidade.",
            icon: ShieldCheck,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 8,
            completedLessons: 0,
            lessons: [
                {
                    id: "disclaimer",
                    title: "Aula 0: ⚠️ AVISO LEGAL IMPORTANTE",
                    duration: "5 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <div className="bg-red-500/20 p-8 rounded-2xl border-2 border-red-500">
                                <h3 className="text-red-500 font-black text-2xl mb-4">⚠️ LEIA ANTES DE CONTINUAR</h3>
                                <p className="text-white font-bold mb-4">Este módulo é PURAMENTE EDUCACIONAL.</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-200">
                                    <li>Algumas práticas aqui descritas são ILEGAIS e podem resultar em prisão e multas.</li>
                                    <li>Outras são legais mas ANTIÉTICAS e podem destruir sua reputação.</li>
                                    <li>O objetivo é CONHECIMENTO, não incentivo.</li>
                                    <li>Conhecer as táticas te protege de ser vítima delas.</li>
                                    <li>NÃO nos responsabilizamos pelo uso indevido destas informações.</li>
                                </ul>
                            </div>

                            <p className="text-gray-400 italic">Ao continuar, você reconhece que entende os riscos e que usará este conhecimento apenas para fins educacionais e de proteção pessoal.</p>
                        </div>
                    )
                },
                {
                    id: "tax-gray-zone",
                    title: "Aula 1: Zona Cinza Tributária",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20 mb-6">
                                <p className="text-yellow-500 font-bold">⚠️ Estas práticas estão em área cinzenta legal. Consulte um advogado tributarista antes de qualquer ação.</p>
                            </div>

                            <h3>1. Pessoa Jurídica para Investimentos</h3>
                            <p>Alguns investidores criam PJ para pagar menos IR sobre ganhos de capital (15% PJ vs até 22,5% PF).</p>
                            <p><strong>Risco:</strong> Receita pode considerar simulação se não houver atividade empresarial real.</p>

                            <h3>2. Offshore em Paraísos Fiscais</h3>
                            <p>Abrir empresa em países com IR zero (Ilhas Cayman, Panamá) para investir sem tributação.</p>
                            <p><strong>Legal se:</strong> Declarado corretamente na Receita Federal.</p>
                            <p><strong>Ilegal se:</strong> Usado para esconder patrimônio (crime de evasão).</p>

                            <h3>3. "Doações" Estratégicas</h3>
                            <p>Transferir patrimônio para filhos via doação tem alíquota menor que herança em alguns estados.</p>
                            <p>Holding familiar pode reduzir ITCMD (imposto sobre doações) de 8% para 4%.</p>

                            <h3>4. Prejuízos Fiscais Artificiais</h3>
                            <p>Vender ações no prejuízo em dezembro para abater IR, e recomprar em janeiro.</p>
                            <p><strong>Status:</strong> Legal, mas Receita monitora padrões suspeitos.</p>
                        </div>
                    )
                },
                {
                    id: "sales-manipulation",
                    title: "Aula 2: Manipulação em Vendas",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Táticas Psicológicas Agressivas:</h3>

                            <h4>1. Ancoragem Extrema</h4>
                            <p>Mostrar primeiro um produto caríssimo para fazer o produto real parecer barato.</p>
                            <p><strong>Exemplo:</strong> "Este curso custa R$ 50.000... mas hoje por apenas R$ 1.997!"</p>

                            <h4>2. Escassez Artificial</h4>
                            <p>Criar urgência falsa: "Últimas 3 vagas!" (quando há 100 disponíveis).</p>
                            <p><strong>Ético?</strong> Não. <strong>Funciona?</strong> Sim. <strong>Legal?</strong> Zona cinzenta.</p>

                            <h4>3. Prova Social Fabricada</h4>
                            <p>Depoimentos falsos, números inflados, "clientes satisfeitos" que não existem.</p>
                            <p><strong>Status:</strong> ILEGAL (propaganda enganosa - CDC Art. 37).</p>

                            <h4>4. Técnica do Pé na Porta</h4>
                            <p>Pedir algo pequeno primeiro, depois escalar para venda grande.</p>
                            <p><strong>Exemplo:</strong> "Aceita um brinde grátis?" → "Já que aceitou, que tal conhecer nosso produto?"</p>

                            <h4>5. Reciprocidade Forçada</h4>
                            <p>Dar algo "grátis" para criar obrigação moral de compra.</p>
                            <p>Amostras grátis, consultorias "sem compromisso" que pressionam pela venda.</p>
                        </div>
                    )
                },
                {
                    id: "contract-loopholes",
                    title: "Aula 3: Brechas Contratuais",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Cláusulas Abusivas Comuns:</h3>

                            <h4>1. Letra Miúda Mortal</h4>
                            <p>Esconder taxas e condições em fonte 6pt que ninguém lê.</p>
                            <p><strong>Defesa:</strong> CDC permite anular cláusulas abusivas mesmo que assinadas.</p>

                            <h4>2. Renovação Automática</h4>
                            <p>Contratos que renovam automaticamente e cobram sem aviso.</p>
                            <p><strong>Como escapar:</strong> Direito de arrependimento de 7 dias (compras online).</p>

                            <h4>3. Multa Desproporcional</h4>
                            <p>Multas de cancelamento de 100% do valor (ilegal - máximo 50% por lei).</p>

                            <h4>4. Foro de Eleição Abusivo</h4>
                            <p>Forçar processos em comarca distante para dificultar defesa do consumidor.</p>
                            <p><strong>Defesa:</strong> Juiz pode mudar foro para proteger consumidor.</p>
                        </div>
                    )
                },
                {
                    id: "credit-hacks",
                    title: "Aula 4: Hacks de Crédito",
                    duration: "12 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Estratégias para Aumentar Score:</h3>

                            <h4>1. Usuário Autorizado</h4>
                            <p>Ser adicionado como usuário autorizado em cartão de alguém com score alto aumenta SEU score.</p>
                            <p><strong>Risco:</strong> Se a pessoa atrasar, seu score cai junto.</p>

                            <h4>2. Microcréditos Estratégicos</h4>
                            <p>Pegar empréstimos pequenos e pagar imediatamente para construir histórico.</p>

                            <h4>3. Contestação em Massa</h4>
                            <p>Contestar TODAS as negativações no Serasa/SPC, mesmo que legítimas.</p>
                            <p>Muitas empresas não respondem no prazo e a negativação cai automaticamente.</p>
                            <p><strong>Ético?</strong> Não. <strong>Legal?</strong> Sim (direito de defesa).</p>

                            <h4>4. Rotação de Cartões</h4>
                            <p>Usar 30% do limite de cada cartão (nunca 100%) mantém score alto.</p>
                            <p>Pedir aumento de limite sem usar também melhora score.</p>
                        </div>
                    )
                },
                {
                    id: "negotiation-dark",
                    title: "Aula 5: Negociação Suja",
                    duration: "16 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Táticas de Negociação Agressiva:</h3>

                            <h4>1. Blefe do Concorrente</h4>
                            <p>"Seu concorrente ofereceu 30% mais barato" (mentira para forçar desconto).</p>
                            <p><strong>Contra-ataque:</strong> Peça a proposta por escrito.</p>

                            <h4>2. Autoridade Fantasma</h4>
                            <p>"Preciso consultar meu sócio/chefe" (que não existe) para ganhar tempo e pressionar.</p>

                            <h4>3. Silêncio Constrangedor</h4>
                            <p>Após a proposta, ficar em silêncio total até o outro ceder e melhorar a oferta.</p>

                            <h4>4. Ancoragem Absurda</h4>
                            <p>Começar com proposta ridiculamente baixa para fazer sua oferta real parecer razoável.</p>

                            <h4>5. Prazo Artificial</h4>
                            <p>"Preciso da resposta até amanhã" (quando não há pressa real) para forçar decisão apressada.</p>
                        </div>
                    )
                },
                {
                    id: "insurance-tricks",
                    title: "Aula 6: Seguros e Brechas",
                    duration: "14 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Como Seguradoras Te Enganam:</h3>

                            <h4>1. Franquia Escondida</h4>
                            <p>Seguro "sem franquia" que cobra "participação obrigatória" (é a mesma coisa).</p>

                            <h4>2. Cobertura Parcial</h4>
                            <p>Seguro que cobre "roubo" mas não "furto" (diferença técnica que nega 90% dos sinistros).</p>

                            <h4>3. Carência Abusiva</h4>
                            <p>180 dias de carência para usar o seguro (você paga sem poder usar).</p>

                            <h3>Como Se Proteger:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Leia TODO o contrato antes de assinar</li>
                                <li>Grave conversas com corretores (legal com aviso)</li>
                                <li>Exija tudo por escrito</li>
                                <li>Compare no Reclame Aqui antes de contratar</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: "legal-protection",
                    title: "Aula 7: Como Se Proteger Legalmente",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <h3>Blindagem Patrimonial Legal:</h3>

                            <h4>1. Holding Familiar</h4>
                            <p>Transferir bens para empresa protege de processos pessoais.</p>
                            <p><strong>Limite:</strong> Não protege de dívidas anteriores à transferência.</p>

                            <h4>2. Bem de Família</h4>
                            <p>Imóvel residencial é impenhorável (não pode ser tomado em dívidas).</p>
                            <p><strong>Exceção:</strong> Dívidas trabalhistas e pensão alimentícia.</p>

                            <h4>3. Previdência Privada</h4>
                            <p>VGBL/PGBL são impenhoráveis em alguns casos.</p>

                            <h4>4. Separação de Bens</h4>
                            <p>Casamento com separação total protege patrimônio de dívidas do cônjuge.</p>

                            <h3>⚠️ NUNCA FAÇA:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-red-400">
                                <li>Transferir bens para fugir de dívidas (fraude à execução - CRIME)</li>
                                <li>Declarar falência fraudulenta</li>
                                <li>Esconder patrimônio da Receita Federal</li>
                                <li>Usar laranjas (crime de lavagem de dinheiro)</li>
                            </ul>
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
                    {modules.map((module) => {
                        const realProgress = getModuleProgress(module.id, module.totalLessons);
                        const realCompletedLessons = getCompletedLessonsCount(module.id);

                        return (
                            <ModuleCard
                                key={module.id}
                                {...module}
                                progress={realProgress}
                                completedLessons={realCompletedLessons}
                                onClick={() => setActiveModule(module.id)}
                            />
                        );
                    })}
                </motion.div>

                {/* Active Lesson Modal */}
                {activeModule && activeModuleData && (
                    <LessonModal
                        moduleId={activeModule}
                        moduleTitle={activeModuleData.title}
                        lessons={activeModuleData.lessons}
                        onClose={() => setActiveModule(null)}
                        canAccessLesson={canAccessLesson}
                        markLessonComplete={markLessonComplete}
                    />
                )}
            </div>
        </motion.div>
    );
}
