"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    TrendingUp,
    BookOpen,
    Wrench,
    User,
    Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/ui/Logo";

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const menuItems = [
        { href: "/", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/invest", icon: TrendingUp, label: "Investimentos" },
        { href: "/learn", icon: BookOpen, label: "Academy" },
        { href: "/tools", icon: Wrench, label: "Ferramentas" },
        { href: "/profile", icon: User, label: "Perfil" },
    ];

    return (
        <aside className="fixed left-6 top-6 bottom-6 w-72 glass-panel rounded-[2rem] hidden lg:flex flex-col z-50 overflow-hidden">
            {/* Logo Area */}
            <div className="p-10 pb-6">
                <Logo />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-8">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive
                                ? "text-white bg-white/5 border border-white/5 shadow-inner shadow-white/5"
                                : "text-gray-500 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeSidebar"
                                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_15px_rgba(124,58,237,0.8)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                            <item.icon
                                size={22}
                                className={`transition-colors duration-300 ${isActive ? "text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" : "group-hover:text-white"}`}
                            />
                            <span className="text-sm font-medium tracking-wide">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 mt-auto">
                <div className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/20 ring-2 ring-white/10">
                        {user?.name?.charAt(0) || "W"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{user?.name || "Usuário"}</p>
                        <p className="text-[10px] text-gray-400 group-hover:text-violet-400 transition-colors uppercase tracking-wider font-medium">Configurações</p>
                    </div>
                    <Settings size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
            </div>
        </aside>
    );
}
