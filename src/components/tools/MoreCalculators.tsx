"use client";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";

interface Props {
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

export default function MoreCalculators({ type }: Props) {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [res, setRes] = useState<any>(null);

    // Reset state on type change
    useEffect(() => {
        setVal1("");
        setVal2("");
        setVal3("");
        setRes(null);
    }, [type]);

    switch (type) {
        case "amortization":
            const calcAmort = () => {
                const p = Number(val1);
                const r = Number(val2) / 100 / 12;
                const n = Number(val3);
                const pmt = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const totalPaid = pmt * n;
                const totalInterest = totalPaid - p;
                setRes({ pmt, totalPaid, totalInterest });
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Simulador de Amortização (Price)</h2>
                    <Input label="Valor do Financiamento (R$)" value={val1} onChange={setVal1} placeholder="Ex: 200000" />
                    <Input label="Taxa de Juros Anual (%)" value={val2} onChange={setVal2} placeholder="Ex: 10" />
                    <Input label="Prazo (Meses)" value={val3} onChange={setVal3} placeholder="Ex: 360" />
                    <button onClick={calcAmort} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Simular</button>
                    {res && (
                        <div className="bg-white/5 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between text-gray-400"><span>Parcela Mensal:</span> <span className="text-white font-bold">R$ {res.pmt.toFixed(2)}</span></div>
                            <div className="flex justify-between text-gray-400"><span>Total em Juros:</span> <span className="text-red-400">R$ {res.totalInterest.toFixed(2)}</span></div>
                            <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10"><span>Total Pago:</span> <span className="text-primary">R$ {res.totalPaid.toFixed(2)}</span></div>
                        </div>
                    )}
                </div>
            );

        case "card-interest":
            const calcCard = () => {
                const balance = Number(val1);
                const rate = Number(val2) / 100;
                const interest = balance * rate;
                setRes({ interest, total: balance + interest });
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Juros do Cartão de Crédito</h2>
                    <p className="text-xs text-gray-400">Veja o custo de rolar a dívida para o próximo mês.</p>
                    <Input label="Valor da Fatura (R$)" value={val1} onChange={setVal1} />
                    <Input label="Taxa de Juros Mensal (%)" value={val2} onChange={setVal2} placeholder="Ex: 14.5" />
                    <button onClick={calcCard} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular Custo</button>
                    {res && (
                        <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                            <div className="flex justify-between text-gray-300"><span>Juros no próximo mês:</span> <span className="font-bold text-red-400">R$ {res.interest.toFixed(2)}</span></div>
                            <div className="flex justify-between text-white font-bold mt-2"><span>Total da Dívida:</span> <span>R$ {res.total.toFixed(2)}</span></div>
                        </div>
                    )}
                </div>
            );

        case "investment-compare":
            const compareInv = () => {
                const p = Number(val1);
                const m = Number(val2);
                const cdb = p * Math.pow(1.0085, m);
                const lci = p * Math.pow(1.0075, m);
                const tesouro = p * Math.pow(1.009, m);
                setRes({ cdb, lci, tesouro });
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Comparador de Investimentos</h2>
                    <Input label="Valor Inicial (R$)" value={val1} onChange={setVal1} />
                    <Input label="Prazo (Meses)" value={val2} onChange={setVal2} />
                    <button onClick={compareInv} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar</button>
                    {res && (
                        <div className="space-y-2">
                            <div className="bg-white/5 p-3 rounded-lg flex justify-between text-white"><span>CDB (100% CDI):</span> <span>R$ {res.cdb.toFixed(2)}</span></div>
                            <div className="bg-primary/20 p-3 rounded-lg flex justify-between text-primary font-bold"><span>LCI/LCA (Isento):</span> <span>R$ {res.lci.toFixed(2)}</span></div>
                            <div className="bg-white/5 p-3 rounded-lg flex justify-between text-white"><span>Tesouro Selic:</span> <span>R$ {res.tesouro.toFixed(2)}</span></div>
                        </div>
                    )}
                </div>
            );

        case "savings-yield":
            const calcSavings = () => {
                const p = Number(val1);
                const m = Number(val2);
                const r = 0.005;
                setRes((p * Math.pow(1 + r, m)).toFixed(2));
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Rendimento Poupança</h2>
                    <Input label="Valor Inicial (R$)" value={val1} onChange={setVal1} />
                    <Input label="Meses" value={val2} onChange={setVal2} />
                    <button onClick={calcSavings} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                    {res && <div className="text-center text-xl font-bold text-white">Total: R$ {res}</div>}
                </div>
            );

        case "cdi-vs-savings":
            const calcComp = () => {
                const p = Number(val1);
                const m = Number(val2);
                const sav = p * Math.pow(1.005, m);
                const cdi = p * Math.pow(1.008, m);
                setRes({ sav, cdi });
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">CDI vs Poupança</h2>
                    <Input label="Valor (R$)" value={val1} onChange={setVal1} />
                    <Input label="Meses" value={val2} onChange={setVal2} />
                    <button onClick={calcComp} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar</button>
                    {res && (
                        <div className="space-y-2">
                            <div className="bg-white/5 p-3 rounded-lg flex justify-between text-white"><span>Poupança:</span> <span>R$ {res.sav.toFixed(2)}</span></div>
                            <div className="bg-primary/20 p-3 rounded-lg flex justify-between text-primary font-bold"><span>100% CDI:</span> <span>R$ {res.cdi.toFixed(2)}</span></div>
                        </div>
                    )}
                </div>
            );

        case "roi":
            const calcRoi = () => {
                const gain = Number(val1);
                const cost = Number(val2);
                setRes(((gain - cost) / cost) * 100);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Calculadora de ROI</h2>
                    <Input label="Receita Obtida (R$)" value={val1} onChange={setVal1} />
                    <Input label="Custo do Investimento (R$)" value={val2} onChange={setVal2} />
                    <button onClick={calcRoi} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular ROI</button>
                    {res !== null && <div className="text-center text-xl font-bold text-white">ROI: {res.toFixed(2)}%</div>}
                </div>
            );

        case "profit-margin":
            const calcMargin = () => {
                const cost = Number(val1);
                const price = Number(val2);
                setRes(((price - cost) / price) * 100);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Margem de Lucro</h2>
                    <Input label="Custo do Produto (R$)" value={val1} onChange={setVal1} />
                    <Input label="Preço de Venda (R$)" value={val2} onChange={setVal2} />
                    <button onClick={calcMargin} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular Margem</button>
                    {res !== null && <div className="text-center text-xl font-bold text-white">Margem: {res.toFixed(2)}%</div>}
                </div>
            );

        case "break-even":
            const calcBE = () => {
                const fixed = Number(val1);
                const price = Number(val2);
                const varCost = Number(val3);
                setRes(fixed / (price - varCost));
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Ponto de Equilíbrio</h2>
                    <Input label="Custos Fixos (R$)" value={val1} onChange={setVal1} />
                    <Input label="Preço de Venda (R$)" value={val2} onChange={setVal2} />
                    <Input label="Custo Variável por Unidade (R$)" value={val3} onChange={setVal3} />
                    <button onClick={calcBE} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                    {res !== null && <div className="text-center text-xl font-bold text-white">Vender {Math.ceil(res)} unidades</div>}
                </div>
            );

        case "discount":
            const calcDisc = () => {
                const price = Number(val1);
                const disc = Number(val2);
                setRes(price * (1 - disc / 100));
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Desconto</h2>
                    <Input label="Preço Original (R$)" value={val1} onChange={setVal1} />
                    <Input label="Desconto (%)" value={val2} onChange={setVal2} />
                    <button onClick={calcDisc} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                    {res !== null && <div className="text-center text-xl font-bold text-white">Preço Final: R$ {res.toFixed(2)}</div>}
                </div>
            );

        case "raise":
            const calcRaise = () => {
                const sal = Number(val1);
                const perc = Number(val2);
                setRes(sal * (1 + perc / 100));
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Aumento</h2>
                    <Input label="Salário Atual (R$)" value={val1} onChange={setVal1} />
                    <Input label="Aumento (%)" value={val2} onChange={setVal2} />
                    <button onClick={calcRaise} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                    {res !== null && <div className="text-center text-xl font-bold text-white">Novo Salário: R$ {res.toFixed(2)}</div>}
                </div>
            );

        case "price-per-unit":
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Qual compensa?</h2>
                    <p className="text-gray-400 text-sm">Compare o preço por unidade/litro/kg</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Preço A" value={val1} onChange={setVal1} />
                        <Input label="Qtd A" value={val2} onChange={setVal2} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Preço B" value={val3} onChange={setVal3} />
                        <Input label="Qtd B" value={res?.qB || ""} onChange={(v: string) => setRes({ ...res, qB: v })} />
                    </div>
                    <button onClick={() => {
                        const qB = Number(res?.qB || 0);
                        const pA = Number(val1) / Number(val2);
                        const pB = Number(val3) / qB;
                        setRes({ ...res, pA, pB, calculated: true });
                    }} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar</button>
                    {res?.calculated && (
                        <div className="text-center text-white">
                            <p>Opção A: R$ {res.pA.toFixed(2)} /unid</p>
                            <p>Opção B: R$ {res.pB.toFixed(2)} /unid</p>
                            <p className="font-bold text-primary mt-2">{res.pA < res.pB ? "Opção A é mais barata!" : "Opção B é mais barata!"}</p>
                        </div>
                    )}
                </div>
            );

        case "rule-of-three":
            const calcRule = () => {
                const a = Number(val1);
                const b = Number(val2);
                const c = Number(val3);
                setRes((b * c) / a);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Regra de Três</h2>
                    <div className="flex items-center gap-2">
                        <Input value={val1} onChange={setVal1} placeholder="A" />
                        <span className="text-white">está para</span>
                        <Input value={val2} onChange={setVal2} placeholder="B" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Input value={val3} onChange={setVal3} placeholder="C" />
                        <span className="text-white">está para</span>
                        <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary font-bold text-center">
                            {res ? res.toFixed(2) : "X"}
                        </div>
                    </div>
                    <button onClick={calcRule} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular X</button>
                </div>
            );

        case "business-days":
            const calcBusinessDays = () => {
                const start = new Date(val1);
                const end = new Date(val2);
                let count = 0;
                let cur = new Date(start);
                while (cur <= end) {
                    const day = cur.getDay();
                    if (day !== 0 && day !== 6) count++;
                    cur.setDate(cur.getDate() + 1);
                }
                setRes(count);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Dias Úteis</h2>
                    <Input label="Data Inicial" type="date" value={val1} onChange={setVal1} />
                    <Input label="Data Final" type="date" value={val2} onChange={setVal2} />
                    <button onClick={calcBusinessDays} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                    {res !== null && <div className="text-center text-xl font-bold text-white">{res} dias úteis</div>}
                </div>
            );

        case "hour-sum":
            const calcHourSum = () => {
                const h1 = val1.split(":").map(Number);
                const h2 = val2.split(":").map(Number);
                let totalMin = (h1[0] || 0) * 60 + (h1[1] || 0) + (h2[0] || 0) * 60 + (h2[1] || 0);
                const h = Math.floor(totalMin / 60);
                const m = totalMin % 60;
                setRes(`${h}h ${m}m`);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Soma de Horas</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Tempo 1 (HH:MM)" type="text" placeholder="02:30" value={val1} onChange={setVal1} />
                        <Input label="Tempo 2 (HH:MM)" type="text" placeholder="01:45" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcHourSum} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Somar</button>
                    {res && <div className="text-center text-xl font-bold text-white">Total: {res}</div>}
                </div>
            );

