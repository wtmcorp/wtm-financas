"use client";

import { Card } from "@/components/ui/Card";
import { Github, Shield, Bell, Eye, Smartphone, Lock, Database, Info, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
            items: [
                { label: "Autenticação em duas etapas", desc: "Proteja sua conta com um nível extra de segurança", status: "Ativado" },
                { label: "Sessões Ativas", desc: "Gerencie os dispositivos onde você está logado", status: "2 ativos" }
            ]
        },
        {
            title: "Notificações",
            icon: Bell,
            color: "text-yellow-400",
            items: [
                { label: "Alertas de Gastos", desc: "Receba avisos quando ultrapassar seus limites", status: "Ativado" },
                { label: "Relatórios Semanais", desc: "Resumo do seu desempenho financeiro", status: "E-mail" }
            ]
        },
        {
            title: "Aparência",
            icon: Eye,
            color: "text-purple-400",
            items: [
                { label: "Tema do Sistema", desc: "Escolha entre modo claro, escuro ou automático", status: "Escuro" },
                { label: "Animações Premium", desc: "Efeitos visuais avançados de interface", status: "Ativado" }
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
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.header variants={itemVariants} className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Configurações do <span className="gradient-text">Sistema</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Personalize sua experiência e gerencie a segurança dos seus dados financeiros.
                    </p>
                </motion.header>

                <div className="grid gap-8">
                    {sections.map((section, idx) => (
                        <motion.section key={idx} variants={itemVariants} className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg bg-white/5 ${section.color}`}>
                                    <section.icon size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                            </div>

                            <div className="grid gap-4">
                                {section.items.map((item, i) => (
                                    <div key={i} className="card-premium p-6 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-white group-hover:text-primary transition-colors">{item.label}</h3>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.status}</span>
                                            <ChevronRight size={18} className="text-gray-600 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card-premium p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <Lock className="text-red-400" size={20} />
                                <h3 className="font-bold text-white">Transparência</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                O código fonte do Wtm Corps é aberto para auditoria. Segurança e transparência são nossos pilares.
                            </p>
                            <a
                                href="https://github.com/wtmcorps/finance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-bold text-sm"
                            >
                                <Github size={18} />
                                Auditar no GitHub
                            </a>
                        </div>

                        <div className="card-premium p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <Database className="text-green-400" size={20} />
                                <h3 className="font-bold text-white">Dados & Cache</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Cache Offline</span>
                                    <span className="text-green-500 font-bold">ATIVO</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Versão</span>
                                    <span className="text-gray-400">v1.2.0 (Premium)</span>
                                </div>
                            </div>
                            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-gray-400 transition-all">
                                LIMPAR CACHE LOCAL
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
