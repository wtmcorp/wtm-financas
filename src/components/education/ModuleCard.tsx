"use client";

import { PlayCircle, BookOpen, CheckCircle2, Lock } from "lucide-react";

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
        <div
            onClick={!isLocked ? onClick : undefined}
            className={`
                group relative p-6 rounded-3xl border transition-all duration-300
                ${isLocked
                    ? "bg-white/5 border-white/5 opacity-50 cursor-not-allowed"
                    : "bg-[#0f0f13] border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(167,139,250,0.15)] cursor-pointer"
                }
            `}
        >
            {/* Background Glow */}
            {!isLocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            )}

            <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl ${isLocked ? "bg-white/5 text-gray-500" : "bg-primary/10 text-primary"}`}>
                        <Icon size={24} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getLevelColor()}`}>
                        {level}
                    </span>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                        <span>{completedLessons}/{totalLessons} Aulas</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${isLocked ? "bg-gray-700" : "bg-primary"}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {isLocked ? (
                        <>
                            <Lock size={14} />
                            Bloqueado
                        </>
                    ) : (
                        <>
                            {progress === 100 ? (
                                <span className="text-green-500 flex items-center gap-2">
                                    <CheckCircle2 size={14} />
                                    Concluído
                                </span>
                            ) : (
                                <span className="group-hover:text-white transition-colors flex items-center gap-2">
                                    <PlayCircle size={14} />
                                    Continuar
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
