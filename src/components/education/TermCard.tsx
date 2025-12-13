<<<<<<< HEAD
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ChevronDown, ChevronUp } from "lucide-react";
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
        <Card
            className="cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex justify-between items-center">
                <h3 className={`text-xl font-bold ${color}`}>{term}</h3>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-300 mt-2 text-sm leading-relaxed border-t border-white/10 pt-2">
                            {definition}
                        </p>
                        <div className="bg-black/40 p-3 rounded-lg mt-3 border border-white/5">
                            <span className="text-xs text-gray-500 uppercase font-bold">Exemplo Prático</span>
                            <p className="text-sm text-white mt-1">{example}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
=======
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ChevronDown, ChevronUp } from "lucide-react";
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
        <Card
            className="cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex justify-between items-center">
                <h3 className={`text-xl font-bold ${color}`}>{term}</h3>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-300 mt-2 text-sm leading-relaxed border-t border-white/10 pt-2">
                            {definition}
                        </p>
                        <div className="bg-black/40 p-3 rounded-lg mt-3 border border-white/5">
                            <span className="text-xs text-gray-500 uppercase font-bold">Exemplo Prático</span>
                            <p className="text-sm text-white mt-1">{example}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
