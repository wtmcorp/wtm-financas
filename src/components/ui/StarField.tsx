"use client";

import { useEffect, useState } from "react";

export default function StarField() {
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string; delay: string }[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            duration: `${Math.random() * 3 + 2}s`,
            delay: `${Math.random() * 5}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="stars-container">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star animate-twinkle"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        // @ts-ignore
                        "--duration": star.duration,
                        "--delay": star.delay,
                    }}
                />
            ))}
        </div>
    );
}
