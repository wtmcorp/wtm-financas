"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Star, Flame, Trophy, BookOpen, Target, Zap } from "lucide-react";
import { useLearnProgress } from "@/hooks/useLearnProgress";

export default function EducationStats() {
    const { getTotalCompletedLessonsCount, progress } = useLearnProgress();
    const completedCount = getTotalCompletedLessonsCount();

    // Mock data for gamification (in a real app, this would come from a user profile/context)
    const stats = [
        { label: "Aulas Concluídas", value: completedCount, icon: BookOpen, color: "from-blue-500 to-cyan-600" },
        { label: "XP Acumulado", value: completedCount * 50, icon: Zap, color: "from-yellow-500 to-orange-600" },
        { label: "Ofensiva", value: "5 dias", icon: Flame, color: "from-orange-500 to-red-600" },
        { label: "Nível", value: Math.floor(completedCount / 5) + 1, icon: Star, color: "from-purple-500 to-pink-600" }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-panel p-4 md:p-6 relative overflow-hidden group cursor-pointer"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg shrink-0`}>
                            <stat.icon size={20} className="text-white md:w-6 md:h-6" />
                        </div>
                        <div>
                            <p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">
                                {stat.label}
                            </p>
                            <p className="text-xl md:text-2xl font-black text-white tracking-tight">
                                {stat.value}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar for Level */}
                    {stat.label === "Nível" && (
                        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedCount % 5) * 20}%` }}
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                            />
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
