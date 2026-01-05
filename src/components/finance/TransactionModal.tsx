import React, { useState, useEffect } from 'react';
import { useFinance, Transaction } from '@/contexts/FinanceContext';
import { X, Plus, Minus, Calendar, Tag, FileText, Sparkles, Wallet, TrendingUp, ShoppingBag, Home, Car, Heart, Utensils, Zap, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction?: Transaction;
}

const CATEGORIES = [
    { name: 'Salário', icon: Wallet, color: 'text-green-400', bg: 'bg-green-500/10' },
    { name: 'Investimentos', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'Moradia', icon: Home, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Alimentação', icon: Utensils, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { name: 'Transporte', icon: Car, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { name: 'Lazer', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { name: 'Compras', icon: ShoppingBag, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { name: 'Contas', icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10' },
    { name: 'Outros', icon: MoreHorizontal, color: 'text-gray-400', bg: 'bg-gray-500/10' },
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

    useEffect(() => {
        if (transaction) {
            setFormData({
                type: transaction.type,
                amount: transaction.amount,
                category: transaction.category,
                description: transaction.description,
                date: transaction.date.split('T')[0],
            });
        }
    }, [transaction]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (transaction) {
                await updateTransaction(transaction.id, formData);
            } else {
                await addTransaction(formData);
            }
            onClose();
            setFormData({
                type: 'expense',
                amount: 0,
                category: 'Outros',
                description: '',
                date: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden relative z-10"
                >
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-b from-white/[0.02] to-transparent">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                    {transaction ? 'Editar Registro' : 'Novo Registro'}
                                </h2>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Gestão de Capital Inteligente</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 md:space-y-8">
                        {/* Type Selection */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'income' })}
                                className={`flex-1 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border ${formData.type === 'income'
                                    ? 'bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.1)]'
                                    : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                                    }`}
                            >
                                <Plus size={16} />
                                Entrada
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'expense' })}
                                className={`flex-1 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border ${formData.type === 'expense'
                                    ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.1)]'
                                    : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                                    }`}
                            >
                                <Minus size={16} />
                                Saída
                            </button>
                        </div>

                        {/* Amount */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Valor do Lançamento</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black text-xl">R$</div>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.amount || ''}
                                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                                    className="w-full pl-16 pr-8 py-6 bg-white/[0.02] border border-white/10 rounded-3xl focus:border-primary/50 focus:bg-white/[0.05] outline-none text-white text-3xl font-black tracking-tighter transition-all"
                                    placeholder="0,00"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Categoria</label>
                                <div className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-6 py-4 bg-white/[0.02] border border-white/10 rounded-2xl focus:border-primary/50 outline-none text-white text-sm font-bold appearance-none transition-all"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat.name} value={cat.name} className="bg-[#0A0A0A] text-white">
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <Tag size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Data</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-6 py-4 bg-white/[0.02] border border-white/10 rounded-2xl focus:border-primary/50 outline-none text-white text-sm font-bold transition-all"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <Calendar size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Descrição / Notas</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-6 py-4 bg-white/[0.02] border border-white/10 rounded-2xl focus:border-primary/50 outline-none text-white text-sm font-bold transition-all"
                                    placeholder="Ex: Salário Mensal, Aluguel, etc..."
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <FileText size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-6 bg-primary text-black font-black text-[12px] uppercase tracking-[0.3em] rounded-3xl hover:bg-white transition-all shadow-[0_20px_40px_rgba(167,139,250,0.2)] active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            {transaction ? 'Atualizar Registro' : 'Confirmar Lançamento'}
                            <Sparkles size={18} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TransactionModal;
