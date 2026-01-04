"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, Wallet, TrendingUp, Calendar, Info } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import NewsSection from "@/components/dashboard/NewsSection";
import GoalsWidget from "@/components/dashboard/GoalsWidget";
import HealthScore from "@/components/dashboard/HealthScore";
import AiInsights from "@/components/dashboard/AiInsights";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

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

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(167,139,250,0.3)]"></div>
            </div>
        );
    }

    const budget = (user as any).budget;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Dashboard Header */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                        <User size={300} className="text-primary rotate-12 animate-float" />
                    </div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 bg-white/5 text-primary border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Perfil do Operador
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                                    {user.name.split(" ")[0]} <br />
                                    <span className="gradient-text">{user.name.split(" ").slice(1).join(" ")}</span>
                                </h1>
                                <p className="text-gray-400 text-lg font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    {user.email}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <div className="card-premium p-6 bg-white/5 border-white/10 backdrop-blur-xl">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Renda Mensal</p>
                                    <p className="text-3xl font-black text-primary tracking-tighter">
                                        R$ {user.income?.toLocaleString() || "0,00"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Budget & Stats */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Orçamento Section */}
                        <motion.section variants={itemVariants} className="card-premium p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Wallet size={150} />
                            </div>

                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                                        <Wallet className="text-primary" size={28} />
                                        Estratégia de Orçamento
                                    </h2>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mt-2">Distribuição de Capital 50/30/20</p>
                                </div>
                                {budget && (
                                    <div className="px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/20 backdrop-blur-md">Ativo</div>
                                )}
                            </div>

                            {budget ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: "Necessidades", value: budget.needs, color: "blue", percent: "50%", icon: Home },
                                        { label: "Desejos", value: budget.wants, color: "purple", percent: "30%", icon: Zap },
                                        { label: "Investimentos", value: budget.savings, color: "primary", percent: "20%", icon: TrendingUp }
                                    ].map((item, i) => (
                                        <Tooltip key={i} text={`${item.percent} da sua renda para ${item.label.toLowerCase()}.`}>
                                            <div className={`bg-${item.color === 'primary' ? 'primary' : item.color + '-500'}/10 border border-${item.color === 'primary' ? 'primary' : item.color + '-500'}/20 rounded-3xl p-6 group/item hover:scale-[1.02] transition-all`}>
                                                <div className={`text-${item.color === 'primary' ? 'primary' : item.color + '-400'} text-[10px] font-black uppercase tracking-widest mb-4 flex items-center justify-between`}>
                                                    {item.label}
                                                    <item.icon size={14} />
                                                </div>
                                                <div className="text-3xl font-black text-white tracking-tighter mb-1">R$ {item.value?.toLocaleString()}</div>
                                                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                                                    <div className={`h-full bg-${item.color === 'primary' ? 'primary' : item.color + '-500'} rounded-full`} style={{ width: item.percent }}></div>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/10">
                                    <p className="text-gray-500 font-medium mb-6">Nenhuma estratégia de orçamento definida.</p>
                                    <button
                                        onClick={() => router.push("/tools")}
                                        className="px-8 py-4 bg-primary text-black font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
                                    >
                                        Configurar Agora
                                    </button>
                                </div>
                            )}
                        </motion.section>

                        {/* Insights & Health */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <motion.div variants={itemVariants}>
                                <HealthScore />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <AiInsights />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Widgets & News */}
                    <div className="space-y-12">
                        <motion.div variants={itemVariants}>
                            <GoalsWidget />
                        </motion.div>

                        <motion.div variants={itemVariants} className="card-premium p-8">
                            <h3 className="text-xl font-black text-white tracking-tight mb-6 flex items-center gap-3">
                                <Info className="text-primary" size={20} />
                                Informações da Conta
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Membro desde</span>
                                    <span className="text-sm font-black text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Status</span>
                                    <span className="text-sm font-black text-green-400 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Ativo
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Nível</span>
                                    <span className="text-sm font-black text-primary">Platinum</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <NewsSection />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
