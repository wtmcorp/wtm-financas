"use client";

import { useState } from "react";
import { ArrowUpDown, ExternalLink, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Bank = {
    name: string;
    cdi: number;
    liquidity: string;
    min: number;
    link: string;
    color: string;
    rating: string;
};

const banksData: Bank[] = [
    { name: "Sofisa Direto", cdi: 110, liquidity: "Diária", min: 1, link: "#", color: "#e30613", rating: "AAA" },
    { name: "Nubank", cdi: 100, liquidity: "Diária", min: 0, link: "#", color: "#820ad1", rating: "AA+" },
    { name: "Banco Inter", cdi: 100, liquidity: "Diária", min: 0, link: "#", color: "#ff7a00", rating: "AA" },
    { name: "C6 Bank", cdi: 104, liquidity: "D+2", min: 100, link: "#", color: "#242424", rating: "A+" },
    { name: "BTG Pactual", cdi: 103, liquidity: "Diária", min: 100, link: "#", color: "#002c6b", rating: "AAA" },
    { name: "XP Investimentos", cdi: 100, liquidity: "Diária", min: 1000, link: "#", color: "#f8d117", rating: "AAA" },
];

export default function BankTable() {
    const [banks, setBanks] = useState(banksData);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Bank; direction: "asc" | "desc" } | null>(null);

    const sort = (key: keyof Bank) => {
        let direction: "asc" | "desc" = "desc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
            direction = "asc";
        }

        const sorted = [...banks].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal) return direction === "asc" ? -1 : 1;
            if (aVal > bVal) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setBanks(sorted);
        setSortConfig({ key, direction });
    };

    return (
        <div className="w-full overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02] border-b border-white/5">
                            <th className="px-8 py-6">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Instituição</span>
                            </th>
                            <th className="px-8 py-6 cursor-pointer group" onClick={() => sort("cdi")}>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Rentabilidade</span>
                                    <ArrowUpDown size={12} className="text-gray-700 group-hover:text-primary transition-colors" />
                                </div>
                            </th>
                            <th className="px-8 py-6">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Liquidez</span>
                            </th>
                            <th className="px-8 py-6 cursor-pointer group" onClick={() => sort("min")}>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Mínimo</span>
                                    <ArrowUpDown size={12} className="text-gray-700 group-hover:text-primary transition-colors" />
                                </div>
                            </th>
                            <th className="px-8 py-6">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Rating</span>
                            </th>
                            <th className="px-8 py-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence mode="popLayout">
                            {banks.map((bank, i) => (
                                <motion.tr
                                    layout
                                    key={bank.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-white/[0.03] transition-all cursor-default"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: `${bank.color}20`, borderColor: `${bank.color}40` }}
                                            >
                                                <Globe size={18} style={{ color: bank.color }} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-white group-hover:text-primary transition-colors">{bank.name}</div>
                                                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Banco Digital</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-black text-green-400">{bank.cdi}%</span>
                                            <span className="text-[10px] font-black text-gray-600 uppercase">do CDI</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-gray-400 font-medium">
                                            <Zap size={14} className="text-primary" />
                                            {bank.liquidity}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold text-white">
                                            R$ {bank.min.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                                            <ShieldCheck size={12} className="text-blue-400" />
                                            <span className="text-[10px] font-black text-white">{bank.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <a
                                            href={bank.link}
                                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-primary hover:text-black text-gray-500 transition-all border border-white/10 hover:border-primary group/link"
                                        >
                                            <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                                        </a>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
