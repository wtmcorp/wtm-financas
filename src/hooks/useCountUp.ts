import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
}

export function useCountUp({
    start = 0,
    end,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
}: UseCountUpOptions) {
    const [count, setCount] = useState(start);
    const countRef = useRef(start);
    const rafRef = useRef<number>();

    useEffect(() => {
        const startTime = Date.now();
        const startValue = countRef.current;
        const difference = end - startValue;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentCount = startValue + (difference * easeProgress);
            countRef.current = currentCount;
            setCount(currentCount);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [end, duration]);

    const formattedValue = `${prefix}${count.toFixed(decimals)}${suffix}`;

    return { count, formattedValue };
}
