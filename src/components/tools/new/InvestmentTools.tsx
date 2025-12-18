"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, PieChart, Target, Percent, Scale } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

const ToolCard = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-6 hover:border-primary/30 transition-all group">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Icon className="text-primary" size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        {children}
    </div>
);

export default function InvestmentTools() {
    // 1. Preço Médio
    const [avgPrice, setAvgPrice] = useState({ qty1: 0, price1: 0, qty2: 0, price2: 0 });
    const calcAvgPrice = () => {
        const totalQty = Number(avgPrice.qty1) + Number(avgPrice.qty2);
        const totalVal = (Number(avgPrice.qty1) * Number(avgPrice.price1)) + (Number(avgPrice.qty2) * Number(avgPrice.price2));
        return totalQty > 0 ? (totalVal / totalQty).toFixed(2) : "0.00";
    };

    // 2. Dividend Yield
    const [dy, setDy] = useState({ price: 0, dividend: 0 });
    const calcDY = () => (dy.price > 0 ? ((dy.dividend / dy.price) * 100).toFixed(2) : "0.00");

    // 3. ROI
    const [roi, setRoi] = useState({ initial: 0, final: 0 });
    const calcROI = () => (roi.initial > 0 ? (((roi.final - roi.initial) / roi.initial) * 100).toFixed(2) : "0.00");

    // 4. FIRE (Aposentadoria)
    const [fire, setFire] = useState({ monthly: 0 });
    const calcFIRE = () => (fire.monthly * 12 * 25).toLocaleString('pt-BR'); // Regra dos 4%

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tooltip text="Calcule o preço médio de compra de uma ação ou FII após múltiplos aportes, essencial para sua declaração de IR e controle de rentabilidade.">
                <ToolCard title="Preço Médio" icon={Scale}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <input type="number" placeholder="Qtd 1" onChange={e => setAvgPrice({ ...avgPrice, qty1: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                            <input type="number" placeholder="Preço 1" onChange={e => setAvgPrice({ ...avgPrice, price1: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                            <input type="number" placeholder="Qtd 2" onChange={e => setAvgPrice({ ...avgPrice, qty2: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                            <input type="number" placeholder="Preço 2" onChange={e => setAvgPrice({ ...avgPrice, price2: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Novo Preço Médio</p>
                            <p className="text-xl font-bold text-primary">R$ {calcAvgPrice()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Descubra quanto um ativo paga de dividendos em relação ao seu preço atual. Ideal para estratégias de renda passiva.">
                <ToolCard title="Dividend Yield" icon={Percent}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Preço da Ação" onChange={e => setDy({ ...dy, price: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <input type="number" placeholder="Dividendos (Ano)" onChange={e => setDy({ ...dy, dividend: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Yield Anual</p>
                            <p className="text-xl font-bold text-primary">{calcDY()}%</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Calcule o retorno sobre o investimento (ROI) para avaliar a eficiência de um investimento.">
                <ToolCard title="ROI (Retorno)" icon={TrendingUp}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Investimento Inicial" onChange={e => setRoi({ ...roi, initial: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <input type="number" placeholder="Valor Final" onChange={e => setRoi({ ...roi, final: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Lucro/Prejuízo</p>
                            <p className="text-xl font-bold text-primary">{calcROI()}%</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Estime o capital necessário para alcançar a independência financeira, seguindo a regra dos 4%.">
                <ToolCard title="Calculadora FIRE" icon={Target}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Gasto Mensal Desejado" onChange={e => setFire({ monthly: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Meta de Independência</p>
                            <p className="text-xl font-bold text-primary">R$ {calcFIRE()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>
        </div>
    );
}
