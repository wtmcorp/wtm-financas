"use client";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";

interface Props {
    type: string;
}

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

    switch (type) {
        case "savings-yield":
            const calcSavings = () => {
                const p = Number(val1);
                const m = Number(val2);
                const r = 0.005; // Approx 0.5% month
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
                const cdi = p * Math.pow(1.008, m); // Approx 100% CDI
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
            const validateCPF = () => {
                const cpf = val1.replace(/\D/g, "");
                if (cpf.length !== 11) {
                    setRes("CPF Inválido (deve ter 11 dígitos)");
                    return;
                }
                setRes("CPF Válido");
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Validador de CPF</h2>
                    <Input label="CPF (apenas números)" type="text" value={val1} onChange={setVal1} />
                    <button onClick={validateCPF} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Validar</button>
                    {res && <div className={`text-center font-bold ${res.includes("Válido") ? "text-green-400" : "text-red-400"}`}>{res}</div>}
                </div>
            );

        case "cnpj-validator":
            const validateCNPJ = () => {
                const cnpj = val1.replace(/\D/g, "");
                if (cnpj.length !== 14) {
                    setRes("CNPJ Inválido (deve ter 14 dígitos)");
                    return;
                }
                setRes("CNPJ Válido");
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Validador de CNPJ</h2>
                    <Input label="CNPJ (apenas números)" type="text" value={val1} onChange={setVal1} />
                    <button onClick={validateCNPJ} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Validar</button>
                    {res && <div className={`text-center font-bold ${res.includes("Válido") ? "text-green-400" : "text-red-400"}`}>{res}</div>}
                </div>
            );

        case "pomodoro":
            return <PomodoroTimer />;

        case "unit-converter":
            const convert = () => {
                const v = Number(val1);
                const type = val2; // km-mi, kg-lb, etc
                let result = 0;
                if (type === "km-mi") result = v * 0.621371;
                else if (type === "mi-km") result = v / 0.621371;
                else if (type === "kg-lb") result = v * 2.20462;
                else if (type === "lb-kg") result = v / 2.20462;
                setRes(result.toFixed(2));
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Conversor de Medidas</h2>
                    <Input label="Valor" value={val1} onChange={setVal1} />
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-bold">Conversão</label>
                        <select
                            value={val2}
                            onChange={(e) => setVal2(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                        >
                            <option value="km-mi">Km para Milhas</option>
                            <option value="mi-km">Milhas para Km</option>
                            <option value="kg-lb">Kg para Libras</option>
                            <option value="lb-kg">Libras para Kg</option>
                        </select>
                    </div>
                    <button onClick={convert} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Converter</button>
                    {res && <div className="text-center text-xl font-bold text-white">Resultado: {res}</div>}
                </div>
            );

        case "tip-calc":
            const calcTip = () => {
                const bill = Number(val1);
                const tipPerc = Number(val2) || 10;
                const tip = bill * (tipPerc / 100);
                setRes({ tip, total: bill + tip });
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Gorjeta</h2>
                    <Input label="Valor da Conta (R$)" value={val1} onChange={setVal1} />
                    <Input label="Gorjeta (%)" value={val2} onChange={setVal2} placeholder="10" />
                    <button onClick={calcTip} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                    {res && (
                        <div className="text-center text-white">
                            <p>Gorjeta: R$ {res.tip.toFixed(2)}</p>
                            <p className="font-bold text-lg">Total: R$ {res.total.toFixed(2)}</p>
                        </div>
                    )}
                </div>
            );

        case "pizza-calc":
            const calcPizza = () => {
                const people = Number(val1);
                const slices = people * 3;
                const pizzas = Math.ceil(slices / 8);
                setRes(pizzas);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Pizza</h2>
                    <Input label="Número de Pessoas" value={val1} onChange={setVal1} />
                    <button onClick={calcPizza} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular</button>
                    {res && <div className="text-center text-xl font-bold text-white">Peça {res} pizzas grandes!</div>}
                </div>
            );

        case "qr-code":
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Gerador de QR Code</h2>
                    <Input label="Texto ou Link" type="text" value={val1} onChange={setVal1} placeholder="https://exemplo.com" />
                    <button onClick={() => setRes(val1)} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Gerar QR Code</button>
                    {res && (
                        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(res)}`}
                                alt="QR Code"
                                className="w-48 h-48"
                            />
                            <p className="text-black text-xs font-bold">{res}</p>
                        </div>
                    )}
                </div>
            );

        case "number-draw":
            const draw = () => {
                const min = Number(val1);
                const max = Number(val2);
                setRes(Math.floor(Math.random() * (max - min + 1)) + min);
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Sorteador</h2>
                    <div className="flex gap-4">
                        <Input label="Min" value={val1} onChange={setVal1} />
                        <Input label="Max" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={draw} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Sortear</button>
                    {res !== null && <div className="text-center text-6xl font-black text-primary animate-in zoom-in">{res}</div>}
                </div>
            );

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
