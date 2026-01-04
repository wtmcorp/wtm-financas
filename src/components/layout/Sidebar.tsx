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
    ShieldCheck,
    LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const menuItems = [
        { href: "/", icon: LayoutDashboard, label: "DASHBOARD", desc: "CENTRO DE COMANDO" },
        { href: "/invest", icon: TrendingUp, label: "INVESTIMENTOS", desc: "MOTOR DE RIQUEZA" },
        { href: "/learn", icon: BookOpen, label: "ACADEMY", desc: "PORTAL DE CONHECIMENTO" },
        { href: "/tools", icon: Wrench, label: "FERRAMENTAS", desc: "SUÍTE DE UTILIDADES" },
        { href: "/profile", icon: User, label: "PERFIL", desc: "IDENTIDADE" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-black border-r border-white/5 hidden lg:flex flex-col p-8 z-50">
            {/* Logo Area */}
            <div className="flex items-center gap-4 mb-20 px-2">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(167,139,250,0.4)]">
                    <Zap size={24} className="text-black fill-black" />
                </div>
                <div>
                    <h1 className="text-xl font-black text-white tracking-tighter leading-none">WTM CORPS</h1>
                    <p className="text-[9px] text-primary font-black uppercase tracking-[0.3em] mt-1">Intelligence OS</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-500 border ${isActive
                                ? "bg-white/[0.03] border-white/20 text-white"
                                : "text-gray-500 hover:text-white hover:bg-white/5 border-transparent"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeSidebarIndicator"
                                    className="absolute left-[-2px] w-1.5 h-10 bg-primary rounded-full shadow-[0_0_20px_rgba(167,139,250,1)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                            <item.icon size={22} strokeWidth={1.5} className={`transition-transform duration-500 ${isActive ? "text-primary scale-110" : "group-hover:scale-110"}`} />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">{item.desc}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Card */}
            <div className="mt-auto">
                <div className="p-6 bg-white/[0.03] rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-primary/40 transition-all cursor-pointer" onClick={() => window.location.href = '/profile'}>
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black font-black text-sm shadow-xl shadow-primary/20">
                            {user?.name?.charAt(0) || "W"}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-[10px] font-black text-white truncate uppercase tracking-tight">{user?.name || "Walter Tetsuo Mariano"}</span>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Membro Platinum</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 relative z-10">
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                className="h-full bg-primary shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                            />
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Nível 5</span>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">85% XP</span>
                        </div>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap size={80} className="text-primary rotate-12" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
