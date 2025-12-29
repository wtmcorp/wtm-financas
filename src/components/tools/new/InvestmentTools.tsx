"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, PieChart, Target, Percent, Scale, ArrowRight, Sparkles } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { motion, AnimatePresence } from "framer-motion";

const ToolCard = ({ title, icon: Icon, children, delay = 0 }: { title: string, icon: any, children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="bg-[#0f0f13]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-primary/40 transition-all group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500" />

        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
                <Icon className="text-primary" size={24} />
            </div>
            <div>
                <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                <div className="h-1 w-8 bg-primary/30 rounded-full mt-1 group-hover:w-12 transition-all duration-500" />
            </div>
        </div>
        {children}
    </motion.div>
);

const InputField = ({ label, ...props }: any) => (
    <div className="space-y-2">
        {label && <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>}
        <input
            {...props}
            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-700"
        />
    </div>
);

const ResultDisplay = ({ label, value, prefix = "R$" }: { label: string, value: string | number, prefix?: string }) => (
    <motion.div
        layout
        className="mt-6 p-4 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl text-center relative overflow-hidden group/res"
    >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/res:opacity-100 transition-opacity" />
        <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-2xl font-black text-white flex items-center justify-center gap-2">
            <span className="text-primary text-sm font-bold">{prefix}</span>
            {value}
        </p>
        <Sparkles className="absolute top-2 right-2 text-primary/20" size={12} />
    </motion.div>
);

export default function InvestmentTools() {
    // 1. Preço Médio
    const [avgPrice, setAvgPrice] = useState({ qty1: "", price1: "", qty2: "", price2: "" });
    const calcAvgPrice = () => {
        const q1 = Number(avgPrice.qty1) || 0;
        const p1 = Number(avgPrice.price1) || 0;
        const q2 = Number(avgPrice.qty2) || 0;
        const p2 = Number(avgPrice.price2) || 0;
        const totalQty = q1 + q2;
        const totalVal = (q1 * p1) + (q2 * p2);
        return totalQty > 0 ? (totalVal / totalQty).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0,00";
    };

    // 2. Dividend Yield
    const [dy, setDy] = useState({ price: "", dividend: "" });
    const calcDY = () => {
        const p = Number(dy.price) || 0;
        const d = Number(dy.dividend) || 0;
        return p > 0 ? ((d / p) * 100).toFixed(2).replace('.', ',') : "0,00";
    };

    // 3. ROI
    const [roi, setRoi] = useState({ initial: "", final: "" });
    const calcROI = () => {
        const i = Number(roi.initial) || 0;
        const f = Number(roi.final) || 0;
        return i > 0 ? (((f - i) / i) * 100).toFixed(2).replace('.', ',') : "0,00";
    };

    // 4. FIRE (Aposentadoria)
    const [fire, setFire] = useState({ monthly: "" });
    const calcFIRE = () => {
        const m = Number(fire.monthly) || 0;
        return (m * 12 * 25).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Tooltip text="Calcule o preço médio de compra de uma ação ou FII após múltiplos aportes, essencial para sua declaração de IR e controle de rentabilidade.">
                <ToolCard title="Preço Médio" icon={Scale} delay={0.1}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Qtd 1" type="number" placeholder="0" value={avgPrice.qty1} onChange={(e: any) => setAvgPrice({ ...avgPrice, qty1: e.target.value })} />
                            <InputField label="Preço 1" type="number" placeholder="0.00" value={avgPrice.price1} onChange={(e: any) => setAvgPrice({ ...avgPrice, price1: e.target.value })} />
                            <InputField label="Qtd 2" type="number" placeholder="0" value={avgPrice.qty2} onChange={(e: any) => setAvgPrice({ ...avgPrice, qty2: e.target.value })} />
                            <InputField label="Preço 2" type="number" placeholder="0.00" value={avgPrice.price2} onChange={(e: any) => setAvgPrice({ ...avgPrice, price2: e.target.value })} />
                        </div>
                        <ResultDisplay label="Novo Preço Médio" value={calcAvgPrice()} />
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Descubra quanto um ativo paga de dividendos em relação ao seu preço atual. Ideal para estratégias de renda passiva.">
                <ToolCard title="Dividend Yield" icon={Percent} delay={0.2}>
                    <div className="space-y-4">
                        <InputField label="Preço da Ação" type="number" placeholder="R$ 0,00" value={dy.price} onChange={(e: any) => setDy({ ...dy, price: e.target.value })} />
                        <InputField label="Dividendos (Ano)" type="number" placeholder="R$ 0,00" value={dy.dividend} onChange={(e: any) => setDy({ ...dy, dividend: e.target.value })} />
                        <ResultDisplay label="Yield Anual Estimado" value={calcDY()} prefix="%" />
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Calcule o retorno sobre o investimento (ROI) para avaliar a eficiência de um investimento.">
                <ToolCard title="ROI (Retorno)" icon={TrendingUp} delay={0.3}>
                    <div className="space-y-4">
                        <InputField label="Investimento Inicial" type="number" placeholder="R$ 0,00" value={roi.initial} onChange={(e: any) => setRoi({ ...roi, initial: e.target.value })} />
                        <InputField label="Valor Final" type="number" placeholder="R$ 0,00" value={roi.final} onChange={(e: any) => setRoi({ ...roi, final: e.target.value })} />
                        <ResultDisplay label="Rentabilidade Total" value={calcROI()} prefix="%" />
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Estime o capital necessário para alcançar a independência financeira, seguindo a regra dos 4%.">
                <ToolCard title="Calculadora FIRE" icon={Target} delay={0.4}>
                    <div className="space-y-4">
                        <InputField label="Gasto Mensal Desejado" type="number" placeholder="R$ 0,00" value={fire.monthly} onChange={(e: any) => setFire({ monthly: e.target.value })} />
                        <ResultDisplay label="Meta de Independência" value={calcFIRE()} />
                        <p className="text-[10px] text-gray-600 font-medium text-center italic">Baseado na regra dos 4% (25x o gasto anual)</p>
                    </div>
                </ToolCard>
            </Tooltip>
        </div>
    );
}
