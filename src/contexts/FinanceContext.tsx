"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useFinanceData } from '@/hooks/useFinanceData';
import type { Transaction, Budget, Goal } from '@/hooks/useFinanceData';

export type { Transaction, Budget, Goal };

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

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
    const financeData = useFinanceData();

    return (
        <FinanceContext.Provider value={financeData}>
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
