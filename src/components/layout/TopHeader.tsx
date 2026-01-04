"use client";

import { Search, Bell, Command, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function TopHeader() {
    const { user, logout } = useAuth();

    const navLinks = [
        { label: "Cartões", href: "/cards" },
        { label: "I.A Tools", href: "/ai-tools" },
        { label: "Desafio", href: "/challenge" },
    ];

    return (
        <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
            {/* Search Bar - Global Command */}
            <div className="flex-1 max-w-xl relative group">
                <div className="absolute inset-0 bg-violet-500/5 rounded-xl blur-xl group-focus-within:bg-violet-500/10 transition-all duration-500" />
                <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 transition-all group-focus-within:border-violet-500/50 group-focus-within:bg-black/50">
                    <Search className="text-gray-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar comandos..."
                        className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-600 ml-3 font-medium"
                    />
                    <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                        <Command size={10} className="text-gray-500" />
                        <span className="text-[10px] font-bold text-gray-500">K</span>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6 ml-6">
                {/* Quick Links */}
                <nav className="hidden xl:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="h-8 w-px bg-white/10 hidden xl:block" />

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all relative">
                        <Bell size={18} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-violet-500 rounded-full border border-black" />
                    </button>

                    <div className="flex items-center gap-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-white leading-none">{user?.name?.split(" ")[0] || "Comandante"}</p>
                            <p className="text-[10px] font-medium text-violet-400 uppercase tracking-wider mt-1">Online</p>
                        </div>
                        <button
                            onClick={logout}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-white hover:border-red-500/50 hover:text-red-500 transition-all group"
                        >
                            <LogOut size={16} className="ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
