"use client";

import { DollarSign, RefreshCw, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const initialCurrencies = [
    { code: "USD", name: "Dólar Americano", symbol: "$", rate: 5.85 },
    { code: "EUR", name: "Euro", symbol: "€", rate: 6.35 },
    { code: "GBP", name: "Libra Esterlina", symbol: "£", rate: 7.42 },
    { code: "BRL", name: "Real Brasileiro", symbol: "R$", rate: 1 },
    { code: "CAD", name: "Dólar Canadense", symbol: "C$", rate: 4.20 },
    { code: "AUD", name: "Dólar Australiano", symbol: "A$", rate: 3.85 },
    { code: "JPY", name: "Iene Japonês", symbol: "¥", rate: 0.039 },
    { code: "CNY", name: "Yuan Chinês", symbol: "¥", rate: 0.81 },
    { code: "CHF", name: "Franco Suíço", symbol: "Fr", rate: 6.60 },
    { code: "ARS", name: "Peso Argentino", symbol: "$", rate: 0.006 },
    { code: "BTC", name: "Bitcoin", symbol: "₿", rate: 350000 },
    { code: "ETH", name: "Ethereum", symbol: "Ξ", rate: 18000 },
];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("100");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("BRL");
    const [result, setResult] = useState(0);
    const [rates, setRates] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,CAD-BRL,AUD-BRL,JPY-BRL,CNY-BRL,CHF-BRL,ARS-BRL,BTC-BRL,ETH-BRL");
                const data = await res.json();
                if (data && !data.status) {
                    const newRates: any = { BRL: 1 };
                    Object.keys(data).forEach(key => {
                        const code = key.replace("BRL", "");
                        if (data[key] && data[key].bid) {
                            newRates[code] = parseFloat(data[key].bid);
                        }
                    });
                    setRates(newRates);
                }
            } catch (error) {
                console.error("Error fetching rates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    useEffect(() => {
        const fromRate = rates?.[from] || initialCurrencies.find(c => c.code === from)?.rate || 1;
        const toRate = rates?.[to] || initialCurrencies.find(c => c.code === to)?.rate || 1;
        const value = parseFloat(amount) || 0;
        setResult((value * fromRate) / toRate);
    }, [amount, from, to, rates]);

    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <DollarSign className="text-primary" size={20} />
                    Conversor de Moedas
                </h3>
                {loading && <Loader2 size={16} className="text-primary animate-spin" />}
            </div>

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
                            {initialCurrencies.map(c => (
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
                            {initialCurrencies.map(c => (
                                <option key={c.code} value={c.code}>{c.symbol} {c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-400 mb-1">Resultado</div>
                    <div className="text-2xl font-bold text-primary">
                        {initialCurrencies.find(c => c.code === to)?.symbol} {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>

                <p className="text-[10px] text-gray-500 text-center uppercase tracking-wider">
                    {loading ? "Atualizando taxas..." : "Taxas atualizadas em tempo real via AwesomeAPI"}
                </p>
            </div>
        </div>
    );
}


