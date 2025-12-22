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
            const calcPPU = () => {
                const p1 = Number(val1) / Number(val2);
                const p2 = Number(val3) / Number(res); // Using res as input 4 temp
                // Need 4 inputs, reusing state creatively or adding more
                // Simplified: Just 2 items
                setRes(p1);
            };
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
                        {/* Hack: using a local input for 4th value */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 uppercase font-bold">Qtd B</label>
                            <input type="number" id="qtdB" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                        </div>
                    </div>
                    <button onClick={() => {
                        const qB = Number((document.getElementById('qtdB') as HTMLInputElement).value);
                        const pA = Number(val1) / Number(val2);
                        const pB = Number(val3) / qB;
                        setRes({ pA, pB });
                    }} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar</button>
                    {res && (
                        <div className="text-center text-white">
                            <p>Opção A: {res.pA.toFixed(2)} /unid</p>
                            <p>Opção B: {res.pB.toFixed(2)} /unid</p>
                            <p className="font-bold text-primary mt-2">{res.pA < res.pB ? "Opção A é mais barata!" : "Opção B é mais barata!"}</p>
                        </div>
                    )}
                </div>
            );

        case "rule-of-three":
            const calcRule = () => {
                // A -> B
                // C -> X
                // X = (B * C) / A
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
                        <span>está para</span>
                        <Input value={val2} onChange={setVal2} placeholder="B" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Input value={val3} onChange={setVal3} placeholder="C" />
                        <span>está para</span>
                        <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary font-bold text-center">
                            {res ? res.toFixed(2) : "X"}
                        </div>
                    </div>
                    <button onClick={calcRule} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular X</button>
                </div>
            );

        case "business-days":
            return <div className="text-white text-center">Calculadora de Dias Úteis (Em breve)</div>;

        case "hour-sum":
            return <div className="text-white text-center">Soma de Horas (Em breve)</div>;

        case "receipt":
            return <div className="text-white text-center">Gerador de Recibo (Em breve)</div>;

        case "cpf-validator":
            const validateCPF = () => {
                // Simplified validation logic
                const isValid = val1.length === 11;
                setRes(isValid ? "CPF Válido (Simulado)" : "CPF Inválido");
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Validador de CPF</h2>
                    <Input label="CPF (apenas números)" value={val1} onChange={setVal1} />
                    <button onClick={validateCPF} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Validar</button>
                    {res && <div className={`text-center font-bold ${res.includes("Válido") ? "text-green-400" : "text-red-400"}`}>{res}</div>}
                </div>
            );

        case "cnpj-validator":
            return <div className="text-white text-center">Validador de CNPJ (Em breve)</div>;

        case "pomodoro":
            return <div className="text-white text-center">Pomodoro Timer (Em breve)</div>;

        case "unit-converter":
            return <div className="text-white text-center">Conversor de Medidas (Em breve)</div>;

        case "tip-calc":
            const calcTip = () => {
                const bill = Number(val1);
                const tip = bill * 0.1;
                setRes({ tip, total: bill + tip });
            };
            return (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Gorjeta (10%)</h2>
                    <Input label="Valor da Conta (R$)" value={val1} onChange={setVal1} />
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
                // 3 slices per person, 8 slices per pizza
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
            return <div className="text-white text-center">Gerador de QR Code (Em breve)</div>;

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
