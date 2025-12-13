import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

interface InvestmentCardProps {
    title: string;
    rate: string;
    period: string;
    type: "RDB" | "CDB" | "Tesouro" | "LCI";
    profitability: number; // Net profit percentage estimate
    simulationAmount: number;
}

export default function InvestmentCard({ title, rate, period, type, profitability, simulationAmount }: InvestmentCardProps) {
    const finalValue = simulationAmount * (1 + profitability / 100);
    const profit = finalValue - simulationAmount;

    return (
        <Card className="relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-2 bg-white/5 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {type}
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <div className="text-2xl font-bold text-primary mb-4">{rate}</div>

            <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="flex justify-between">
                    <span>Prazo</span>
                    <span className="text-white">{period}</span>
                </div>
                <div className="flex justify-between">
                    <span>Rentabilidade Líquida</span>
                    <span className="text-green-400">+{profitability.toFixed(2)}%</span>
                </div>
            </div>

            <div className="bg-white/5 p-3 rounded-lg text-xs">
                <p className="text-gray-500 mb-1">Simulação (R$ {simulationAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</p>
                <div className="flex justify-between items-end">
                    <span className="text-white font-bold text-lg">R$ {finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span className="text-green-500 font-medium">+R$ {profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
            </div>
        </Card>
    );
}
