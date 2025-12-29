"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp, Zap, ArrowRight } from 'lucide-react';
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
            label: 'Adicionar',
            gradient: 'from-[#6366f1] to-[#a855f7]',
            onClick: () => setIsModalOpen(true),
            tooltip: 'Adicione uma nova transação de entrada ou saída rapidamente.'
        },
        {
            icon: Target,
            label: 'Metas',
            gradient: 'from-[#10b981] to-[#3b82f6]',
            onClick: () => router.push('/goals'),
            tooltip: 'Visualize e gerencie suas metas financeiras de curto e longo prazo.'
        },
        {
            icon: TrendingUp,
            label: 'Relatórios',
            gradient: 'from-[#3b82f6] to-[#2dd4bf]',
            onClick: () => router.push('/trends'),
            tooltip: 'Acesse relatórios detalhados sobre seus gastos e evolução patrimonial.'
        },
        {
            icon: Download,
            label: 'Exportar',
            gradient: 'from-[#f59e0b] to-[#ef4444]',
            onClick: exportTransactions,
            tooltip: 'Baixe todas as suas transações em formato CSV para abrir no Excel.'
        },
    ];

    return (
        <>
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative card-premium p-8 rounded-[2rem] h-auto md:h-[420px] flex flex-col border border-white/5 group-hover:border-white/10 transition-all">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight uppercase">Ações Rápidas</h3>
                        </div>
                        <div className="h-1 w-12 bg-white/5 rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {actions.map((action, index) => (
                            <Tooltip key={index} text={action.tooltip}>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={action.onClick}
                                    className="w-full h-full group/btn relative overflow-hidden rounded-2xl transition-all"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500`}></div>
                                    <div className="relative h-full flex flex-col items-center justify-center p-5 gap-4 bg-white/[0.02] border border-white/5 group-hover/btn:border-white/20 transition-all backdrop-blur-sm">
                                        <div className={`p-4 bg-gradient-to-br ${action.gradient} rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover/btn:shadow-primary/20 group-hover/btn:scale-110 transition-all duration-500`}>
                                            <action.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <span className="text-[10px] font-black text-gray-400 group-hover/btn:text-white transition-colors uppercase tracking-[0.2em]">{action.label}</span>
                                        </div>

                                        <ArrowRight size={14} className="absolute bottom-4 right-4 text-white/0 group-hover/btn:text-white/40 transition-all -translate-x-2 group-hover/btn:translate-x-0" />
                                    </div>
                                </motion.button>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default QuickActions;
