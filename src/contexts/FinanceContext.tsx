"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description: string;
    date: string;
}

export interface Budget {
    category: string;
    limit: number;
    spent: number;
}

interface FinanceContextType {
    transactions: Transaction[];
    budgets: Budget[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    setBudget: (category: string, limit: number) => void;
    getBalance: () => number;
    getMonthlyExpenses: () => number;
    getMonthlyIncome: () => number;
    getSavings: () => number;
    getExpensesByCategory: () => { name: string; value: number; color: string }[];
    getCashFlow: () => { name: string; entrada: number; saida: number }[];
    getNetWorth: () => { name: string; valor: number }[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const CATEGORY_COLORS: { [key: string]: string } = {
    'Moradia': '#0088FE',
    'Alimentação': '#00C49F',
    'Transporte': '#FFBB28',
    'Lazer': '#FF8042',
    'Saúde': '#8884d8',
    'Educação': '#82ca9d',
    'Outros': '#ffc658',
};

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedTransactions = localStorage.getItem('transactions');
        const savedBudgets = localStorage.getItem('budgets');

        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        }
        if (savedBudgets) {
            setBudgets(JSON.parse(savedBudgets));
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: Date.now().toString(),
        };
        setTransactions([newTransaction, ...transactions]);
    };

    const updateTransaction = (id: string, updatedData: Partial<Transaction>) => {
        setTransactions(transactions.map(t =>
            t.id === id ? { ...t, ...updatedData } : t
        ));
    };

    const deleteTransaction = (id: string) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const setBudget = (category: string, limit: number) => {
        const spent = transactions
            .filter(t => t.type === 'expense' && t.category === category)
            .reduce((sum, t) => sum + t.amount, 0);

        const existingBudgetIndex = budgets.findIndex(b => b.category === category);
        if (existingBudgetIndex >= 0) {
            const newBudgets = [...budgets];
            newBudgets[existingBudgetIndex] = { category, limit, spent };
            setBudgets(newBudgets);
        } else {
            setBudgets([...budgets, { category, limit, spent }]);
        }
    };

    const getBalance = () => {
        return transactions.reduce((sum, t) =>
            t.type === 'income' ? sum + t.amount : sum - t.amount, 0
        );
    };

    const getMonthlyExpenses = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return transactions
            .filter(t => {
                const tDate = new Date(t.date);
                return t.type === 'expense' &&
                    tDate.getMonth() === currentMonth &&
                    tDate.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + t.amount, 0);
    };

    const getMonthlyIncome = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return transactions
            .filter(t => {
                const tDate = new Date(t.date);
                return t.type === 'income' &&
                    tDate.getMonth() === currentMonth &&
                    tDate.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + t.amount, 0);
    };

    const getSavings = () => {
        return getMonthlyIncome() - getMonthlyExpenses();
    };

    const getExpensesByCategory = () => {
        const categoryTotals: { [key: string]: number } = {};

        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            });

        return Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
            color: CATEGORY_COLORS[name] || '#999999',
        }));
    };

    const getCashFlow = () => {
        const monthlyData: { [key: string]: { entrada: number; saida: number } } = {};

        transactions.forEach(t => {
            const date = new Date(t.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { entrada: 0, saida: 0 };
            }

            if (t.type === 'income') {
                monthlyData[monthKey].entrada += t.amount;
            } else {
                monthlyData[monthKey].saida += t.amount;
            }
        });

        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const now = new Date();
        const last6Months = [];

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const data = monthlyData[monthKey] || { entrada: 0, saida: 0 };

            last6Months.push({
                name: months[d.getMonth()],
                entrada: data.entrada,
                saida: data.saida,
            });
        }

        return last6Months;
    };

    const getNetWorth = () => {
        const monthlyData: { [key: string]: number } = {};

        transactions.forEach(t => {
            const date = new Date(t.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = 0;
            }

            monthlyData[monthKey] += t.type === 'income' ? t.amount : -t.amount;
        });

        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const now = new Date();
        const last6Months = [];
        let runningTotal = 0;

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            runningTotal += monthlyData[monthKey] || 0;

            last6Months.push({
                name: months[d.getMonth()],
                valor: runningTotal,
            });
        }

        return last6Months;
    };

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                budgets,
                addTransaction,
                updateTransaction,
                deleteTransaction,
                setBudget,
                getBalance,
                getMonthlyExpenses,
                getMonthlyIncome,
                getSavings,
                getExpensesByCategory,
                getCashFlow,
                getNetWorth,
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
};
