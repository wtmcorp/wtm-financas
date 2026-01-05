"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, BookOpen, Wrench, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: LayoutDashboard, label: "Home" },
        { href: "/trends", icon: TrendingUp, label: "Radar" },
        { href: "/learn", icon: BookOpen, label: "Learn" },
        { href: "/tools", icon: Wrench, label: "Tools" },
        { href: "/profile", icon: User, label: "Perfil" },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] lg:hidden w-[90%] max-w-md">
            <nav className="bg-black/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="flex justify-around items-center h-20 px-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex flex-col items-center justify-center w-12 h-12"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabMobile"
                                        className="absolute inset-0 bg-primary/10 rounded-2xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <div className={`relative z-10 transition-all duration-500 ${isActive ? "text-violet-400 scale-110" : "text-gray-500 hover:text-gray-300"}`}>
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicatorMobile"
                                        className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,1)]"
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
