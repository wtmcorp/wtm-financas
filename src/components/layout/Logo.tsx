"use client";

import Image from "next/image";

interface LogoProps {
    className?: string;
    size?: number;
}

export default function Logo({
    className = "",
    size = 160,
}: LogoProps) {
    return (
        <div className={`flex items-center group ${className}`}>
            <div
                className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{ width: size, height: size / 4 }}
            >
                <Image
                    src="/logo.png"
                    alt="Wtm Corps Logo"
                    width={size}
                    height={size / 4}
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
