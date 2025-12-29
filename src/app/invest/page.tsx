"use client";

import { useState } from "react";
import BankTable from "@/components/finance/BankTable";
import InvestmentCard from "@/components/finance/InvestmentCard";
import { Calculator, Info, TrendingUp, Shield, Zap, Award, Target, ArrowRight } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

import { motion } from "framer-motion";

export default function InvestPage() {
    const [simulationAmount, setSimulationAmount] = useState<string>("1000");
    const amount = parseFloat(simulationAmount) || 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, cubicBezier: [0.23, 1, 0.32, 1] } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32"
        >
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <motion.header variants={itemVariants} className="space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                        <TrendingUp size={16} className="text-green-500" />
                        <span className="text-sm font-medium text-green-400">Multiplicador de Patrimônio</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Central de <span className="gradient-text">Investimentos</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Compare, simule e escolha onde seu dinheiro vai trabalhar mais por você.
                    </p>
                </motion.header>

                {/* Simulation Bar */}
                <div className="reveal card-premium p-6 md:p-8 bg-gradient-to-r from-[#0f0f13] to-[#1a1a2e]" style={{ animationDelay: '0.1s' }}>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 w-full">
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-2 tracking-widest">
                                Valor para Simulação
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-2xl group-focus-within:text-white transition-colors">R$</span>
                                <input
                                    type="number"
                                    value={simulationAmount}
                                    onChange={(e) => setSimulationAmount(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl pl-14 pr-4 py-6 text-white font-bold text-3xl outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-700"
                                    placeholder="0,00"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {[1000, 5000, 10000, 50000].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setSimulationAmount(val.toString())}
                                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-sm font-bold text-gray-300 hover:text-white transition-all whitespace-nowrap"
                                >
                                    R$ {val.toLocaleString()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comparison Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal" style={{ animationDelay: '0.2s' }}>

                    {/* Left: Liquidity */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Liquidez Diária</h2>
                                    <p className="text-sm text-gray-500">Para sua reserva de emergência e objetivos de curto prazo.</p>
                                </div>
                            </div>
                            <div className="card-premium overflow-hidden">
                                <BankTable />
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Médio & Longo Prazo</h2>
                                    <p className="text-sm text-gray-500">Opções para multiplicar seu capital com segurança.</p>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InvestmentCard
                                    title="RDB Planejado"
                                    rate="112% CDI"
                                    period="2 anos"
                                    type="RDB"
                                    profitability={12.5}
                                    simulationAmount={amount}
                                />
                                <InvestmentCard
                                    title="Tesouro Selic 2029"
                                    rate="Selic + 0.17%"
                                    period="2029"
                                    type="Tesouro"
                                    profitability={24.4}
                                    simulationAmount={amount}
                                />
                                <InvestmentCard
                                    title="CDB Promoção"
                                    rate="130% CDI"
                                    period="3 anos"
                                    type="CDB"
                                    profitability={48.2}
                                    simulationAmount={amount}
                                />
                                <InvestmentCard
                                    title="LCI/LCA Isento"
                                    rate="98% CDI"
                                    period="1 ano"
                                    type="LCI"
                                    profitability={13.0}
                                    simulationAmount={amount}
                                />
                            </div>
                        </section>
                    </div>

                    {/* Right: Insights */}
                    <div className="space-y-6">
                        <div className="card-premium p-6 border-green-500/20 bg-gradient-to-b from-green-500/5 to-transparent">
                            <div className="flex items-center gap-3 mb-6">
                                <Award className="text-green-500" size={24} />
                                <h3 className="text-lg font-bold text-white">Ranking de Retorno</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="relative pt-6">
                                    <div className="absolute top-0 right-0 text-[10px] font-bold text-gray-500 uppercase">Rentabilidade Real (12m)</div>

                                    <div className="space-y-4">
                                        <div className="group">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-white font-bold">CDB 120% CDI</span>
                                                <span className="text-green-400 font-bold">~13.5%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 w-[95%]" />
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-white font-bold">Tesouro Selic</span>
                                                <span className="text-yellow-400 font-bold">~11.7%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-500 w-[85%]" />
                                            </div>
                                        </div>

                                        <div className="group opacity-50">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-400">Poupança</span>
                                                <span className="text-red-400 font-bold">~6.17%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-500 w-[45%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <p className="text-xs text-red-300 leading-relaxed">
                                    <strong>Alerta:</strong> A inflação acumulada está em ~4.5%. A poupança mal cobre a inflação, resultando em ganho real quase nulo.
                                </p>
                            </div>
                        </div>

                        <div className="card-premium p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Dicionário Rápido</h3>
                            <ul className="space-y-4">
                                <li className="text-sm">
                                    <span className="text-primary font-bold block mb-1">CDI</span>
                                    <span className="text-gray-400">Taxa que os bancos usam para emprestar dinheiro entre si. Segue a Selic de perto.</span>
                                </li>
                                <li className="text-sm">
                                    <span className="text-primary font-bold block mb-1">Liquidez</span>
                                    <span className="text-gray-400">A velocidade com que você consegue transformar o investimento em dinheiro na mão.</span>
                                </li>
                                <li className="text-sm">
                                    <span className="text-primary font-bold block mb-1">FGC</span>
                                    <span className="text-gray-400">Fundo Garantidor de Créditos. Segura até R$ 250 mil por CPF e instituição.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
