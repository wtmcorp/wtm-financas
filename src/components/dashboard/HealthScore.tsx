"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertCircle, CheckCircle2, Info, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HealthScore() {
    const router = useRouter();
    const score = 85;

    const getStatus = (s: number) => {
        if (s >= 80) return { label: "EXCELENTE", color: "text-green-400", bg: "bg-green-500/10", description: "SEU PATRIMÔNIO ESTÁ EM ZONA DE ALTA SEGURANÇA." };
        if (s >= 60) return { label: "BOM", color: "text-blue-400", bg: "bg-blue-500/10", description: "SUA SAÚDE FINANCEIRA ESTÁ ESTÁVEL, MAS HÁ ESPAÇO PARA OTIMIZAÇÃO." };
        return { label: "ATENÇÃO", color: "text-yellow-400", bg: "bg-yellow-500/10", description: "IDENTIFICAMOS PONTOS DE RISCO NA SUA GESTÃO DE CAPITAL." };
    };

    const status = getStatus(score);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-10 space-y-10 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3 uppercase">
                        <Shield className="text-primary" size={24} />
                        Saúde Financeira
                    </h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mt-2">DIAGNÓSTICO EM TEMPO REAL</p>
                </div>
                <div className={`px-4 py-1.5 rounded-lg ${status.bg} ${status.color} text-[9px] font-black uppercase tracking-[0.2em] border border-current/20 backdrop-blur-md`}>
                    {status.label}
                </div>
            </div>

            <div className="relative flex items-center justify-center py-8">
                <svg className="w-56 h-56 transform -rotate-90">
                    <circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="currentColor"
                        strokeWidth="14"
                        fill="transparent"
                        className="text-white/5"
                    />
                    <motion.circle
                        cx="112"
                        cy="112"
                        r="100"
                        stroke="currentColor"
                        strokeWidth="14"
                        fill="transparent"
                        strokeDasharray={628.3}
                        initial={{ strokeDashoffset: 628.3 }}
                        animate={{ strokeDashoffset: 628.3 - (628.3 * score) / 100 }}
                        transition={{ duration: 3, ease: [0.23, 1, 0.32, 1] }}
                        className="text-primary"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 15px rgba(167, 139, 250, 0.4))' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-7xl font-black text-white tracking-tighter"
                    >
                        {score}
                    </motion.span>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">SCORE</span>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest leading-relaxed text-center">
                    {status.description}
                </p>

                <div className="pt-8 border-t border-white/5 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                            <span>LIBERDADE FINANCEIRA</span>
                            <span className="text-primary">42%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "42%" }}
                                transition={{ duration: 2, delay: 1 }}
                                className="h-full bg-gradient-to-r from-primary to-purple-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                            <p className="text-[9px] text-gray-600 uppercase font-black tracking-[0.2em] mb-3">RESERVA</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-white uppercase">BLINDADA</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]" />
                            </div>
                        </div>
                        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                            <p className="text-[9px] text-gray-600 uppercase font-black tracking-[0.2em] mb-3">DÍVIDAS</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-white uppercase">CONTROLE</span>
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => router.push('/trends')}
                className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-gray-500 hover:text-white transition-all flex items-center justify-center gap-4 group uppercase tracking-[0.3em]"
            >
                RELATÓRIO DE PERFORMANCE
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </motion.div>
    );
}
