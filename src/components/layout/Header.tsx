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
                <nav className="hidden xl:flex items-center bg-white/[0.04] border border-white/[0.12] rounded-full px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-xl">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-[0_4px_16px_rgba(139,92,246,0.4)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/[0.08]"
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-full bg-white/10 blur-sm"></div>
                                )}
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
                            className="h-10 px-4 md:px-6 rounded-xl bg-gradient-to-r from-white to-gray-100 text-black text-xs font-black uppercase tracking-wider hover:from-gray-100 hover:to-white transition-all shadow-lg shadow-black/20 flex items-center gap-2"
                        >
                            <span className="hidden sm:inline">Sair</span>
                            <LogOut size={14} />
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="h-10 px-4 md:px-6 rounded-xl bg-gradient-to-r from-white to-gray-100 text-black text-xs font-black uppercase tracking-wider hover:from-gray-100 hover:to-white transition-all shadow-lg shadow-black/20 flex items-center justify-center"
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

