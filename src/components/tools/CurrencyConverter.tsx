"use client";

import { DollarSign, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

const currencies = [
    { code: "USD", name: "Dólar Americano", symbol: "$", rate: 5.85 },
    { code: "EUR", name: "Euro", symbol: "€", rate: 6.35 },
    { code: "GBP", name: "Libra Esterlina", symbol: "£", rate: 7.42 },
    { code: "BRL", name: "Real Brasileiro", symbol: "R$", rate: 1 },
];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("100");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("BRL");
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fromRate = currencies.find(c => c.code === from)?.rate || 1;
        const toRate = currencies.find(c => c.code === to)?.rate || 1;
        const value = parseFloat(amount) || 0;
        setResult((value * fromRate) / toRate);
    }, [amount, from, to]);

    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="text-primary" size={20} />
                Conversor de Moedas
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Valor</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">De</label>
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        >
                            {currencies.map(c => (
                                <option key={c.code} value={c.code}>{c.symbol} {c.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={swap}
                        className="p-3 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors mb-0"
                    >
                        <RefreshCw size={18} />
                    </button>

                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Para</label>
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50"
                        >
                            {currencies.map(c => (
                                <option key={c.code} value={c.code}>{c.symbol} {c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-400 mb-1">Resultado</div>
                    <div className="text-2xl font-bold text-primary">
                        {currencies.find(c => c.code === to)?.symbol} {result.toFixed(2)}
                    </div>
                </div>

                <p className="text-xs text-gray-500 text-center">
                    Taxas de câmbio aproximadas. Consulte seu banco para valores exatos.
                </p>
            </div>
        </div>
    );
}
