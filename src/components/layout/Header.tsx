"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, LogIn } from "lucide-react";
import FinancialNews from "@/components/notifications/FinancialNews";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-md border-b border-white/10 z-30 px-6 py-3">
            <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="text-primary font-bold text-xl hover:opacity-80 transition-opacity">
                    Wtm Corps
                </Link>

                <div className="flex items-center gap-4">
                    <FinancialNews />

                    {user ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <Link href="/dashboard" className="text-sm text-gray-300 hidden sm:block hover:text-white transition-colors">
                                {user.name.split(" ")[0]}
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                                title="Sair"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors pl-4 border-l border-white/10"
                        >
                            <LogIn size={18} />
                            <span className="hidden sm:block">Entrar</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
