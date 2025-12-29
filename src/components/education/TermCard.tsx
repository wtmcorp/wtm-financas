"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TermCardProps {
    term: string;
    definition: string;
    example: string;
    color?: string;
}

export default function TermCard({ term, definition, example, color = "text-primary" }: TermCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            className={`
                group cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden
                ${isOpen
                    ? "bg-gradient-to-br from-[#1a1a2e] to-[#0f0f13] border-primary/30 shadow-2xl"
                    : "bg-[#0f0f13] border-white/5 hover:border-white/20 hover:bg-white/5"
                }
            `}
        >
            <div className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${isOpen ? "bg-primary/20 border-primary/30 text-primary" : "bg-white/5 border-white/5 text-gray-500"
                        }`}>
                        <Info size={20} />
                    </div>
                    <h3 className={`text-lg font-black tracking-tight transition-colors ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {term}
                    </h3>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-primary text-white rotate-180" : "bg-white/5 text-gray-500"
                    }`}>
                    <ChevronDown size={18} />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="px-6 pb-6 space-y-4">
                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                {definition}
                            </p>

                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-black/40 p-5 rounded-2xl border border-white/5 relative overflow-hidden group/example"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12" />
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb size={14} className="text-primary" />
                                    <span className="text-[10px] text-primary uppercase font-black tracking-[0.2em]">Exemplo Prático</span>
                                </div>
                                <p className="text-sm text-white font-medium relative z-10">{example}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
