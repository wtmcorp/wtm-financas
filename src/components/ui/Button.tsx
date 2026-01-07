"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    loading?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "font-black uppercase tracking-wider transition-all duration-300 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
        primary: "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40",
        secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40",
        ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
    };

    const sizeStyles = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    };

    const motionProps: HTMLMotionProps<"button"> = {
        whileHover: { scale: disabled || loading ? 1 : 1.02 },
        whileTap: { scale: disabled || loading ? 1 : 0.98 },
        className: `
            ${baseStyles}
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${fullWidth ? "w-full" : ""}
            ${className}
        `,
        disabled: disabled || loading,
        ...props as any
    };

    return (
        <motion.button {...motionProps}>
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Carregando...</span>
                </>
            ) : (
                children
            )}
        </motion.button>
    );
}
