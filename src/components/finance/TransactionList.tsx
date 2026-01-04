"use client";

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Search, Trash2, Edit, TrendingUp, TrendingDown, List, ArrowUpRight, Filter } from 'lucide-react';
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
        { value: 'all' as const, label: 'TODAS' },
        { value: 'income' as const, label: 'RECEITAS' },
        { value: 'expense' as const, label: 'DESPESAS' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setFilterType(btn.value)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${filterType === btn.value
                                ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(167,139,250,0.3)]'
                                : 'bg-white/5 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                <div className="relative group/search max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within/search:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="BUSCAR TRANSAÇÕES..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-primary/50 text-[10px] font-black tracking-widest text-white placeholder-gray-700 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filteredTransactions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-24 bg-white/[0.02] rounded-[2.5rem] border border-white/5"
                        >
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                                <List className="w-10 h-10 text-gray-800" />
                            </div>
                            <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[10px]">Nenhuma transação processada</p>
                        </motion.div>
                    ) : (
                        filteredTransactions.map((transaction, idx) => (
                            <motion.div
                                key={transaction.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05, duration: 0.5, cubicBezier: [0.23, 1, 0.32, 1] }}
                                className="group/item flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.05] rounded-[2rem] transition-all border border-white/5 hover:border-white/20"
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${transaction.type === 'income'
                                        ? 'bg-green-500/5 border-green-500/10 text-green-500 group-hover/item:bg-green-500/10'
                                        : 'bg-red-500/5 border-red-500/10 text-red-500 group-hover/item:bg-red-500/10'
                                        }`}>
                                        {transaction.type === 'income' ? (
                                            <TrendingUp size={24} />
                                        ) : (
                                            <TrendingDown size={24} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-white truncate text-lg tracking-tighter uppercase">
                                            {transaction.description}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1.5">
                                            <span className="text-[9px] px-2.5 py-1 bg-white/5 rounded-lg text-gray-500 font-black uppercase tracking-widest border border-white/5">
                                                {transaction.category}
                                            </span>
                                            <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest">
                                                {formatDate(transaction.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-6">
                                        <p className={`font-black text-2xl tracking-tighter ${transaction.type === 'income'
                                            ? 'text-green-400'
                                            : 'text-red-400'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-8 opacity-0 group-hover/item:opacity-100 transition-all translate-x-4 group-hover/item:translate-x-0">
                                    <button
                                        onClick={() => setEditingTransaction(transaction)}
                                        className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl transition-all group/edit border border-white/10"
                                    >
                                        <Edit className="w-4 h-4 text-gray-600 group-hover/edit:text-white" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Deseja realmente excluir esta transação?')) {
                                                deleteTransaction(transaction.id);
                                            }
                                        }}
                                        className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-500/10 rounded-xl transition-all group/delete border border-white/10"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-600 group-hover/delete:text-red-400" />
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
