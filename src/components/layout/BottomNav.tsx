"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, TrendingUp, AlertTriangle, Wrench, User, Heart } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/cards", icon: CreditCard, label: "Cartões" },
        { href: "/tools", icon: Wrench, label: "Ferramentas" },
        { href: "/profile", icon: User, label: "Perfil" },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md glass rounded-[2rem] z-[60] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 md:hidden overflow-hidden">
            <div className="flex justify-around items-center h-16 px-4 relative">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-500 ${isActive ? "text-primary" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {isActive && (
                                <>
                                    <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full animate-pulse" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
                                </>
                            )}
                            <div className={`transition-transform duration-300 ${isActive ? "scale-110 -translate-y-1" : ""}`}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[9px] mt-1 font-black uppercase tracking-widest transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
