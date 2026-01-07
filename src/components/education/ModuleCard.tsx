"use client";

import { PlayCircle, BookOpen, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ModuleCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    level: "Iniciante" | "Intermediário" | "Avançado";
    isLocked?: boolean;
    onClick?: () => void;
}

export default function ModuleCard({
    title,
    description,
    icon: Icon,
    progress,
    totalLessons,
    completedLessons,
    level,
    isLocked = false,
    onClick
}: ModuleCardProps) {
    const getLevelColor = () => {
        switch (level) {
            case "Iniciante": return "text-green-400 bg-green-500/10 border-green-500/20";
            case "Intermediário": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
            case "Avançado": return "text-red-400 bg-red-500/10 border-red-500/20";
        }
    };

    return (
        <motion.div
            layout
            whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
            whileTap={!isLocked ? { scale: 0.98 } : {}}
            onClick={!isLocked ? onClick : undefined}
            className={`
                group relative p-8 rounded-[2.5rem] border transition-all duration-500
                ${isLocked
                    ? "bg-white/5 border-white/5 opacity-50 cursor-not-allowed"
                    : "glass-panel border-white/10 hover:border-primary/50 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer"
                }
            `}
        >
            {/* Background Glow */}
            {!isLocked && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />
            )}

            <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${isLocked
                        ? "bg-white/5 text-gray-600 border-white/5"
                        : "bg-primary/10 text-primary border-primary/20 group-hover:scale-110 group-hover:rotate-6 shadow-2xl"
                        }`}>
                        <Icon size={28} />
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border backdrop-blur-md ${getLevelColor()}`}>
                        {level}
                    </span>
                </div>

                <div className="space-y-3">
                    <h3 className="text-2xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors">
                        {description}
                    </p>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
                        <span className="group-hover:text-gray-400 transition-colors">{completedLessons}/{totalLessons} Aulas</span>
                        <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className={`h-full rounded-full ${isLocked ? "bg-gray-700" : "bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_15px_rgba(167,139,250,0.5)]"}`}
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        {isLocked ? (
                            <>
                                <Lock size={14} className="text-gray-700" />
                                Bloqueado
                            </>
                        ) : (
                            <>
                                {progress === 100 ? (
                                    <span className="text-green-500 flex items-center gap-2">
                                        <CheckCircle2 size={14} />
                                        Módulo Concluído
                                    </span>
                                ) : (
                                    <span className="text-primary md:text-gray-500 md:group-hover:text-white transition-colors flex items-center gap-2">
                                        <PlayCircle size={14} className="text-primary" />
                                        {progress > 0 ? "Continuar Jornada" : "Iniciar Módulo"}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                    {!isLocked && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-1 transition-all">
                            <ArrowRight size={16} className="text-primary" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
