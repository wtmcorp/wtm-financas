"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
    Menu, X, Home, CreditCard, Wrench, User, LogOut,
    Heart, DollarSign, TrendingUp, Sparkles, ChevronRight,
    Settings, Shield, HelpCircle, Bell
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

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

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90"
                aria-label="Abrir menu"
            >
                <Menu size={24} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-black text-xl">W</div>
                                <span className="text-white font-black text-2xl tracking-tighter">
                                    Wtm<span className="text-primary/80">Corps</span>
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90 border border-white/10"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
                            {/* User Profile Section */}
                            {user && (
                                <Link href="/profile" className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-black text-2xl font-black shadow-lg shadow-primary/20">
                                        {user.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white leading-none">{user.name}</h3>
                                        <p className="text-primary text-sm font-bold mt-1 uppercase tracking-widest">Nível Platinum</p>
                                    </div>
                                    <ChevronRight className="ml-auto text-primary" size={24} />
                                </Link>
                            )}

                            {/* Main Navigation */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">Navegação Principal</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {menuItems.map((item, idx) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <motion.div
                                                key={item.href}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isActive
                                                        ? "bg-primary text-black border-primary font-black scale-[1.02] shadow-lg shadow-primary/20"
                                                        : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                                                        }`}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? "bg-black/10" : "bg-white/5"}`}>
                                                        <item.icon size={28} strokeWidth={isActive ? 2.5 : 2} />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold leading-none">{item.label}</p>
                                                        <p className={`text-xs mt-1 ${isActive ? "text-black/60" : "text-gray-500"}`}>{item.desc}</p>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Secondary Navigation */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">Conta & Suporte</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {secondaryItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all"
                                        >
                                            <item.icon size={24} />
                                            <span className="text-sm font-bold">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-black/50 backdrop-blur-xl">
                            {user ? (
                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 font-black text-lg hover:bg-red-500 hover:text-white transition-all active:scale-95"
                                >
                                    <LogOut size={24} />
                                    SAIR DA CONTA
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary text-black font-black text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all"
                                >
                                    <LogOut size={24} className="rotate-180" />
                                    ENTRAR NO SISTEMA
                                </Link>
                            )}
                            <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6">Wtm Corps © 2024 • Versão 2.0.4</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
