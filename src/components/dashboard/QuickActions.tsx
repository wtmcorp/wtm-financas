"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp, Zap } from 'lucide-react';
import TransactionModal from '@/components/finance/TransactionModal';

const QuickActions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const actions = [
        { icon: Plus, label: 'Adicionar', gradient: 'from-indigo-500 to-purple-600', onClick: () => setIsModalOpen(true) },
        { icon: Target, label: 'Metas', gradient: 'from-emerald-500 to-green-600', onClick: () => { } },
        { icon: TrendingUp, label: 'Relatórios', gradient: 'from-blue-500 to-cyan-600', onClick: () => { } },
        { icon: Download, label: 'Exportar', gradient: 'from-orange-500 to-amber-600', onClick: () => { } },
    ];

    return (
        <>
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative card-premium p-6 rounded-2xl h-[400px] flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-semibold text-white">Ações Rápidas</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 flex-1">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className="group/btn relative overflow-hidden rounded-xl transition-all hover:scale-105 active:scale-95"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-10 group-hover/btn:opacity-20 transition-opacity`}></div>
                                <div className="relative card-premium h-full flex flex-col items-center justify-center p-4 gap-3">
                                    <div className={`p-3 bg-gradient-to-br ${action.gradient} rounded-xl shadow-lg`}>
                                        <action.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-white">{action.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default QuickActions;
