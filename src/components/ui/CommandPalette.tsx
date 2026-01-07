"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Search, Command, Home, CreditCard, Wrench,
    Sparkles, TrendingUp, Heart, User, Settings,
    ArrowRight, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const items = [
        { id: "dash", label: "Dashboard", href: "/", icon: Home, category: "Navegação" },
        { id: "cards", label: "Cartões", href: "/cards", icon: CreditCard, category: "Navegação" },
        { id: "tools", label: "Ferramentas", href: "/tools", icon: Wrench, category: "Navegação" },
        { id: "ai", label: "I.As Úteis", href: "/ai-tools", icon: Sparkles, category: "Navegação" },
        { id: "learn", label: "Aprenda", href: "/learn", icon: TrendingUp, category: "Navegação" },
        { id: "private", label: "Desafio Privado", href: "/private", icon: Heart, category: "Navegação" },
        { id: "profile", label: "Meu Perfil", href: "/profile", icon: User, category: "Conta" },
        { id: "settings", label: "Configurações", href: "/settings", icon: Settings, category: "Conta" },
    ];

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                togglePalette();
            }
            if (e.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [togglePalette]);

    const navigate = (href: string) => {
        router.push(href);
        setIsOpen(false);
        setSearch("");
    };

    return (
        <>
            {/* Search Trigger Button (Desktop) */}
            {/* Search Trigger Button (Desktop) */}
            <button
                onClick={togglePalette}
                className="hidden md:flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 w-48 group hover:border-violet-500/50 hover:bg-black transition-all"
            >
                <div className="flex items-center gap-2">
                    <Search className="text-gray-500 group-hover:text-violet-400 transition-colors" size={14} />
                    <span className="text-[10px] font-bold text-gray-500 group-hover:text-white uppercase tracking-wider">BUSCAR...</span>
                </div>
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                    <Command size={8} className="text-gray-500" />
                    <span className="text-[8px] font-bold text-gray-500">K</span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl bg-[#0f0f13] border border-white/10 rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center gap-4">
                                <Search className="text-primary" size={24} />
                                <input
                                    autoFocus
                                    placeholder="O que você está procurando?"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-white text-xl font-medium placeholder:text-gray-600"
                                />
                                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                                {filteredItems.length > 0 ? (
                                    <div className="space-y-6">
                                        {Array.from(new Set(filteredItems.map(i => i.category))).map(category => (
                                            <div key={category} className="space-y-2">
                                                <h4 className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{category}</h4>
                                                <div className="space-y-1">
                                                    {filteredItems.filter(i => i.category === category).map(item => (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => navigate(item.href)}
                                                            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 group transition-all"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                                                    <item.icon size={20} />
                                                                </div>
                                                                <span className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                                                            </div>
                                                            <ArrowRight size={18} className="text-gray-700 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center space-y-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-600">
                                            <Search size={32} />
                                        </div>
                                        <p className="text-gray-500 font-bold">Nenhum resultado encontrado para "{search}"</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-gray-400">ESC</kbd> Fechar
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-gray-400">↵</kbd> Selecionar
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-primary uppercase tracking-widest opacity-50">
                                    Wtm Intelligence OS
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
