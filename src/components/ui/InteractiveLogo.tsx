"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function InteractiveLogo() {
    return (
        <motion.div
            className="relative w-10 h-10 cursor-pointer group"
            whileHover="hover"
            whileTap="tap"
        >
            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-violet-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                variants={{
                    hover: { scale: 1.2 },
                    tap: { scale: 0.9 }
                }}
            />

            {/* Main Container */}
            <motion.div
                className="relative w-full h-full bg-violet-600 rounded-xl flex items-center justify-center shadow-lg border border-white/10 overflow-hidden"
                variants={{
                    hover: { rotate: 0, scale: 1.05 },
                    tap: { scale: 0.95 }
                }}
            >
                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full"
                    variants={{
                        hover: { translateX: "100%", transition: { duration: 0.6, ease: "easeInOut" } }
                    }}
                />

                {/* Finance Icon */}
                <motion.div
                    variants={{
                        hover: {
                            scale: 1.2,
                            y: [0, -5, 0],
                            transition: {
                                y: { repeat: Infinity, duration: 1, ease: "easeInOut" }
                            }
                        }
                    }}
                >
                    <TrendingUp className="text-white" size={20} strokeWidth={3} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
