import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
    children: ReactNode;
    from?: string;
    via?: string;
    to?: string;
    animate?: boolean;
    className?: string;
}

export default function GradientText({
    children,
    from = 'from-violet-400',
    via = 'via-purple-400',
    to = 'to-indigo-400',
    animate = true,
    className = '',
}: GradientTextProps) {
    return (
        <motion.span
            className={`
                bg-gradient-to-r ${from} ${via} ${to}
                bg-clip-text text-transparent
                ${animate ? 'bg-[length:200%_auto] animate-gradient' : ''}
                ${className}
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.span>
    );
}
