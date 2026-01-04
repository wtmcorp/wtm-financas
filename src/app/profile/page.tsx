"use client";

import { User, Mail, Phone, Calendar, LogOut, Shield, Award, Star, Target, Crown, Trophy, Sparkles, ArrowUpRight, Settings, ShieldCheck, Fingerprint, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
    const { user, logout, isAuthenticated, loading } = useAuth();
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
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(167,139,250,0.3)]"></div>
            </div>
        );
    }

    const level = 5;
    const xp = 2450;
    const nextLevelXp = 3000;
    const progress = (xp / nextLevelXp) * 100;

    const badges = [
        { name: "Pioneiro", icon: Crown, color: "text-yellow-400", bg: "bg-yellow-500/10", desc: "Membro fundador" },
        { name: "Mãos de Diamante", icon: Star, color: "text-blue-400", bg: "bg-blue-500/10", desc: "Não vendeu na baixa" },
        { name: "Exterminador", icon: Target, color: "text-red-400", bg: "bg-red-500/10", desc: "Quitou uma dívida" },
        { name: "Sábio", icon: Award, color: "text-purple-400", bg: "bg-purple-500/10", desc: "Completou 5 aulas" },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Identity Header */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden p-10 md:p-16 rounded-[3.5rem] bg-gradient-to-br from-[#0f0f13] via-[#1a1a2e] to-[#0f0f13] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                        <User size={400} className="text-primary rotate-12 animate-float" />
                    </div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="relative group/avatar">
                            <div className="w-48 h-48 bg-gradient-to-br from-primary via-purple-500 to-blue-600 rounded-[3rem] p-1 shadow-2xl shadow-primary/20 group-hover/avatar:rotate-6 transition-transform duration-700">
                                <div className="w-full h-full bg-[#0f0f13] rounded-[2.8rem] flex items-center justify-center overflow-hidden relative">
                                    <span className="text-7xl font-black text-white">{user.name.charAt(0)}</span>
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -bottom-4 -right-4 bg-[#0f0f13] border-2 border-primary px-5 py-2 rounded-2xl flex items-center gap-3 shadow-2xl"
                            >
                                <Trophy size={18} className="text-yellow-500" />
                                <span className="text-lg font-black text-white">Lvl {level}</span>
                            </motion.div>
                        </div>

                        <div className="text-center md:text-left space-y-6 flex-1">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-2">
                                    <Crown size={14} className="text-yellow-500" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Platinum Elite Member</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                    {user.name.split(" ")[0]} <br />
                                    <span className="gradient-text">{user.name.split(" ").slice(1).join(" ")}</span>
                                </h1>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                <p className="text-gray-400 text-lg font-medium flex items-center gap-3">
                                    <Mail size={20} className="text-primary" /> {user.email}
                                </p>
                                <div className="h-4 w-px bg-white/10 hidden md:block" />
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
                                    <ShieldCheck size={16} className="text-green-400" />
                                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Identity Verified</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => router.push('/settings')}
                                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <Settings size={24} />
                            </button>
                        </div>
                    </div>
                </motion.header>

                {/* Gamification Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants} className="lg:col-span-2 card-premium p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp size={150} />
                        </div>
                        <div className="flex justify-between items-end mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight uppercase">Progresso de Carreira</h3>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">
                                    Próximo nível desbloqueia: <span className="text-primary">Consultoria IA Preditiva</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl font-black text-white tracking-tighter">{xp}</span>
                                <span className="text-sm text-gray-500 font-black uppercase tracking-widest ml-2">/ {nextLevelXp} XP</span>
                            </div>
                        </div>
                        <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1 relative z-10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                                className="h-full bg-gradient-to-r from-primary via-purple-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(167,139,250,0.4)]"
                            />
                        </div>
                        <div className="mt-6 flex justify-between items-center relative z-10">
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Level 5</span>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Level 6</span>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-premium p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-20 h-20 bg-green-500/10 rounded-[2rem] flex items-center justify-center text-green-500 border border-green-500/20 shadow-2xl shadow-green-500/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6">
                            <Fingerprint size={40} />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Biometria Ativa</h3>
                        <p className="text-[10px] text-green-400 font-black uppercase tracking-[0.2em] mt-2">Segurança de Nível Bancário</p>
                    </motion.div>
                </div>

                {/* Badges */}
                <motion.div variants={itemVariants} className="card-premium p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Award size={150} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4 relative z-10 uppercase tracking-tight">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                            <Award className="text-yellow-500" size={24} />
                        </div>
                        Conquistas Desbloqueadas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        {badges.map((badge, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center hover:bg-white/[0.05] hover:border-primary/30 transition-all group/badge cursor-default">
                                <div className={`w-20 h-20 ${badge.bg} rounded-[2rem] flex items-center justify-center mb-6 group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-all duration-500 border border-current/10 shadow-2xl`}>
                                    <badge.icon className={badge.color} size={32} />
                                </div>
                                <h4 className="text-sm font-black text-white mb-2 uppercase tracking-tight">{badge.name}</h4>
                                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Account Details */}
                <motion.div variants={itemVariants} className="card-premium p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Shield size={150} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4 relative z-10 uppercase tracking-tight">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Fingerprint className="text-primary" size={24} />
                        </div>
                        Dados de Segurança & Acesso
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {[
                            { label: "Email de Recuperação", value: user.email, icon: Mail },
                            { label: "Terminal de Acesso", value: user.phone || "Não vinculado", icon: Phone },
                            { label: "Registro no Sistema", value: new Date(user.createdAt).toLocaleDateString('pt-BR'), icon: Calendar },
                            { label: "Nível de Assinatura", value: "Premium Vitalício", icon: Crown, color: "text-yellow-500" }
                        ].map((item, i) => (
                            <div key={i} className="space-y-3 group/item">
                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-1">{item.label}</label>
                                <div className="p-6 bg-black/40 border border-white/10 rounded-2xl text-white font-black text-sm flex items-center justify-between group-hover/item:border-primary/30 transition-all backdrop-blur-xl">
                                    <div className="flex items-center gap-4">
                                        <item.icon size={20} className={`${item.color || 'text-gray-500'} group-hover/item:text-primary transition-colors`} />
                                        <span className="tracking-tight">{item.value}</span>
                                    </div>
                                    <ArrowUpRight size={16} className="text-gray-800 group-hover/item:text-primary transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Sessão Criptografada Ativa</span>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-10 py-5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] border border-red-500/20 hover:border-red-500 shadow-xl shadow-red-500/5 active:scale-95 group/logout"
                        >
                            <LogOut size={18} className="group-hover/logout:-translate-x-1 transition-transform" />
                            Encerrar Sessão Segura
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
