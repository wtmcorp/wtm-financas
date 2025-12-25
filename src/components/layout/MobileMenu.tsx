"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
    Menu, X, Home, CreditCard, Wrench, User, LogOut,
    Heart, DollarSign, TrendingUp, Sparkles, ChevronRight,
    Settings, Shield, HelpCircle, Bell
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "./Logo";

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
        { href: "/", icon: Home, label: "Dashboard", desc: "Visão geral da sua conta" },
        { href: "/cards", icon: CreditCard, label: "Cartões", desc: "Arsenal de crédito e milhas" },
        { href: "/tools", icon: Wrench, label: "Ferramentas", desc: "Calculadoras e conversores" },
        { href: "/ai-tools", icon: Sparkles, label: "I.As Úteis", desc: "Produtividade com inteligência" },
        { href: "/learn", icon: TrendingUp, label: "Aprenda", desc: "Cursos e evolução financeira" },
        { href: "/private", icon: Heart, label: "Desafio", desc: "Seu progresso exclusivo" },
    ];

    const secondaryItems = [
        { href: "/profile", icon: User, label: "Meu Perfil" },
        { href: "/settings", icon: Settings, label: "Configurações" },
        { href: "/notifications", icon: Bell, label: "Notificações" },
        { href: "/help", icon: HelpCircle, label: "Ajuda & Suporte" },
    ];

    const menuContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#000000',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100vw',
                        height: '100vh',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header Area */}
                    <div className="px-6 py-8 flex items-center justify-between border-b border-white/10 bg-black shrink-0">
                        <Logo size={200} />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90 border border-white/10"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-10 space-y-12">
                        {/* User Profile Section */}
                        {user && (
                            <Link
                                href="/profile"
                                className="flex items-center gap-5 p-6 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 shadow-2xl"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center text-white text-3xl font-black shadow-2xl border-2 border-primary/20">
                                    {user.name[0]}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-white leading-tight">{user.name}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-md border border-primary/20">Platinum</span>
                                        <span className="text-gray-500 text-xs font-bold">Ver perfil</span>
                                    </div>
                                </div>
                                <ChevronRight className="text-primary" size={28} />
                            </Link>
                        )}

                        {/* Main Navigation */}
                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] px-4">Navegação</h4>
                            <div className="grid grid-cols-1 gap-4">
                                {menuItems.map((item, idx) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 + 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-5 p-5 rounded-[2rem] border transition-all ${isActive
                                                    ? "bg-primary text-black border-primary font-black scale-[1.02] shadow-2xl shadow-primary/30"
                                                    : "bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isActive ? "bg-black/10" : "bg-white/5"}`}>
                                                    <item.icon size={32} strokeWidth={isActive ? 2.5 : 2} />
                                                </div>
                                                <div>
                                                    <p className="text-xl font-black leading-none">{item.label}</p>
                                                    <p className={`text-sm mt-1.5 font-medium ${isActive ? "text-black/60" : "text-gray-500"}`}>{item.desc}</p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Secondary Navigation */}
                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] px-4">Sistema</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {secondaryItems.map((item, idx) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 + 0.4 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all hover:bg-white/10"
                                        >
                                            <item.icon size={28} />
                                            <span className="text-base font-black uppercase tracking-tighter">{item.label}</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Area */}
                    <div className="p-8 border-t border-white/10 bg-black shrink-0">
                        {user ? (
                            <button
                                onClick={() => logout()}
                                className="w-full flex items-center justify-center gap-4 p-6 rounded-[2rem] bg-red-500 text-white font-black text-xl shadow-2xl shadow-red-500/20 active:scale-95 transition-all"
                            >
                                <LogOut size={28} />
                                ENCERRAR SESSÃO
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="w-full flex items-center justify-center gap-4 p-6 rounded-[2rem] bg-primary text-black font-black text-xl shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                            >
                                <LogOut size={28} className="rotate-180" />
                                ENTRAR NO SISTEMA
                            </Link>
                        )}
                        <div className="mt-8 flex flex-col items-center gap-2">
                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">Wtm Corps © 2024</p>
                            <div className="h-1 w-12 bg-white/10 rounded-full" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90"
                aria-label="Abrir menu"
            >
                <Menu size={24} />
            </button>

            {mounted && createPortal(menuContent, document.body)}
        </div>
    );
}
