"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertCircle, CheckCircle2, Zap, Info, ArrowUpRight } from "lucide-react";

export default function HealthScore() {
    // Pontuação fictícia baseada em lógica de "saúde financeira"
    const score = 85;

    const getStatus = (s: number) => {
        if (s >= 80) return { label: "Excelente", color: "text-green-400", bg: "bg-green-500/10", icon: CheckCircle2, description: "Seu patrimônio está em zona de alta segurança." };
        if (s >= 60) return { label: "Bom", color: "text-blue-400", bg: "bg-blue-500/10", icon: TrendingUp, description: "Sua saúde financeira está estável, mas há espaço para otimização." };
        return { label: "Atenção", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: AlertCircle, description: "Identificamos pontos de risco na sua gestão de capital." };
    };

    const status = getStatus(score);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 space-y-8 relative overflow-hidden group"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                        <Shield className="text-primary" size={20} />
                        Financial Health
                    </h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Real-time Diagnostic</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full ${status.bg} ${status.color} text-[9px] font-black uppercase tracking-[0.2em] border border-current/20 backdrop-blur-md`}>
                    {status.label}
                </div>
            </div>

            <div className="relative flex items-center justify-center py-6">
                {/* Gauge Background */}
                <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-white/5"
                    />
                    <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={552.9}
                        initial={{ strokeDashoffset: 552.9 }}
                        animate={{ strokeDashoffset: 552.9 - (552.9 * score) / 100 }}
                        transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                        className="text-primary"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.3))' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-6xl font-black text-white tracking-tighter"
                    >
                        {score}
                    </motion.span>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Score</span>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <p className="text-sm text-gray-400 font-medium leading-relaxed text-center">
                    {status.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                        <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-2">Reserva</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">Blindada</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        </div>
                    </div>
                    <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                        <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-2">Dívidas</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">Sob Controle</span>
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                    </div>
                </div>
            </div>

            <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-gray-400 hover:text-white transition-all flex items-center justify-center gap-3 group uppercase tracking-[0.2em]">
                Relatório de Performance
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </motion.div>
    );
}
