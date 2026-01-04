"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    TrendingUp,
    Heart,
    Wrench,
    User,
    Settings,
    LogOut,
    Zap,
    Crown,
    LayoutGrid,
    PieChart,
    ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const menuItems = [
        { href: "/", icon: Home, label: "Dashboard", desc: "Command Center" },
        { href: "/invest", icon: TrendingUp, label: "Investimentos", desc: "Wealth Engine" },
        { href: "/learn", icon: Heart, label: "Academy", desc: "Knowledge Hub" },
        { href: "/tools", icon: Wrench, label: "Ferramentas", desc: "Utility Suite" },
        { href: "/profile", icon: User, label: "Perfil", desc: "Identity" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-[#0a0a0c] border-r border-white/5 hidden lg:flex flex-col p-8 z-50">
            {/* Logo Area */}
            <div className="flex items-center gap-4 mb-16 px-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(167,139,250,0.3)]">
                    <Zap size={24} className="text-black fill-black" />
                </div>
                <div>
                    <h1 className="text-xl font-black text-white tracking-tighter">WTM CORPS</h1>
                    <p className="text-[9px] text-primary font-black uppercase tracking-[0.3em]">Intelligence OS</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 ${isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeSidebarTab"
                                    className="absolute left-0 w-1 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(167,139,250,0.8)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                            <item.icon size={22} className={`transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                            <div className="flex flex-col">
                                <span className="text-sm font-black uppercase tracking-tight">{item.label}</span>
                                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{item.desc}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Mini Card */}
            <div className="mt-auto pt-8 border-t border-white/5">
                <div className="p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 mb-6 group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-sm">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs font-black text-white truncate">{user?.name}</span>
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={10} className="text-primary" />
                                <span className="text-[8px] font-black text-primary uppercase tracking-widest">Platinum</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            className="h-full bg-primary"
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-[8px] font-black text-gray-600 uppercase">Level 5</span>
                        <span className="text-[8px] font-black text-gray-600 uppercase">85% XP</span>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-black uppercase tracking-tight">Encerrar Sessão</span>
                </button>
            </div>
        </aside>
    );
}
