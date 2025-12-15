"use client";

import BalanceCard from "@/components/dashboard/cards/BalanceCard";
import ExpenseCard from "@/components/dashboard/cards/ExpenseCard";
import SavingsCard from "@/components/dashboard/cards/SavingsCard";
import ExpenseChart from "@/components/dashboard/charts/ExpenseChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import NetWorthChart from "@/components/dashboard/charts/NetWorthChart";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionList from "@/components/finance/TransactionList";

export default function Home() {
    return (
        <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard Financeiro
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Gerencie suas finanças de forma inteligente
                </p>
            </header>

            {/* Metric Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BalanceCard />
                <ExpenseCard />
                <SavingsCard />
            </section>

            {/* Charts Row */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CashFlowChart />
                <ExpenseChart />
            </section>

            {/* Net Worth & Quick Actions */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <NetWorthChart />
                </div>
                <QuickActions />
            </section>

            {/* Transactions */}
            <section>
                <TransactionList />
            </section>
        </div>
    );
}
