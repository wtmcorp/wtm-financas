"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
    Menu, X, Home, CreditCard, Wrench, User, LogOut,
    Heart, DollarSign, TrendingUp, Sparkles, ChevronRight
} from "lucide-react";
import { usePathname } from "next/navigation";

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
        { href: "/dashboard", icon: Home, label: "Visão Geral" },
        { href: "/cards", icon: CreditCard, label: "Arsenal de Cartões" },
        { href: "/tools", icon: Wrench, label: "Ferramentas & Calculadoras" },
        { href: "/ai-tools", icon: Sparkles, label: "I.As Úteis" },
        { href: "/invest", icon: TrendingUp, label: "Investimentos" },
        { href: "/debts", icon: DollarSign, label: "Gestão de Dívidas" },
        { href: "/private", icon: Heart, label: "Desafio Privado" },
        { href: "/profile", icon: User, label: "Meu Perfil" },
    ];

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all active:scale-95"
                aria-label="Abrir menu"
            >
                <Menu size={24} />
            </button>

            {/* Overlay & Menu */}
            <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isOpen ? "visible" : "invisible pointer-events-none"}`}>

                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Menu Content */}
                <div className={`absolute top-0 right-0 w-[85%] max-w-[320px] h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
                        <span className="font-bold text-xl text-white">Menu</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all border ${isActive
                                        ? "bg-primary/10 text-primary border-primary/20 font-bold"
                                        : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} />
                                        {item.label}
                                    </div>
                                    {isActive && <ChevronRight size={16} />}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-white/10 bg-black/20">
                        {user ? (
                            <button
                                onClick={() => logout()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 font-medium"
                            >
                                <LogOut size={20} />
                                Sair da Conta
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                <LogOut size={20} className="rotate-180" />
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
