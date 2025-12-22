"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
    Menu, X, Home, CreditCard, Wrench, User, LogOut,
    Heart, Settings, HelpCircle, DollarSign, TrendingUp
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
        { href: "/invest", icon: TrendingUp, label: "Investimentos" },
        { href: "/debts", icon: DollarSign, label: "Gestão de Dívidas" },
        { href: "/private", icon: Heart, label: "Desafio Privado" },
        { href: "/profile", icon: User, label: "Meu Perfil" },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors md:hidden"
                aria-label="Abrir menu"
            >
                <Menu size={24} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xl font-black text-white tracking-tight">Menu</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                            ? "bg-primary text-black font-bold"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-2">
                        {user ? (
                            <button
                                onClick={() => logout()}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut size={20} />
                                Sair da Conta
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                            >
                                <LogOut size={20} className="rotate-180" />
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
