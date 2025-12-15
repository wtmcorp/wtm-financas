"use client";

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { Search, Trash2, Edit, TrendingUp, TrendingDown, Filter } from 'lucide-react';
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

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transações Recentes</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType('all')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === 'all'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setFilterType('income')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === 'income'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Receitas
                    </button>
                    <button
                        onClick={() => setFilterType('expense')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === 'expense'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Despesas
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar transações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
            </div>

            {/* Transaction List */}
            <div className="space-y-2">
                {filteredTransactions.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">Nenhuma transação encontrada</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            Adicione sua primeira transação para começar
                        </p>
                    </div>
                ) : (
                    filteredTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`p-2.5 rounded-lg ${transaction.type === 'income'
                                        ? 'bg-green-100 dark:bg-green-900/30'
                                        : 'bg-red-100 dark:bg-red-900/30'
                                    }`}>
                                    {transaction.type === 'income' ? (
                                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {transaction.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300">
                                            {transaction.category}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDate(transaction.date)}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-lg ${transaction.type === 'income'
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setEditingTransaction(transaction)}
                                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                    title="Editar"
                                >
                                    <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Deseja realmente excluir esta transação?')) {
                                            deleteTransaction(transaction.id);
                                        }
                                    }}
                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                    title="Excluir"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
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
