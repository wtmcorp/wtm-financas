<<<<<<< HEAD
"use client";

import { Lightbulb, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExtraIncomeIdeas from "./ExtraIncomeIdeas";

interface Hack {
    title: string;
    description: string;
    icon: any;
    color: string;
    details: string[];
    component?: React.ReactNode;
}

const hacks: Hack[] = [
    {
        title: "Negociação de Dívidas",
        description: "Como conseguir até 90% de desconto no banco.",
        icon: ShieldCheck,
        color: "text-green-400",
        details: [
            "Espere a dívida 'caducar' internamente (após 6 meses a 1 ano) para receber as melhores ofertas.",
            "Use o site 'Serasa Limpa Nome' ou 'Acordo Certo' em vez de falar direto com o gerente.",
            "Frase mágica: 'Eu quero pagar, mas só tenho X valor à vista. É pegar ou largar.'",
            "Peça sempre o VET (Valor Efetivo Total) para ver se não embutiram seguros."
        ]
    },
    {
        title: "Cartão de Crédito",
        description: "Transforme o vilão em aliado.",
        icon: AlertTriangle,
        color: "text-red-400",
        details: [
            "Nunca pague o mínimo. Se não tiver o total, parcele a fatura (juros menores que o rotativo).",
            "Concentre gastos em um cartão que pontue milhas ou dê cashback.",
            "Altere a data de vencimento para 2 dias após seu salário cair.",
            "Use o cartão para organizar o fluxo de caixa, não para gastar o que não tem."
        ]
    },
    {
        title: "Renda Extra Rápida",
        description: "Dinheiro no bolso em 24h.",
        icon: TrendingUp,
        color: "text-yellow-400",
        details: [],
        component: <ExtraIncomeIdeas />
    }
];

export default function FinancialHacks() {
    const [selectedHack, setSelectedHack] = useState<number | null>(null);

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="text-yellow-400" size={24} />
                Macetes Financeiros
            </h3>
            <div className="grid gap-4">
                {hacks.map((hack, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setSelectedHack(selectedHack === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full bg-white/5 ${hack.color}`}>
                                    <hack.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{hack.title}</h4>
                                    <p className="text-xs text-gray-400">{hack.description}</p>
                                </div>
                            </div>
                            <span className="text-gray-500 text-xl">
                                {selectedHack === index ? "−" : "+"}
                            </span>
                        </button>
                        <AnimatePresence>
                            {selectedHack === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4"
                                >
                                    {hack.component ? (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            {hack.component}
                                        </div>
                                    ) : (
                                        <ul className="space-y-2 mt-2 border-t border-white/10 pt-4">
                                            {hack.details.map((detail, i) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                                    <span className="text-primary mt-1">•</span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
=======
"use client";

import { Lightbulb, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExtraIncomeIdeas from "./ExtraIncomeIdeas";

interface Hack {
    title: string;
    description: string;
    icon: any;
    color: string;
    details: string[];
    component?: React.ReactNode;
}

const hacks: Hack[] = [
    {
        title: "Negociação de Dívidas",
        description: "Como conseguir até 90% de desconto no banco.",
        icon: ShieldCheck,
        color: "text-green-400",
        details: [
            "Espere a dívida 'caducar' internamente (após 6 meses a 1 ano) para receber as melhores ofertas.",
            "Use o site 'Serasa Limpa Nome' ou 'Acordo Certo' em vez de falar direto com o gerente.",
            "Frase mágica: 'Eu quero pagar, mas só tenho X valor à vista. É pegar ou largar.'",
            "Peça sempre o VET (Valor Efetivo Total) para ver se não embutiram seguros."
        ]
    },
    {
        title: "Cartão de Crédito",
        description: "Transforme o vilão em aliado.",
        icon: AlertTriangle,
        color: "text-red-400",
        details: [
            "Nunca pague o mínimo. Se não tiver o total, parcele a fatura (juros menores que o rotativo).",
            "Concentre gastos em um cartão que pontue milhas ou dê cashback.",
            "Altere a data de vencimento para 2 dias após seu salário cair.",
            "Use o cartão para organizar o fluxo de caixa, não para gastar o que não tem."
        ]
    },
    {
        title: "Renda Extra Rápida",
        description: "Dinheiro no bolso em 24h.",
        icon: TrendingUp,
        color: "text-yellow-400",
        details: [],
        component: <ExtraIncomeIdeas />
    }
];

export default function FinancialHacks() {
    const [selectedHack, setSelectedHack] = useState<number | null>(null);

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="text-yellow-400" size={24} />
                Macetes Financeiros
            </h3>
            <div className="grid gap-4">
                {hacks.map((hack, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setSelectedHack(selectedHack === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full bg-white/5 ${hack.color}`}>
                                    <hack.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{hack.title}</h4>
                                    <p className="text-xs text-gray-400">{hack.description}</p>
                                </div>
                            </div>
                            <span className="text-gray-500 text-xl">
                                {selectedHack === index ? "−" : "+"}
                            </span>
                        </button>
                        <AnimatePresence>
                            {selectedHack === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4"
                                >
                                    {hack.component ? (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            {hack.component}
                                        </div>
                                    ) : (
                                        <ul className="space-y-2 mt-2 border-t border-white/10 pt-4">
                                            {hack.details.map((detail, i) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                                    <span className="text-primary mt-1">•</span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
