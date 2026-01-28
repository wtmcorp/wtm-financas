"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
    Menu, X, Home, CreditCard, Wrench, User, LogOut,
    Trophy, TrendingUp, Sparkles, ChevronRight,
    Settings, HelpCircle, Bell, BookOpen
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import InteractiveLogo from "@/components/ui/InteractiveLogo";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const menuItems = [
        { href: "/", icon: Home, label: "Dashboard", desc: "Visão geral da sua conta", color: "violet" },
        { href: "/cards", icon: CreditCard, label: "Cartões", desc: "Arsenal de crédito e milhas", color: "blue" },
        { href: "/tools", icon: Wrench, label: "Ferramentas", desc: "Calculadoras e conversores", color: "emerald" },
        { href: "/trends", icon: TrendingUp, label: "Radar", desc: "Análise de mercado em tempo real", color: "purple" },
        { href: "/learn", icon: BookOpen, label: "Aprenda", desc: "Cursos e evolução financeira", color: "orange" },
        { href: "/challenge", icon: Trophy, label: "Desafio", desc: "Seu progresso exclusivo", color: "pink" },
    ];

    const secondaryItems = [
        { href: "/profile", icon: User, label: "Perfil" },
        { href: "/settings", icon: Settings, label: "Config" },
        { href: "/help", icon: HelpCircle, label: "Ajuda" },
    ];

    const getColorClasses = (color: string, isActive: boolean) => {
        if (isActive) {
            return {
                bg: "bg-gradient-to-br from-violet-600 to-purple-600",
                text: "text-white",
                border: "border-violet-500/50",
                iconBg: "bg-white/20"
            };
        }

        const colors: Record<string, any> = {
            violet: "from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20",
            blue: "from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20",
            emerald: "from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20",
            purple: "from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20",
            orange: "from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20",
            pink: "from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20",
        };

        return {
            bg: `bg-gradient-to-br ${colors[color] || colors.violet}`,
            text: "text-gray-300 hover:text-white",
            border: "border-white/5 hover:border-white/10",
            iconBg: "bg-white/5"
        };
    };

    const menuContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'var(--background)',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100vw',
                        height: '100vh',
                        overflow: 'hidden'
                    }}
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-background to-purple-950/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />

                    {/* Header Area */}
                    <div className="relative px-6 py-6 flex items-center justify-between border-b border-white/10 bg-card/50 backdrop-blur-xl shrink-0">
                        <div className="flex items-center gap-3">
                            <InteractiveLogo size="md" />
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tighter leading-none uppercase">
                                    Wtm<span className="text-violet-500">Corps</span>
                                </span>
                                <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                    Intelligence OS
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90 border border-white/10"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="relative flex-1 overflow-y-auto px-6 py-8 space-y-8">
                        {/* User Profile Section */}
                        {user && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent border border-violet-500/20 shadow-2xl hover:border-violet-500/40 transition-all"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-2xl border-2 border-white/20">
                                        {user.name?.[0] || "U"}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-black text-white leading-tight">{user.name || "Usuário"}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-violet-500/30">Premium</span>
                                            <span className="text-gray-500 text-xs font-bold">Ver perfil</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-violet-400" size={24} />
                                </Link>
                            </motion.div>
                        )}

                        {/* Main Navigation */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-2">Menu Principal</h4>
                            <div className="grid grid-cols-1 gap-3">
                                {menuItems.map((item, idx) => {
                                    const isActive = pathname === item.href;
                                    const colorClasses = getColorClasses(item.color, isActive);
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 + 0.15 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${colorClasses.bg} ${colorClasses.text} ${colorClasses.border} ${isActive ? 'shadow-2xl shadow-violet-500/20 scale-[1.02]' : ''}`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses.iconBg}`}>
                                                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-base font-black leading-none">{item.label}</p>
                                                    <p className={`text-xs mt-1 font-medium ${isActive ? "text-white/70" : "text-gray-500"}`}>{item.desc}</p>
                                                </div>
                                                {isActive && (
                                                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Secondary Navigation */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-2">Acesso Rápido</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {secondaryItems.map((item, idx) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 + 0.4 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all hover:bg-white/10 hover:border-white/10"
                                        >
                                            <item.icon size={24} />
                                            <span className="text-sm font-black uppercase tracking-tight">{item.label}</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Extra spacing for scroll */}
                        <div className="h-20" />
                    </div>

                    {/* Footer Area */}
                    <div className="relative p-6 border-t border-white/10 bg-card/50 backdrop-blur-xl shrink-0">
                        {user ? (
                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-black text-base shadow-2xl shadow-red-500/20 active:scale-95 transition-all"
                            >
                                <LogOut size={20} />
                                ENCERRAR SESSÃO
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black text-base shadow-2xl shadow-violet-500/30 active:scale-95 transition-all"
                            >
                                <LogOut size={20} className="rotate-180" />
                                ENTRAR NO SISTEMA
                            </Link>
                        )}
                        <div className="mt-6 flex flex-col items-center gap-2">
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">Wtm Corps © 2024</p>
                            <div className="h-0.5 w-10 bg-white/10 rounded-full" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90"
                aria-label="Abrir menu"
            >
                <Menu size={20} />
            </button>

            {mounted && createPortal(menuContent, document.body)}
        </>
    );
}
