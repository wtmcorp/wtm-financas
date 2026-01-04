"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, BookOpen, Wrench, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: LayoutDashboard, label: "Home" },
        { href: "/invest", icon: TrendingUp, label: "Invest" },
        { href: "/learn", icon: BookOpen, label: "Learn" },
        { href: "/tools", icon: Wrench, label: "Tools" },
        { href: "/profile", icon: User, label: "Perfil" },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] md:hidden w-full px-4">
            <nav className="mx-auto max-w-sm bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="flex justify-between items-center h-16 px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex-1 flex flex-col items-center justify-center h-full"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white/[0.03]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <div className={`relative z-10 transition-all duration-300 ${isActive ? "text-violet-400 -translate-y-1" : "text-gray-500"}`}>
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeDot"
                                        className="absolute bottom-2 w-1 h-1 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
