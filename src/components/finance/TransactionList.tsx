"use client";

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Search, Trash2, Edit, TrendingUp, TrendingDown, List, Filter } from 'lucide-react';
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

    const filterButtons = [
        { value: 'all' as const, label: 'Todas' },
        { value: 'income' as const, label: 'Receitas' },
        { value: 'expense' as const, label: 'Despesas' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-2">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setFilterType(btn.value)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filterType === btn.value
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                <div className="relative group max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar transações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-violet-500/50 text-sm text-white placeholder-gray-600 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {filteredTransactions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/5"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <List className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Nenhuma transação encontrada</p>
                        </motion.div>
                    ) : (
                        filteredTransactions.map((transaction, idx) => (
                            <motion.div
                                key={transaction.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 hover:border-white/10 transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${transaction.type === 'income'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                        : 'bg-red-500/10 border-red-500/20 text-red-500'
                                        }`}>
                                        {transaction.type === 'income' ? (
                                            <TrendingUp size={18} />
                                        ) : (
                                            <TrendingDown size={18} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-white truncate text-sm">
                                            {transaction.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-gray-400 font-medium uppercase tracking-wider">
                                                {transaction.category}
                                            </span>
                                            <span className="text-[10px] text-gray-600 font-medium">
                                                {formatDate(transaction.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold text-sm ${transaction.type === 'income'
                                            ? 'text-emerald-400'
                                            : 'text-red-400'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setEditingTransaction(transaction)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Deseja realmente excluir esta transação?')) {
                                                deleteTransaction(transaction.id);
                                            }
                                        }}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

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
