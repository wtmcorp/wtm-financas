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
        <div className={`flex items-center group ${className}`}>
            <div
                className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{ width: size, height: size / 3 }}
            >
                <Image
                    src="/logo.png"
                    alt="Wtm Corps Logo"
                    width={size}
                    height={size / 3}
                    className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    priority
                />
            </div>
        </div>
    );
}
