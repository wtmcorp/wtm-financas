"use client";

import React, { useState } from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div
            className="relative inline-block w-full"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`absolute z-50 w-64 p-3 bg-black/95 border border-white/20 rounded-xl shadow-2xl pointer-events-none animate-in fade-in zoom-in duration-200 ${positionClasses[position]}`}>
                    <p className="text-xs text-gray-200 leading-relaxed">
                        {text}
                    </p>
                    <div className={`absolute w-2 h-2 bg-black border-r border-b border-white/20 rotate-45 ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' :
                        position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2' :
                            position === 'left' ? 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2' :
                                'right-full top-1/2 translate-x-1/2 -translate-y-1/2'
                        }`} />
                </div>
            )}
        </div>
    );
};
