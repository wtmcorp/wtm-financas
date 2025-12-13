<<<<<<< HEAD
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, TrendingUp, AlertTriangle, Wrench, User } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/cards", icon: CreditCard, label: "Cartões" },
        { href: "/invest", icon: TrendingUp, label: "Investir" },
        { href: "/debts", icon: AlertTriangle, label: "Dívidas" },
        { href: "/tools", icon: Wrench, label: "Ferramentas" },
        { href: "/profile", icon: User, label: "Perfil" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-white/10 z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? "text-primary" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] mt-1">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
=======
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, TrendingUp, AlertTriangle, Wrench, User } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/cards", icon: CreditCard, label: "Cartões" },
        { href: "/invest", icon: TrendingUp, label: "Investir" },
        { href: "/debts", icon: AlertTriangle, label: "Dívidas" },
        { href: "/tools", icon: Wrench, label: "Ferramentas" },
        { href: "/profile", icon: User, label: "Perfil" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-white/10 z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? "text-primary" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] mt-1">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
