"use client";

import { DollarSign, RefreshCw, Loader2, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// Lista expandida de moedas mundiais
const allCurrencies = [
    { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
    { code: "USD", name: "Dólar Americano", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "Libra Esterlina", symbol: "£" },
    { code: "JPY", name: "Iene Japonês", symbol: "¥" },
    { code: "CHF", name: "Franco Suíço", symbol: "Fr" },
    { code: "CAD", name: "Dólar Canadense", symbol: "C$" },
    { code: "AUD", name: "Dólar Australiano", symbol: "A$" },
    { code: "CNY", name: "Yuan Chinês", symbol: "¥" },
    { code: "ARS", name: "Peso Argentino", symbol: "$" },
    { code: "CLP", name: "Peso Chileno", symbol: "$" },
    { code: "COP", name: "Peso Colombiano", symbol: "$" },
    { code: "MXN", name: "Peso Mexicano", symbol: "$" },
    { code: "PYG", name: "Guarani Paraguaio", symbol: "₲" },
    { code: "UYU", name: "Peso Uruguaio", symbol: "$" },
    { code: "PEN", name: "Sol Peruano", symbol: "S/" },
    { code: "BOB", name: "Boliviano", symbol: "Bs" },
    { code: "AED", name: "Dirham dos EAU", symbol: "د.إ" },
    { code: "SAR", name: "Riyal Saudita", symbol: "﷼" },
    { code: "ILS", name: "Shekel Israelense", symbol: "₪" },
    { code: "INR", name: "Rupia Indiana", symbol: "₹" },
    { code: "KRW", name: "Won Sul-Coreano", symbol: "₩" },
    { code: "RUB", name: "Rublo Russo", symbol: "₽" },
    { code: "TRY", name: "Lira Turca", symbol: "₺" },
    { code: "ZAR", name: "Rand Sul-Africano", symbol: "R" },
    { code: "NZD", name: "Dólar Neozelandês", symbol: "$" },
    { code: "SGD", name: "Dólar de Singapura", symbol: "$" },
    { code: "HKD", name: "Dólar de Hong Kong", symbol: "$" },
    { code: "NOK", name: "Coroa Norueguesa", symbol: "kr" },
    { code: "SEK", name: "Coroa Sueca", symbol: "kr" },
    { code: "DKK", name: "Coroa Dinamarquesa", symbol: "kr" },
    { code: "BTC", name: "Bitcoin", symbol: "₿" },
    { code: "ETH", name: "Ethereum", symbol: "Ξ" },
    { code: "USDT", name: "Tether", symbol: "₮" },
];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("100");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("BRL");
    const [result, setResult] = useState(0);
    const [rates, setRates] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch rates from AwesomeAPI
    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            try {
                // AwesomeAPI permite buscar várias moedas em relação ao BRL
                const codes = allCurrencies
                    .filter(c => c.code !== "BRL")
                    .map(c => `${c.code}-BRL`)
                    .join(",");

                const res = await fetch(`https://economia.awesomeapi.com.br/json/last/${codes}`);
                const data = await res.json();

                if (data) {
                    const newRates: any = { BRL: 1 };
                    Object.keys(data).forEach(key => {
                        const code = key.replace("BRL", "");
                        if (data[key] && data[key].bid) {
                            newRates[code] = parseFloat(data[key].bid);
                        }
                    });
                    setRates(newRates);
                    setError("");
                }
            } catch (err) {
                console.error("Error fetching rates:", err);
                setError("Erro ao carregar taxas. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
        const interval = setInterval(fetchRates, 60000); // Atualiza a cada minuto
        return () => clearInterval(interval);
    }, []);

    // Calculate conversion
    useEffect(() => {
        if (!rates[from] && from !== "BRL") return;
        if (!rates[to] && to !== "BRL") return;

        const value = parseFloat(amount) || 0;
        const fromInBrl = from === "BRL" ? 1 : rates[from];
        const toInBrl = to === "BRL" ? 1 : rates[to];

        if (fromInBrl && toInBrl) {
            const converted = (value * fromInBrl) / toInBrl;
            setResult(converted);
        }
    }, [amount, from, to, rates]);

    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="text-primary" size={24} />
                    Conversor Global
                </h3>
                {loading && <Loader2 size={20} className="text-primary animate-spin" />}
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-sm text-center">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Valor para converter</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                            {allCurrencies.find(c => c.code === from)?.symbol}
                        </span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-xl font-bold outline-none focus:border-primary/50 transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold">De</label>
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-primary/50 appearance-none cursor-pointer"
                        >
                            {allCurrencies.map(c => (
                                <option key={c.code} value={c.code} className="bg-card text-white">
                                    {c.code} - {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={swap}
                        className="w-12 h-12 bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center justify-center transition-all border border-primary/20 self-end md:self-center mx-auto"
                        title="Inverter moedas"
                    >
                        <RefreshCw size={20} />
                    </button>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold">Para</label>
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-primary/50 appearance-none cursor-pointer"
                        >
                            {allCurrencies.map(c => (
                                <option key={c.code} value={c.code} className="bg-card text-white">
                                    {c.code} - {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 rounded-[2rem] p-8 text-center space-y-2">
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">Resultado Convertido</p>
                    <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        <span className="text-primary mr-2">{allCurrencies.find(c => c.code === to)?.symbol}</span>
                        {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs text-gray-500 font-bold uppercase mt-4">
                        1 {from} = {((from === "BRL" ? 1 : rates[from]) / (to === "BRL" ? 1 : rates[to])).toFixed(4)} {to}
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                    {loading ? "Sincronizando taxas mundiais..." : "Taxas atualizadas em tempo real via AwesomeAPI"}
                </div>
            </div>
        </div>
    );
}

import { Globe } from "lucide-react";



