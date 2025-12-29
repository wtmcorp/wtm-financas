"use client";

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Search, Trash2, Edit, TrendingUp, TrendingDown, Filter, List } from 'lucide-react';
import TransactionModal from './TransactionModal';

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
        { value: 'all' as const, label: 'Todas', gradient: 'from-indigo-500 to-purple-600' },
        { value: 'income' as const, label: 'Receitas', gradient: 'from-emerald-500 to-green-600' },
        { value: 'expense' as const, label: 'Despesas', gradient: 'from-red-500 to-orange-600' },
    ];

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative card-premium p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 bg-indigo-400 rounded-full" />
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                            <List className="w-5 h-5 text-indigo-400" />
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
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar transações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-white placeholder-gray-500 transition-all text-sm"
                    />
                </div>

                {/* Transaction List */}
                <div className="space-y-3 max-h-[400px] md:max-h-none overflow-y-auto pr-1 md:pr-0 scrollbar-thin">
                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-16 glass rounded-2xl border border-white/5">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                                <List className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Nenhuma transação encontrada</p>
                            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-tighter">
                                Adicione sua primeira transação para começar
                            </p>
                        </div>
                    ) : (
                        filteredTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="group/item flex items-center justify-between p-4 glass hover:bg-white/5 rounded-xl transition-all border border-white/5 hover:border-white/10"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`p-3 rounded-xl border ${transaction.type === 'income'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}>
                                        {transaction.type === 'income' ? (
                                            <TrendingUp className="w-5 h-5" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white truncate text-sm sm:text-base">
                                            {transaction.description}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded-full text-gray-400 font-black uppercase tracking-widest border border-white/5">
                                                {transaction.category}
                                            </span>
                                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
                                                {formatDate(transaction.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-2">
                                        <p className={`font-black text-base sm:text-xl tracking-tighter ${transaction.type === 'income'
                                            ? 'text-emerald-400'
                                            : 'text-red-400'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 ml-4 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setEditingTransaction(transaction)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors group/edit"
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
                                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group/delete"
                                        title="Excluir"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-500 group-hover/delete:text-red-400" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
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
