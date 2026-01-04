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
                            <h3>Quando usar Débito?</h3>
                            <p>Apenas se você não tem autocontrole ou se a loja oferece um desconto superior a 3% para pagamento à vista que não pode ser replicado no crédito.</p>
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
                            <h3>Assinaturas "Vampiras":</h3>
                            <p>Aquelas de R$ 19,90 que você não usa. No final do ano, são centenas de reais que poderiam estar investidos.</p>
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
                            <h3>Serviços (Internet/Celular):</h3>
                            <p>Ligue anualmente para o setor de cancelamento. Eles têm ofertas que o site não mostra para reter clientes.</p>
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
                            <h3>Tipos de Debêntures:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Simples:</strong> Pagam juros e devolvem o capital.</li>
                                <li><strong>Incentivadas:</strong> Isentas de IR (geralmente para obras de infraestrutura).</li>
                                <li><strong>Conversíveis:</strong> Podem ser transformadas em ações da empresa.</li>
                            </ul>
                            <p><strong>Risco:</strong> Maior que o dos bancos, pois não têm garantia do FGC.</p>
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
                            <p>São títulos de renda fixa isentos de IR que financiam o setor imobiliário e o agronegócio.</p>
                            <p><strong>Diferença:</strong> São emitidos por securitizadoras, não por bancos. Não têm FGC.</p>
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
                            <p><strong>Limite Global:</strong> R$ 1 milhão a cada 4 anos.</p>
                            <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                                <p className="text-green-500 text-sm"><strong>Dica:</strong> Nunca deixe mais de R$ 250k em um único banco ou grupo financeiro.</p>
                            </div>
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
                            <h3>1. Dividendos</h3>
                            <p>Isentos de Imposto de Renda para pessoa física. É o lucro líquido "limpo" que cai na sua conta.</p>
                            <h3>2. JCP (Juros sobre Capital Próprio)</h3>
                            <p>Tem retenção de 15% de IR na fonte. Para a empresa, é uma forma de pagar menos imposto corporativo.</p>
                            <p><strong>Dica:</strong> Reinvista seus dividendos para acelerar o efeito dos juros compostos.</p>
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
                            <h3>Buy and Hold</h3>
                            <p>Comprar boas empresas e mantê-las por anos ou décadas. O foco é ser sócio e receber lucros.</p>
                            <h3>Day/Swing Trade</h3>
                            <p>Tentar ganhar na oscilação de curto prazo. Exige muito tempo, estudo e tem alto risco. 95% dos traders perdem dinheiro no longo prazo.</p>
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
                            <h3>Diversificação Setorial:</h3>
                            <p>Tenha ações de diferentes setores: Bancos, Energia, Saneamento, Commodities, Varejo. Se um setor vai mal, os outros protegem sua carteira.</p>
                            <h3>Quantas ações ter?</h3>
                            <p>Entre 8 a 15 empresas é o ideal para a maioria dos investidores pessoa física. Menos que isso é arriscado, mais que isso é difícil de acompanhar.</p>
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
                            <p>Investem em imóveis físicos (shoppings, galpões, lajes corporativas). O ganho vem do aluguel e da valorização do imóvel.</p>
                            <h3>FIIs de Papel (Recebíveis)</h3>
                            <p>Investem em títulos de dívida imobiliária (CRI, LCI). O ganho vem dos juros desses títulos. Costumam pagar dividendos maiores, mas não têm o imóvel físico como lastro direto.</p>
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
                            <h3>Localização</h3>
                            <p>Imóveis em regiões premium (como Faria Lima em SP) sempre terão demanda, mesmo em crises.</p>
                            <h3>Vacância</h3>
                            <p>É a porcentagem do imóvel que está vazia. Vacância alta significa menos aluguel entrando. Fique de olho no histórico de vacância do fundo.</p>
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
                            <p><strong>Vantagem:</strong> Diversificação instantânea. Com uma cota, você investe em dezenas de outros fundos.</p>
                            <p><strong>Desvantagem:</strong> Taxa de administração dupla (a do FOF e a dos fundos que ele compra).</p>
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
            description: "O LADO OBSCURO: Estratégias de elite, brechas no sistema e táticas que os bancos não querem que você saiba.",
            icon: ShieldCheck,
            level: "Avançado" as const,
            progress: 0,
            totalLessons: 16,
            completedLessons: 0,
            lessons: [
                {
                    id: "disclaimer",
                    title: "Aula 0: ⚠️ AVISO DE SEGURANÇA",
                    duration: "5 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <div className="bg-red-500/20 p-8 rounded-2xl border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                                <h3 className="text-red-500 font-black text-3xl mb-4 tracking-tighter">⚠️ CONTEÚDO SENSÍVEL</h3>
                                <p className="text-white font-bold text-lg mb-4">Este módulo contém informações que podem ser consideradas imorais ou ilegais dependendo da aplicação.</p>
                                <ul className="list-disc pl-5 space-y-3 text-gray-200 font-medium">
                                    <li>O conhecimento aqui é para <span className="text-red-400">DEFESA</span> e <span className="text-red-400">ENTENDIMENTO DO SISTEMA</span>.</li>
                                    <li>Não incentivamos a quebra de leis.</li>
                                    <li>Muitas dessas táticas são usadas por bilionários para proteger fortuna.</li>
                                    <li>O uso indevido pode levar a bloqueios de conta, processos ou prisão.</li>
                                </ul>
                            </div>
                            <p className="text-gray-400 italic text-center">"Conheça seu inimigo e a si mesmo, e você nunca será derrotado." - Sun Tzu</p>
                        </div>
                    )
                },
                {
                    id: "tax-icms-hack",
                    title: "Aula 1: O Segredo do ICMS e Impostos",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O Brasil tem uma das cargas tributárias mais complexas do mundo. Quem conhece as brechas, economiza fortunas.</p>

                            <h3>1. Triangulação de Notas (O Hack dos Estados)</h3>
                            <p>Empresas de e-commerce muitas vezes se instalam em estados como <strong>Espírito Santo</strong> ou <strong>Santa Catarina</strong> devido a benefícios fiscais de ICMS na importação e revenda.</p>
                            <p><strong>Como funciona:</strong> A mercadoria entra por um porto com benefício, a nota é emitida por lá, mas o estoque pode estar em SP. Isso reduz o ICMS de 18% para até 4% em alguns casos.</p>

                            <h3>2. Compra via PJ (Uso Pessoal)</h3>
                            <p>Muitos empresários compram carros, eletrônicos e até imóveis no nome da empresa (CNPJ).</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Vantagem:</strong> Abatimento de impostos, preços de frota (até 30% de desconto em carros).</li>
                                <li><strong>Risco:</strong> Confusão patrimonial. A Receita pode multar se provar que o uso é 100% pessoal sem benefício para a empresa.</li>
                            </ul>

                            <h3>3. O Hack da Isenção de IPI/ICMS</h3>
                            <p>Pessoas com certas condições de saúde (mesmo leves, como problemas de coluna ou LER) podem ter direito a isenção de IPI e ICMS na compra de carros zero (PCD).</p>
                            <p><strong>A tática:</strong> Muitos usam laudos médicos "generosos" para conseguir descontos de até 25% no valor do veículo.</p>
                        </div>
                    )
                },
                {
                    id: "credit-card-god-mode",
                    title: "Aula 2: Cartão de Crédito: God Mode",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O banco quer que você pague juros. Nós queremos que o banco pague suas viagens.</p>

                            <h3>1. O Loop do PicPay/99Pay</h3>
                            <p>Usar um cartão de crédito para pagar um boleto de depósito em outro banco digital (ou conta de amigo) para gerar milhas sem gastar nada.</p>
                            <p><strong>Status:</strong> Os apps estão limitando, mas sempre surgem novas carteiras (RecargaPay, Ame). O segredo é o <strong>giro de capital</strong>.</p>

                            <h3>2. Estorno Estratégico</h3>
                            <p>Comprar um produto, gerar as milhas/cashback, e depois devolver o produto dentro dos 7 dias (Direito de Arrependimento).</p>
                            <p><strong>Risco:</strong> Se feito repetidamente, o banco cancela o cartão e a loja te bane. É uma tática de "uma vez na vida".</p>

                            <h3>3. Upgrade via "Ameaça"</h3>
                            <p>Ligar no setor de cancelamento e dizer que recebeu uma oferta melhor do concorrente (ex: XP Visas Infinite vs Inter Black). Muitas vezes eles liberam o cartão Black e isentam a anuidade na hora para não perder o cliente.</p>
                        </div>
                    )
                },
                {
                    id: "social-engineering-finance",
                    title: "Aula 3: Engenharia Social Financeira",
                    duration: "18 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>A maioria das regras financeiras tem um "humano" no meio. E humanos são falhos.</p>

                            <h3>1. A Técnica do "Gerente Amigo"</h3>
                            <p>Levar presentes ou criar uma relação pessoal com o gerente da agência. Gerentes têm alçada para baixar taxas de juros e aumentar limites manualmente que o algoritmo negaria.</p>

                            <h3>2. O Blefe da Portabilidade</h3>
                            <p>Iniciar um processo de portabilidade de salário ou financiamento imobiliário. O banco atual recebe um alerta vermelho e o "setor de retenção" entra em contato com ofertas agressivas para você ficar.</p>

                            <h3>3. Contestação de Multas de Atraso</h3>
                            <p>Ligar dizendo que "o app estava fora do ar" ou "não recebi o boleto por erro do sistema". 90% das vezes eles estornam a multa e os juros se for a primeira vez no semestre.</p>
                        </div>
                    )
                },
                {
                    id: "leilao-hacks",
                    title: "Aula 4: Leilões: Onde os Ricos Compram",
                    duration: "22 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Imóveis e carros por 50% do valor de mercado. Parece golpe, mas é como o sistema funciona.</p>

                            <h3>1. Leilões Judiciais vs Extrajudiciais</h3>
                            <p>Judiciais (dívidas de justiça) costumam ter descontos maiores, mas são mais lentos. Extrajudiciais (retomada de banco) são mais rápidos.</p>

                            <h3>2. O Hack da Desocupação</h3>
                            <p>Comprar imóveis ocupados assusta 90% dos compradores, o que derruba o preço. O segredo é tener um advogado que faça a imissão na posse rapidamente.</p>

                            <h3>3. Leilão da Receita Federal</h3>
                            <p>Produtos apreendidos (iPhones, Macbooks, Carros). O segredo é olhar os lotes de "pessoa jurídica" que costumam ter menos concorrência que os de pessoa física.</p>
                        </div>
                    )
                },
                {
                    id: "offshore-basics",
                    title: "Aula 5: Offshore e Blindagem Nível 10",
                    duration: "30 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Se você tem mais de R$ 1 milhão, deixar tudo no Brasil é um erro estratégico.</p>

                            <h3>1. LLC nos EUA (Wyoming/Delaware)</h3>
                            <p>Abrir uma empresa nos EUA para investir globalmente. Se você não tem atividade física lá, pode não pagar imposto corporativo nos EUA (pass-through taxation).</p>

                            <h3>2. O Cartão da Nomad/Avenue</h3>
                            <p>Gastar em dólar no Brasil usando cartões internacionais. Isso dificulta o rastreio imediato de gastos pelo leão, embora ainda deva ser declarado.</p>

                            <h3>3. Trust e Fundações</h3>
                            <p>Colocar o patrimônio em uma estrutura onde você "não é dono de nada, mas controla tudo". Isso protege contra processos, divórcios e heranças complicadas.</p>
                        </div>
                    )
                },
                {
                    id: "churning-advanced",
                    title: "Aula 6: Churning Extremo de Milhas",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como viajar de Primeira Classe pagando preço de Econômica (ou nada).</p>

                            <h3>1. Promoções de Transferência 100%</h3>
                            <p>Nunca transfira pontos do cartão para a aérea sem bônus. Espere as janelas de 80% a 120% de bônus (Livelo &rarr; Smiles/Azul).</p>

                            <h3>2. Compra de Pontos com 50% de Desconto</h3>
                            <p>Comprar pontos na Livelo/Esfera com desconto e transferir com bônus. O custo do milheiro cai drasticamente, permitindo vender com lucro ou viajar barato.</p>

                            <h3>3. O Hack do "No-Show" e Reembolso</h3>
                            <p>Táticas avançadas de emissão de passagens com pontos onde você cancela trechos específicos para reaver taxas ou pontos de forma estratégica (Cuidado: as aéreas estão banindo contas por isso).</p>
                        </div>
                    )
                },
                {
                    id: "overemployment-hacks",
                    title: "Aula 7: Overemployment: O Multiplicador de Renda",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Trabalhar em 2 ou 3 empresas ao mesmo tempo sem que elas saibam.</p>

                            <h3>1. A Regra do Silêncio</h3>
                            <p>Nunca conte para ninguém. Nem para sua família. O segredo é a base do Overemployment.</p>

                            <h3>2. Automação de Tarefas</h3>
                            <p>Use IA e scripts para fazer em 1 hora o que esperam que você faça em 8. O tempo que sobra você usa para o J2 (Job 2).</p>

                            <h3>3. Gestão de Reuniões</h3>
                            <p>Ter dois laptops, dois mouses e dois fones. Se houver reunião simultânea, use um fone em cada ouvido e feche a câmera em uma delas alegando "problemas de banda".</p>
                        </div>
                    )
                },
                {
                    id: "arbitragem-cripto",
                    title: "Aula 8: Arbitragem de Cripto e P2P",
                    duration: "22 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Ganhar na diferença de preços entre corretoras.</p>

                            <h3>1. Arbitragem entre Corretoras</h3>
                            <p>Comprar BTC na Binance e vender na Foxbit (ou vice-versa) quando há um deságio ou ágio grande. O lucro é pequeno por operação, mas escalável com bots.</p>

                            <h3>2. Mercado P2P (Peer-to-Peer)</h3>
                            <p>Vender cripto diretamente para pessoas com um prêmio (markup). Muitos pagam mais caro para não passar por corretoras e evitar o rastro bancário.</p>

                            <h3>3. Stablecoins e Yield Farming</h3>
                            <p>Colocar dólares digitais (USDT/USDC) para render em protocolos DeFi a taxas de 10-15% ao ano, muito acima de qualquer banco tradicional.</p>
                        </div>
                    )
                },
                {
                    id: "insurance-hacks",
                    title: "Aula 9: Hacks de Seguros e Garantias",
                    duration: "15 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como fazer o seguro realmente pagar.</p>

                            <h3>1. Seguro Proteção de Preço (Visa/Master)</h3>
                            <p>Comprar algo e encontrar mais barato depois. O cartão te paga a diferença. O "truque" é usar sites de comparação de preços para achar anúncios obscuros mais baratos.</p>

                            <h3>2. Garantia Estendida Grátis</h3>
                            <p>Quase todos os cartões Gold/Platinum/Black dão 1 ano extra de garantia. Nunca pague pela garantia da loja.</p>

                            <h3>3. Seguro Viagem "Oculto"</h3>
                            <p>Se seu voo atrasar mais de 4 horas, o cartão paga sua alimentação e hotel. Muitos não pedem o reembolso por preguiça, perdendo centenas de dólares.</p>
                        </div>
                    )
                },
                {
                    id: "negotiation-dark-arts",
                    title: "Aula 10: Artes das Trevas na Negociação",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Táticas psicológicas para vencer qualquer discussão financeira.</p>

                            <h3>1. O "Policial Bom e Policial Mau" (Sozinho)</h3>
                            <p>Dizer que você adorou a oferta, mas seu "sócio" ou "esposa" achou um absurdo e não deixa você fechar por esse preço. Você joga a culpa no terceiro e força o vendedor a baixar o preço para "te ajudar".</p>

                            <h3>2. A Técnica do Silêncio Mortal</h3>
                            <p>Após ouvir o preço, não diga nada. Olhe nos olhos do vendedor e conte até 10 mentalmente. O desconforto fará ele começar a se justificar e, muitas vezes, oferecer um desconto sem você pedir.</p>

                            <h3>3. Ancoragem Inversa</h3>
                            <p>Começar a negociação oferecendo algo tão baixo que beira o insulto. Quando você sobe para o preço que realmente quer pagar, parece uma concessão enorme da sua parte.</p>
                        </div>
                    )
                },
                {
                    id: "lifestyle-arbitrage",
                    title: "Aula 11: Arbitragem de Estilo de Vida",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como viver como um milionário com orçamento de classe média.</p>

                            <h3>1. House Hacking</h3>
                            <p>Alugar um apartamento grande e sublocar os quartos no Airbnb. Se bem feito, o lucro dos quartos paga seu aluguel e sobra dinheiro. Você mora de graça.</p>

                            <h3>2. Carros de Repasse</h3>
                            <p>Comprar carros de lojistas (repasse) que precisam de giro rápido. Você compra pelo preço de custo da loja e vende pelo preço de tabela FIPE.</p>

                            <h3>3. O Hack das Assinaturas</h3>
                            <p>Usar VPN para assinar YouTube Premium, Netflix e Spotify via Turquia ou Argentina. O custo cai de R$ 50 para R$ 5 por mês.</p>
                        </div>
                    )
                },
                {
                    id: "geo-arbitrage",
                    title: "Aula 12: Geo-arbitragem (Ganhar em Dólar, Gastar em Real)",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>A forma mais rápida de enriquecer não é investir melhor, é mudar a moeda que você ganha.</p>

                            <h3>O Conceito:</h3>
                            <p>Geo-arbitragem é explorar a diferença de custo de vida entre países. Você ganha em moeda forte (USD, EUR, GBP) e vive em um país de moeda fraca (BRL, ARS, THB).</p>

                            <h3>Estratégias Práticas:</h3>

                            <h4>1. Trabalho Remoto Internacional</h4>
                            <p>Sites como Toptal, Crossover e Turing pagam desenvolvedores e designers em dólar. Um salário "baixo" de $3k USD é R$ 15k+ no Brasil.</p>

                            <h4>2. Residência Fiscal Estratégica</h4>
                            <p>Se você não mora em nenhum lugar por mais de 183 dias, pode se tornar um "turista perpétuo" e legalmente não pagar imposto de renda em lugar nenhum (exige consultoria especializada).</p>

                            <h4>3. Turismo de Parto</h4>
                            <p>Ter filhos em países que dão cidadania por solo (Jus Soli), como EUA ou Brasil, para garantir passaportes fortes para a família.</p>

                            <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
                                <p className="text-primary font-bold">Hack de Viagem:</p>
                                <p className="text-gray-300">Use VPN para comprar passagens aéreas simulando estar em um país mais pobre. Os preços mudam drasticamente.</p>
                            </div>
                        </div>
                    )
                },
                {
                    id: "credit-score-god-mode",
                    title: "Aula 13: Credit Score God Mode",
                    duration: "20 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>O Score não é uma medida de honestidade, é uma medida de quão lucrativo você é para o banco.</p>

                            <h3>1. O Hack do Cadastro Positivo</h3>
                            <p>Ativar o Cadastro Positivo e "alimentar" o sistema com contas pequenas pagas em dia. Mas o segredo é o <strong>limite utilizado</strong>. Nunca use mais de 30% do seu limite total, mesmo que você pague tudo depois.</p>

                            <h3>2. Empréstimo "Fake" para Score</h3>
                            <p>Pegar um empréstimo pequeno com garantia (onde você já tem o dinheiro), pagar a primeira parcela e quitar o resto em 3 meses. Isso mostra ao algoritmo que você é um "bom pagador de juros", o que o banco ama.</p>

                            <h3>3. Limpeza de Consultas (Search Removal)</h3>
                            <p>Muitas consultas ao seu CPF (quando você tenta cartões) derrubam o score. Existe um processo legal para pedir a exclusão de consultas excessivas nos órgãos de proteção ao crédito.</p>
                        </div>
                    )
                },
                {
                    id: "debt-settlement-secrets",
                    title: "Aula 14: Segredos da Quitação de Dívidas",
                    duration: "25 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como pagar R$ 1.000 em uma dívida de R$ 10.000 legalmente.</p>

                            <h3>1. A Curva de Depreciação da Dívida</h3>
                            <p>Bancos vendem dívidas "podres" para empresas de cobrança por 2% a 5% do valor original. Se sua dívida tem mais de 2 anos, a empresa de cobrança aceita qualquer coisa acima de 10% para ter lucro.</p>

                            <h3>2. O Blefe do "Nada Consta"</h3>
                            <p>Esperar os feirões de limpa nome (como o do Serasa). Mas antes, ligue no banco e diga que você está saindo do país e quer "resolver a vida" com o pouco que sobrou. O senso de urgência faz eles aceitarem propostas agressivas.</p>

                            <h3>3. Prescrição Intercorrente</h3>
                            <p>Se o banco te processa mas não encontra bens para penhorar em 5 anos, a dívida pode prescrever judicialmente. O segredo é não ter nada no seu nome durante esse período (Blindagem).</p>
                        </div>
                    )
                },
                {
                    id: "billionaire-shield",
                    title: "Aula 15: O Escudo do Bilionário",
                    duration: "35 min",
                    type: "article" as const,
                    completed: false,
                    content: (
                        <div className="space-y-6">
                            <p>Como os ultra-ricos protegem seu patrimônio de processos e crises.</p>

                            <h3>1. Holding Patrimonial</h3>
                            <p>Não tenha nada em seu nome. Tenha uma empresa que é dona de outra empresa que é dona dos seus bens. Isso cria camadas de dificuldade para qualquer oficial de justiça.</p>

                            <h3>2. Ouro Físico e Cripto Fria</h3>
                            <p>Patrimônio que não existe no sistema bancário. Ouro em cofres privados e Bitcoin em "Cold Wallets" (Ledger/Trezor). Se o governo congelar suas contas, você ainda tem poder de compra real.</p>

                            <h3>3. Cidadania por Investimento (Golden Visa)</h3>
                            <p>Ter um "Plano B" geográfico. Países como Paraguai, Portugal ou ilhas do Caribe oferecem residência ou cidadania para quem investe. Se o Brasil "quebrar", você tem para onde ir com seu dinheiro.</p>

                            <div className="bg-red-500/20 p-6 rounded-2xl border border-red-500/50">
                                <p className="text-red-500 font-bold">AVISO FINAL:</p>
                                <p className="text-white">O conhecimento é uma ferramenta. Use com sabedoria e ética. O sistema é bruto, mas quem conhece as regras joga melhor.</p>
                            </div>
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
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 p-10 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                        <GraduationCap size={400} className="text-primary rotate-12 animate-float" />
                    </div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none"></div>

                    <div className="relative z-10 space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="px-5 py-2 bg-white/5 text-primary border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 backdrop-blur-md">
                                <GraduationCap size={16} className="text-primary animate-bounce" />
                                Wtm Academy • Formação de Elite
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                                Domine o <br />
                                <span className="gradient-text">Jogo do Dinheiro</span>
                            </h1>
                            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed">
                                Educação financeira não é sobre economizar cafezinho. É sobre <span className="text-white font-black">liberdade</span>. Escolha sua trilha e comece a evoluir seu patrimônio hoje.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-6">
                            <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md group/status cursor-default">
                                <BookOpen size={20} className="text-primary group-hover:scale-110 transition-transform" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Conteúdo</span>
                                    <span className="text-xs font-black text-white uppercase tracking-tighter">Atualizado</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md group/sync cursor-default">
                                <TrendingUp size={20} className="text-green-400 group-hover:scale-110 transition-transform" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Metodologia</span>
                                    <span className="text-xs font-black text-white uppercase tracking-tighter">Prática</span>
                                </div>
                            </div>
                        </div>
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
                        // These functions are placeholders, assuming they exist elsewhere
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
                        lessons={activeModuleData.lessons} // Assuming lessons property exists or is handled
                        onClose={() => setActiveModule(null)}
                        canAccessLesson={canAccessLesson} // Placeholder
                        markLessonComplete={markLessonComplete} // Placeholder
                    />
                )}
            </div>
        </motion.div>
    );
}
