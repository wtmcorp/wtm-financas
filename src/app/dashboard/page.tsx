"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    User,
    Wallet,
    TrendingUp,
    Calendar,
    Info,
    Home,
    BarChart3,
    ChevronRight,
    Search,
    Heart,
    Shield,
    Lock,
    Sparkles,
    ArrowUpRight,
    ShieldCheck,
    LayoutGrid,
    PieChart
} from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import NewsSection from "@/components/dashboard/NewsSection";
import GoalsWidget from "@/components/dashboard/GoalsWidget";
import HealthScore from "@/components/dashboard/HealthScore";
import AiInsights from "@/components/dashboard/AiInsights";
import BalanceCard from "@/components/dashboard/BalanceCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { motion, AnimatePresence } from "framer-motion";

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
                    className="relative overflow-hidden rounded-[3.5rem] bg-black/20 backdrop-blur-3xl border border-white/10 p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                        <User size={400} className="text-primary rotate-12 animate-float" />
                    </div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                                    <Sparkles size={18} className="text-primary animate-pulse" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Command Center v2.0</span>
                                </div>
                                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                                    Bem-vindo, <br />
                                    <span className="gradient-text">{user.name.split(" ")[0]}</span>
                                </h1>
                                <div className="flex items-center gap-6">
                                    <p className="text-gray-400 text-lg font-medium flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
                                        {user.email}
                                    </p>
                                    <div className="h-4 w-px bg-white/10" />
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">
                                        <ShieldCheck size={14} className="text-green-400" />
                                        <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Verified Account</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="card-premium p-8 bg-white/5 border-white/10 backdrop-blur-xl group/income hover:border-primary/30 transition-all">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Monthly Revenue</p>
                                        <ArrowUpRight size={14} className="text-primary opacity-0 group-hover/income:opacity-100 transition-all" />
                                    </div>
                                    <p className="text-5xl font-black text-white tracking-tighter">
                                        R$ {user.income?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || "0,00"}
                                    </p>
                                    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.5 }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Section: Balance & Quick Actions (4 cols) */}
                    <div className="lg:col-span-4 space-y-12">
                        <motion.div variants={itemVariants}>
                            <BalanceCard />
                        </motion.div>
                        <motion.div variants={itemVariants} className="h-full">
                            <QuickActions />
                        </motion.div>
                    </div>

                    {/* Middle Section: Cash Flow & Budget (5 cols) */}
                    <div className="lg:col-span-5 space-y-12">
                        <motion.div variants={itemVariants}>
                            <RevenueChart />
                        </motion.div>

                        {/* Budget Strategy */}
                        <motion.section variants={itemVariants} className="card-premium p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <PieChart size={150} />
                            </div>

                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                                        <LayoutGrid className="text-primary" size={28} />
                                        Budget Strategy
                                    </h2>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mt-2">50/30/20 Framework</p>
                                </div>
                                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all border border-white/10">
                                    <Info size={18} />
                                </button>
                            </div>

                            {budget ? (
                                <div className="space-y-6">
                                    {[
                                        { label: "Necessidades", value: budget.needs, color: "from-blue-500 to-cyan-600", percent: "50%", icon: Home, desc: "Essential living expenses" },
                                        { label: "Desejos", value: budget.wants, color: "from-purple-500 to-pink-600", percent: "30%", icon: Heart, desc: "Lifestyle and leisure" },
                                        { label: "Investimentos", value: budget.savings, color: "from-primary to-purple-600", percent: "20%", icon: TrendingUp, desc: "Future wealth building" }
                                    ].map((item, i) => (
                                        <div key={i} className="group/item">
                                            <div className="flex justify-between items-end mb-3">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover/item:scale-110 transition-transform`}>
                                                        <item.icon size={18} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-white uppercase tracking-tight">{item.label}</h4>
                                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-black text-white">R$ {item.value?.toLocaleString()}</div>
                                                    <div className="text-[10px] font-black text-primary uppercase">{item.percent}</div>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
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
                                <div className="text-center py-16 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/10 group-hover:border-primary/30 transition-all">
                                    <p className="text-gray-500 font-black text-xs uppercase tracking-widest mb-6">No budget strategy defined</p>
                                    <button
                                        onClick={() => router.push("/tools")}
                                        className="px-10 py-5 bg-primary text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-xl shadow-primary/10 flex items-center gap-3 mx-auto"
                                    >
                                        Initialize Framework <ChevronRight size={14} />
                                    </button>
                                </div>
                            )}
                        </motion.section>
                    </div>

                    {/* Right Section: AI & Health (3 cols) */}
                    <div className="lg:col-span-3 space-y-12">
                        <motion.div variants={itemVariants}>
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

                {/* Bottom Section: News & Account Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <motion.div variants={itemVariants}>
                            <NewsSection />
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4">
                        <motion.div variants={itemVariants} className="card-premium p-10 h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Info size={150} />
                            </div>

                            <h3 className="text-2xl font-black text-white tracking-tight mb-10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <Info className="text-primary" size={24} />
                                </div>
                                Account Intel
                            </h3>

                            <div className="space-y-6">
                                {[
                                    { label: "Member Since", value: new Date(user.createdAt).toLocaleDateString(), icon: Calendar },
                                    { label: "Account Status", value: "Verified Active", icon: ShieldCheck, color: "text-green-400" },
                                    { label: "Access Level", value: "Platinum Elite", icon: Sparkles, color: "text-primary" },
                                    { label: "Security", value: "2FA Enabled", icon: Shield, color: "text-blue-400" }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all group/item">
                                        <div className="flex items-center gap-4">
                                            <item.icon size={18} className="text-gray-600 group-hover/item:text-primary transition-colors" />
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <span className={`text-sm font-black ${item.color || 'text-white'} tracking-tight`}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => router.push('/profile')}
                                className="w-full mt-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
                            >
                                Manage Profile Settings <ArrowUpRight size={14} />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
