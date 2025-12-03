"use client";

import { Calculator } from "lucide-react";
import { useState } from "react";

export default function BudgetCalculator() {
    const [income, setIncome] = useState("");

    const monthlyIncome = parseFloat(income) || 0;
    const needs = monthlyIncome * 0.5;
    const wants = monthlyIncome * 0.3;
    const savings = monthlyIncome * 0.2;

    return (
        <div className="space-y-6">
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Calculator className="text-primary" size={20} />
                    Calculadora de Orçamento 50-30-20
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                    Método popular de orçamento: 50% necessidades, 30% desejos, 20% investimentos
                </p>
                <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Digite sua renda mensal (R$)"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                />
            </div>

            {monthlyIncome > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-xl p-6">
                        <div className="text-blue-400 text-sm font-medium mb-2">50% - Necessidades</div>
                        <div className="text-2xl font-bold text-white mb-2">R$ {needs.toFixed(2)}</div>
                        <div className="text-xs text-gray-400">Moradia, alimentação, transporte, contas essenciais</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-xl p-6">
                        <div className="text-purple-400 text-sm font-medium mb-2">30% - Desejos</div>
                        <div className="text-2xl font-bold text-white mb-2">R$ {wants.toFixed(2)}</div>
                        <div className="text-xs text-gray-400">Lazer, restaurantes, hobbies, entretenimento</div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6">
                        <div className="text-primary text-sm font-medium mb-2">20% - Investimentos</div>
                        <div className="text-2xl font-bold text-white mb-2">R$ {savings.toFixed(2)}</div>
                        <div className="text-xs text-gray-400">Reserva de emergência, investimentos, aposentadoria</div>
                    </div>
                </div>
            )}
        </div>
    );
}
