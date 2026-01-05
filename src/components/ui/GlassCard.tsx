import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
    children: ReactNode;
    variant?: 'default' | 'violet' | 'blue' | 'emerald' | 'orange' | 'pink';
    intensity?: 'light' | 'medium' | 'strong';
    hover?: boolean;
}

const variants = {
    default: 'from-white/[0.03] to-white/[0.01]',
    violet: 'from-violet-500/10 to-purple-500/5',
    blue: 'from-blue-500/10 to-cyan-500/5',
    emerald: 'from-emerald-500/10 to-green-500/5',
    orange: 'from-orange-500/10 to-red-500/5',
    pink: 'from-pink-500/10 to-rose-500/5',
};

const borders = {
    default: 'border-white/10',
    violet: 'border-violet-500/20',
    blue: 'border-blue-500/20',
    emerald: 'border-emerald-500/20',
    orange: 'border-orange-500/20',
    pink: 'border-pink-500/20',
};

export default function GlassCard({
    children,
    variant = 'default',
    intensity = 'medium',
    hover = true,
    className = '',
    ...props
}: GlassCardProps) {
    const backdropBlur = {
        light: 'backdrop-blur-sm',
        medium: 'backdrop-blur-md',
        strong: 'backdrop-blur-xl',
    };

    return (
        <motion.div
            className={`
                relative overflow-hidden rounded-3xl border
                bg-gradient-to-br ${variants[variant]} ${borders[variant]}
                ${backdropBlur[intensity]}
                ${hover ? 'hover:border-white/20 hover:shadow-2xl' : ''}
                transition-all duration-300
                ${className}
            `}
            whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
            {...props}
        >
            {/* Shine effect */}
            {hover && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}

            {children}
        </motion.div>
    );
}
