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
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass rounded-[2rem] z-50 shadow-2xl md:hidden">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${isActive ? "text-primary scale-110" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                            )}
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] mt-1 font-bold uppercase tracking-tighter ${isActive ? "opacity-100" : "opacity-0"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
