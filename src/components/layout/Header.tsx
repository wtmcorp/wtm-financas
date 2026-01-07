"use client";

import { Search, Command, LogOut, LayoutDashboard, CreditCard, Wrench, Sparkles, Trophy, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MarketTicker from "../dashboard/MarketTicker";
import InteractiveLogo from "@/components/ui/InteractiveLogo";
import MobileMenu from "./MobileMenu";
import CommandPalette from "@/components/ui/CommandPalette";

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
            <div className="h-20 glass-panel border-b border-white/5 flex items-center justify-between px-4 md:px-8 relative z-50">

                {/* Left Section - Logo + Menu */}
                <div className="flex items-center gap-4 md:w-64">
                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <InteractiveLogo size="sm" />
                        <div className="hidden md:flex flex-col">
                            <span className="text-lg font-black text-white tracking-tighter leading-none uppercase">
                                Wtm<span className="text-violet-500">Corps</span>
                            </span>
                            <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                Intelligence OS
                            </span>
                        </div>
                    </Link>

                    {/* Mobile Menu Button - Visible on screens < XL */}
                    <div className="xl:hidden">
                        <MobileMenu />
                    </div>
                </div>

                {/* Navigation Links - Centered Pill (XL+ only) */}
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
                <div className="flex items-center gap-4 md:w-64 justify-end">
                    {/* Search Bar */}
                    {/* Search Bar */}
                    <CommandPalette />

                    {/* Auth Button */}
                    {user ? (
                        <button
                            onClick={logout}
                            className="h-10 px-4 md:px-6 rounded-xl bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
                        >
                            <span className="hidden sm:inline">Sair</span>
                            <LogOut size={14} />
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="h-10 px-4 md:px-6 rounded-xl bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center"
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

