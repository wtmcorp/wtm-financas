"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp, MousePointer2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TransactionModal from '@/components/finance/TransactionModal';
import { motion } from 'framer-motion';

const QuickActions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const exportTransactions = () => {
        const saved = localStorage.getItem("wtm_transactions");
        if (!saved) {
            alert("Nenhuma transação para exportar.");
            return;
        }
        const transactions = JSON.parse(saved);
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Data,Descrição,Valor,Categoria,Tipo\n"
            + transactions.map((t: any) => `${t.date},${t.description},${t.amount},${t.category},${t.type}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `wtm_transacoes_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            desc: 'CSV',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            onClick: exportTransactions,
        },
    ];

    return (
        <>
            <motion.div
                whileHover={{ y: -4 }}
                className="glass-card p-6 rounded-3xl relative overflow-hidden group"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                        <MousePointer2 size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">Ações Rápidas</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {actions.map((action, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={action.onClick}
                            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group/btn"
                        >
                            <div className={`w-10 h-10 rounded-xl ${action.bg} ${action.border} border flex items-center justify-center ${action.color} mb-3 group-hover/btn:scale-110 transition-transform`}>
                                <action.icon size={20} />
                            </div>
                            <span className="text-xs font-semibold text-white">{action.label}</span>
                            <span className="text-[10px] text-gray-500 mt-0.5">{action.desc}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                    <button
                        onClick={() => router.push('/tools')}
                        className="text-xs font-medium text-gray-500 hover:text-violet-400 transition-colors flex items-center justify-center gap-2 w-full"
                    >
                        <Sparkles size={14} />
                        Ver todas as ferramentas
                    </button>
                </div>
            </motion.div>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default QuickActions;
