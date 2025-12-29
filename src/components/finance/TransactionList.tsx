"use client";

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Search, Trash2, Edit, TrendingUp, TrendingDown, Filter, List, ArrowRight } from 'lucide-react';
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
        { value: 'all' as const, label: 'Todas', gradient: 'from-[#6366f1] to-[#a855f7]' },
        { value: 'income' as const, label: 'Receitas', gradient: 'from-[#10b981] to-[#3b82f6]' },
        { value: 'expense' as const, label: 'Despesas', gradient: 'from-[#ef4444] to-[#f59e0b]' },
    ];

    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative card-premium p-8 rounded-[2rem] border border-white/5 group-hover:border-white/10 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <List className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">
                            Transações
                        </h3>
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        {filterButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setFilterType(btn.value)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${filterType === btn.value
                                    ? `bg-gradient-to-r ${btn.gradient} text-white border-transparent shadow-lg shadow-indigo-500/20`
                                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-8 group/search">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-md opacity-0 group-focus-within/search:opacity-100 transition-opacity" />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/search:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar transações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="relative w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-white placeholder-gray-600 transition-all text-sm outline-none"
                    />
                </div>

                {/* Transaction List */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {filteredTransactions.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-20 bg-white/[0.02] rounded-[2rem] border border-white/5"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                                    <List className="w-10 h-10 text-gray-700" />
                                </div>
                                <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">Nenhuma transação encontrada</p>
                            </motion.div>
                        ) : (
                            filteredTransactions.map((transaction, idx) => (
                                <motion.div
                                    key={transaction.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group/item flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl transition-all border border-white/5 hover:border-white/20"
                                >
                                    <div className="flex items-center gap-5 flex-1">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${transaction.type === 'income'
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover/item:bg-emerald-500/20'
                                            : 'bg-red-500/10 border-red-500/20 text-red-400 group-hover/item:bg-red-500/20'
                                            }`}>
                                            {transaction.type === 'income' ? (
                                                <TrendingUp size={20} />
                                            ) : (
                                                <TrendingDown size={20} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-white truncate text-base tracking-tight">
                                                {transaction.description}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded-md text-gray-500 font-black uppercase tracking-widest border border-white/5">
                                                    {transaction.category}
                                                </span>
                                                <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">
                                                    {formatDate(transaction.date)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className={`font-black text-xl tracking-tighter ${transaction.type === 'income'
                                                ? 'text-emerald-400'
                                                : 'text-red-400'
                                                }`}>
                                                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 ml-6 opacity-0 group-hover/item:opacity-100 transition-all translate-x-4 group-hover/item:translate-x-0">
                                        <button
                                            onClick={() => setEditingTransaction(transaction)}
                                            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group/edit border border-white/5"
                                            title="Editar"
                                        >
                                            <Edit className="w-4 h-4 text-gray-500 group-hover/edit:text-white" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Deseja realmente excluir esta transação?')) {
                                                    deleteTransaction(transaction.id);
                                                }
                                            }}
                                            className="p-2.5 bg-white/5 hover:bg-red-500/10 rounded-xl transition-all group/delete border border-white/5"
                                            title="Excluir"
                                        >
                                            <Trash2 className="w-4 h-4 text-gray-500 group-hover/delete:text-red-400" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
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
