"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TransactionModal from '@/components/finance/TransactionModal';
import { Tooltip } from '@/components/ui/Tooltip';

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
            gradient: 'from-indigo-500 to-purple-600',
            onClick: () => setIsModalOpen(true),
            tooltip: 'Adicione uma nova transação de entrada ou saída rapidamente.'
        },
        {
            icon: Target,
            label: 'Metas',
            gradient: 'from-emerald-500 to-green-600',
            onClick: () => router.push('/goals'),
            tooltip: 'Visualize e gerencie suas metas financeiras de curto e longo prazo.'
        },
        {
            icon: TrendingUp,
            label: 'Relatórios',
            gradient: 'from-blue-500 to-cyan-600',
            onClick: () => router.push('/trends'),
            tooltip: 'Acesse relatórios detalhados sobre seus gastos e evolução patrimonial.'
        },
        {
            icon: Download,
            label: 'Exportar',
            gradient: 'from-orange-500 to-amber-600',
            onClick: exportTransactions,
            tooltip: 'Baixe todas as suas transações em formato CSV para abrir no Excel.'
        },
    ];

    return (
        <>
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative card-premium p-6 rounded-2xl h-auto md:h-[400px] flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-4 bg-indigo-400 rounded-full" />
                        <Zap className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Ações Rápidas</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 flex-1">
                        {actions.map((action, index) => (
                            <Tooltip key={index} text={action.tooltip}>
                                <button
                                    onClick={action.onClick}
                                    className="w-full h-full group/btn relative overflow-hidden rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-5 group-hover/btn:opacity-10 transition-opacity`}></div>
                                    <div className="relative glass h-full flex flex-col items-center justify-center p-4 gap-3 border border-white/5 group-hover/btn:border-white/10 transition-all">
                                        <div className={`p-3 bg-gradient-to-br ${action.gradient} rounded-xl shadow-lg group-hover/btn:scale-110 transition-transform duration-300`}>
                                            <action.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-300 group-hover/btn:text-white transition-colors uppercase tracking-widest">{action.label}</span>
                                    </div>
                                </button>
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
