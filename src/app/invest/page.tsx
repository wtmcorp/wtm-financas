"use client";

import BankTable from "@/components/finance/BankTable";
import InvestmentCard from "@/components/finance/InvestmentCard";
import { useState } from "react";
import { Calculator, Info } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

export default function InvestPage() {
    const [simulationAmount, setSimulationAmount] = useState<string>("1000");

    const amount = parseFloat(simulationAmount) || 0;

    return (
        <div className="p-6 space-y-8 pb-24">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Onde deixar meu dinheiro</h1>
                <p className="text-gray-400 text-sm">Compare as melhores opções de renda fixa do mercado.</p>
            </header>

            {/* Simulation Input */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                    <Calculator size={24} />
                </div>
                <div className="flex-1">
                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Valor para Simulação</label>
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">R$</span>
                        <input
                            type="number"
                            value={simulationAmount}
                            onChange={(e) => setSimulationAmount(e.target.value)}
                            className="w-full bg-transparent text-white font-bold text-xl outline-none placeholder:text-gray-600"
                            placeholder="0,00"
                        />
                    </div>
                </div>
            </div>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Liquidez Diária (Reservas)</h2>
                <Tooltip text="Investimentos com liquidez diária permitem que você retire seu dinheiro a qualquer momento, ideal para sua reserva de emergência.">
                    <div>
                        <BankTable />
                    </div>
                </Tooltip>
            </section>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Médio/Longo Prazo</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Tooltip text="O RDB Planejado do Nubank oferece rentabilidade superior ao CDI em troca de um prazo de carência maior.">
                        <InvestmentCard
                            title="RDB Planejado"
                            rate="110% CDI"
                            period="1 ano"
                            type="RDB"
                            profitability={11.5}
                            simulationAmount={amount}
                        />
                    </Tooltip>
                    <Tooltip text="O Tesouro Selic é o investimento mais seguro do Brasil, garantido pelo Governo Federal. Ideal para prazos médios.">
                        <InvestmentCard
                            title="Tesouro Selic 2027"
                            rate="Selic + 0.15%"
                            period="2027"
                            type="Tesouro"
                            profitability={22.4}
                            simulationAmount={amount}
                        />
                    </Tooltip>
                    <Tooltip text="CDBs promocionais costumam oferecer taxas agressivas para atrair novos clientes. Verifique sempre o FGC.">
                        <InvestmentCard
                            title="CDB Promo"
                            rate="220% CDI"
                            period="3 anos"
                            type="CDB"
                            profitability={45.2}
                            simulationAmount={amount}
                        />
                    </Tooltip>
                    <Tooltip text="LCI e LCA são isentos de Imposto de Renda, o que pode tornar sua rentabilidade líquida superior a um CDB.">
                        <InvestmentCard
                            title="LCI/LCA Isento"
                            rate="95% CDI"
                            period="2 anos"
                            type="LCI"
                            profitability={24.0}
                            simulationAmount={amount}
                        />
                    </Tooltip>
                </div>
            </section>

            <section className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-green-400 mb-4">🏆 Onde seu dinheiro rende mais?</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-white font-medium">Poupança</span>
                        </div>
                        <span className="text-red-400 font-bold">~6.17% ao ano</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span className="text-white font-medium">Tesouro Selic</span>
                        </div>
                        <span className="text-yellow-400 font-bold">~10.65% ao ano</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-white font-medium">CDB 110% CDI</span>
                        </div>
                        <span className="text-green-400 font-bold">~11.71% ao ano</span>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                    *Valores aproximados baseados na taxa Selic atual. A poupança perde para a inflação em muitos cenários!
                </p>
            </section>
        </div>
    );
}
