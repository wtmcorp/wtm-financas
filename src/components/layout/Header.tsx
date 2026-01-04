"use client";

import { Search, Command, LogOut, LayoutDashboard, CreditCard, Wrench, Sparkles, Trophy, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MarketTicker from "../dashboard/MarketTicker";
import InteractiveLogo from "@/components/ui/InteractiveLogo";

export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const navLinks = [
        { label: "Dashboard", href: "/", icon: LayoutDashboard },
        { label: "Cartões", href: "/cards", icon: CreditCard },
        { label: "Ferramentas", href: "/tools", icon: Wrench },
        { label: "I.As Úteis", href: "/ai-tools", icon: Sparkles },
        { label: "Desafio", href: "/challenge", icon: Trophy },
        { label: "Aprenda", href: "/learn", icon: BookOpen },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            {/* Top Bar */}
            <div className="h-20 bg-black/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8">


                {/* Logo Section */}
                <div className="flex items-center gap-3 w-64">
                    <InteractiveLogo />
                    <span className="text-xl font-black text-white tracking-tighter">WtmCorps</span>
                </div>

                {/* Navigation Links - Centered Pill */}
                <nav className="hidden xl:flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-1.5">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Section - Search & Auth */}
                <div className="flex items-center gap-4 w-64 justify-end">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 w-48 group focus-within:border-violet-500/50 focus-within:bg-black transition-all">
                        <Search className="text-gray-500 group-focus-within:text-violet-400 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="BUSCAR..."
                            className="w-full bg-transparent border-none outline-none text-[10px] font-bold text-white placeholder:text-gray-600 ml-2 uppercase tracking-wider"
                        />
                        <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                            <Command size={8} className="text-gray-500" />
                            <span className="text-[8px] font-bold text-gray-500">K</span>
                        </div>
                    </div>

                    {/* Auth Button */}
                    {user ? (
                        <button
                            onClick={logout}
                            className="h-10 px-6 rounded-xl bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
                        >
                            <span>Sair</span>
                            <LogOut size={14} />
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="h-10 px-6 rounded-xl bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </div>

            {/* Market Ticker Bar */}
            <MarketTicker />
        </header>
    );
}

