import { useCountUp } from '@/hooks/useCountUp';
import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedNumber({
    value,
    decimals = 0,
    prefix = '',
    suffix = '',
    duration = 2000,
    className = '',
}: AnimatedNumberProps) {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const { formattedValue } = useCountUp({
        start: 0,
        end: shouldAnimate ? value : 0,
        duration,
        decimals,
        prefix,
        suffix,
    });

    useEffect(() => {
        // Delay animation slightly for better UX
        const timer = setTimeout(() => setShouldAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return <span className={className}>{formattedValue}</span>;
}
