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

export interface Goal {
    id: string;
    name: string;
    target: number;
    current: number;
    color: string;
}

interface FinanceContextType {
    transactions: Transaction[];
    budgets: Budget[];
    goals: Goal[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
    updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    setBudget: (category: string, limit: number) => Promise<void>;
    addGoal: (goal: Omit<Goal, 'id'>) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
    updateGoal: (id: string, goal: Partial<Goal>) => Promise<void>;
    getBalance: () => number;
    getMonthlyExpenses: () => number;
    getMonthlyIncome: () => number;
    getSavings: () => number;
    getExpensesByCategory: () => { name: string; value: number; color: string }[];
    getCashFlow: () => { name: string; entrada: number; saida: number }[];
    getNetWorth: () => { name: string; valor: number }[];
    getTopExpenseCategory: () => { name: string; amount: number } | null;
    getMonthlySavingsRate: () => number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const CATEGORY_COLORS: { [key: string]: string } = {
    'Salário': '#4ADE80',
    'Investimentos': '#60A5FA',
    'Moradia': '#A78BFA',
    'Alimentação': '#FB923C',
    'Transporte': '#22D3EE',
    'Lazer': '#F472B6',
    'Compras': '#FACC15',
    'Contas': '#F87171',
    'Outros': '#94A3B8',
};

import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    setDoc
} from 'firebase/firestore';

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const { user } = useAuth();

    // Load transactions from Firestore when user changes
    useEffect(() => {
        if (!user) {
            setTransactions([]);
            return;
        }

        const q = query(
            collection(db, 'users', user.id, 'transactions'),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const transData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Transaction[];
            setTransactions(transData);
        });

        return () => unsubscribe();
    }, [user]);

    // Load budgets from Firestore
    useEffect(() => {
        if (!user) {
            setBudgets([]);
            return;
        }

        const unsubscribe = onSnapshot(collection(db, 'users', user.id, 'budgets'), (snapshot) => {
            const budgetData = snapshot.docs.map(doc => ({
                category: doc.id,
                ...doc.data()
            })) as Budget[];
            setBudgets(budgetData);
        });

        return () => unsubscribe();
    }, [user]);

    // Load goals from Firestore
    useEffect(() => {
        if (!user) {
            setGoals([]);
            return;
        }

        const unsubscribe = onSnapshot(collection(db, 'users', user.id, 'goals'), (snapshot) => {
            const goalsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Goal[];
            setGoals(goalsData);
        });

        return () => unsubscribe();
    }, [user]);

    const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
        if (!user) return;
        try {
            await addDoc(collection(db, 'users', user.id, 'transactions'), transaction);
        } catch (e) {
            console.error("Error adding transaction: ", e);
        }
    };

    const updateTransaction = async (id: string, updatedData: Partial<Transaction>) => {
        if (!user) return;
        try {
            const docRef = doc(db, 'users', user.id, 'transactions', id);
            await updateDoc(docRef, updatedData);
        } catch (e) {
            console.error("Error updating transaction: ", e);
        }
    };

    const deleteTransaction = async (id: string) => {
        if (!user) return;
        try {
            const docRef = doc(db, 'users', user.id, 'transactions', id);
            await deleteDoc(docRef);
        } catch (e) {
            console.error("Error deleting transaction: ", e);
        }
    };

    const setBudget = async (category: string, limit: number) => {
        if (!user) return;
        try {
            const spent = transactions
                .filter(t => t.type === 'expense' && t.category === category)
                .reduce((sum, t) => sum + t.amount, 0);

            await setDoc(doc(db, 'users', user.id, 'budgets', category), {
                limit,
                spent
            });
        } catch (e) {
            console.error("Error setting budget: ", e);
        }
    };

    const addGoal = async (goal: Omit<Goal, 'id'>) => {
        if (!user) return;
        try {
            await addDoc(collection(db, 'users', user.id, 'goals'), goal);
        } catch (e) {
            console.error("Error adding goal: ", e);
        }
    };

    const deleteGoal = async (id: string) => {
        if (!user) return;
        try {
            const docRef = doc(db, 'users', user.id, 'goals', id);
            await deleteDoc(docRef);
        } catch (e) {
            console.error("Error deleting goal: ", e);
        }
    };

    const updateGoal = async (id: string, goal: Partial<Goal>) => {
        if (!user) return;
        try {
            const docRef = doc(db, 'users', user.id, 'goals', id);
            await updateDoc(docRef, goal);
        } catch (e) {
            console.error("Error updating goal: ", e);
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

    const getMonthlySavingsRate = () => {
        const income = getMonthlyIncome();
        if (income === 0) return 0;
        const savings = getSavings();
        return (savings / income) * 100;
    };

    const getTopExpenseCategory = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const categoryTotals: { [key: string]: number } = {};

        transactions
            .filter(t => {
                const tDate = new Date(t.date);
                return t.type === 'expense' &&
                    tDate.getMonth() === currentMonth &&
                    tDate.getFullYear() === currentYear;
            })
            .forEach(t => {
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            });

        const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
        if (sorted.length === 0) return null;
        return { name: sorted[0][0], amount: sorted[0][1] };
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
            color: CATEGORY_COLORS[name] || '#94A3B8',
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
                goals,
                addTransaction,
                updateTransaction,
                deleteTransaction,
                setBudget,
                addGoal,
                deleteGoal,
                updateGoal,
                getBalance,
                getMonthlyExpenses,
                getMonthlyIncome,
                getSavings,
                getExpensesByCategory,
                getCashFlow,
                getNetWorth,
                getTopExpenseCategory,
                getMonthlySavingsRate,
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
