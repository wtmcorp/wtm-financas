"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
    const sizes = {
        sm: { icon: 16, box: "w-8 h-8", text: "text-lg", gap: "gap-2" },
        md: { icon: 22, box: "w-10 h-10", text: "text-xl", gap: "gap-3" },
        lg: { icon: 28, box: "w-14 h-14", text: "text-3xl", gap: "gap-4" },
        xl: { icon: 36, box: "w-20 h-20", text: "text-5xl", gap: "gap-6" },
    };

    const currentSize = sizes[size];

    return (
        <div className={`flex items-center ${currentSize.gap} ${className}`}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`${currentSize.box} bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] relative group/logo overflow-hidden`}
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                <TrendingUp size={currentSize.icon} className="text-white relative z-10" />
            </motion.div>

            {showText && (
                <div className="flex flex-col">
                    <span className={`${currentSize.text} font-black text-white tracking-tighter leading-none uppercase`}>
                        Wtm<span className="text-violet-500">Corps</span>
                    </span>
                    {size !== "sm" && (
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1">
                            Intelligence OS
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
