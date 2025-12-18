"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Plus, Minus, Wallet, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";

interface EnvelopeProps {
    id: string;
    title: string;
    amount: number;
    color: string;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
}

function Envelope({ id, title, amount, color, onAdd, onRemove }: EnvelopeProps) {
    return (
        <Tooltip text={`Este envelope representa sua reserva para ${title}. Use os botões abaixo para gerenciar o saldo.`}>
            <Card className="border border-white/10 bg-card hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${color}`}></div>
                        <span className="font-bold text-white">{title}</span>
                    </div>
                    <span className="text-xl font-bold text-white">
                        R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="h-2 w-full bg-gray-800 rounded-full mb-4 overflow-hidden">
                    <div
                        className={`h-full ${color.replace('bg-', 'bg-opacity-80 bg-')}`}
                        style={{ width: `${Math.min((amount / 5000) * 100, 100)}%` }}
                    ></div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                        onClick={() => onRemove(id)}
                    >
                        <Minus size={16} className="mr-2" />
                        Tirar
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400"
                        onClick={() => onAdd(id)}
                    >
                        <Plus size={16} className="mr-2" />
                        Colocar
                    </Button>
                </div>
            </Card>
        </Tooltip>
    );
}

export default function GoalsPage() {
    const [transactionAmount, setTransactionAmount] = useState<string>("100");
    const [amounts, setAmounts] = useState({
        moradia: 1200,
        investimentos: 500,
        lazer: 300,
        educacao: 200,
        reserva: 1000
    });

    const handleAdd = (id: string) => {
        const value = parseFloat(transactionAmount);
        if (!isNaN(value) && value > 0) {
            setAmounts(prev => ({
                ...prev,
                [id as keyof typeof amounts]: prev[id as keyof typeof amounts] + value
            }));
        }
    };

    const handleRemove = (id: string) => {
        const value = parseFloat(transactionAmount);
        if (!isNaN(value) && value > 0) {
            setAmounts(prev => ({
                ...prev,
                [id as keyof typeof amounts]: Math.max(0, prev[id as keyof typeof amounts] - value)
            }));
        }
    };

    const total = Object.values(amounts).reduce((acc, curr) => acc + curr, 0);

    return (
        <div className="p-6 space-y-6 pb-24">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Organizador de Metas</h1>
                <p className="text-gray-400 text-sm">Distribua seu dinheiro nos envelopes abaixo.</p>
            </header>

            {/* Controls */}
            <Tooltip text="Este é o valor total distribuído em todos os seus envelopes de metas.">
                <Card className="bg-primary/5 border-primary/20">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-300">
                                <Wallet size={20} />
                                <span className="text-sm font-medium">Total Acumulado</span>
                            </div>
                            <span className="text-2xl font-bold text-white">
                                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Valor da Transação</label>
                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">R$</span>
                                <input
                                    type="number"
                                    value={transactionAmount}
                                    onChange={(e) => setTransactionAmount(e.target.value)}
                                    className="flex-1 bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary font-bold text-lg"
                                    placeholder="0,00"
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                Digite um valor acima e use os botões "Colocar" ou "Tirar" nos envelopes.
                            </p>
                        </div>
                    </div>
                </Card>
            </Tooltip>

            <div className="grid gap-4">
                <Envelope
                    id="moradia"
                    title="Moradia & Contas"
                    amount={amounts.moradia}
                    color="bg-blue-500"
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
                <Envelope
                    id="investimentos"
                    title="Investimentos"
                    amount={amounts.investimentos}
                    color="bg-green-500"
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
                <Envelope
                    id="reserva"
                    title="Reserva de Emergência"
                    amount={amounts.reserva}
                    color="bg-yellow-500"
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
                <Envelope
                    id="educacao"
                    title="Educação"
                    amount={amounts.educacao}
                    color="bg-purple-500"
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
                <Envelope
                    id="lazer"
                    title="Lazer & Diversão"
                    amount={amounts.lazer}
                    color="bg-pink-500"
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
            </div>
        </div>
    );
}
