"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransactionModal from "@/components/finance/TransactionModal";

export default function TransactionFab() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 w-16 h-16 bg-primary text-black rounded-full shadow-[0_15px_30px_rgba(167,139,250,0.4)] hover:shadow-[0_20px_40px_rgba(167,139,250,0.6)] flex items-center justify-center z-40 transition-all border-2 border-white/20"
            >
                <Plus size={32} strokeWidth={3} />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity" />
            </motion.button>

            <TransactionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
