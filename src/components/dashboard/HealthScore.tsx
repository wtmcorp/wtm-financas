"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertCircle, CheckCircle2, Info, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFinance } from "@/contexts/FinanceContext";
import { useMemo } from "react";

export default function HealthScore() {
    const router = useRouter();
    const { getBalance, transactions } = useFinance();

    const score = useMemo(() => {
        if (transactions.length === 0) return 0;

        // Simple score calculation logic
        const balance = getBalance();
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

        if (income === 0) return 0;

        let s = 50; // Base score

        // Savings rate factor
        const savingsRate = (income - expenses) / income;
        s += savingsRate * 50;

        // Balance factor
        if (balance > income * 3) s += 10;
        if (balance < 0) s -= 30;

        return Math.min(Math.max(Math.round(s), 0), 100);
    }, [getBalance, transactions]);

    const getStatus = (s: number) => {
        if (transactions.length === 0) return { label: "INICIAL", color: "text-gray-400", bg: "bg-gray-500/10", description: "ADICIONE TRANSAÇÕES PARA GERAR SEU DIAGNÓSTICO." };
        if (s >= 80) return { label: "EXCELENTE", color: "text-green-400", bg: "bg-green-500/10", description: "SEU PATRIMÔNIO ESTÁ EM ZONA DE ALTA SEGURANÇA." };
        if (s >= 60) return { label: "BOM", color: "text-blue-400", bg: "bg-blue-500/10", description: "SUA SAÚDE FINANCEIRA ESTÁ ESTÁVEL, MAS HÁ ESPAÇO PARA OTIMIZAÇÃO." };
        return { label: "ATENÇÃO", color: "text-yellow-400", bg: "bg-yellow-500/10", description: "IDENTIFICAMOS PONTOS DE RISCO NA SUA GESTÃO DE CAPITAL." };
    };

    const status = getStatus(score);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 md:p-10 space-y-8 md:space-y-10 relative overflow-hidden group h-full flex flex-col"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-3 uppercase">
                        <Shield className="text-primary md:w-6 md:h-6" size={20} />
                        Saúde Financeira
                    </h3>
                    <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mt-2">DIAGNÓSTICO REAL</p>
                </div>
                <div className={`px-3 py-1 md:px-4 md:py-1.5 rounded-lg ${status.bg} ${status.color} text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border border-current/20 backdrop-blur-md`}>
                    {status.label}
                </div>
            </div>

            <div className="relative flex items-center justify-center py-4 md:py-8">
                <svg className="w-40 h-40 md:w-56 md:h-56 transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-white/5"
                    />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                        transition={{ duration: 3, ease: [0.23, 1, 0.32, 1] }}
                        className="text-primary"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.4))' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter"
                    >
                        {score}
                    </motion.span>
                    <span className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">SCORE</span>
                </div>
            </div>

            <div className="space-y-6 relative z-10 flex-1">
                <p className="text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest leading-relaxed text-center">
                    {status.description}
                </p>

                <div className="pt-6 md:pt-8 border-t border-white/5 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                            <span>LIBERDADE FINANCEIRA</span>
                            <span className="text-primary">{score > 0 ? Math.round(score * 0.5) : 0}%</span>
                        </div>
                        <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${score > 0 ? Math.round(score * 0.5) : 0}%` }}
                                transition={{ duration: 2, delay: 1 }}
                                className="h-full bg-gradient-to-r from-primary to-purple-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="p-4 md:p-5 bg-white/[0.02] rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                            <p className="text-[8px] md:text-[9px] text-gray-600 uppercase font-black tracking-[0.2em] mb-2 md:mb-3">RESERVA</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] md:text-xs font-black text-white uppercase">{score > 70 ? "BLINDADA" : "EM CONSTRUÇÃO"}</span>
                                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${score > 70 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]" : "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,1)]"}`} />
                            </div>
                        </div>
                        <div className="p-4 md:p-5 bg-white/[0.02] rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                            <p className="text-[8px] md:text-[9px] text-gray-600 uppercase font-black tracking-[0.2em] mb-2 md:mb-3">DÍVIDAS</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] md:text-xs font-black text-white uppercase">{score > 50 ? "CONTROLE" : "ALERTA"}</span>
                                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${score > 50 ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]"}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => router.push('/trends')}
                className="w-full mt-6 md:mt-8 py-4 md:py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] md:text-[10px] font-black text-gray-500 hover:text-white transition-all flex items-center justify-center gap-3 md:gap-4 group uppercase tracking-[0.3em]"
            >
                PERFORMANCE
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform md:w-4 md:h-4" />
            </button>
        </motion.div>
    );
}
