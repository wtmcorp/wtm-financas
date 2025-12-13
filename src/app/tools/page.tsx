<<<<<<< HEAD
"use client";

import ExpenseTracker from "@/components/tools/ExpenseTracker";
import BudgetCalculator from "@/components/tools/BudgetCalculator";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import LoanCalculator from "@/components/tools/LoanCalculator";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import { Wrench } from "lucide-react";

export default function ToolsPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <Wrench size={28} />
                    Ferramentas Financeiras
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Ferramentas úteis para gerenciar suas finanças no dia a dia
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-white">📊 Rastreador de Gastos</h2>
                        <div className="group relative">
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                Anote cada centavo que sai do seu bolso. O primeiro passo para enriquecer é saber para onde seu dinheiro vai.
                            </div>
                        </div>
                    </div>
                    <ExpenseTracker />
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-white">💰 Calculadora de Orçamento</h2>
                        <div className="group relative">
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                Regra 50-30-20: 50% para necessidades, 30% para desejos e 20% para investir. Descubra se você está vivendo dentro dos seus limites.
                            </div>
                        </div>
                    </div>
                    <BudgetCalculator />
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-white">📈 Simulador de Juros Compostos</h2>
                            <div className="group relative">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    A oitava maravilha do mundo. Veja como pequenos aportes mensais podem te deixar milionário no longo prazo.
                                </div>
                            </div>
                        </div>
                        <CompoundInterestCalculator />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-white">💱 Conversor de Moedas</h2>
                            <div className="group relative">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    Vai viajar ou comprar em dólar? Veja quanto vale seu dinheiro em outras moedas em tempo real.
                                </div>
                            </div>
                        </div>
                        <CurrencyConverter />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-white">📉 Calculadora de Empréstimo</h2>
                            <div className="group relative">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    Simule parcelas antes de pegar dinheiro emprestado. Veja o quanto de juros você vai pagar no total.
                                </div>
                            </div>
                        </div>
                        <LoanCalculator />
                    </div>
                </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-300">
                    💡 <strong>Dica:</strong> Use essas ferramentas regularmente para manter suas finanças organizadas e tomar decisões mais informadas!
                </p>
            </div>
        </div>
    );
}
=======
"use client";

import ExpenseTracker from "@/components/tools/ExpenseTracker";
import BudgetCalculator from "@/components/tools/BudgetCalculator";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import LoanCalculator from "@/components/tools/LoanCalculator";
import { Wrench } from "lucide-react";

export default function ToolsPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <Wrench size={28} />
                    Ferramentas Financeiras
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Ferramentas úteis para gerenciar suas finanças no dia a dia
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-white">📊 Rastreador de Gastos</h2>
                        <div className="group relative">
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                Anote cada centavo que sai do seu bolso. O primeiro passo para enriquecer é saber para onde seu dinheiro vai.
                            </div>
                        </div>
                    </div>
                    <ExpenseTracker />
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-white">💰 Calculadora de Orçamento</h2>
                        <div className="group relative">
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                Regra 50-30-20: 50% para necessidades, 30% para desejos e 20% para investir. Descubra se você está vivendo dentro dos seus limites.
                            </div>
                        </div>
                    </div>
                    <BudgetCalculator />
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-white">💱 Conversor de Moedas</h2>
                            <div className="group relative">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    Vai viajar ou comprar em dólar? Veja quanto vale seu dinheiro em outras moedas em tempo real.
                                </div>
                            </div>
                        </div>
                        <CurrencyConverter />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-white">📈 Calculadora de Empréstimo</h2>
                            <div className="group relative">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 cursor-help">?</div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-64 bg-black/90 border border-white/20 rounded-lg p-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    Simule parcelas antes de pegar dinheiro emprestado. Veja o quanto de juros você vai pagar no total.
                                </div>
                            </div>
                        </div>
                        <LoanCalculator />
                    </div>
                </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-300">
                    💡 <strong>Dica:</strong> Use essas ferramentas regularmente para manter suas finanças organizadas e tomar decisões mais informadas!
                </p>
            </div>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
