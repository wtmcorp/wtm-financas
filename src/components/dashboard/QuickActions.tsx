"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp, Zap, ArrowRight, Sparkles, LayoutGrid, FileText } from 'lucide-react';
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
            desc: 'Nova Transação',
            gradient: 'from-[#6366f1] to-[#a855f7]',
            onClick: () => setIsModalOpen(true),
            tooltip: 'Adicione uma nova transação de entrada ou saída rapidamente.'
        },
        {
            icon: Target,
            label: 'Metas',
            desc: 'Planejamento',
            gradient: 'from-[#10b981] to-[#3b82f6]',
            onClick: () => router.push('/goals'),
            tooltip: 'Visualize e gerencie suas metas financeiras de curto e longo prazo.'
        },
        {
            icon: TrendingUp,
            label: 'Relatórios',
            desc: 'Performance',
            gradient: 'from-[#3b82f6] to-[#2dd4bf]',
            onClick: () => router.push('/trends'),
            tooltip: 'Acesse relatórios detalhados sobre seus gastos e evolução patrimonial.'
        },
        {
            icon: Download,
            label: 'Exportar',
            desc: 'Dados CSV',
            gradient: 'from-[#f59e0b] to-[#ef4444]',
            onClick: exportTransactions,
            tooltip: 'Baixe todas as suas transações em formato CSV para abrir no Excel.'
        },
    ];

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="relative group h-full"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                <div className="relative card-premium p-10 h-full flex flex-col border border-white/5 group-hover:border-primary/20 transition-all duration-500 overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />

                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Zap size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Quick Actions</h3>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Operational Control</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <LayoutGrid size={12} className="text-gray-500" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Grid</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 flex-1 relative z-10">
                        {actions.map((action, index) => (
                            <Tooltip key={index} text={action.tooltip}>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={action.onClick}
                                    className="w-full h-full group/btn relative overflow-hidden rounded-[2rem] transition-all duration-500"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500`}></div>
                                    <div className="relative h-full flex flex-col items-center justify-center p-6 gap-4 bg-white/[0.02] border border-white/5 group-hover/btn:border-primary/30 transition-all backdrop-blur-sm">
                                        <div className={`p-5 bg-gradient-to-br ${action.gradient} rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] group-hover/btn:shadow-primary/30 group-hover/btn:scale-110 group-hover/btn:rotate-3 transition-all duration-500`}>
                                            <action.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] block">{action.label}</span>
                                            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest block">{action.desc}</span>
                                        </div>

                                        <ArrowRight size={16} className="absolute bottom-4 right-4 text-primary opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-2 group-hover/btn:translate-x-0" />
                                    </div>
                                </motion.button>
                            </Tooltip>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center relative z-10">
                        <button className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-primary transition-colors uppercase tracking-widest group/all">
                            <Sparkles size={14} className="group-hover/all:animate-pulse" />
                            Ver Todas as Ferramentas
                        </button>
                    </div>
                </div>
            </motion.div>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default QuickActions;
