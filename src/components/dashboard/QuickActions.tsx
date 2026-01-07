"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp, MousePointer2, Sparkles, FileText, FileSpreadsheet, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TransactionModal from '@/components/finance/TransactionModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinance } from '@/contexts/FinanceContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const QuickActions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showExportOptions, setShowExportOptions] = useState(false);
    const router = useRouter();
    const { transactions } = useFinance();

    const exportToCSV = () => {
        if (!transactions || transactions.length === 0) {
            alert("Nenhuma transação para exportar.");
            return;
        }

        const csvContent = "data:text/csv;charset=utf-8,"
            + "Data,Descrição,Valor,Categoria,Tipo\n"
            + transactions.map((t: any) => `${new Date(t.date).toLocaleDateString('pt-BR')},${t.description},${t.amount},${t.category},${t.type === 'income' ? 'Receita' : 'Despesa'}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `wtm_transacoes_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowExportOptions(false);
    };

    const exportToPDF = () => {
        if (!transactions || transactions.length === 0) {
            alert("Nenhuma transação para exportar.");
            return;
        }

        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.text("Relatório de Transações - WTM Corps", 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 30);

        // Prepare data
        const tableData = transactions.map((t: any) => [
            new Date(t.date).toLocaleDateString('pt-BR'),
            t.description,
            t.category,
            t.type === 'income' ? 'Receita' : 'Despesa',
            `R$ ${t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        ]);

        // Add table
        autoTable(doc, {
            startY: 40,
            head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
            body: tableData,
            headStyles: { fillColor: [124, 58, 237] }, // Primary color
            alternateRowStyles: { fillColor: [245, 245, 245] },
            margin: { top: 40 },
        });

        doc.save(`wtm_transacoes_${new Date().toISOString().split('T')[0]}.pdf`);
        setShowExportOptions(false);
    };

    const actions = [
        {
            icon: Plus,
            label: 'Nova Transação',
            desc: 'Adicionar',
            color: 'text-violet-400',
            bg: 'bg-violet-500/10',
            border: 'border-violet-500/20',
            onClick: () => setIsModalOpen(true),
        },
        {
            icon: Target,
            label: 'Metas',
            desc: 'Planejar',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            onClick: () => router.push('/goals'),
        },
        {
            icon: TrendingUp,
            label: 'Relatórios',
            desc: 'Analisar',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            onClick: () => router.push('/trends'),
        },
        {
            icon: Download,
            label: 'Exportar',
            desc: 'PDF / CSV',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            onClick: () => setShowExportOptions(true),
        },
    ];

    return (
        <>
            <motion.div
                whileHover={{ y: -4 }}
                className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group flex flex-col"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                        <MousePointer2 size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">Ações Rápidas</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {actions.map((action, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={action.onClick}
                            className="flex flex-col items-center justify-center p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all group/btn shadow-xl relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 ${action.bg} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500`} />
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${action.bg} ${action.border} border flex items-center justify-center ${action.color} mb-3 md:mb-4 group-hover/btn:scale-110 group-hover/btn:rotate-3 transition-all duration-500 relative z-10`}>
                                <action.icon size={20} className="md:w-6 md:h-6" />
                            </div>
                            <span className="text-xs md:text-sm font-black text-white uppercase tracking-wider text-center relative z-10">{action.label}</span>
                            <span className="text-[10px] md:text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest opacity-60 relative z-10">{action.desc}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                    <button
                        onClick={() => router.push('/tools')}
                        className="text-xs font-black text-gray-500 hover:text-violet-400 transition-colors flex items-center justify-center gap-2 w-full uppercase tracking-widest py-2"
                    >
                        <Sparkles size={14} />
                        Ver todas as ferramentas
                    </button>
                </div>
            </motion.div>

            {/* Export Options Modal */}
            <AnimatePresence>
                {showExportOptions && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowExportOptions(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass-panel rounded-[2.5rem] p-8 max-w-sm w-full relative z-10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Exportar Dados</h3>
                                <button onClick={() => setShowExportOptions(false)} className="text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={exportToPDF}
                                    className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20 group-hover:scale-110 transition-transform">
                                        <FileText size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-black text-white uppercase">Documento PDF</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ideal para impressão</p>
                                    </div>
                                </button>

                                <button
                                    onClick={exportToCSV}
                                    className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                                        <FileSpreadsheet size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-black text-white uppercase">Planilha CSV</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Excel / Google Sheets</p>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default QuickActions;
