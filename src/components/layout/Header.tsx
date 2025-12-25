"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, LogIn, Heart } from "lucide-react";
import MobileMenu from "./MobileMenu";
import MarketTicker from "../dashboard/MarketTicker";


export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 glass z-50 border-b border-white/5">
            <div className="px-6 py-3 md:py-4">
                <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-black text-xl group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/20">W</div>
                        <span className="text-white font-black text-2xl tracking-tighter group-hover:text-primary transition-colors hidden sm:block">
                            Wtm<span className="text-primary/80">Corps</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
                        {[
                            { name: "Dashboard", href: "/" },
                            { name: "Cartões", href: "/cards" },
                            { name: "Ferramentas", href: "/tools" },
                            { name: "I.As Úteis", href: "/ai-tools" },
                            { name: "Desafio", href: "/private" },
                            { name: "Aprenda", href: "/learn" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="hidden md:flex items-center gap-6">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/private" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-primary hover:bg-primary/10 transition-all border border-white/5" title="Desafio Privado">
                                        <Heart size={20} />
                                    </Link>
                                    <div className="h-8 w-[1px] bg-white/10" />
                                    <Link href="/profile" className="flex items-center gap-3 group">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-black text-white leading-none">{user.name.split(" ")[0]}</p>
                                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter mt-1">Nível Platinum</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-black font-black border border-white/10 group-hover:scale-105 transition-transform">
                                            {user.name[0]}
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => logout()}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all border border-white/5"
                                        title="Sair"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-black hover:bg-primary transition-all active:scale-95 shadow-lg shadow-white/10"
                                >
                                    ENTRAR
                                </Link>
                            )}
                        </div>
                        <MobileMenu />
                    </div>
                </div>
            </div>

            {/* Real-time Market Ticker Bar - Slimmer & Cleaner */}
            <div className="border-t border-white/5 bg-black/40 px-6 backdrop-blur-md">
                <div className="max-w-7xl mx-auto">
                    <MarketTicker />
                </div>
            </div>
        </header>
    );
}

