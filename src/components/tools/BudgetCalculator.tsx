"use client";

import { Calculator, Save } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function BudgetCalculator() {
    const { user } = useAuth();
    const [income, setIncome] = useState("");
    const [saving, setSaving] = useState(false);

    const monthlyIncome = parseFloat(income) || 0;
    const needs = monthlyIncome * 0.5;
    const wants = monthlyIncome * 0.3;
    const savings = monthlyIncome * 0.2;

    const handleSave = async () => {
        if (!user) {
            toast.error("Faça login para salvar seu orçamento");
            return;
        }

        if (monthlyIncome <= 0) {
            toast.error("Digite uma renda válida");
            return;
        }

        setSaving(true);
        try {
            await updateDoc(doc(db, "users", user.id), {
                income: monthlyIncome,
                budget: {
                    needs,
                    wants,
                    savings,
                    lastUpdated: new Date().toISOString()
                }
            });
            toast.success("Orçamento salvo com sucesso!");
        } catch (error) {
            console.error("Error saving budget:", error);
            toast.error("Erro ao salvar orçamento");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calculator className="text-primary" size={20} />
                        Calculadora de Orçamento 50-30-20
                    </h3>
                    {monthlyIncome > 0 && (
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Save size={16} />
                            {saving ? "Salvando..." : "Salvar no Perfil"}
                        </button>
                    )}
                </div>
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
