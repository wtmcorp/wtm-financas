import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
    width?: string;
    height?: string;
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

export default function LoadingSkeleton({
    width = 'w-full',
    height = 'h-4',
    className = '',
    variant = 'rectangular',
}: LoadingSkeletonProps) {
    const shapes = {
        text: 'rounded-lg',
        circular: 'rounded-full',
        rectangular: 'rounded-xl',
    };

    return (
        <motion.div
            className={`
                ${width} ${height}
                bg-gradient-to-r from-white/5 via-white/10 to-white/5
                ${shapes[variant]}
                ${className}
            `}
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
            }}
            style={{
                backgroundSize: '200% 100%',
            }}
        />
    );
}
