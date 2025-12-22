"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
    Menu, X, Home, CreditCard, Wrench, User, LogOut,
    Heart, DollarSign, TrendingUp
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
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg border transition-all ${isOpen
                        ? "text-primary border-primary bg-primary/10"
                        : "text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                aria-label="Abrir menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown Menu (Bootstrap Style) */}
            <div className={`absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
                }`}>
                <div className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border ${isActive
                                        ? "bg-primary/10 text-primary border-primary/20 font-bold"
                                        : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-white/10">
                        {user ? (
                            <button
                                onClick={() => logout()}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                            >
                                <LogOut size={18} />
                                Sair da Conta
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
                            >
                                <LogOut size={18} className="rotate-180" />
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
