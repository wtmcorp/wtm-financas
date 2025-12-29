"use client";

import { User, Mail, Phone, Calendar, LogOut, Shield, Award, Star, Zap, Crown, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
        { name: "Exterminador", icon: Zap, color: "text-red-400", bg: "bg-red-500/10", desc: "Quitou uma dívida" },
        { name: "Sábio", icon: Award, color: "text-purple-400", bg: "bg-purple-500/10", desc: "Completou 5 aulas" },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Identity Header */}
                <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f0f13] to-[#1a1a2e] border border-white/10 p-8 shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <User size={200} className="text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-full p-1 shadow-lg shadow-primary/20">
                                <div className="w-full h-full bg-[#0f0f13] rounded-full flex items-center justify-center overflow-hidden">
                                    <span className="text-4xl font-black text-white">{user.name.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-black border border-white/10 px-3 py-1 rounded-full flex items-center gap-1">
                                <Trophy size={12} className="text-yellow-500" />
                                <span className="text-xs font-bold text-white">Lvl {level}</span>
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-black text-white">{user.name}</h1>
                            <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
                                <Mail size={14} /> {user.email}
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
                                    Membro Pro
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
                                    Desde {new Date(user.createdAt).getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Gamification Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants} className="md:col-span-2 card-premium p-6">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Progresso do Nível</h3>
                                <p className="text-xs text-gray-500">Próximo nível desbloqueia: <span className="text-primary">Consultoria IA</span></p>
                            </div>
                            <span className="text-2xl font-black text-white">{xp} <span className="text-sm text-gray-500 font-medium">/ {nextLevelXp} XP</span></span>
                        </div>
                        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-purple-500"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-premium p-6 flex flex-col justify-center items-center text-center">
                        <Shield className="text-green-500 mb-2" size={32} />
                        <h3 className="text-lg font-bold text-white">Conta Segura</h3>
                        <p className="text-xs text-green-400 font-bold mt-1">Verificada & Protegida</p>
                    </motion.div>
                </div>

                {/* Badges */}
                <motion.div variants={itemVariants} className="card-premium p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Award className="text-yellow-500" />
                        Conquistas Desbloqueadas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {badges.map((badge, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition-colors group">
                                <div className={`w-12 h-12 ${badge.bg} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <badge.icon className={badge.color} size={24} />
                                </div>
                                <h4 className="text-sm font-bold text-white mb-1">{badge.name}</h4>
                                <p className="text-[10px] text-gray-500">{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Account Details */}
                <motion.div variants={itemVariants} className="card-premium p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Dados da Conta</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                            <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-white font-medium flex items-center gap-3">
                                <Mail size={18} className="text-gray-400" />
                                {user.email}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Telefone</label>
                            <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-white font-medium flex items-center gap-3">
                                <Phone size={18} className="text-gray-400" />
                                {user.phone || "Não cadastrado"}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Membro Desde</label>
                            <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-white font-medium flex items-center gap-3">
                                <Calendar size={18} className="text-gray-400" />
                                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Plano Atual</label>
                            <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-white font-medium flex items-center gap-3">
                                <Crown size={18} className="text-yellow-500" />
                                Premium Vitalício
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all font-bold border border-red-500/20 hover:border-red-500/40 active:scale-95"
                        >
                            <LogOut size={18} />
                            Sair do Sistema
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
