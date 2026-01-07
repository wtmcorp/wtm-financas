"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Zap, Award, Star, Crown, Medal, Flame } from "lucide-react";
import { useState, useEffect } from "react";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: any;
    progress: number;
    total: number;
    unlocked: boolean;
    rarity: "common" | "rare" | "epic" | "legendary";
    xp: number;
}

export default function AchievementsWidget() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [userLevel, setUserLevel] = useState(1);
    const [userXP, setUserXP] = useState(0);
    const [nextLevelXP, setNextLevelXP] = useState(100);

    useEffect(() => {
        // Load achievements from localStorage
        const savedAchievements = localStorage.getItem("wtm_achievements");
        const savedLevel = localStorage.getItem("wtm_user_level");
        const savedXP = localStorage.getItem("wtm_user_xp");

        if (savedLevel) setUserLevel(parseInt(savedLevel));
        if (savedXP) setUserXP(parseInt(savedXP));

        if (savedAchievements) {
            setAchievements(JSON.parse(savedAchievements));
        } else {
            // Initialize default achievements
            const defaultAchievements: Achievement[] = [
                {
                    id: "first_transaction",
                    title: "Primeiro Passo",
                    description: "Registre sua primeira transação",
                    icon: Zap,
                    progress: 0,
                    total: 1,
                    unlocked: false,
                    rarity: "common",
                    xp: 10
                },
                {
                    id: "week_streak",
                    title: "Consistência",
                    description: "Use o app por 7 dias seguidos",
                    icon: Flame,
                    progress: 0,
                    total: 7,
                    unlocked: false,
                    rarity: "rare",
                    xp: 50
                },
                {
                    id: "first_goal",
                    title: "Sonhador",
                    description: "Crie sua primeira meta financeira",
                    icon: Target,
                    progress: 0,
                    total: 1,
                    unlocked: false,
                    rarity: "common",
                    xp: 15
                },
                {
                    id: "save_1000",
                    title: "Poupador",
                    description: "Economize R$ 1.000",
                    icon: Trophy,
                    progress: 0,
                    total: 1000,
                    unlocked: false,
                    rarity: "epic",
                    xp: 100
                },
                {
                    id: "complete_course",
                    title: "Estudioso",
                    description: "Complete um curso de educação financeira",
                    icon: Award,
                    progress: 0,
                    total: 1,
                    unlocked: false,
                    rarity: "rare",
                    xp: 75
                },
                {
                    id: "master",
                    title: "Mestre Financeiro",
                    description: "Alcance nível 10",
                    icon: Crown,
                    progress: 0,
                    total: 10,
                    unlocked: false,
                    rarity: "legendary",
                    xp: 500
                }
            ];
            setAchievements(defaultAchievements);
            localStorage.setItem("wtm_achievements", JSON.stringify(defaultAchievements));
        }
    }, []);

    const rarityColors = {
        common: "from-gray-500 to-gray-600",
        rare: "from-blue-500 to-blue-600",
        epic: "from-purple-500 to-pink-600",
        legendary: "from-yellow-500 to-orange-600"
    };

    const rarityBorders = {
        common: "border-gray-500/30",
        rare: "border-blue-500/30",
        epic: "border-purple-500/30",
        legendary: "border-yellow-500/30"
    };

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const progressPercent = (userXP / nextLevelXP) * 100;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 md:p-8 relative overflow-hidden group h-full flex flex-col"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-yellow-500/10 transition-all duration-700" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-yellow-500/20">
                        <Trophy size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Conquistas</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">
                            {unlockedCount}/{achievements.length} Desbloqueadas
                        </p>
                    </div>
                </div>
            </div>

            {/* Level Progress */}
            <div className="mb-6 relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-black text-white">Nível {userLevel}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-bold">
                        {userXP}/{nextLevelXP} XP
                    </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"
                    />
                </div>
            </div>

            {/* Achievements List */}
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar relative z-10">
                {achievements.map((achievement, i) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`
                            p-4 rounded-xl border transition-all
                            ${achievement.unlocked
                                ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} ${rarityBorders[achievement.rarity]} shadow-lg`
                                : 'bg-white/5 border-white/10 grayscale opacity-60'
                            }
                            hover:scale-[1.02] cursor-pointer
                        `}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`
                                w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                ${achievement.unlocked ? 'bg-white/20' : 'bg-white/5'}
                            `}>
                                <achievement.icon size={20} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="text-sm font-black text-white truncate">
                                        {achievement.title}
                                    </h4>
                                    {achievement.unlocked && (
                                        <Medal size={14} className="text-yellow-500 flex-shrink-0" />
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                                    {achievement.description}
                                </p>
                                {!achievement.unlocked && (
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500 font-bold">
                                                {achievement.progress}/{achievement.total}
                                            </span>
                                            <span className="text-primary font-black">
                                                +{achievement.xp} XP
                                            </span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all"
                                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4 relative z-10">
                <div className="text-center">
                    <div className="text-2xl font-black gradient-text">{unlockedCount}</div>
                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Desbloqueadas</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-black text-yellow-500">{userXP}</div>
                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">XP Total</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-black text-white">{userLevel}</div>
                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Nível</div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(167, 139, 250, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(167, 139, 250, 0.5);
                }
            `}</style>
        </motion.div>
    );
}
