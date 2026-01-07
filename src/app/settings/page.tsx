"use client";

import { Card } from "@/components/ui/Card";
import { Github, Shield, Bell, Eye, Smartphone, Lock, Database, Info, ChevronRight, Sparkles, BellRing, ShieldCheck, Globe, Cpu, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
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

    const sections = [
        {
            title: "Segurança & Privacidade",
            icon: Shield,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            items: [
                { label: "Autenticação em duas etapas", desc: "Proteja sua conta com um nível extra de segurança", status: "Ativado", icon: Lock },
                { label: "Sessões Ativas", desc: "Gerencie os dispositivos onde você está logado", status: "2 ativos", icon: Smartphone }
            ]
        },
        {
            title: "Notificações",
            icon: Bell,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            items: [
                { label: "Alertas de Gastos", desc: "Receba avisos quando ultrapassar seus limites", status: "Ativado", icon: BellRing },
                { label: "Relatórios Semanais", desc: "Resumo do seu desempenho financeiro", status: "E-mail", icon: Info }
            ]
        },
        {
            title: "Aparência",
            icon: Eye,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            items: [
                { label: "Tema do Sistema", desc: "Escolha entre modo claro, escuro ou automático", status: "Escuro", icon: Globe },
                { label: "Animações Premium", desc: "Efeitos visuais avançados de interface", status: "Ativado", icon: Sparkles }
            ]
        }
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-5xl mx-auto space-y-16">

                {/* Header Section */}
                <motion.header
                    variants={itemVariants}
                    className="relative overflow-hidden p-10 md:p-20 rounded-[3.5rem] glass-panel shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                >
                    <div className="absolute top-0 right-0 hidden md:block opacity-5 -mr-20 -mt-20">
                        <Cpu size={400} className="text-primary rotate-12" />
                    </div>

                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <ShieldCheck size={18} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">System Configuration v2.4</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.85]">
                            Painel de <br />
                            <span className="gradient-text">Controle</span>
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium">
                            Personalize sua experiência operacional e gerencie a segurança dos seus dados financeiros com criptografia de ponta.
                        </p>
                    </div>
                </motion.header>

                <div className="grid gap-12">
                    {sections.map((section, idx) => (
                        <motion.section key={idx} variants={itemVariants} className="space-y-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className={`w-14 h-14 rounded-2xl ${section.bg} ${section.color} flex items-center justify-center border border-current/10 shadow-2xl`}>
                                    <section.icon size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">{section.title}</h2>
                                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-1">Operational Parameters</p>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                {section.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="card-premium p-8 flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:scale-110 transition-all border border-white/5">
                                                <item.icon size={20} />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{item.label}</h3>
                                                <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 relative z-10">
                                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white group-hover:border-primary/30 transition-all">
                                                {item.status}
                                            </span>
                                            <ChevronRight size={24} className="text-gray-800 group-hover:text-primary transition-all" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card-premium p-10 space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Github size={150} />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-red-400 border border-red-500/20">
                                    <Lock size={24} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Transparência</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                O código fonte do Wtm Corps é aberto para auditoria pública. Segurança e transparência são os pilares da nossa infraestrutura.
                            </p>
                            <a
                                href="https://github.com/wtmcorps/finance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 text-primary hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.2em] group/link"
                            >
                                <Github size={20} className="group-hover/link:rotate-12 transition-transform" />
                                Auditar no GitHub <ChevronRight size={14} />
                            </a>
                        </div>

                        <div className="card-premium p-10 space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Database size={150} />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-green-400 border border-green-500/20">
                                    <Database size={24} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Dados & Cache</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cache Offline</span>
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        ATIVO
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Versão</span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">v2.4.0 (Platinum)</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-xl text-[10px] font-black text-gray-500 hover:text-red-400 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                                <RefreshCw size={14} /> Limpar Cache Local
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
