"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, LogIn, Heart } from "lucide-react";
import MobileMenu from "./MobileMenu";
import MarketTicker from "../dashboard/MarketTicker";


export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 glass z-50">
            <div className="px-6 py-4">
                <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-black text-lg group-hover:rotate-6 transition-transform">W</div>
                        <span className="text-white font-bold text-xl tracking-tighter group-hover:text-primary transition-colors">
                            Wtm<span className="text-primary/80">Corps</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            { name: "Dashboard", href: "/" },
                            { name: "Cartões", href: "/cards" },
                            { name: "Ferramentas", href: "/tools" },
                            { name: "Desafio", href: "/private" },
                            { name: "Aprenda", href: "/learn" },
                            { name: "Perfil", href: "/dashboard" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6">
                            {user ? (
                                <div className="flex items-center gap-6">
                                    <Link href="/private" className="text-gray-400 hover:text-primary transition-colors" title="Desafio Privado">
                                        <Heart size={20} />
                                    </Link>
                                    <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                        {user.name.split(" ")[0]}
                                    </Link>
                                    <button
                                        onClick={() => logout()}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
                                        title="Sair"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-primary transition-all active:scale-95"
                                >
                                    Entrar
                                </Link>
                            )}
                        </div>
                        <MobileMenu />
                    </div>
                </div>
            </div>

            {/* Real-time Market Ticker Bar - Slimmer & Cleaner */}
            <div className="border-t border-white/5 bg-black/40 px-6 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <MarketTicker />
                </div>
            </div>
        </header>
    );
}

