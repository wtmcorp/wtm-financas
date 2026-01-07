"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    gradient?: boolean;
}

export function Card({
    children,
    className = "",
    hover = true,
    glow = false,
    gradient = false
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={`
                glass-panel 
                relative 
                overflow-hidden 
                group
                ${glow ? 'shadow-2xl shadow-primary/10' : ''}
                ${gradient ? 'bg-gradient-to-br from-white/5 to-white/[0.02]' : ''}
                ${className}
            `}
        >
            {/* Background Effects */}
            {glow && (
                <>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-1000" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] -ml-24 -mb-24 group-hover:bg-blue-500/10 transition-all duration-700" />
                </>
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    title?: string;
    subtitle?: string;
}

export function CardHeader({
    children,
    className = "",
    icon,
    title,
    subtitle
}: CardHeaderProps) {
    if (title || subtitle || icon) {
        return (
            <div className={`flex items-center gap-3 md:gap-4 mb-6 ${className}`}>
                {icon && (
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {icon}
                    </div>
                )}
                <div>
                    {title && (
                        <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-[10px] md:text-xs text-gray-500 font-black uppercase tracking-[0.2em] mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`mb-6 ${className}`}>
            {children}
        </div>
    );
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
    divider?: boolean;
}

export function CardFooter({ children, className = "", divider = true }: CardFooterProps) {
    return (
        <div className={`
            ${divider ? 'pt-6 border-t border-white/5' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
}
