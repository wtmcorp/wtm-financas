"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    targetAlpha: number;
    color: string;
    life: number;
    maxLife: number;
}

const StarfieldBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let width = 0;
        let height = 0;
        let mouseX = -1000;
        let mouseY = -1000;

        // Colors: White, Silver, Primary Light (Violet), Indigo
        const colors = ["#FFFFFF", "#E2E8F0", "#A78BFA", "#818CF8"];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((width * height) / 15000); // Density

            for (let i = 0; i < numStars; i++) {
                stars.push(createStar());
            }
        };

        const createStar = (): Star => {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5, // 0.5 to 2.5
                vx: (Math.random() - 0.5) * 0.2, // Slow movement
                vy: (Math.random() - 0.5) * 0.2,
                alpha: Math.random(),
                targetAlpha: Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)],
                life: Math.random() * 100,
                maxLife: 100 + Math.random() * 100,
            };
        };

        const update = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw subtle gradient background
            // We rely on the CSS background for the base color, but we can add a subtle overlay here if needed.

            stars.forEach((star) => {
                // Movement
                star.x += star.vx;
                star.y += star.vy;

                // Mouse interaction (gentle repulsion)
                const dx = mouseX - star.x;
                const dy = mouseY - star.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 200;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    star.x -= (dx / dist) * force * 2;
                    star.y -= (dy / dist) * force * 2;
                }

                // Wrap around screen
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;

                // Twinkle effect
                if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
                    star.targetAlpha = Math.random();
                } else {
                    star.alpha += (star.targetAlpha - star.alpha) * 0.02;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.alpha * 0.8; // Max opacity 0.8
                ctx.fill();

                // Glow effect for larger stars
                if (star.size > 1.5) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = star.color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            // Reset global alpha
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(update);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        update();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
            style={{
                background: "radial-gradient(circle at center, #232342 0%, #0f0f18 100%)", // Matches new --background
            }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Ambient Glow Orbs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-violet-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"
            />
        </div>
    );
};

export default StarfieldBackground;
