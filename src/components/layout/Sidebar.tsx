"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    TrendingUp,
    BookOpen,
    Wrench,
    User,
    Zap,
    LogOut,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

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
        <aside className="fixed left-0 top-0 h-screen w-72 bg-black/40 backdrop-blur-xl border-r border-white/5 hidden lg:flex flex-col z-50">
            {/* Logo Area */}
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <Zap size={20} className="text-white fill-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight leading-none">WTM CORPS</h1>
                        <p className="text-[10px] text-gray-400 font-medium tracking-widest mt-0.5">INTELLIGENCE OS</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-white/5 text-white shadow-inner shadow-white/5"
                                    : "text-gray-500 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeSidebar"
                                    className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent rounded-xl border-l-2 border-violet-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                            <item.icon
                                size={20}
                                className={`relative z-10 transition-colors duration-300 ${isActive ? "text-violet-400" : "group-hover:text-white"}`}
                            />
                            <span className={`relative z-10 text-sm font-medium tracking-wide ${isActive ? "text-white" : ""}`}>
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 mt-auto">
                <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                            {user?.name?.charAt(0) || "W"}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{user?.name || "Usuário"}</p>
                            <p className="text-[10px] text-violet-400 font-medium tracking-wider uppercase">Membro Platinum</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
