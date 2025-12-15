"use client";

import React, { useState } from 'react';
import { useFinance, Transaction } from '@/contexts/FinanceContext';
import { X, Plus, Minus, Calendar, Tag, FileText } from 'lucide-react';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction?: Transaction;
}

const CATEGORIES = [
    'Moradia',
    'Alimentação',
    'Transporte',
    'Lazer',
    'Saúde',
    'Educação',
    'Outros',
];

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, transaction }) => {
    const { addTransaction, updateTransaction } = useFinance();
    const [formData, setFormData] = useState({
        type: transaction?.type || 'expense' as 'income' | 'expense',
        amount: transaction?.amount || 0,
        category: transaction?.category || 'Outros',
        description: transaction?.description || '',
        date: transaction?.date || new Date().toISOString().split('T')[0],
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (transaction) {
            updateTransaction(transaction.id, formData);
        } else {
            addTransaction(formData);
        }

        onClose();
        setFormData({
            type: 'expense',
            amount: 0,
            category: 'Outros',
            description: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {transaction ? 'Editar Transação' : 'Nova Transação'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type Selection */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'income' })}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${formData.type === 'income'
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <Plus className="w-5 h-5 inline mr-2" />
                            Receita
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'expense' })}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${formData.type === 'expense'
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <Minus className="w-5 h-5 inline mr-2" />
                            Despesa
                        </button>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Valor
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                                R$
                            </span>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.amount || ''}
                                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-lg font-semibold"
                                placeholder="0,00"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Tag className="w-4 h-4 inline mr-1" />
                            Categoria
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <FileText className="w-4 h-4 inline mr-1" />
                            Descrição
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                            placeholder="Ex: Supermercado, Salário..."
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Data
                        </label>
                        <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
                    >
                        {transaction ? 'Atualizar' : 'Adicionar'} Transação
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
