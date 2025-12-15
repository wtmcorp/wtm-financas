"use client";

import React, { useState } from 'react';
import { Plus, Download, Target, TrendingUp } from 'lucide-react';
import TransactionModal from '@/components/finance/TransactionModal';

const QuickActions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-col items-center justify-center p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="p-2 bg-white/20 rounded-lg mb-2">
                            <Plus className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">Adicionar</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all hover:scale-105 active:scale-95">
                        <div className="p-2 bg-white/20 rounded-lg mb-2">
                            <Target className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">Metas</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all hover:scale-105 active:scale-95">
                        <div className="p-2 bg-white/20 rounded-lg mb-2">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">Relatórios</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all hover:scale-105 active:scale-95">
                        <div className="p-2 bg-white/20 rounded-lg mb-2">
                            <Download className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">Exportar</span>
                    </button>
                </div>
            </div>

            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default QuickActions;
