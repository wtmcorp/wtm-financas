"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useFinance } from "@/contexts/FinanceContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutGrid,
    TrendingUp,
    PieChart,
    Info,
    Home,
    Heart,
    ChevronRight,
    Loader2,
    Wallet,
    Target,
    Zap,
    Calendar,
    Trophy,
    Newspaper,
    Activity
} from "lucide-react";

// Components
import BalanceCard from "@/components/dashboard/BalanceCard";
import QuickActions from "@/components/dashboard/QuickActions";
import QuickStatsWidget from "@/components/dashboard/QuickStatsWidget";
import HealthScore from "@/components/dashboard/HealthScore";
import AiInsights from "@/components/dashboard/AiInsights";
import GoalsWidget from "@/components/dashboard/GoalsWidget";
import TransactionList from "@/components/finance/TransactionList";
import NewsSection from "@/components/dashboard/NewsSection";
import AchievementsWidget from "@/components/dashboard/AchievementsWidget";
import FinancialCalendar from "@/components/dashboard/FinancialCalendar";
import MonthlyClosingCard from "@/components/dashboard/MonthlyClosingCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import NetWorthChart from "@/components/dashboard/charts/NetWorthChart";
import { Tooltip } from "@/components/ui/Tooltip";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const { budgets } = useFinance();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (!mounted || loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

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
        visible: { opacity: 1, y: 0 }
    };

    const budget = (user as any)?.budget || { needs: 0, wants: 0, savings: 0 };

    // Helper for section headers with tooltips
    const SectionHeader = ({ title, subtitle, icon: Icon, tooltip }: { title: string, subtitle: string, icon: any, tooltip: string }) => (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon className="text-primary" size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-black text-white tracking-tight uppercase">{title}</h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{subtitle}</p>
                </div>
            </div>
            <Tooltip text={tooltip}>
                <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all border border-white/10">
                    <Info size={14} />
                </button>
            </Tooltip>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-white p-4 md:p-8 pb-32 overflow-x-hidden">
            {/* Background Ambient */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto space-y-8 relative z-10"
            >
                {/* Header Simplificado */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                            Olá, <span className="gradient-text">{user.name?.split(" ")[0]}</span> 👋
                        </h1>
                        <p className="text-gray-400 text-sm font-medium mt-2 max-w-md leading-relaxed">
                            Aqui está o resumo da sua vida financeira. Tudo o que você precisa saber de forma simples.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-black text-green-400 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Inteligência Ativa
                        </div>
                        <Tooltip text="Este é o seu painel principal. Use os ícones de interrogação para entender cada parte.">
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Info size={12} />
                                Ajuda Rápida
                            </div>
                        </Tooltip>
                    </div>
                </motion.div>

                {/* Resumo Rápido */}
                <motion.div variants={itemVariants}>
                    <Tooltip text="Resumo rápido do seu dinheiro: quanto entrou, quanto saiu e o que sobrou este mês.">
                        <QuickStatsWidget />
                    </Tooltip>
                </motion.div>

                {/* Grid Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Coluna Esquerda: Carteira e Ações */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Sua Carteira: O valor total que você possui somando todas as suas contas e investimentos.">
                                <BalanceCard />
                            </Tooltip>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Ações Rápidas: Use estes botões para adicionar novos gastos ou ganhos em segundos.">
                                <QuickActions />
                            </Tooltip>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <HealthScore />
                        </motion.div>
                    </div>

                    {/* Coluna Central: Gráficos e Estratégia */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8">
                            <SectionHeader
                                title="Fluxo Mensal"
                                subtitle="Entradas vs Saídas"
                                icon={Activity}
                                tooltip="Este gráfico mostra se você está ganhando mais do que gastando ao longo dos dias."
                            />
                            <div className="h-[300px]">
                                <RevenueChart />
                            </div>
                        </motion.div>

                        {/* Estratégia Simplificada */}
                        <motion.section
                            variants={itemVariants}
                            className="glass-panel p-6 md:p-8 relative overflow-hidden group"
                        >
                            <SectionHeader
                                title="Sua Estratégia"
                                subtitle="Regra 50/30/20"
                                icon={LayoutGrid}
                                tooltip="Dividimos seu dinheiro em 3 partes: 50% para o que é essencial (casa, comida), 30% para seu lazer e 20% para seu futuro."
                            />

                            {budget && (budget.needs > 0 || budget.wants > 0 || budget.savings > 0) ? (
                                <div className="grid grid-cols-1 gap-4 relative z-10">
                                    {[
                                        { label: "Essencial", value: budget.needs, color: "from-blue-500 to-cyan-600", percent: "50%", icon: Home, desc: "Moradia, Contas, Alimentação" },
                                        { label: "Lazer", value: budget.wants, color: "from-purple-500 to-pink-600", percent: "30%", icon: Heart, desc: "Hobbies, Viagens, Restaurantes" },
                                        { label: "Futuro", value: budget.savings, color: "from-primary to-purple-600", percent: "20%", icon: TrendingUp, desc: "Investimentos e Reserva" }
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-all">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                                        <item.icon size={18} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-white uppercase tracking-tight">{item.label}</h4>
                                                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-white">R$ {item.value?.toLocaleString()}</p>
                                                    <p className="text-[10px] font-black text-primary uppercase">{item.percent}</p>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: item.percent }}
                                                    transition={{ duration: 1.5, delay: i * 0.2 }}
                                                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-white/[0.02] rounded-2xl border border-dashed border-white/10 relative z-10">
                                    <p className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-4">Nenhuma estratégia definida</p>
                                    <button
                                        onClick={() => router.push("/tools")}
                                        className="px-6 py-3 bg-primary text-black font-black text-[9px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/10 flex items-center gap-2 mx-auto"
                                    >
                                        Configurar Agora <ChevronRight size={12} />
                                    </button>
                                </div>
                            )}
                        </motion.section>
                    </div>

                    {/* Coluna Direita: IA e Metas */}
                    <div className="lg:col-span-3 space-y-8">
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Dicas da IA: Nossa inteligência analisa seus gastos e sugere formas de economizar e investir melhor.">
                                <AiInsights />
                            </Tooltip>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Seus Objetivos: Acompanhe o progresso dos seus sonhos, como comprar um carro ou fazer uma viagem.">
                                <GoalsWidget />
                            </Tooltip>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Conquistas: Ganhe medalhas e pontos ao manter bons hábitos financeiros!">
                                <AchievementsWidget />
                            </Tooltip>
                        </motion.div>
                    </div>
                </div>

                {/* Seção Inferior: Patrimônio e Transações */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8">
                            <SectionHeader
                                title="Evolução Patrimonial"
                                subtitle="Crescimento do seu dinheiro"
                                icon={TrendingUp}
                                tooltip="Este gráfico mostra como seu patrimônio total (dinheiro + investimentos) está crescendo ao longo dos meses."
                            />
                            <div className="h-[350px]">
                                <NetWorthChart />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8">
                            <SectionHeader
                                title="Histórico"
                                subtitle="Últimas movimentações"
                                icon={Wallet}
                                tooltip="Aqui você vê os últimos registros de dinheiro que entrou ou saiu da sua conta."
                            />
                            <TransactionList limit={5} />
                            <button
                                onClick={() => router.push('/trends')}
                                className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest transition-all border border-white/5"
                            >
                                Ver Histórico Completo
                            </button>
                        </motion.div>
                    </div>

                    {/* Widgets Laterais */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Calendário: Não esqueça de pagar suas contas! Veja aqui os próximos vencimentos.">
                                <FinancialCalendar />
                            </Tooltip>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Fechamento Mensal: Um resumo de como você se saiu no mês passado comparado ao atual.">
                                <MonthlyClosingCard />
                            </Tooltip>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Tooltip text="Notícias: Fique por dentro do que acontece no mundo das finanças.">
                                <NewsSection />
                            </Tooltip>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
