"use client";

import { useState } from "react";
import { Car, Plane, Coffee, CreditCard } from "lucide-react";
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

export default function LifestyleTools() {
    // 1. Custo de Carro (Simplificado)
    const [car, setCar] = useState({ fuel: 0, insurance: 0, maintenance: 0 });
    const calcCarCost = () => (car.fuel + (car.insurance / 12) + (car.maintenance / 12)).toFixed(2);

    // 2. Assinaturas
    const [subs, setSubs] = useState({ netflix: 0, spotify: 0, gym: 0, others: 0 });
    const calcSubs = () => (subs.netflix + subs.spotify + subs.gym + subs.others).toFixed(2);

    // 3. Custo de Viagem
    const [travel, setTravel] = useState({ flight: 0, hotel: 0, food: 0, days: 1 });
    const calcTravel = () => (travel.flight + travel.hotel + (travel.food * travel.days)).toFixed(2);

    // 4. "Cafezinho" (Custo de pequenos hábitos)
    const [habit, setHabit] = useState({ cost: 0, freq: 0 });
    const calcHabit = () => (habit.cost * habit.freq * 30).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tooltip text="Descubra o custo real mensal de manter um carro, incluindo seguro, IPVA, manutenção e combustível.">
                <ToolCard title="Custo Mensal do Carro" icon={Car}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Combustível/Mês" onChange={e => setCar({ ...car, fuel: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <input type="number" placeholder="Seguro (Anual)" onChange={e => setCar({ ...car, insurance: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Custo Mensal Estimado</p>
                            <p className="text-xl font-bold text-primary">R$ {calcCarCost()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Liste todos os seus serviços de streaming, academia e clubes para ver quanto você gasta por mês em assinaturas.">
                <ToolCard title="Rastreador de Assinaturas" icon={CreditCard}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <input type="number" placeholder="Streaming" onChange={e => setSubs({ ...subs, netflix: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                            <input type="number" placeholder="Música" onChange={e => setSubs({ ...subs, spotify: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                            <input type="number" placeholder="Academia" onChange={e => setSubs({ ...subs, gym: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                            <input type="number" placeholder="Outros" onChange={e => setSubs({ ...subs, others: Number(e.target.value) })} className="bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Total Mensal</p>
                            <p className="text-xl font-bold text-primary">R$ {calcSubs()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Planeje sua próxima aventura estimando custos de passagens, hospedagem e alimentação por dia.">
                <ToolCard title="Orçamento de Viagem" icon={Plane}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Passagens" onChange={e => setTravel({ ...travel, flight: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <input type="number" placeholder="Hospedagem" onChange={e => setTravel({ ...travel, hotel: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Custo Total</p>
                            <p className="text-xl font-bold text-primary">R$ {calcTravel()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>

            <Tooltip text="Calcule o impacto financeiro de pequenos hábitos diários ou semanais, como o cafezinho ou lanches.">
                <ToolCard title="Custo de Hábitos" icon={Coffee}>
                    <div className="space-y-4">
                        <input type="number" placeholder="Custo Unitário" onChange={e => setHabit({ ...habit, cost: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <input type="number" placeholder="Vezes por Semana" onChange={e => setHabit({ ...habit, freq: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm text-white" />
                        <div className="p-3 bg-primary/10 rounded-xl text-center">
                            <p className="text-xs text-gray-400 uppercase">Custo Mensal (30 dias)</p>
                            <p className="text-xl font-bold text-primary">R$ {calcHabit()}</p>
                        </div>
                    </div>
                </ToolCard>
            </Tooltip>
        </div>
    );
}
