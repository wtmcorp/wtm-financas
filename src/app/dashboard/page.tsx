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
    Activity,
    ShieldCheck,
    RefreshCw,
    Edit3,
    ArrowRight,
    Star
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
                className="max-w-7xl mx-auto space-y-12 relative z-10"
            >
                {/* 1. NARRATIVA: BOAS-VINDAS E PROPÓSITO */}
                <motion.div variants={itemVariants} className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                                Controle financeiro <br />
                                <span className="gradient-text">sem complicação.</span>
                            </h1>
                            <p className="text-gray-400 text-lg font-medium max-w-2xl">
                                Olá, {user.name?.split(" ")[0]}! Aqui seu dinheiro trabalha para você.
                                Acompanhe sua evolução de forma simples e humana.
                            </p>
                        </div>

                        {/* Microtextos de Confiança */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-2 rounded-full border border-white/10">
                                <ShieldCheck size={12} className="text-green-500" />
                                Dados Protegidos
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-2 rounded-full border border-white/10">
                                <RefreshCw size={12} className="text-blue-500" />
                                Atualizado agora
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-2 rounded-full border border-white/10">
                                <Edit3 size={12} className="text-primary" />
                                Edição Livre
                            </div>
                        </div>
                    </div>

                    {/* Bloco de Autoridade */}
                    <div className="glass-panel p-6 border-primary/20 bg-primary/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Star size={40} className="text-primary fill-primary" />
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-black shadow-lg shadow-primary/20">
                                <Zap size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">Por que a WTM Finanças?</h3>
                                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                                    Nascemos para desmistificar o mundo do dinheiro. Nossa missão é dar a você o poder de decisão
                                    através de clareza total, sem termos técnicos ou planilhas chatas. Você no comando, sempre.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. NARRATIVA: VISÃO GERAL (O QUE TENHO HOJE) */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">Visão Geral do Momento</h2>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <QuickStatsWidget />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Coluna Principal: Patrimônio e Evolução */}
                        <div className="lg:col-span-8 space-y-8">
                            <motion.div variants={itemVariants}>
                                <BalanceCard />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants} className="h-full">
                                    <RevenueChart />
                                </motion.div>
                                <motion.div variants={itemVariants} className="h-full">
                                    <NetWorthChart />
                                </motion.div>
                            </div>
                        </div>

                        {/* Coluna Lateral: Ações e Saúde */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div variants={itemVariants}>
                                <QuickActions />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <HealthScore />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <AiInsights />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 3. NARRATIVA: ESTRATÉGIA E METAS (COMO CHEGAR LÁ) */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">Estratégia e Metas</h2>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Estratégia */}
                        <div className="lg:col-span-4">
                            <motion.section
                                variants={itemVariants}
                                className="glass-panel p-6 md:p-8 relative overflow-hidden group h-full"
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

                        {/* Metas e Conquistas */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="h-full">
                                <GoalsWidget />
                            </motion.div>
                            <motion.div variants={itemVariants} className="h-full">
                                <AchievementsWidget />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 4. NARRATIVA: DETALHAMENTO E HISTÓRICO (TRANSPARÊNCIA) */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">Histórico e Detalhes</h2>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Histórico */}
                        <div className="lg:col-span-8">
                            <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8 h-full">
                                <SectionHeader
                                    title="Histórico"
                                    subtitle="Últimas movimentações"
                                    icon={Wallet}
                                    tooltip="Aqui você vê os últimos registros de dinheiro que entrou ou saiu da sua conta."
                                />
                                <TransactionList limit={8} />
                                <button
                                    onClick={() => router.push('/trends')}
                                    className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest transition-all border border-white/5"
                                >
                                    Ver Histórico Completo
                                </button>
                            </motion.div>
                        </div>

                        {/* Calendário e Notícias */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div variants={itemVariants}>
                                <FinancialCalendar />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <MonthlyClosingCard />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <NewsSection />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 5. BLOCO DE CONVERSÃO: CONSULTORIA */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="relative rounded-[3rem] overflow-hidden p-8 md:p-16 bg-gradient-to-br from-primary/20 via-background to-blue-600/20 border border-white/10 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl space-y-6 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
                                <Star size={12} className="fill-primary" />
                                Exclusivo para você
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                Quer acelerar sua <br />
                                <span className="gradient-text">liberdade financeira?</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Tenha um acompanhamento personalizado com nossos especialistas.
                                Criamos um plano de ação sob medida para seus sonhos saírem do papel.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                                >
                                    Agendar Consultoria Grátis <ArrowRight size={18} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/5 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 flex items-center justify-center gap-3"
                                >
                                    Saber Mais
                                </motion.button>
                            </div>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="w-64 h-64 bg-primary/20 rounded-full blur-[100px] absolute inset-0 animate-pulse" />
                            <motion.div
                                animate={{ rotate: [12, -12, 12] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-48 h-48 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-2xl"
                            >
                                <TrendingUp size={80} className="text-primary" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
