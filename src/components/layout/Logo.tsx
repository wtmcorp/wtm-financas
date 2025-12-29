"use client";

import Image from "next/image";

interface LogoProps {
    className?: string;
    size?: number;
}

export default function Logo({
    className = "",
    size = 180,
}: LogoProps) {
    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            {/* Premium Custom SVG Logo */}
            <div
                className="relative flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-[360deg]"
                style={{ width: size * 0.2, height: size * 0.2 }}
            >
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] relative z-10"
                >
                    <defs>
                        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A855F7" />
                            <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="100%" stopColor="#94A3B8" />
                        </linearGradient>
                    </defs>
                    {/* Shield */}
                    <path
                        d="M50 5L15 20V45C15 70 50 95 50 95C50 95 85 70 85 45V20L50 5Z"
                        fill="url(#shieldGradient)"
                        fillOpacity="0.15"
                        stroke="url(#shieldGradient)"
                        strokeWidth="4"
                        strokeLinejoin="round"
                        className="group-hover:fill-primary/20 transition-all duration-700"
                    />
                    {/* Stylized W / Growth Arrow */}
                    <path
                        d="M25 65L40 40L55 60L75 30M75 30H60M75 30V45"
                        stroke="url(#arrowGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-white transition-all duration-700"
                    />
                    {/* Glow Point */}
                    <circle cx="75" cy="30" r="4" fill="#FFFFFF" className="animate-pulse" />
                </svg>
            </div>

            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-primary transition-all duration-500 flex items-center">
                Wtm<span className="text-primary/80 group-hover:translate-x-1 transition-transform">Corps</span>
            </span>
        </div>
    );
}
