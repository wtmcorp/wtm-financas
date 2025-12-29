"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
        left: 'right-full top-1/2 -translate-y-1/2 mr-3',
        right: 'left-full top-1/2 -translate-y-1/2 ml-3',
    };

    return (
        <div
            className="relative inline-block w-full"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0, x: position === 'left' ? 10 : position === 'right' ? -10 : "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: position === 'left' || position === 'right' ? 0 : "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute z-[100] w-64 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none ${positionClasses[position]}`}
                    >
                        <p className="text-[11px] font-bold text-gray-300 leading-relaxed text-center">
                            {text}
                        </p>
                        <div className={`absolute w-2 h-2 bg-white/10 backdrop-blur-xl border-r border-b border-white/10 rotate-45 ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' :
                            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2' :
                                position === 'left' ? 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2' :
                                    'right-full top-1/2 translate-x-1/2 -translate-y-1/2'
                            }`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
