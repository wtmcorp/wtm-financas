"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function TransactionFab() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 bg-primary text-black p-4 rounded-full shadow-lg shadow-primary/20 hover:scale-110 transition-transform z-40"
            >
                <Plus size={28} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="bg-card w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 border border-white/10"
                        >
                            <h2 className="text-xl font-bold text-primary mb-6">Nova Transação</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400">Valor</label>
                                    <input
                                        type="number"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-2xl text-white focus:border-primary outline-none"
                                        placeholder="R$ 0,00"
                                        autoFocus
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="justify-center">Receita</Button>
                                    <Button variant="primary" className="justify-center">Despesa</Button>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400">Categoria</label>
                                    <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none">
                                        <option>Alimentação</option>
                                        <option>Transporte</option>
                                        <option>Lazer</option>
                                        <option>Moradia</option>
                                    </select>
                                </div>

                                <Button
                                    className="w-full mt-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Salvar
                                </Button>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center text-sm text-gray-500 py-2"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
