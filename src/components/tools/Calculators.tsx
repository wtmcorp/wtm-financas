"use client";

import { useState } from "react";
import {
    DollarSign, Calendar, Calculator, Briefcase, Home, TrendingUp,
    Car, Percent, PieChart, Coffee, Fuel, Clock, Lock, User,
    BookOpen, Lightbulb, Plane, Copy, Check
} from "lucide-react";

interface CalculatorsProps {
    type: string;
}

export default function Calculators({ type }: CalculatorsProps) {
    // --- State for various calculators ---
    const [salary, setSalary] = useState("");
    const [dependents, setDependents] = useState("");
    const [result, setResult] = useState<any>(null);

    // Generic Input Helper
    const Input = ({ label, value, onChange, placeholder, type = "number" }: any) => (
        <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase font-bold">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors"
            />
        </div>
    );

    // --- Calculator Logic ---

    const calculateNetSalary = () => {
        const gross = Number(salary);
        let inss = 0;
        if (gross <= 1412) inss = gross * 0.075;
        else if (gross <= 2666.68) inss = gross * 0.09 - 21.18;
        else if (gross <= 4000.03) inss = gross * 0.12 - 101.18;
        else if (gross <= 7786.02) inss = gross * 0.14 - 181.18;
        else inss = 908.85;

        const baseIR = gross - inss - (Number(dependents) * 189.59);
        let irrf = 0;
        if (baseIR <= 2259.20) irrf = 0;
        else if (baseIR <= 2826.65) irrf = baseIR * 0.075 - 169.44;
        else if (baseIR <= 3751.05) irrf = baseIR * 0.15 - 381.44;
        else if (baseIR <= 4664.68) irrf = baseIR * 0.225 - 662.77;
        else irrf = baseIR * 0.275 - 896.00;

        setResult({
            gross,
            inss,
            irrf: Math.max(0, irrf),
            net: gross - inss - Math.max(0, irrf)
        });
    };

    const calculateVacation = () => {
        const gross = Number(salary);
        const oneThird = gross / 3;
        const total = gross + oneThird;
        // Simplified tax
        const net = total * 0.85; // Rough estimate
        setResult({ gross, oneThird, total, net });
    };

    const calculateThirteenth = () => {
        const gross = Number(salary);
        const months = Number(dependents) || 12; // Reusing dependents field for months
        const prop = (gross / 12) * months;
        setResult({ prop });
    };

    // ... Add logic for all 20 tools (simplified for brevity, but functional) ...
    // For the sake of this task, I will implement the UI and basic logic for the requested ones.

    const renderContent = () => {
        switch (type) {
            case "net-salary":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Calculadora de Salário Líquido (2024)</h2>
                        <div className="grid gap-4">
                            <Input label="Salário Bruto (R$)" value={salary} onChange={setSalary} placeholder="Ex: 5000" />
                            <Input label="Número de Dependentes" value={dependents} onChange={setDependents} placeholder="Ex: 0" />
                            <button onClick={calculateNetSalary} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                        </div>
                        {result && (
                            <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                <div className="flex justify-between text-gray-400"><span>INSS:</span> <span className="text-red-400">- R$ {result.inss.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400"><span>IRRF:</span> <span className="text-red-400">- R$ {result.irrf.toFixed(2)}</span></div>
                                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10"><span>Líquido:</span> <span className="text-green-400">R$ {result.net.toFixed(2)}</span></div>
                            </div>
                        )}
                    </div>
                );

            case "vacation":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Calculadora de Férias</h2>
                        <Input label="Salário Bruto (R$)" value={salary} onChange={setSalary} />
                        <button onClick={calculateVacation} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                        {result && (
                            <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                <div className="flex justify-between text-gray-400"><span>Salário:</span> <span>R$ {result.gross.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400"><span>1/3 Férias:</span> <span>R$ {result.oneThird.toFixed(2)}</span></div>
                                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10"><span>Total Bruto:</span> <span className="text-primary">R$ {result.total.toFixed(2)}</span></div>
                                <p className="text-xs text-gray-500 mt-2">*Valor líquido aproximado (descontos variam).</p>
                            </div>
                        )}
                    </div>
                );

            case "password":
                return <PasswordGenerator />;

            case "bbq":
                return <BBQCalculator />;

            case "fuel":
                return <FuelCalculator />;

            case "thirteenth":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">13º Salário</h2>
                        <Input label="Salário Bruto (R$)" value={salary} onChange={setSalary} />
                        <Input label="Meses Trabalhados" value={dependents} onChange={setDependents} placeholder="12" />
                        <button onClick={calculateThirteenth} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                        {result && (
                            <div className="bg-white/5 p-4 rounded-xl">
                                <div className="flex justify-between text-xl font-bold text-white"><span>Valor Bruto:</span> <span className="text-primary">R$ {result.prop.toFixed(2)}</span></div>
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
                return (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Ferramenta em desenvolvimento: {type}</p>
                    </div>
                );
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
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase">Homens</label>
                    <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setMen(Number(e.target.value))} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase">Mulheres</label>
                    <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setWomen(Number(e.target.value))} />
                </div>
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
    const [gas, setGas] = useState(0);
    const [eth, setEth] = useState(0);
    const [res, setRes] = useState("");

    const calc = () => {
        const ratio = eth / gas;
        if (ratio < 0.7) setRes("Abasteça com ÁLCOOL");
        else setRes("Abasteça com GASOLINA");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Álcool ou Gasolina?</h2>
            <div className="grid gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase">Preço Gasolina</label>
                    <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setGas(Number(e.target.value))} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase">Preço Álcool</label>
                    <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setEth(Number(e.target.value))} />
                </div>
            </div>
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular</button>
            {res && (
                <div className="bg-white/5 p-6 rounded-xl text-center">
                    <p className="text-xl font-black text-primary">{res}</p>
                </div>
            )}
        </div>
    );
}

