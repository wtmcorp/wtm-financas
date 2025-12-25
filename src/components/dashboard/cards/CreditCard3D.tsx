"use client";

import { CreditCard } from "@/data/types";
import { Wifi, CreditCard as ChipIcon } from "lucide-react";

interface CreditCard3DProps {
    card: CreditCard;
    onClick?: () => void;
}

export default function CreditCard3D({ card, onClick }: CreditCard3DProps) {
    // Determine gradient based on card color or brand
    const getGradient = () => {
        if (card.color === "#000000") return "bg-gradient-to-br from-gray-900 via-black to-gray-900";
        if (card.color === "#8a05be") return "bg-gradient-to-br from-purple-700 via-purple-900 to-black"; // Nubank
        if (card.color === "#ec0000") return "bg-gradient-to-br from-red-600 via-red-800 to-black"; // Santander
        if (card.color === "#003399") return "bg-gradient-to-br from-blue-700 via-blue-900 to-black"; // Itaú
        if (card.color === "#cfcfcf") return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500"; // Platinum
        if (card.color === "#ffd700") return "bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800"; // Gold

        return `bg-gradient-to-br from-[${card.color}] to-black`;
    };

    const getBrandLogo = () => {
        if (card.brand.toLowerCase().includes("mastercard")) {
            return (
                <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/90 mix-blend-screen" />
                    <div className="w-8 h-8 rounded-full bg-yellow-500/90 mix-blend-screen" />
                </div>
            );
        }
        if (card.brand.toLowerCase().includes("visa")) {
            return <div className="text-2xl font-black italic text-white tracking-tighter">VISA</div>;
        }
        if (card.brand.toLowerCase().includes("elo")) {
            return (
                <div className="flex gap-0.5">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                </div>
            );
        }
        if (card.brand.toLowerCase().includes("amex")) {
            return (
                <div className="w-10 h-10 bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white border-2 border-white">
                    AMEX
                </div>
            );
        }
        return <div className="font-bold text-white">{card.brand}</div>;
    };

    return (
        <div
            onClick={onClick}
            className={`
                relative w-full aspect-[1.586/1] rounded-2xl p-6 
                ${getGradient()} 
                shadow-2xl border border-white/10 
                transform transition-all duration-500 hover:scale-105 hover:-rotate-2 cursor-pointer
                group overflow-hidden
            `}
            style={{
                backgroundColor: card.color !== "#000000" && !card.color.startsWith("#") ? card.color : undefined
            }}
        >
            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                    <div className="text-white/90 font-bold tracking-wider text-sm uppercase">
                        {card.bank}
                    </div>
                    <div className="text-white/80">
                        {getBrandLogo()}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-8 bg-yellow-500/20 rounded-md border border-yellow-500/40 flex items-center justify-center">
                            <div className="w-6 h-5 border border-yellow-500/60 rounded-[2px] grid grid-cols-2 gap-[1px] p-[2px]">
                                <div className="border border-yellow-500/60 rounded-[1px]" />
                                <div className="border border-yellow-500/60 rounded-[1px]" />
                                <div className="border border-yellow-500/60 rounded-[1px]" />
                                <div className="border border-yellow-500/60 rounded-[1px]" />
                            </div>
                        </div>
                        <Wifi className="text-white/50 rotate-90" size={20} />
                    </div>

                    <div className="space-y-1">
                        <div className="flex gap-4 text-white/90 font-mono text-lg tracking-widest drop-shadow-md">
                            <span>••••</span>
                            <span>••••</span>
                            <span>••••</span>
                            <span>8842</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="text-xs text-white/60 uppercase tracking-widest">
                                {card.name}
                            </div>
                            <div className="text-xs text-white/60">
                                12/29
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Details Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center space-y-3">
                <h3 className="text-white font-bold text-lg">{card.name}</h3>
                <div className="space-y-1 text-sm text-gray-300">
                    <p>{card.annualFee === 0 ? "Anuidade Grátis" : `Anuidade: R$ ${card.annualFee}`}</p>
                    {card.miles && <p className="text-blue-400">{card.milesRate} pts/dólar</p>}
                    {card.cashback > 0 && <p className="text-green-400">{card.cashback}% Cashback</p>}
                </div>
                <div className="px-4 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Ver Detalhes
                </div>
            </div>
        </div>
    );
}
