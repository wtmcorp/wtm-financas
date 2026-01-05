"use client";

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Search, Trash2, Edit, TrendingUp, TrendingDown, List, Filter, AlertTriangle, X } from 'lucide-react';
import TransactionModal from './TransactionModal';
import { motion, AnimatePresence } from 'framer-motion';

interface TransactionListProps {
    limit?: number;
}

const TransactionList = ({ limit }: TransactionListProps) => {
    const { transactions, deleteTransaction } = useFinance();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
    const [editingTransaction, setEditingTransaction] = useState<any>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const filteredTransactions = transactions
        .filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || t.type === filterType;
            return matchesSearch && matchesType;
        })
        .slice(0, limit || 10);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction(id);
            setDeletingId(null);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const filterButtons = [
        { value: 'all' as const, label: 'Todas' },
        { value: 'income' as const, label: 'Receitas' },
        { value: 'expense' as const, label: 'Despesas' },
    ];

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-3 overflow-x-auto pb-4 sm:pb-0 custom-scrollbar scrollbar-hide">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setFilterType(btn.value)}
                            className={`px-4 py-2 md:px-6 md:py-2.5 rounded-2xl text-[11px] md:text-xs font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border ${filterType === btn.value
                                ? 'bg-primary text-black border-primary shadow-[0_10px_20px_rgba(124,58,237,0.2)]'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                <div className="relative group w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 md:py-2.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-primary/50 text-[11px] md:text-sm text-white placeholder-gray-600 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-3 md:space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {filteredTransactions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 md:py-24 bg-white/[0.02] rounded-[2rem] border border-white/5"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <List className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
                            </div>
                            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.2em]">Nenhuma transação</p>
                        </motion.div>
                    ) : (
                        filteredTransactions.map((transaction, idx) => (
                            <motion.div
                                key={transaction.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group flex items-center justify-between p-4 md:p-5 bg-white/[0.02] hover:bg-white/[0.05] rounded-[1.5rem] border border-white/5 hover:border-primary/20 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0 ${transaction.type === 'income'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500/20'
                                        : 'bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500/20'
                                        }`}>
                                        {transaction.type === 'income' ? (
                                            <TrendingUp size={20} className="md:w-6 md:h-6" />
                                        ) : (
                                            <TrendingDown size={20} className="md:w-6 md:h-6" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-white truncate text-xs md:text-base uppercase tracking-tight mb-1">
                                            {transaction.description}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[9px] md:text-[10px] px-2 py-1 bg-white/5 rounded-lg text-gray-400 font-black uppercase tracking-widest border border-white/5">
                                                {transaction.category}
                                            </span>
                                            <span className="text-[9px] md:text-[10px] text-gray-500 font-bold">
                                                {formatDate(transaction.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 mr-2 md:mr-4">
                                        <p className={`font-black text-xs md:text-lg ${transaction.type === 'income'
                                            ? 'text-emerald-400'
                                            : 'text-red-400'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 md:gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <button
                                        onClick={() => setEditingTransaction(transaction)}
                                        className="p-2 md:p-2.5 hover:bg-white/10 rounded-xl text-gray-500 hover:text-white transition-colors border border-transparent hover:border-white/10"
                                        aria-label="Editar"
                                    >
                                        <Edit size={14} className="md:w-4 md:h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDeletingId(transaction.id)}
                                        className="p-2 md:p-2.5 hover:bg-red-500/10 rounded-xl text-gray-500 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/10"
                                        aria-label="Remover"
                                    >
                                        <Trash2 size={14} className="md:w-4 md:h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deletingId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                        onClick={() => setDeletingId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-gray-900 to-black border border-red-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-6 border-2 border-red-500/20">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>

                            <h3 className="text-2xl font-black text-white text-center mb-3">
                                Remover Transação?
                            </h3>

                            <p className="text-gray-400 text-center mb-8 text-sm">
                                Esta ação não pode ser desfeita. A transação será permanentemente removida do seu histórico.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeletingId(null)}
                                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleDelete(deletingId)}
                                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold transition-all shadow-lg shadow-red-500/20 active:scale-95"
                                >
                                    Remover
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 right-8 z-[101] bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-500/20 flex items-center gap-3"
                    >
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="font-bold text-sm">Transação removida com sucesso!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            {editingTransaction && (
                <TransactionModal
                    isOpen={!!editingTransaction}
                    onClose={() => setEditingTransaction(null)}
                    transaction={editingTransaction}
                />
            )}
        </div>
    );
};

export default TransactionList;
