"use client";

import { CreditCard, ArrowDownRight } from 'lucide-react';

const ExpenseCard = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gastos do Mês</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">R$ 3.240,00</h3>
                </div>
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
            </div>
            <div className="flex items-center text-sm">
                <span className="text-red-500 flex items-center font-medium">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    +12%
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">vs. mês anterior</span>
            </div>
        </div>
    );
};

export default ExpenseCard;
