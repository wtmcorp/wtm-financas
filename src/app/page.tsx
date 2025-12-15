"use client";

import BalanceCard from "@/components/dashboard/cards/BalanceCard";
import ExpenseCard from "@/components/dashboard/cards/ExpenseCard";
import SavingsCard from "@/components/dashboard/cards/SavingsCard";
import ExpenseChart from "@/components/dashboard/charts/ExpenseChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import NetWorthChart from "@/components/dashboard/charts/NetWorthChart";
import TransactionFab from "@/components/dashboard/TransactionFab";

export default function Home() {
    return (
        <div className="p-6 space-y-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bem-vindo de volta, Usuário</p>
                </div>
                <div className="flex space-x-2">
                    {/* Placeholder for future header actions */}
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BalanceCard />
                <ExpenseCard />
                <SavingsCard />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CashFlowChart />
                <ExpenseChart />
            </section>

            <section className="w-full">
                <NetWorthChart />
            </section>

            <TransactionFab />
        </div>
    );
}
