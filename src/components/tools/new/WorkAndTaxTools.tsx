"use client";

import { useState } from "react";
import { Briefcase, Gift, Umbrella, Wallet } from "lucide-react";
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

export default function WorkAndTaxTools() {
    // 1. Salário Líquido (Simplificado)
    const [salary, setSalary] = useState(0);
    const calcNetSalary = () => {
        const inss = salary * 0.11; // Simplificado
        const irpf = salary > 2500 ? (salary - 2500) * 0.15 : 0; // Simplificado
        return (salary - inss - irpf).toFixed(2);
    };

    // 2. Décimo Terceiro
    const [thirteenth, setThirteenth] = useState({ salary: 0, months: 12 });
    const calcThirteenth = () => ((thirteenth.salary / 12) * thirteenth.months).toFixed(2);

    // 3. Férias
    const [vacation, setVacation] = useState(0);
    const calcVacation = () => (vacation + (vacation / 3)).toFixed(2);

    // 4. FGTS (Anual)
    const [fgts, setFgts] = useState(0);
    const calcFGTS = () => (fgts * 0.08 * 12).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tooltip text="Saiba quanto você realmente recebe no final do mês após descontos de INSS e IRRF.">
                <ToolCard title="Salário Líquido" icon={Briefcase}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Salário Bruto" onChange={e => setSalary(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Estimativa Líquida</p>
                            <p className="text-xl font-bold text-primary">R$ {calcNetSalary()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Calcule o valor das suas duas parcelas do 13º salário com base nos meses trabalhados.">
                <ToolCard title="13º Salário" icon={Gift}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Salário" onChange={e => setThirteenth({ ...thirteenth, salary: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <input type="number" placeholder="Meses Trabalhados" onChange={e => setThirteenth({ ...thirteenth, months: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Valor Proporcional</p>
                            <p className="text-xl font-bold text-primary">R$ {calcThirteenth()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Descubra o valor total das suas férias, incluindo o adicional de 1/3.">
                <ToolCard title="Cálculo de Férias" icon={Umbrella}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Salário Bruto" onChange={e => setVacation(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Total (Salário + 1/3)</p>
                            <p className="text-xl font-bold text-primary">R$ {calcVacation()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Veja quanto você acumula de FGTS anualmente com base no seu salário mensal.">
                <ToolCard title="FGTS Anual" icon={Wallet}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Salário Mensal" onChange={e => setFgts(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Acúmulo em 12 meses</p>
                            <p className="text-xl font-bold text-primary">R$ {calcFGTS()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>
        </div>
    );
}
