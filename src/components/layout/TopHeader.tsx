"use client";

import { Search, Bell, Heart, LogOut, Command } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TopHeader() {
    const { user, logout } = useAuth();

    const navLinks = [
        { label: "CARTÕES", href: "/cards" },
        { label: "FERRAMENTAS", href: "/tools" },
        { label: "I.AS ÚTEIS", href: "/ai-tools" },
        { label: "DESAFIO", href: "/challenge" },
        { label: "APRENDA", href: "/learn" },
    ];

    return (
        <header className="h-20 bg-black/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Navigation Links */}
            <nav className="hidden xl:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-[10px] font-black text-gray-500 hover:text-white transition-colors tracking-[0.2em]"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                <input
                    type="text"
                    placeholder="BUSCAR..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-12 text-[10px] font-black tracking-widest text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-700"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-black text-gray-500">
                    <Command size={8} /> K
                </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-6">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-all">
                    <Heart size={18} />
                </button>

                <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-white uppercase tracking-tighter">{user?.name?.split(" ")[0] || "Usuário"}</p>
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">Nível Platinum</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-black text-sm border-2 border-white/10">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <button
                        onClick={logout}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-red-400 transition-all"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}
