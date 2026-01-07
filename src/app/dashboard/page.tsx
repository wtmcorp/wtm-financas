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
    Loader2
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

// Placeholder for Charts to avoid crashes
const ChartPlaceholder = ({ title }: { title: string }) => (
    <div className="glass-panel p-8 h-[300px] flex flex-col items-center justify-center text-center border border-dashed border-white/10">
        <PieChart size={48} className="text-gray-600 mb-4 opacity-50" />
        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
        <p className="text-xs text-gray-600 mt-2">Gráfico temporariamente indisponível para manutenção.</p>
    </div>
);

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

    // Budget Data (Safe Access)
    const budget = (user as any)?.budget || { needs: 0, wants: 0, savings: 0 };

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
                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                            Olá, <span className="gradient-text">{user.name?.split(" ")[0]}</span>
                        </h1>
                        <p className="text-gray-400 text-sm font-medium mt-1">
                            Sua central de inteligência financeira está ativa.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Sistema Online
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats Overview */}
                <motion.div variants={itemVariants}>
                    <QuickStatsWidget />
                </motion.div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Balance & Actions (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div variants={itemVariants}>
                            <BalanceCard />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <QuickActions />
                        </motion.div>
                    </div>

                    {/* Middle Column: Charts & Strategy (5 cols) */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div variants={itemVariants} className="h-[400px]">
                            <RevenueChart />
                        </motion.div>

                        {/* Budget Strategy Card */}
                        <motion.section
                            variants={itemVariants}
                            className="glass-panel p-6 md:p-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                                <PieChart size={120} />
                            </div>

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div>
                                    <h2 className="text-xl font-black text-white tracking-tighter flex items-center gap-2 uppercase">
                                        <LayoutGrid className="text-primary" size={20} />
                                        Estratégia
                                    </h2>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mt-1">Framework 50/30/20</p>
                                </div>
                                <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all border border-white/10">
                                    <Info size={16} />
                                </button>
                            </div>

                            {budget && (budget.needs > 0 || budget.wants > 0 || budget.savings > 0) ? (
                                <div className="space-y-4 relative z-10">
                                    {[
                                        { label: "Necessidades", value: budget.needs, color: "from-blue-500 to-cyan-600", percent: "50%", icon: Home, desc: "Essenciais" },
                                        { label: "Desejos", value: budget.wants, color: "from-purple-500 to-pink-600", percent: "30%", icon: Heart, desc: "Lazer" },
                                        { label: "Investimentos", value: budget.savings, color: "from-primary to-purple-600", percent: "20%", icon: TrendingUp, desc: "Patrimônio" }
                                    ].map((item, i) => (
                                        <div key={i} className="group/item">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                                        <item.icon size={14} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-black text-white uppercase tracking-tight">{item.label}</h4>
                                                        <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-black text-white">R$ {item.value?.toLocaleString()}</div>
                                                    <div className="text-[8px] font-black text-primary uppercase">{item.percent}</div>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
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
                                        Configurar <ChevronRight size={12} />
                                    </button>
                                </div>
                            )}
                        </motion.section>
                    </div>

                    {/* Right Column: AI & Health (3 cols) */}
                    <div className="lg:col-span-3 space-y-8">
                        <motion.div variants={itemVariants} className="h-full">
                            <HealthScore />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <AiInsights />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <GoalsWidget />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Transactions & News (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div variants={itemVariants} className="h-[450px]">
                            <NetWorthChart />
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
                                        <TrendingUp className="text-primary" size={20} />
                                        Transações Recentes
                                    </h3>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Últimas Atividades</p>
                                </div>
                                <button
                                    onClick={() => router.push('/trends')}
                                    className="text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-all"
                                >
                                    Ver Todas
                                </button>
                            </div>
                            <TransactionList limit={5} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <NewsSection />
                        </motion.div>
                    </div>

                    {/* Widgets (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div variants={itemVariants}>
                            <AchievementsWidget />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <FinancialCalendar />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <MonthlyClosingCard />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
