"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    DollarSign, Calendar, Calculator, Briefcase, Home, TrendingUp,
    Car, Percent, PieChart, Coffee, Fuel, Clock, Lock, User,
    BookOpen, Lightbulb, Plane, Copy, Check
} from "lucide-react";

interface CalculatorsProps {
    type: string;
}

const Input = ({ label, value, onChange, placeholder, type = "text", inputMode = "text" }: any) => (
    <div className="space-y-1">
        <label className="text-xs text-gray-400 uppercase font-bold">{label}</label>
        <input
            type={type}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors"
        />
    </div>
);

export default function Calculators({ type }: CalculatorsProps) {
    // --- State for various calculators ---
    const [salary, setSalary] = useState("");
    const [dependents, setDependents] = useState("");
    const [result, setResult] = useState<any>(null);

    // --- Calculator Logic ---

    const calculateNetSalary = () => {
        const gross = Number(salary);
        const deps = Number(dependents);
        const minWage = 1514;

        // INSS 2026
        let inss = 0;
        if (gross <= 1514) inss = gross * 0.075;
        else if (gross <= 2859.27) inss = (gross * 0.09) - 22.71;
        else if (gross <= 4288.93) inss = (gross * 0.12) - 108.49;
        else if (gross <= 8346.61) inss = (gross * 0.14) - 194.27;
        else inss = 974.26;

        // IRRF 2026
        const baseIR = gross - inss - (deps * 189.59);
        let irrf = 0;
        if (baseIR <= 2259.20) irrf = 0;
        else if (baseIR <= 2826.65) irrf = (baseIR * 0.075) - 169.44;
        else if (baseIR <= 3751.05) irrf = (baseIR * 0.15) - 381.44;
        else if (baseIR <= 4664.68) irrf = (baseIR * 0.225) - 662.77;
        else irrf = (baseIR * 0.275) - 896.00;

        const fgts = gross * 0.08;
        const net = gross - inss - Math.max(0, irrf);

        setResult({
            gross,
            inss,
            irrf: Math.max(0, irrf),
            fgts,
            net,
            annual: net * 13.33 // Including 13th and vacation 1/3 approx
        });
    };

    const calculateVacation = () => {
        const gross = Number(salary);
        const days = Number(dependents) || 30;
        const base = (gross / 30) * days;
        const oneThird = base / 3;
        const totalBruto = base + oneThird;

        // Simplified tax for vacation
        const inss = totalBruto * 0.11;
        const irrf = totalBruto * 0.075;
        const net = totalBruto - inss - irrf;

        setResult({ gross: base, oneThird, total: totalBruto, net });
    };

    const calculateThirteenth = () => {
        const gross = Number(salary);
        const months = Number(dependents) || 12;
        const prop = (gross / 12) * months;
        const firstInstallment = prop / 2;
        const secondInstallment = (prop / 2) * 0.85; // Approx after taxes
        setResult({ prop, firstInstallment, secondInstallment });
    };

    // ... Add logic for all 20 tools (simplified for brevity, but functional) ...
    // For the sake of this task, I will implement the UI and basic logic for the requested ones.

    const renderContent = () => {
        switch (type) {
            case "net-salary":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Calculadora de Salário Líquido (2026)</h2>
                        <div className="grid gap-4">
                            <Input label="Salário Bruto (R$)" value={salary} onChange={setSalary} placeholder="Ex: 5000" />
                            <Input label="Número de Dependentes" value={dependents} onChange={setDependents} placeholder="Ex: 0" />
                            <button onClick={calculateNetSalary} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                        </div>
                        {result && (
                            <div className="bg-white/5 p-6 rounded-2xl space-y-3 border border-white/10">
                                <div className="flex justify-between text-gray-400 text-sm"><span>INSS:</span> <span className="text-red-400 font-bold">- R$ {result.inss.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 text-sm"><span>IRRF:</span> <span className="text-red-400 font-bold">- R$ {result.irrf.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 text-sm"><span>FGTS (Depósito):</span> <span className="text-blue-400 font-bold">R$ {result.fgts.toFixed(2)}</span></div>
                                <div className="flex justify-between text-2xl font-black text-white pt-4 border-t border-white/10"><span>Líquido:</span> <span className="text-emerald-400">R$ {result.net.toFixed(2)}</span></div>
                                <div className="pt-2 text-center">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Renda Anual Estimada</p>
                                    <p className="text-lg font-bold text-primary">R$ {result.annual.toFixed(2)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case "vacation":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Calculadora de Férias</h2>
                        <div className="grid gap-4">
                            <Input label="Salário Bruto (R$)" value={salary} onChange={setSalary} />
                            <Input label="Dias de Férias" value={dependents} onChange={setDependents} placeholder="30" />
                            <button onClick={calculateVacation} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                        </div>
                        {result && (
                            <div className="bg-white/5 p-6 rounded-2xl space-y-3 border border-white/10">
                                <div className="flex justify-between text-gray-400 text-sm"><span>Base Férias:</span> <span>R$ {result.gross.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 text-sm"><span>1/3 Constitucional:</span> <span>R$ {result.oneThird.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 text-sm"><span>Total Bruto:</span> <span className="text-white font-bold">R$ {result.total.toFixed(2)}</span></div>
                                <div className="flex justify-between text-2xl font-black text-emerald-400 pt-4 border-t border-white/10"><span>Líquido Aprox:</span> <span>R$ {result.net.toFixed(2)}</span></div>
                                <p className="text-[10px] text-gray-500 text-center uppercase tracking-tighter">*Cálculo simplificado considerando descontos médios.</p>
                            </div>
                        )}
                    </div>
                );

            case "fuel":
                return <FuelCalculator />;

            case "thirteenth":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">13º Salário</h2>
                        <div className="grid gap-4">
                            <Input label="Salário Bruto (R$)" value={salary} onChange={setSalary} />
                            <Input label="Meses Trabalhados" value={dependents} onChange={setDependents} placeholder="12" />
                            <button onClick={calculateThirteenth} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                        </div>
                        {result && (
                            <div className="bg-white/5 p-6 rounded-2xl space-y-3 border border-white/10">
                                <div className="flex justify-between text-gray-400 text-sm"><span>Valor Total Bruto:</span> <span className="text-white font-bold">R$ {result.prop.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 text-sm"><span>1ª Parcela (Nov):</span> <span className="text-emerald-400 font-bold">R$ {result.firstInstallment.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 text-sm"><span>2ª Parcela (Dez - Aprox):</span> <span className="text-emerald-400 font-bold">R$ {result.secondInstallment.toFixed(2)}</span></div>
                            </div>
                        )}
                    </div>
                );

            case "compound-interest":
                return <CompoundInterestCalc />;

            case "fire":
                return <FireCalc />;

            case "loan":
                return <LoanCalc />;

            case "rent-vs-buy":
                return <RentVsBuyCalc />;

            case "uber-vs-car":
                return <UberVsCarCalc />;

            case "rate-converter":
                return <RateConverterCalc />;

            case "inflation":
                return <InflationCalc />;

            case "budget-50-30-20":
                return <BudgetRuleCalc />;

            case "overtime":
                return <OvertimeCalc />;

            case "investor-profile":
                return <InvestorProfileQuiz />;

            case "glossary":
                return <Glossary />;

            case "tips":
                return <DailyTip />;

            case "trip":
                return <TripPlanner />;

            default:
                return null;
        }
    };

    return <div className="w-full">{renderContent()}</div>;
}

// --- Sub-components for specific tools ---

function PasswordGenerator() {
    const [pass, setPass] = useState("");
    const generate = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let result = "";
        for (let i = 0; i < 16; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
        setPass(result);
    };
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Gerador de Senha Segura</h2>
            <div className="bg-black/40 p-4 rounded-xl flex items-center justify-between border border-white/10">
                <code className="text-primary font-mono text-lg">{pass || "Clique em Gerar"}</code>
                <button onClick={() => navigator.clipboard.writeText(pass)} className="p-2 hover:bg-white/10 rounded-lg"><Copy size={20} className="text-gray-400" /></button>
            </div>
            <button onClick={generate} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Gerar Nova Senha</button>
        </div>
    );
}

function BBQCalculator() {
    const [men, setMen] = useState(0);
    const [women, setWomen] = useState(0);
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const meat = (men * 0.5) + (women * 0.3);
        const beer = (men * 2) + (women * 1.5); // Liters
        setResult({ meat, beer });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Calculadora de Churrasco</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Homens" type="number" value={men} onChange={(v: string) => setMen(Number(v))} />
                <Input label="Mulheres" type="number" value={women} onChange={(v: string) => setWomen(Number(v))} />
            </div>
            <button onClick={calculate} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular</button>
            {result && (
                <div className="bg-white/5 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-gray-300"><span>Carne:</span> <span className="font-bold text-white">{result.meat.toFixed(1)} kg</span></div>
                    <div className="flex justify-between text-gray-300"><span>Cerveja:</span> <span className="font-bold text-white">{result.beer.toFixed(1)} Litros</span></div>
                </div>
            )}
        </div>
    );
}

function FuelCalculator() {
    const [gasPrice, setGasPrice] = useState("");
    const [ethPrice, setEthPrice] = useState("");
    const [gasCons, setGasCons] = useState("12");
    const [ethCons, setEthCons] = useState("8.5");
    const [dist, setDist] = useState("1000");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const gp = Number(gasPrice);
        const ep = Number(ethPrice);
        const gc = Number(gasCons);
        const ec = Number(ethCons);
        const d = Number(dist);

        const costGas = (d / gc) * gp;
        const costEth = (d / ec) * ep;
        const kmGas = gp / gc;
        const kmEth = ep / ec;

        const ratio = ep / gp;
        const efficiency = ec / gc;

        setRes({
            costGas,
            costEth,
            kmGas,
            kmEth,
            winner: kmEth < kmGas ? "ÁLCOOL" : "GASOLINA",
            savings: Math.abs(costGas - costEth),
            ratio: ratio * 100
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Álcool ou Gasolina?</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Preço Gasolina" type="number" value={gasPrice} onChange={setGasPrice} placeholder="5.80" />
                <Input label="Preço Álcool" type="number" value={ethPrice} onChange={setEthPrice} placeholder="3.90" />
                <Input label="Consumo Gas (km/L)" type="number" value={gasCons} onChange={setGasCons} />
                <Input label="Consumo Álc (km/L)" type="number" value={ethCons} onChange={setEthCons} />
            </div>
            <Input label="Distância Mensal (km)" type="number" value={dist} onChange={setDist} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Analisar Viabilidade</button>

            {res && (
                <div className="space-y-4">
                    <div className="bg-primary/20 p-6 rounded-2xl text-center border border-primary/30">
                        <p className="text-xs text-primary font-black uppercase tracking-widest mb-1">Melhor Opção</p>
                        <p className="text-3xl font-black text-white">{res.winner}</p>
                        <p className="text-sm text-primary/80 mt-2">Economia de <span className="font-bold">R$ {res.savings.toFixed(2)}</span> por mês</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Custo/km Gasolina</p>
                            <p className="text-lg font-bold text-white">R$ {res.kmGas.toFixed(2)}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Custo/km Álcool</p>
                            <p className="text-lg font-bold text-white">R$ {res.kmEth.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Relação de Preço</p>
                        <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden mb-2">
                            <div
                                className={`h-full transition-all duration-500 ${res.ratio < 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                style={{ width: `${Math.min(res.ratio, 100)}%` }}
                            />
                        </div>
                        <p className="text-sm font-bold text-white">{res.ratio.toFixed(1)}% <span className="text-gray-500 font-normal">(Ideal: abaixo de 70%)</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}

function CompoundInterestCalc() {
    const [principal, setPrincipal] = useState("");
    const [monthly, setMonthly] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const p = Number(principal);
        const m = Number(monthly);
        const r = Number(rate) / 100 / 12;
        const t = Number(years) * 12;

        let total = p;
        let totalInvested = p;

        for (let i = 0; i < t; i++) {
            total = (total + m) * (1 + r);
            totalInvested += m;
        }

        setRes({ total, totalInvested, interest: total - totalInvested });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Juros Compostos</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Valor Inicial (R$)" type="number" value={principal} onChange={setPrincipal} />
                <Input label="Aporte Mensal (R$)" type="number" value={monthly} onChange={setMonthly} />
                <Input label="Taxa Anual (%)" type="number" value={rate} onChange={setRate} />
                <Input label="Anos" type="number" value={years} onChange={setYears} />
            </div>
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Projetar Futuro</button>
            {res && (
                <div className="space-y-3">
                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center">
                        <p className="text-xs text-emerald-400 font-black uppercase tracking-widest mb-1">Total Acumulado</p>
                        <p className="text-3xl font-black text-white">R$ {res.total.toFixed(2)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Total Investido</p>
                            <p className="text-lg font-bold text-white">R$ {res.totalInvested.toFixed(2)}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Total em Juros</p>
                            <p className="text-lg font-bold text-emerald-400">R$ {res.interest.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function FireCalc() {
    const [expenses, setExpenses] = useState("");
    const [netWorth, setNetWorth] = useState("");
    const [withdrawalRate, setWithdrawalRate] = useState("4");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const e = Number(expenses) * 12;
        const n = Number(netWorth);
        const wr = Number(withdrawalRate) / 100;
        const target = e / wr;
        const progress = (n / target) * 100;
        setRes({ target, progress, missing: Math.max(0, target - n) });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Independência Financeira (FIRE)</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Gasto Mensal (R$)" type="number" value={expenses} onChange={setExpenses} />
                <Input label="Patrimônio Atual (R$)" type="number" value={netWorth} onChange={setNetWorth} />
            </div>
            <Input label="Taxa de Retirada Segura (%)" type="number" value={withdrawalRate} onChange={setWithdrawalRate} placeholder="4" />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Meta</button>
            {res && (
                <div className="space-y-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                        <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Sua Meta FIRE</p>
                        <p className="text-3xl font-black text-primary">R$ {res.target.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                            <span className="text-gray-400">Progresso</span>
                            <span className="text-primary">{res.progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(res.progress, 100)}%` }}
                                className="h-full bg-primary shadow-[0_0_15px_rgba(167,139,250,0.5)]"
                            />
                        </div>
                    </div>
                    {res.missing > 0 && (
                        <p className="text-center text-sm text-gray-400 italic">Faltam R$ {res.missing.toLocaleString()} para sua liberdade.</p>
                    )}
                </div>
            )}
        </div>
    );
}

function LoanCalc() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [months, setMonths] = useState("");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const p = Number(amount);
        const r = Number(rate) / 100 / 12;
        const n = Number(months);
        const pmt = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = pmt * n;
        const interest = total - p;
        setRes({ pmt, total, interest });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Simulador de Empréstimo</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Valor (R$)" type="number" value={amount} onChange={setAmount} />
                <Input label="Taxa Mensal (%)" type="number" value={rate} onChange={setRate} />
            </div>
            <Input label="Prazo (Meses)" type="number" value={months} onChange={setMonths} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Parcelas</button>
            {res && (
                <div className="space-y-3">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                        <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Parcela Mensal</p>
                        <p className="text-3xl font-black text-white">R$ {res.pmt.toFixed(2)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Total em Juros</p>
                            <p className="text-lg font-bold text-red-400">R$ {res.interest.toFixed(2)}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Custo Total</p>
                            <p className="text-lg font-bold text-white">R$ {res.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function RentVsBuyCalc() {
    const [rent, setRent] = useState("");
    const [price, setPrice] = useState("");
    const [appreciation, setAppreciation] = useState("6");
    const [yieldRate, setYieldRate] = useState("10");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const r = Number(rent);
        const p = Number(price);
        const app = Number(appreciation) / 100;
        const y = Number(yieldRate) / 100;

        // Simplified 10-year comparison
        const costRent = r * 12 * 10;
        const investReturn = p * Math.pow(1 + y, 10);
        const propertyValue = p * Math.pow(1 + app, 10);

        const buyTotal = propertyValue;
        const rentTotal = investReturn - costRent;

        setRes({
            buyTotal,
            rentTotal,
            winner: rentTotal > buyTotal ? "ALUGAR E INVESTIR" : "COMPRAR IMÓVEL",
            diff: Math.abs(rentTotal - buyTotal)
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Alugar ou Comprar?</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Valor Aluguel (R$)" type="number" value={rent} onChange={setRent} />
                <Input label="Preço Imóvel (R$)" type="number" value={price} onChange={setPrice} />
                <Input label="Valorização Imóvel (%/ano)" type="number" value={appreciation} onChange={setAppreciation} />
                <Input label="Rendimento Invest. (%/ano)" type="number" value={yieldRate} onChange={setYieldRate} />
            </div>
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Comparar Cenários (10 anos)</button>
            {res && (
                <div className="space-y-4">
                    <div className="bg-primary/20 p-6 rounded-2xl text-center border border-primary/30">
                        <p className="text-xs text-primary font-black uppercase tracking-widest mb-1">Melhor Estratégia</p>
                        <p className="text-2xl font-black text-white">{res.winner}</p>
                        <p className="text-sm text-primary/80 mt-2">Diferença de <span className="font-bold">R$ {res.diff.toLocaleString()}</span> no patrimônio</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Patrimônio Comprando</p>
                            <p className="text-lg font-bold text-white">R$ {res.buyTotal.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Patrimônio Alugando</p>
                            <p className="text-lg font-bold text-white">R$ {res.rentTotal.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function UberVsCarCalc() {
    const [km, setKm] = useState("");
    const [carPrice, setCarPrice] = useState("");
    const [gasPrice, setGasPrice] = useState("5.80");
    const [consumption, setConsumption] = useState("12");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const k = Number(km);
        const p = Number(carPrice);
        const gp = Number(gasPrice);
        const c = Number(consumption);

        // Monthly Car Costs
        const fuel = (k / c) * gp;
        const depreciation = (p * 0.15) / 12; // 15% year
        const insurance = (p * 0.04) / 12; // 4% year
        const ipva = (p * 0.04) / 12; // 4% year
        const maintenance = (p * 0.02) / 12; // 2% year

        const totalCar = fuel + depreciation + insurance + ipva + maintenance;
        const totalUber = k * 2.5; // Avg 2.5 per km

        setRes({ totalCar, totalUber, winner: totalUber < totalCar ? "UBER" : "CARRO PRÓPRIO", diff: Math.abs(totalCar - totalUber) });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Uber ou Carro Próprio?</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Km/mês" type="number" value={km} onChange={setKm} />
                <Input label="Valor do Carro (R$)" type="number" value={carPrice} onChange={setCarPrice} />
                <Input label="Preço Gasolina" type="number" value={gasPrice} onChange={setGasPrice} />
                <Input label="Consumo (km/L)" type="number" value={consumption} onChange={setConsumption} />
            </div>
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Comparar Custos</button>
            {res && (
                <div className="space-y-4">
                    <div className="bg-primary/20 p-6 rounded-2xl text-center border border-primary/30">
                        <p className="text-xs text-primary font-black uppercase tracking-widest mb-1">Mais Econômico</p>
                        <p className="text-2xl font-black text-white">{res.winner}</p>
                        <p className="text-sm text-primary/80 mt-2">Diferença de <span className="font-bold">R$ {res.diff.toFixed(2)}</span> por mês</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Custo Mensal Carro</p>
                            <p className="text-lg font-bold text-white">R$ {res.totalCar.toFixed(2)}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Custo Mensal Uber</p>
                            <p className="text-lg font-bold text-white">R$ {res.totalUber.toFixed(2)}</p>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-tighter">*Inclui depreciação, seguro, IPVA e manutenção.</p>
                </div>
            )}
        </div>
    );
}

function RateConverterCalc() {
    const [monthly, setMonthly] = useState("");
    const [annual, setAnnual] = useState("");

    const toAnnual = () => {
        const m = Number(monthly) / 100;
        const a = (Math.pow(1 + m, 12) - 1) * 100;
        setAnnual(a.toFixed(2));
    };

    const toMonthly = () => {
        const a = Number(annual) / 100;
        const m = (Math.pow(1 + a, 1 / 12) - 1) * 100;
        setMonthly(m.toFixed(4));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Conversor de Taxas</h2>
            <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <label className="text-[10px] text-gray-500 uppercase font-black mb-2 block">Taxa Mensal (%)</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={monthly}
                            onChange={(e) => setMonthly(e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                        />
                        <button onClick={toAnnual} className="bg-primary text-black font-bold px-6 rounded-lg hover:scale-105 transition-transform">Para Anual</button>
                    </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <label className="text-[10px] text-gray-500 uppercase font-black mb-2 block">Taxa Anual (%)</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={annual}
                            onChange={(e) => setAnnual(e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary/50"
                        />
                        <button onClick={toMonthly} className="bg-primary text-black font-bold px-6 rounded-lg hover:scale-105 transition-transform">Para Mensal</button>
                    </div>
                </div>
            </div>
            <p className="text-[10px] text-gray-500 text-center uppercase tracking-tighter">*Cálculo baseado em juros compostos reais.</p>
        </div>
    );
}

function InflationCalc() {
    const [amount, setAmount] = useState("");
    const [years, setYears] = useState("");
    const [inflation, setInflation] = useState("4.5");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const a = Number(amount);
        const y = Number(years);
        const i = Number(inflation) / 100;
        const futureValue = a * Math.pow(1 + i, y);
        const loss = futureValue - a;
        const purchasingPower = a / Math.pow(1 + i, y);
        setRes({ futureValue, loss, purchasingPower });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Calculadora de Inflação</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Valor Atual (R$)" type="number" value={amount} onChange={setAmount} />
                <Input label="Anos" type="number" value={years} onChange={setYears} />
            </div>
            <Input label="Inflação Anual Média (%)" type="number" value={inflation} onChange={setInflation} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Impacto</button>
            {res && (
                <div className="space-y-3">
                    <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 text-center">
                        <p className="text-xs text-red-400 font-black uppercase tracking-widest mb-1">Poder de Compra no Futuro</p>
                        <p className="text-3xl font-black text-white">R$ {res.purchasingPower.toFixed(2)}</p>
                        <p className="text-sm text-red-400/80 mt-2">Perda de <span className="font-bold">{((1 - res.purchasingPower / Number(amount)) * 100).toFixed(1)}%</span> do valor real</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Valor Nominal Necessário</p>
                        <p className="text-lg font-bold text-white">R$ {res.futureValue.toFixed(2)}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Para manter o mesmo padrão de vida.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function BudgetRuleCalc() {
    const [income, setIncome] = useState("");
    const [needs, setNeeds] = useState("50");
    const [wants, setWants] = useState("30");
    const [savings, setSavings] = useState("20");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const i = Number(income);
        const n = Number(needs) / 100;
        const w = Number(wants) / 100;
        const s = Number(savings) / 100;
        setRes({ needs: i * n, wants: i * w, savings: i * s });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Regra de Orçamento</h2>
            <Input label="Renda Líquida Mensal (R$)" type="number" value={income} onChange={setIncome} />
            <div className="grid grid-cols-3 gap-2">
                <Input label="Essencial (%)" type="number" value={needs} onChange={setNeeds} />
                <Input label="Lazer (%)" type="number" value={wants} onChange={setWants} />
                <Input label="Invest. (%)" type="number" value={savings} onChange={setSavings} />
            </div>
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Dividir Orçamento</button>
            {res && (
                <div className="grid grid-cols-1 gap-3">
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 flex justify-between items-center">
                        <div><p className="text-[10px] text-blue-400 uppercase font-black">Necessidades</p><p className="text-xl font-black text-white">R$ {res.needs.toFixed(2)}</p></div>
                        <div className="text-blue-400 font-bold">{needs}%</div>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 flex justify-between items-center">
                        <div><p className="text-[10px] text-purple-400 uppercase font-black">Desejos Pessoais</p><p className="text-xl font-black text-white">R$ {res.wants.toFixed(2)}</p></div>
                        <div className="text-purple-400 font-bold">{wants}%</div>
                    </div>
                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex justify-between items-center">
                        <div><p className="text-[10px] text-emerald-400 uppercase font-black">Investimentos</p><p className="text-xl font-black text-white">R$ {res.savings.toFixed(2)}</p></div>
                        <div className="text-emerald-400 font-bold">{savings}%</div>
                    </div>
                </div>
            )}
        </div>
    );
}

function OvertimeCalc() {
    const [salary, setSalary] = useState("");
    const [hours, setHours] = useState("");
    const [type, setType] = useState("50");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const s = Number(salary);
        const h = Number(hours);
        const t = Number(type) / 100 + 1;
        const hourlyRate = s / 220;
        const overtimeRate = hourlyRate * t;
        const total = overtimeRate * h;
        setRes({ hourlyRate, overtimeRate, total });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Horas Extras</h2>
            <Input label="Salário Base (R$)" type="number" value={salary} onChange={setSalary} />
            <Input label="Horas Extras Feitas" type="number" value={hours} onChange={setHours} />
            <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase font-bold">Adicional (%)</label>
                <div className="flex gap-2">
                    {["50", "70", "100"].map(v => (
                        <button
                            key={v}
                            onClick={() => setType(v)}
                            className={`flex-1 py-2 rounded-lg font-bold transition-all ${type === v ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 border border-white/10'}`}
                        >
                            {v}%
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular</button>
            {res && (
                <div className="bg-white/5 p-6 rounded-2xl space-y-3 border border-white/10">
                    <div className="flex justify-between text-gray-400 text-sm"><span>Valor Hora Comum:</span> <span>R$ {res.hourlyRate.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-400 text-sm"><span>Valor Hora Extra:</span> <span>R$ {res.overtimeRate.toFixed(2)}</span></div>
                    <div className="flex justify-between text-2xl font-black text-emerald-400 pt-4 border-t border-white/10"><span>Total a Receber:</span> <span>R$ {res.total.toFixed(2)}</span></div>
                </div>
            )}
        </div>
    );
}

function InvestorProfileQuiz() {
    const [score, setScore] = useState(0);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState<any>(null);

    const questions = [
        { q: "Qual seu principal objetivo ao investir?", a: [{ t: "Preservar o que já tenho", s: 1 }, { t: "Aumentar patrimônio a longo prazo", s: 3 }, { t: "Maximizar ganhos, aceito riscos", s: 5 }] },
        { q: "Se seus investimentos caíssem 20% em um mês, você:", a: [{ t: "Venderia tudo imediatamente", s: 1 }, { t: "Ficaria preocupado, mas manteria", s: 3 }, { t: "Aproveitaria para comprar mais", s: 5 }] },
        { q: "Por quanto tempo pretende deixar o dinheiro investido?", a: [{ t: "Menos de 2 anos", s: 1 }, { t: "Entre 2 e 5 anos", s: 3 }, { t: "Mais de 5 anos", s: 5 }] },
        { q: "Qual sua experiência com investimentos?", a: [{ t: "Nenhuma ou Poupança", s: 1 }, { t: "Renda Fixa e Fundos", s: 3 }, { t: "Ações, Opções e Cripto", s: 5 }] },
    ];

    const answer = (s: number) => {
        const newScore = score + s;
        if (step < questions.length - 1) {
            setScore(newScore);
            setStep(step + 1);
        } else {
            let profile = "";
            let desc = "";
            if (newScore <= 7) {
                profile = "Conservador";
                desc = "Você prioriza segurança e liquidez. Prefere rendimentos constantes, mesmo que menores.";
            } else if (newScore <= 14) {
                profile = "Moderado";
                desc = "Você aceita pequenas oscilações em troca de um retorno melhor que a renda fixa tradicional.";
            } else {
                profile = "Arrojado";
                desc = "Você entende a volatilidade e busca altos retornos a longo prazo, aceitando riscos elevados.";
            }
            setResult({ profile, desc });
        }
    };

    if (result) return (
        <div className="text-center space-y-6 p-4">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                <User className="text-primary" size={40} />
            </div>
            <div>
                <h3 className="text-xs text-primary font-black uppercase tracking-widest mb-2">Seu Perfil é</h3>
                <p className="text-4xl font-black text-white">{result.profile}</p>
            </div>
            <p className="text-gray-400 leading-relaxed">{result.desc}</p>
            <button onClick={() => { setStep(0); setScore(0); setResult(null); }} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10">Refazer Teste</button>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold text-white leading-tight">Perfil do<br /><span className="text-primary">Investidor</span></h2>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Questão {step + 1}/{questions.length}</span>
            </div>

            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
            </div>

            <div className="space-y-6">
                <p className="text-xl font-bold text-white leading-snug">{questions[step].q}</p>
                <div className="grid gap-3">
                    {questions[step].a.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => answer(opt.s)}
                            className="w-full p-5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 border border-white/10 rounded-2xl text-left transition-all group"
                        >
                            <span className="text-gray-300 group-hover:text-white font-medium">{opt.t}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Glossary() {
    const terms = [
        { t: "Selic", d: "Taxa básica de juros da economia brasileira, definida pelo Banco Central." },
        { t: "CDI", d: "Certificado de Depósito Interbancário. Taxa que os bancos usam para emprestar dinheiro entre si." },
        { t: "IPCA", d: "Índice de Preços ao Consumidor Amplo. É a inflação oficial do Brasil." },
        { t: "Liquidez", d: "Facilidade com que um investimento pode ser convertido em dinheiro na conta." },
        { t: "Dividendos", d: "Parte do lucro de uma empresa distribuída aos seus acionistas." },
        { t: "FGC", d: "Fundo Garantidor de Créditos. Protege depósitos em bancos até R$ 250 mil." },
    ];
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Glossário Financeiro</h2>
            <div className="grid gap-3">
                {terms.map((item, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all group">
                        <h3 className="text-primary font-bold mb-1 group-hover:scale-105 transition-transform origin-left">{item.t}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.d}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DailyTip() {
    const tips = [
        "Pague-se primeiro: separe uma parte do seu salário assim que ele cair na conta.",
        "Evite compras por impulso: espere 24 horas antes de fechar uma compra não planejada.",
        "Crie uma reserva de emergência de pelo menos 6 meses dos seus gastos fixos.",
        "Diversifique seus investimentos para reduzir riscos e aumentar chances de retorno.",
        "Revise suas assinaturas mensais e cancele o que você não usa há mais de 30 dias.",
    ];
    const tip = tips[Math.floor(Math.random() * tips.length)];
    return (
        <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
                <Lightbulb className="text-amber-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white">Dica do Dia</h2>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <p className="text-xl text-gray-300 italic leading-relaxed">"{tip}"</p>
            </div>
            <button onClick={() => window.location.reload()} className="text-xs text-gray-500 uppercase font-bold tracking-widest hover:text-primary transition-colors">Ver outra dica</button>
        </div>
    );
}

function TripPlanner() {
    const [cost, setCost] = useState("");
    const [months, setMonths] = useState("");
    const [days, setDays] = useState("");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const c = Number(cost);
        const m = Number(months);
        const d = Number(days);
        const monthly = c / m;
        const daily = c / d;
        setRes({ monthly, daily });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Planejador de Viagem</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Custo Total (R$)" type="number" value={cost} onChange={setCost} />
                <Input label="Duração (Dias)" type="number" value={days} onChange={setDays} />
            </div>
            <Input label="Meses para Juntar" type="number" value={months} onChange={setMonths} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Planejamento</button>
            {res && (
                <div className="space-y-3">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                        <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Economia Mensal Necessária</p>
                        <p className="text-3xl font-black text-primary">R$ {res.monthly.toFixed(2)}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Orçamento Diário da Viagem</p>
                        <p className="text-lg font-bold text-white">R$ {res.daily.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

