"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

export default function HealthScore() {
    // Pontuação fictícia baseada em lógica de "saúde financeira"
    const score = 85;

    const getStatus = (s: number) => {
        if (s >= 80) return { label: "Excelente", color: "text-green-400", bg: "bg-green-500/10", icon: CheckCircle2 };
        if (s >= 60) return { label: "Bom", color: "text-blue-400", bg: "bg-blue-500/10", icon: TrendingUp };
        return { label: "Atenção", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: AlertCircle };
    };

    const status = getStatus(score);

    return (
        <div className="card-premium p-6 space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-white">Saúde Financeira</h3>
                    <p className="text-xs text-gray-500">Baseado no seu perfil e metas</p>
                </div>
                <div className={`px-3 py-1 rounded-full ${status.bg} ${status.color} text-[10px] font-black uppercase tracking-widest border border-current/20`}>
                    {status.label}
                </div>
            </div>

            <div className="relative flex items-center justify-center py-4">
                {/* Gauge Background */}
                <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-white/5"
                    />
                    <motion.circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364.4}
                        initial={{ strokeDashoffset: 364.4 }}
                        animate={{ strokeDashoffset: 364.4 - (364.4 * score) / 100 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-primary"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">{score}</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Pontos</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Reserva</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-white">OK</span>
                    </div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Dívidas</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-white">Baixas</span>
                    </div>
                </div>
            </div>

            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-400 transition-all flex items-center justify-center gap-2 group">
                VER RELATÓRIO DETALHADO
                <status.icon size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
