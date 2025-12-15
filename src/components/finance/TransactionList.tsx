"use client";

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Search, Trash2, Edit, TrendingUp, TrendingDown, Filter, List } from 'lucide-react';
import TransactionModal from './TransactionModal';

const TransactionList = () => {
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
        .slice(0, 10);

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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative card-premium p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <List className="w-5 h-5 text-indigo-400" />
                        Transações Recentes
                    </h3>
                    <div className="flex gap-2">
                        {filterButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setFilterType(btn.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === btn.value
                                        ? `bg-gradient-to-r ${btn.gradient} text-white shadow-lg`
                                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                                    }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar transações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                    />
                </div>

                {/* Transaction List */}
                <div className="space-y-3">
                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <List className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 font-medium">Nenhuma transação encontrada</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Adicione sua primeira transação para começar
                            </p>
                        </div>
                    ) : (
                        filteredTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="group/item flex items-center justify-between p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all border border-gray-700/30 hover:border-gray-600/50"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`p-3 rounded-xl ${transaction.type === 'income'
                                            ? 'bg-gradient-to-br from-emerald-500/20 to-green-600/20'
                                            : 'bg-gradient-to-br from-red-500/20 to-orange-600/20'
                                        }`}>
                                        {transaction.type === 'income' ? (
                                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5 text-red-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">
                                            {transaction.description}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs px-2.5 py-1 bg-gray-700/50 rounded-full text-gray-300 font-medium">
                                                {transaction.category}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(transaction.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold text-xl ${transaction.type === 'income'
                                                ? 'text-emerald-400'
                                                : 'text-red-400'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setEditingTransaction(transaction)}
                                        className="p-2.5 hover:bg-blue-500/20 rounded-lg transition-colors group/edit"
                                        title="Editar"
                                    >
                                        <Edit className="w-4 h-4 text-gray-400 group-hover/edit:text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Deseja realmente excluir esta transação?')) {
                                                deleteTransaction(transaction.id);
                                            }
                                        }}
                                        className="p-2.5 hover:bg-red-500/20 rounded-lg transition-colors group/delete"
                                        title="Excluir"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-400" />
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