function CompoundInterestCalc() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const p = Number(principal);
        const r = Number(rate) / 100;
        const t = Number(years);
        const amount = p * Math.pow((1 + r), t);
        setRes({ amount, interest: amount - p });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Juros Compostos</h2>
            <input type="number" placeholder="Valor Inicial (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setPrincipal(e.target.value)} />
            <input type="number" placeholder="Taxa Anual (%)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setRate(e.target.value)} />
            <input type="number" placeholder="Anos" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setYears(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular</button>
            {res && (
                <div className="bg-white/5 p-4 rounded-xl">
                    <div className="flex justify-between text-gray-300"><span>Total:</span> <span className="font-bold text-white">R$ {res.amount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-300"><span>Juros:</span> <span className="font-bold text-green-400">R$ {res.interest.toFixed(2)}</span></div>
                </div>
            )}
        </div>
    );
}

function FireCalc() {
    const [expenses, setExpenses] = useState("");
    const [netWorth, setNetWorth] = useState("");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const annualExp = Number(expenses) * 12;
        const target = annualExp * 25; // Rule of 25
        const current = Number(netWorth);
        const progress = (current / target) * 100;
        setRes({ target, progress });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Calculadora FIRE</h2>
            <p className="text-xs text-gray-400">Independência Financeira e Aposentadoria Precoce</p>
            <input type="number" placeholder="Gastos Mensais (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setExpenses(e.target.value)} />
            <input type="number" placeholder="Patrimônio Atual (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setNetWorth(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Meta</button>
            {res && (
                <div className="bg-white/5 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-gray-300"><span>Meta FIRE:</span> <span className="font-bold text-white">R$ {res.target.toLocaleString()}</span></div>
                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${Math.min(100, res.progress)}%` }} />
                    </div>
                    <p className="text-center text-xs text-primary">{res.progress.toFixed(1)}% Concluído</p>
                </div>
            )}
        </div>
    );
}

function LoanCalc() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [months, setMonths] = useState("");
    const [pmt, setPmt] = useState(0);

    const calc = () => {
        const p = Number(amount);
        const r = Number(rate) / 100;
        const n = Number(months);
        const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setPmt(payment);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Simulador de Financiamento</h2>
            <input type="number" placeholder="Valor do Empréstimo (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setAmount(e.target.value)} />
            <input type="number" placeholder="Taxa Mensal (%)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setRate(e.target.value)} />
            <input type="number" placeholder="Prazo (Meses)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setMonths(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Parcela</button>
            {pmt > 0 && (
                <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-400 text-sm">Parcela Mensal</p>
                    <p className="text-2xl font-bold text-white">R$ {pmt.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

function RentVsBuyCalc() {
    const [rent, setRent] = useState("");
    const [price, setPrice] = useState("");
    const [result, setResult] = useState("");

    const calc = () => {
        const r = Number(rent);
        const p = Number(price);
        const ratio = (r / p) * 100;
        if (ratio > 0.5) setResult("Vale mais a pena COMPRAR (Aluguel caro)");
        else setResult("Vale mais a pena ALUGAR (Invista a diferença)");
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Alugar ou Comprar?</h2>
            <input type="number" placeholder="Valor do Aluguel (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setRent(e.target.value)} />
            <input type="number" placeholder="Preço do Imóvel (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setPrice(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular</button>
            {result && <div className="bg-white/5 p-4 rounded-xl text-center font-bold text-primary">{result}</div>}
        </div>
    );
}

function UberVsCarCalc() {
    const [km, setKm] = useState("");
    const [uberPrice, setUberPrice] = useState(""); // Price per km avg
    const [carCost, setCarCost] = useState(""); // Monthly fixed cost
    const [res, setRes] = useState("");

    const calc = () => {
        const k = Number(km);
        const u = Number(uberPrice) || 2.5; // Default 2.5/km
        const c = Number(carCost);
        const uberTotal = k * u;
        const carTotal = c + (k * 0.5); // Fuel approx
        if (uberTotal < carTotal) setRes(`Uber é mais barato (R$ ${uberTotal.toFixed(0)} vs R$ ${carTotal.toFixed(0)})`);
        else setRes(`Carro é mais barato (R$ ${carTotal.toFixed(0)} vs R$ ${uberTotal.toFixed(0)})`);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Uber ou Carro Próprio?</h2>
            <input type="number" placeholder="Km rodados por mês" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setKm(e.target.value)} />
            <input type="number" placeholder="Custo fixo Carro (IPVA/Seguro/Deprec) mensal" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setCarCost(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Comparar</button>
            {res && <div className="bg-white/5 p-4 rounded-xl text-center font-bold text-primary">{res}</div>}
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

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Conversor de Taxas</h2>
            <div className="space-y-2">
                <label className="text-xs text-gray-400">Taxa Mensal (%)</label>
                <div className="flex gap-2">
                    <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    <button onClick={toAnnual} className="bg-primary text-black font-bold px-4 rounded-xl">→</button>
                </div>
            </div>
            {annual && <div className="text-center text-xl font-bold text-white">Anual: {annual}%</div>}
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
        setRes(futureValue);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Calculadora de Inflação</h2>
            <input type="number" placeholder="Valor Atual (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setAmount(e.target.value)} />
            <input type="number" placeholder="Anos" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setYears(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Valor Futuro</button>
            {res && <div className="text-center text-xl font-bold text-white">Daqui a {years} anos: R$ {res.toFixed(2)}</div>}
        </div>
    );
}

function BudgetRuleCalc() {
    const [income, setIncome] = useState("");
    const [res, setRes] = useState<any>(null);

    const calc = () => {
        const i = Number(income);
        setRes({ needs: i * 0.5, wants: i * 0.3, savings: i * 0.2 });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Regra 50/30/20</h2>
            <input type="number" placeholder="Renda Líquida Mensal (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setIncome(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Divisão</button>
            {res && (
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-blue-500/20 p-2 rounded-lg"><p className="text-xs text-blue-400">Necessidades</p><p className="font-bold text-white">R$ {res.needs}</p></div>
                    <div className="bg-purple-500/20 p-2 rounded-lg"><p className="text-xs text-purple-400">Desejos</p><p className="font-bold text-white">R$ {res.wants}</p></div>
                    <div className="bg-green-500/20 p-2 rounded-lg"><p className="text-xs text-green-400">Investimentos</p><p className="font-bold text-white">R$ {res.savings}</p></div>
                </div>
            )}
        </div>
    );
}

function OvertimeCalc() {
    const [salary, setSalary] = useState("");
    const [hours, setHours] = useState("");
    const [res, setRes] = useState("");

    const calc = () => {
        const s = Number(salary);
        const h = Number(hours);
        const hourlyRate = s / 220;
        const overtimeRate = hourlyRate * 1.5;
        const total = overtimeRate * h;
        setRes(total.toFixed(2));
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Horas Extras (50%)</h2>
            <input type="number" placeholder="Salário Base (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setSalary(e.target.value)} />
            <input type="number" placeholder="Horas Extras Feitas" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setHours(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular</button>
            {res && <div className="text-center text-xl font-bold text-white">Valor a Receber: R$ {res}</div>}
        </div>
    );
}

function InvestorProfileQuiz() {
    const [score, setScore] = useState(0);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState("");

    const questions = [
        { q: "Qual seu objetivo?", a: [{ t: "Preservar capital", s: 1 }, { t: "Crescer a longo prazo", s: 3 }, { t: "Ficar rico rápido", s: 5 }] },
        { q: "O que faria se a bolsa caísse 50%?", a: [{ t: "Venderia tudo", s: 1 }, { t: "Não faria nada", s: 3 }, { t: "Compraria mais", s: 5 }] },
        { q: "Por quanto tempo pretende investir?", a: [{ t: "Menos de 1 ano", s: 1 }, { t: "1 a 5 anos", s: 3 }, { t: "Mais de 10 anos", s: 5 }] },
    ];

    const answer = (s: number) => {
        const newScore = score + s;
        if (step < questions.length - 1) {
            setScore(newScore);
            setStep(step + 1);
        } else {
            if (newScore <= 5) setResult("Conservador");
            else if (newScore <= 10) setResult("Moderado");
            else setResult("Arrojado");
        }
    };

    if (result) return <div className="text-center text-2xl font-bold text-white p-8">Seu perfil é: <span className="text-primary">{result}</span></div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Teste de Perfil</h2>
            <p className="text-lg text-gray-300">{questions[step].q}</p>
            <div className="space-y-2">
                {questions[step].a.map((opt, i) => (
                    <button key={i} onClick={() => answer(opt.s)} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                        {opt.t}
                    </button>
                ))}
            </div>
        </div>
    );
}

function Glossary() {
    const terms = [
        { t: "Selic", d: "Taxa básica de juros da economia brasileira." },
        { t: "CDI", d: "Certificado de Depósito Interbancário, referência para renda fixa." },
        { t: "IPCA", d: "Índice oficial de inflação do Brasil." },
        { t: "Day Trade", d: "Operação de compra e venda no mesmo dia." },
        { t: "Dividendos", d: "Parte do lucro das empresas distribuída aos acionistas." },
    ];
    const [search, setSearch] = useState("");
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Glossário Financeiro</h2>
            <input type="text" placeholder="Buscar termo..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setSearch(e.target.value.toLowerCase())} />
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {terms.filter(t => t.t.toLowerCase().includes(search)).map((t, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-lg">
                        <span className="font-bold text-primary">{t.t}</span>: <span className="text-gray-400 text-sm">{t.d}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DailyTip() {
    const tips = [
        "Pague suas dívidas mais caras primeiro.",
        "Tenha uma reserva de emergência de pelo menos 6 meses.",
        "Diversifique seus investimentos.",
        "Evite compras por impulso, espere 24h.",
        "Invista em conhecimento, rende os melhores juros.",
    ];
    return (
        <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Dica do Dia</h2>
            <p className="text-xl text-primary italic">"{tips[Math.floor(Math.random() * tips.length)]}"</p>
        </div>
    );
}

function TripPlanner() {
    const [cost, setCost] = useState("");
    const [months, setMonths] = useState("");
    const [res, setRes] = useState("");

    const calc = () => {
        const c = Number(cost);
        const m = Number(months);
        setRes((c / m).toFixed(2));
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Planejador de Viagem</h2>
            <input type="number" placeholder="Custo Total da Viagem (R$)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setCost(e.target.value)} />
            <input type="number" placeholder="Meses até a viagem" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setMonths(e.target.value)} />
            <button onClick={calc} className="w-full py-3 bg-primary text-black font-bold rounded-xl">Calcular Poupança Mensal</button>
            {res && <div className="text-center text-xl font-bold text-white">Guardar por mês: R$ {res}</div>}
        </div>
    );
}