        case "receipt":
            const generateReceipt = () => {
                const text = `RECIBO\n\nRecebi de ${val1 || "__________"} a quantia de R$ ${val2 || "0,00"} referente a ${val3 || "__________"}.\n\nData: ${new Date().toLocaleDateString()}\n\nAssinatura: ____________________`;
                setRes(text);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Gerador de Recibo</h2>
                    <Input label="Pagador" type="text" value={val1} onChange={setVal1} />
                    <Input label="Valor (R$)" value={val2} onChange={setVal2} />
                    <Input label="Referente a" type="text" value={val3} onChange={setVal3} />
                    <button onClick={generateReceipt} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Gerar</button>
                    {res && (
                        <div className="bg-white/5 p-4 rounded-xl space-y-4">
                            <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">{res}</pre>
                            <button onClick={() => navigator.clipboard.writeText(res)} className="w-full py-2 bg-white/10 rounded-lg text-xs flex items-center justify-center gap-2">
                                <Copy size={14} /> Copiar Recibo
                            </button>
                        </div>
                    )}
                </div>
            );

        case "cpf-validator":
            const handleCPFChange = (v: string) => {
                const digits = v.replace(/\D/g, "").slice(0, 11);
                let masked = digits;
                if (digits.length > 9) masked = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
                else if (digits.length > 6) masked = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
                else if (digits.length > 3) masked = `${digits.slice(0, 3)}.${digits.slice(3)}`;
                setVal1(masked);
            };
            const validateCPF = () => {
                const cpf = val1.replace(/\D/g, "");
                if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
                    setRes("CPF Inválido");
                    return;
                }
                let sum = 0;
                for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
                let rest = (sum * 10) % 11;
                if ((rest === 10) || (rest === 11)) rest = 0;
                if (rest !== parseInt(cpf.substring(9, 10))) {
                    setRes("CPF Inválido");
                    return;
                }
                sum = 0;
                for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
                rest = (sum * 10) % 11;
                if ((rest === 10) || (rest === 11)) rest = 0;
                if (rest !== parseInt(cpf.substring(10, 11))) {
                    setRes("CPF Inválido");
                    return;
                }
                setRes("CPF Válido");
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Validador de CPF</h2>
                    <Input label="CPF" type="text" inputMode="numeric" value={val1} onChange={handleCPFChange} placeholder="000.000.000-00" />
                    <button onClick={validateCPF} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Validar</button>
                    {res && <div className={`text-center font-bold ${res.includes("Válido") ? "text-green-400" : "text-red-400"}`}>{res}</div>}
                </div>
            );

        case "cnpj-validator":
            const handleCNPJChange = (v: string) => {
                const digits = v.replace(/\D/g, "").slice(0, 14);
                let masked = digits;
                if (digits.length > 12) masked = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
                else if (digits.length > 8) masked = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
                else if (digits.length > 5) masked = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
                else if (digits.length > 2) masked = `${digits.slice(0, 2)}.${digits.slice(2)}`;
                setVal1(masked);
            };
            const validateCNPJ = () => {
                const cnpj = val1.replace(/\D/g, "");
                if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) {
                    setRes("CNPJ Inválido");
                    return;
                }
                let size = cnpj.length - 2;
                let numbers = cnpj.substring(0, size);
                const digits = cnpj.substring(size);
                let sum = 0;
                let pos = size - 7;
                for (let i = size; i >= 1; i--) {
                    sum += parseInt(numbers.charAt(size - i)) * pos--;
                    if (pos < 2) pos = 9;
                }
                let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
                if (result !== parseInt(digits.charAt(0))) {
                    setRes("CNPJ Inválido");
                    return;
                }
                size = size + 1;
                numbers = cnpj.substring(0, size);
                sum = 0;
                pos = size - 7;
                for (let i = size; i >= 1; i--) {
                    sum += parseInt(numbers.charAt(size - i)) * pos--;
                    if (pos < 2) pos = 9;
                }
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
                if (result !== parseInt(digits.charAt(1))) {
                    setRes("CNPJ Inválido");
                    return;
                }
                setRes("CNPJ Válido");
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Validador de CNPJ</h2>
                    <Input label="CNPJ" type="text" inputMode="numeric" value={val1} onChange={handleCNPJChange} placeholder="00.000.000/0000-00" />
                    <button onClick={validateCNPJ} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Validar</button>
                    {res && <div className={`text-center font-bold ${res.includes("Válido") ? "text-green-400" : "text-red-400"}`}>{res}</div>}
                </div>
            );

        case "pomodoro":
            return <PomodoroTimer />;

        default:
            return null;
    }
}

function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            alert("Tempo esgotado!");
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const format = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? "0" : ""}${sec}`;
    };

    return (
        <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white">Pomodoro Timer</h2>
            <div className="text-7xl font-black text-primary font-mono">{format(timeLeft)}</div>
            <div className="flex gap-4">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`flex-1 py-3 rounded-xl font-bold ${isActive ? "bg-red-500/20 text-red-500" : "bg-primary text-black"}`}
                >
                    {isActive ? "Pausar" : "Iniciar"}
                </button>
                <button
                    onClick={() => { setTimeLeft(25 * 60); setIsActive(false); }}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
