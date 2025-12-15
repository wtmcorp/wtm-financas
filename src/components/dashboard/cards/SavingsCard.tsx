"use client";

import { PiggyBank, ArrowUpRight } from 'lucide-react';

const SavingsCard = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Economia</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">R$ 1.200,00</h3>
                </div>
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <PiggyBank className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
            </div>
            <div className="flex items-center text-sm">
                <span className="text-green-500 flex items-center font-medium">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +5%
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">da meta mensal</span>
            </div>
        </div>
    );
};

export default SavingsCard;
