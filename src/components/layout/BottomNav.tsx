"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, BookOpen, Wrench, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: LayoutDashboard, label: "PAINEL" },
        { href: "/invest", icon: TrendingUp, label: "INVESTIR" },
        { href: "/learn", icon: BookOpen, label: "APRENDER" },
        { href: "/tools", icon: Wrench, label: "UTILIDADES" },
        { href: "/profile", icon: User, label: "PERFIL" },
    ];

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-black/80 backdrop-blur-2xl rounded-[2.5rem] z-[60] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 md:hidden overflow-hidden">
            <div className="flex justify-around items-center h-20 px-4 relative">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-500 active:scale-90 ${isActive ? "text-primary" : "text-gray-500"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeMobileTab"
                                    className="absolute -top-1 w-12 h-1 bg-primary rounded-full shadow-[0_0_20px_rgba(167,139,250,1)]"
                                />
                            )}
                            <div className={`transition-transform duration-300 ${isActive ? "scale-110 -translate-y-1" : ""}`}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                            </div>
                            <span className={`text-[8px] mt-1.5 font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
