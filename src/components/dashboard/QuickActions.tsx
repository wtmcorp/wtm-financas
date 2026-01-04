"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp, Zap, ArrowUpRight, Sparkles, LayoutGrid, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TransactionModal from '@/components/finance/TransactionModal';
import { Tooltip } from '@/components/ui/Tooltip';
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
            label: 'ADICIONAR',
            desc: 'NOVA TRANSAÇÃO',
            color: 'text-primary',
            bg: 'bg-primary/10',
            onClick: () => setIsModalOpen(true),
            tooltip: 'Adicione uma nova transação rapidamente.'
        },
        {
            icon: Target,
            label: 'METAS',
            desc: 'PLANEJAMENTO',
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            onClick: () => router.push('/goals'),
            tooltip: 'Gerencie suas metas financeiras.'
        },
        {
            icon: TrendingUp,
            label: 'RELATÓRIOS',
            desc: 'PERFORMANCE',
            color: 'text-green-400',
            bg: 'bg-green-400/10',
            onClick: () => router.push('/trends'),
            tooltip: 'Acesse relatórios detalhados.'
        },
        {
            icon: Download,
            label: 'EXPORTAR',
            desc: 'DADOS CSV',
            color: 'text-orange-400',
            bg: 'bg-orange-400/10',
            onClick: exportTransactions,
            tooltip: 'Baixe suas transações em CSV.'
        },
    ];

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="card-premium p-10 h-full flex flex-col relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />

                <div className="flex items-center justify-between mb-12 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 transition-all duration-500">
                            <Zap size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tight uppercase">Ações Rápidas</h3>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">CONTROLE OPERACIONAL</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1 relative z-10">
                    {actions.map((action, index) => (
                        <Tooltip key={index} text={action.tooltip}>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={action.onClick}
                                className="w-full group/btn relative overflow-hidden rounded-2xl p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col items-center justify-center gap-4"
                            >
                                <div className={`w-12 h-12 rounded-xl ${action.bg} ${action.color} flex items-center justify-center border border-current/10 group-hover/btn:scale-110 transition-transform duration-500`}>
                                    <action.icon size={24} />
                                </div>
                                <div className="text-center">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest block">{action.label}</span>
                                    <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest block mt-1">{action.desc}</span>
                                </div>
                            </motion.button>
                        </Tooltip>
                    ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center relative z-10">
                    <button className="flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-primary transition-colors uppercase tracking-[0.2em] group/all">
                        <Sparkles size={14} className="group-hover/all:animate-pulse" />
                        TODAS AS FERRAMENTAS
                    </button>
                </div>
            </motion.div>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default QuickActions;
