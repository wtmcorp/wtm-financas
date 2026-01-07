"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface InteractiveLogoProps {
    size?: "sm" | "md" | "lg";
}

export default function InteractiveLogo({ size = "md" }: InteractiveLogoProps) {
    const router = useRouter();
    const [isHovering, setIsHovering] = useState(false);
    const [hoverDuration, setHoverDuration] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const controls = useAnimation();

    const sizes = {
        sm: { container: "w-10 h-10", icon: 20, particles: 3 },
        md: { container: "w-12 h-12", icon: 24, particles: 5 },
        lg: { container: "w-16 h-16", icon: 32, particles: 8 },
    };

    const currentSize = sizes[size];

    // Easter egg timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovering && !showEasterEgg) {
            interval = setInterval(() => {
                setHoverDuration((prev) => prev + 100);
            }, 100);
        } else {
            setHoverDuration(0);
        }
        return () => clearInterval(interval);
    }, [isHovering, showEasterEgg]);

    // Trigger Easter Egg
    useEffect(() => {
        if (hoverDuration >= 3000) {
            setShowEasterEgg(true);
            setHoverDuration(0);
            controls.start({
                rotate: [0, 360, 720],
                scale: [1, 1.3, 1],
                transition: { duration: 1.5, ease: "easeInOut" }
            }).then(() => setShowEasterEgg(false));
        }
    }, [hoverDuration, controls]);

    const handleClick = () => {
        router.push("/");
    };

    return (
        <motion.div
            className={`relative ${currentSize.container} cursor-pointer group`}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            onClick={handleClick}
            animate={controls}
        >
            {/* Outer Glow Ring */}
            <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60"
                variants={{
                    hover: {
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.6, 0.6],
                        transition: { duration: 0.8, repeat: Infinity }
                    }
                }}
            />

            {/* Particles */}
            {[...Array(currentSize.particles)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-violet-400 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    variants={{
                        hover: {
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [0, Math.cos((i * 360) / currentSize.particles * Math.PI / 180) * 30],
                            y: [0, Math.sin((i * 360) / currentSize.particles * Math.PI / 180) * 30],
                            transition: {
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1
                            }
                        }
                    }}
                />
            ))}

            {/* Main Container with 3D Transform */}
            <motion.div
                className="relative w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
                variants={{
                    hover: {
                        rotateY: 15,
                        rotateX: -10,
                        scale: 1.1,
                        transition: { duration: 0.4 }
                    },
                    tap: { scale: 0.9, transition: { duration: 0.1 } }
                }}
            >
                {/* Animated Background Pattern */}
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "10px 10px"
                    }}
                    variants={{
                        hover: {
                            backgroundPosition: ["0px 0px", "10px 10px"],
                            transition: { duration: 2, repeat: Infinity, ease: "linear" }
                        }
                    }}
                />

                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full"
                    variants={{
                        hover: {
                            translateX: "200%",
                            transition: { duration: 0.8, ease: "easeInOut" }
                        }
                    }}
                />

                {/* Inner Glow */}
                <motion.div
                    className="absolute inset-2 bg-white/10 rounded-lg"
                    variants={{
                        hover: {
                            opacity: [0.1, 0.3, 0.1],
                            transition: { duration: 1.5, repeat: Infinity }
                        }
                    }}
                />

                {/* Finance Icon */}
                <motion.div
                    className="relative z-10"
                    variants={{
                        hover: {
                            scale: 1.2,
                            rotate: [0, -10, 10, 0],
                            y: [0, -3, 0],
                            transition: {
                                rotate: { duration: 0.5 },
                                y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                            }
                        }
                    }}
                >
                    <TrendingUp className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" size={currentSize.icon} strokeWidth={3} />
                </motion.div>

                {/* Easter Egg Sparkles */}
                {showEasterEgg && (
                    <>
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={`sparkle-${i}`}
                                className="absolute"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                    x: Math.cos((i * 30) * Math.PI / 180) * 40,
                                    y: Math.sin((i * 30) * Math.PI / 180) * 40,
                                }}
                                transition={{
                                    duration: 1,
                                    ease: "easeOut"
                                }}
                            >
                                <Sparkles className="text-yellow-300" size={12} />
                            </motion.div>
                        ))}
                    </>
                )}
            </motion.div>

            {/* Pulsing Ring */}
            <motion.div
                className="absolute inset-0 border-2 border-violet-400 rounded-xl"
                variants={{
                    hover: {
                        scale: [1, 1.15, 1],
                        opacity: [0.5, 0, 0.5],
                        transition: { duration: 1.5, repeat: Infinity }
                    }
                }}
            />

            {/* Progress Ring for Easter Egg */}
            {isHovering && hoverDuration > 0 && hoverDuration < 3000 && (
                <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="rgba(168, 85, 247, 0.5)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${(hoverDuration / 3000) * 283} 283`}
                        className="transition-all duration-100"
                    />
                </svg>
            )}
        </motion.div>
    );
}
