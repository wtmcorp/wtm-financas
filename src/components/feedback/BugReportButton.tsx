"use client";

import { Bug, X, Send } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function BugReportButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        page: "",
        email: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Salvar no localStorage (pode ser integrado com backend depois)
        const bugReport = {
            ...formData,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        const existingReports = JSON.parse(localStorage.getItem("wtm_bug_reports") || "[]");
        existingReports.push(bugReport);
        localStorage.setItem("wtm_bug_reports", JSON.stringify(existingReports));



        setSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            setSubmitted(false);
            setFormData({ description: "", page: "", email: "" });
        }, 2000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-56 right-6 bg-red-500/90 hover:bg-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-red-500/50 hover:scale-110 transition-all z-40 group"
                title="Reportar um Bug"
            >
                <Bug size={20} className="group-hover:animate-bounce" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md"
                        >
                            <Card className="bg-gradient-to-b from-card to-black border-red-500/30">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <Bug className="text-red-500" size={20} />
                                        <h2 className="text-lg font-bold text-white">Reportar Bug</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {submitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="text-green-500" size={32} />
                                        </div>
                                        <p className="text-white font-bold mb-2">Obrigado!</p>
                                        <p className="text-gray-400 text-sm">Seu relatório foi enviado com sucesso.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-2">
                                                Descrição do Bug *
                                            </label>
                                            <textarea
                                                required
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors resize-none"
                                                rows={4}
                                                placeholder="Descreva o problema que você encontrou..."
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-400 block mb-2">
                                                Página/Seção
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.page}
                                                onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                                placeholder="Ex: Página de Investimentos"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-400 block mb-2">
                                                Seu Email (opcional)
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                                placeholder="seu@email.com"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
                                        >
                                            <Send size={18} className="mr-2" />
                                            Enviar Relatório
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
