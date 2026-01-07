"use client";

import { useState } from "react";
import {
    Users,
    UserPlus,
    Heart,
    Shield,
    TrendingUp,
    Wallet,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Lock,
    Settings,
    PieChart,
    Target,
    ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function FamilyModePage() {
    const { user } = useAuth();
    const [members, setMembers] = useState([
        { id: "1", name: user?.name || "Você", role: "Administrador", avatar: "V", balance: 15420.50, color: "from-primary to-purple-600" },
        { id: "2", name: "Sofia", role: "Cônjuge", avatar: "S", balance: 12300.20, color: "from-pink-500 to-rose-600" },
        { id: "3", name: "Lucas", role: "Dependente", avatar: "L", balance: 450.00, color: "from-blue-500 to-cyan-600" }
    ]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

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
                    className="relative overflow-hidden p-8 md:p-16 rounded-[3rem] glass-panel shadow-2xl group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                        <Users size={300} className="text-primary rotate-12" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <Heart size={18} className="text-pink-500 animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Family Hub v1.0</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.85]">
                            Seu Clã <br />
                            <span className="gradient-text">Financeiro</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
                            Construam um legado juntos. Gerencie o patrimônio da família, planeje sonhos em conjunto e prepare as próximas gerações.
                        </p>
                    </div>
                </motion.header>

                {/* Family Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {members.map((member, i) => (
                        <motion.div
                            key={member.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="glass-panel p-8 relative overflow-hidden group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                            <div className="flex items-center justify-between mb-8">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl font-black text-white shadow-xl`}>
                                    {member.avatar}
                                </div>
                                <div className="text-right">
                                    <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                        {member.role}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1 mb-8">
                                <h3 className="text-2xl font-black text-white tracking-tight">{member.name}</h3>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Saldo Individual</p>
                                <p className="text-3xl font-black text-white tracking-tighter">
                                    R$ {member.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "75%" }}
                                        className={`h-full bg-gradient-to-r ${member.color}`}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                    <span>Meta Mensal</span>
                                    <span className="text-white">75%</span>
                                </div>
                            </div>

                            <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                Ver Detalhes <ChevronRight size={14} />
                            </button>
                        </motion.div>
                    ))}

                    {/* Add Member Card */}
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="glass-panel p-8 border-dashed border-2 border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-6 group"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                            <UserPlus size={40} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-black text-white tracking-tight uppercase">Adicionar Membro</h3>
                            <p className="text-xs text-gray-500 font-medium mt-2">Expanda seu ecossistema familiar</p>
                        </div>
                    </motion.button>
                </div>

                {/* Family Insights & Shared Goals */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Shared Goals */}
                    <motion.div variants={itemVariants} className="glass-panel p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                                <Target className="text-primary" />
                                Metas Compartilhadas
                            </h2>
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest">Ver Todas</button>
                        </div>

                        <div className="space-y-8">
                            {[
                                { title: "Viagem para Europa", current: 45000, total: 60000, color: "from-blue-500 to-cyan-600" },
                                { title: "Casa Nova", current: 120000, total: 500000, color: "from-purple-500 to-pink-600" }
                            ].map((goal, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h4 className="text-lg font-black text-white tracking-tight">{goal.title}</h4>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">
                                                R$ {goal.current.toLocaleString()} / R$ {goal.total.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-white">{Math.round((goal.current / goal.total) * 100)}%</span>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(goal.current / goal.total) * 100}%` }}
                                            className={`h-full bg-gradient-to-r ${goal.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Family Health Pulse */}
                    <motion.div variants={itemVariants} className="glass-panel p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <PieChart size={150} />
                        </div>

                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3 mb-10">
                            <Shield className="text-green-500" />
                            Saúde Familiar
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">Patrimônio Total</p>
                                <p className="text-2xl font-black text-white">R$ 28.170,70</p>
                                <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold mt-2">
                                    <TrendingUp size={12} /> +12.4% este mês
                                </div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">Taxa de Poupança</p>
                                <p className="text-2xl font-black text-white">32.5%</p>
                                <div className="flex items-center gap-2 text-primary text-[10px] font-bold mt-2">
                                    <Sparkles size={12} /> Acima da média
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-primary/10 border border-primary/20 rounded-2xl flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Sparkles size={20} className="text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-white uppercase tracking-tight">Dica da IA</h4>
                                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                                    Aumentar a mesada do Lucas em 5% e vincular ao cumprimento de tarefas financeiras pode acelerar o aprendizado dele em 40%.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
