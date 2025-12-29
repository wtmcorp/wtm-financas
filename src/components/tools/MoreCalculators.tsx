"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

                // PRICE
                const pmtPrice = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const totalPrice = pmtPrice * n;
                const interestPrice = totalPrice - p;

                // SAC (First installment)
                const amortSac = p / n;
                const pmtSacFirst = amortSac + (p * r);
                const totalSac = ((pmtSacFirst + (amortSac + (amortSac * r))) / 2) * n; // Approx
                const interestSac = totalSac - p;

                setRes({ pmtPrice, totalPrice, interestPrice, pmtSacFirst, totalSac, interestSac });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">SAC vs PRICE</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Valor (R$)" value={val1} onChange={setVal1} placeholder="Ex: 200000" />
                        <Input label="Taxa Mensal (%)" value={val2} onChange={setVal2} placeholder="Ex: 1" />
                    </div>
                    <Input label="Prazo (Meses)" value={val3} onChange={setVal3} placeholder="Ex: 360" />
                    <button onClick={calcAmort} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar Sistemas</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-primary font-black uppercase mb-2">Tabela PRICE</p>
                                    <p className="text-sm text-gray-400">Parcela: <span className="text-white font-bold">R$ {res.pmtPrice.toFixed(2)}</span></p>
                                    <p className="text-sm text-gray-400">Total Juros: <span className="text-red-400 font-bold">R$ {res.interestPrice.toFixed(2)}</span></p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-primary font-black uppercase mb-2">Tabela SAC</p>
                                    <p className="text-sm text-gray-400">1ª Parcela: <span className="text-white font-bold">R$ {res.pmtSacFirst.toFixed(2)}</span></p>
                                    <p className="text-sm text-gray-400">Total Juros: <span className="text-emerald-400 font-bold">R$ {res.interestSac.toFixed(2)}</span></p>
                                </div>
                            </div>
                            <div className="bg-primary/10 p-4 rounded-xl text-center border border-primary/20">
                                <p className="text-sm text-white">Economia com SAC: <span className="font-black text-primary">R$ {(res.interestPrice - res.interestSac).toFixed(2)}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "card-interest":
            const calcCard = () => {
                const b = Number(val1);
                const r = Number(val2) / 100;

                let balance = b;
                let months = 0;
                let totalPaid = 0;
                const p = b * 0.15; // Assuming 15% min payment

                while (balance > 1 && months < 360) {
                    const interest = balance * r;
                    const payment = Math.max(p, interest + 10);
                    balance = balance + interest - payment;
                    totalPaid += payment;
                    months++;
                    if (payment <= interest) { months = 999; break; }
                }

                setRes({ months, totalPaid, interest: totalPaid - b });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Efeito Bola de Neve</h2>
                    <p className="text-xs text-gray-400">Veja o perigo de pagar apenas o mínimo do cartão.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Dívida (R$)" value={val1} onChange={setVal1} />
                        <Input label="Juros Mensais (%)" value={val2} onChange={setVal2} placeholder="Ex: 14" />
                    </div>
                    <button onClick={calcCard} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Simular Impacto</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 text-center">
                                <p className="text-xs text-red-400 font-black uppercase tracking-widest mb-1">Custo Total da Dívida</p>
                                <p className="text-3xl font-black text-white">R$ {res.totalPaid.toFixed(2)}</p>
                                <p className="text-sm text-red-400 mt-2">Você pagará <span className="font-bold">R$ {res.interest.toFixed(2)}</span> só de juros</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                                <p className="text-sm text-gray-400">Tempo para quitar: <span className="text-white font-bold">{res.months === 999 ? "Infinita (Juros > Pagamento)" : `${res.months} meses`}</span></p>
                            </div>
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
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Comparador de Investimentos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Valor Inicial (R$)" value={val1} onChange={setVal1} />
                        <Input label="Prazo (Meses)" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={compareInv} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar Retornos</button>
                    {res && (
                        <div className="grid gap-3">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:border-primary/30 transition-all">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">CDB (100% CDI)</p>
                                    <p className="text-lg font-bold text-white">R$ {res.cdb.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-red-400 uppercase font-bold">Com IR</p>
                                </div>
                            </div>
                            <div className="bg-primary/10 p-4 rounded-xl border border-primary/30 flex justify-between items-center group">
                                <div>
                                    <p className="text-[10px] text-primary font-black uppercase">LCI/LCA (Isento)</p>
                                    <p className="text-lg font-black text-white">R$ {res.lci.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-primary font-black uppercase">Melhor Opção</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:border-primary/30 transition-all">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Tesouro Selic</p>
                                    <p className="text-lg font-bold text-white">R$ {res.tesouro.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Segurança Máxima</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "savings-yield":
            const calcSavings = () => {
                const p = Number(val1);
                const m = Number(val2);
                const r = 0.005; // 0.5% per month
                const total = p * Math.pow(1 + r, m);
                setRes({ total, interest: total - p });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Rendimento Poupança</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Valor Inicial (R$)" value={val1} onChange={setVal1} />
                        <Input label="Meses" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcSavings} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular Rendimento</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center">
                                <p className="text-xs text-emerald-400 font-black uppercase tracking-widest mb-1">Total Acumulado</p>
                                <p className="text-3xl font-black text-white">R$ {res.total.toFixed(2)}</p>
                            </div>
                            <p className="text-center text-sm text-gray-400">Lucro de <span className="text-emerald-400 font-bold">R$ {res.interest.toFixed(2)}</span> no período</p>
                        </div>
                    )}
                </div>
            );

        case "cdi-vs-savings":
            const calcCompCDI = () => {
                const p = Number(val1);
                const m = Number(val2);
                const sav = p * Math.pow(1.005, m);
                const cdi = p * Math.pow(1.008, m);
                setRes({ sav, cdi, diff: cdi - sav });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">CDI vs Poupança</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Valor (R$)" value={val1} onChange={setVal1} />
                        <Input label="Meses" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcCompCDI} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar Ganhos</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Poupança</p>
                                    <p className="text-lg font-bold text-white">R$ {res.sav.toFixed(2)}</p>
                                </div>
                                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                                    <p className="text-[10px] text-primary uppercase font-bold">100% CDI</p>
                                    <p className="text-lg font-bold text-white">R$ {res.cdi.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="bg-emerald-500/10 p-4 rounded-xl text-center border border-emerald-500/20">
                                <p className="text-sm text-white">O CDI rende <span className="font-black text-emerald-400">R$ {res.diff.toFixed(2)}</span> a mais</p>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "roi":
            const calcRoi = () => {
                const gain = Number(val1);
                const cost = Number(val2);
                const roi = ((gain - cost) / cost) * 100;
                setRes(roi);
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Calculadora de ROI</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Ganho Total (R$)" value={val1} onChange={setVal1} />
                        <Input label="Custo Total (R$)" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcRoi} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular Retorno</button>
                    {res !== null && (
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                            <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Retorno sobre Investimento</p>
                            <p className={`text-4xl font-black ${res >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{res.toFixed(2)}%</p>
                            <p className="text-sm text-gray-500 mt-2">Para cada R$ 1,00 investido, você {res >= 0 ? 'ganhou' : 'perdeu'} R$ {Math.abs(res / 100).toFixed(2)}</p>
                        </div>
                    )}
                </div>
            );

        case "profit-margin":
            const calcMargin = () => {
                const cost = Number(val1);
                const price = Number(val2);
                const margin = ((price - cost) / price) * 100;
                const markup = ((price - cost) / cost) * 100;
                setRes({ margin, markup, profit: price - cost });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Margem de Lucro</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Custo (R$)" value={val1} onChange={setVal1} />
                        <Input label="Venda (R$)" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcMargin} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Analisar Lucratividade</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center">
                                <p className="text-xs text-emerald-400 font-black uppercase tracking-widest mb-1">Lucro por Unidade</p>
                                <p className="text-3xl font-black text-white">R$ {res.profit.toFixed(2)}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Margem (Venda)</p>
                                    <p className="text-lg font-bold text-emerald-400">{res.margin.toFixed(2)}%</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Markup (Custo)</p>
                                    <p className="text-lg font-bold text-white">{res.markup.toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "break-even":
            const calcBE = () => {
                const fixed = Number(val1);
                const price = Number(val2);
                const varCost = Number(val3);
                const units = fixed / (price - varCost);
                const revenue = units * price;
                setRes({ units, revenue });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Ponto de Equilíbrio</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Custos Fixos (R$)" value={val1} onChange={setVal1} />
                        <Input label="Preço Venda (R$)" value={val2} onChange={setVal2} />
                    </div>
                    <Input label="Custo Variável/Unid (R$)" value={val3} onChange={setVal3} />
                    <button onClick={calcBE} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular Equilíbrio</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                                <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Meta de Vendas</p>
                                <p className="text-3xl font-black text-white">{Math.ceil(res.units)} <span className="text-sm font-normal text-gray-500">unidades</span></p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Faturamento Mínimo</p>
                                <p className="text-lg font-bold text-primary">R$ {res.revenue.toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "discount":
            const calcDisc = () => {
                const price = Number(val1);
                const disc = Number(val2);
                const final = price * (1 - disc / 100);
                setRes({ final, saved: price - final });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Desconto</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Preço (R$)" value={val1} onChange={setVal1} />
                        <Input label="Desconto (%)" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcDisc} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Aplicar Desconto</button>
                    {res && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                                <p className="text-[10px] text-emerald-400 uppercase font-bold">Preço Final</p>
                                <p className="text-lg font-bold text-white">R$ {res.final.toFixed(2)}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Você Economiza</p>
                                <p className="text-lg font-bold text-emerald-400">R$ {res.saved.toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "raise":
            const calcRaise = () => {
                const sal = Number(val1);
                const perc = Number(val2);
                const next = sal * (1 + perc / 100);
                setRes({ next, diff: next - sal });
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Aumento</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Salário (R$)" value={val1} onChange={setVal1} />
                        <Input label="Aumento (%)" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcRaise} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Calcular Novo Valor</button>
                    {res && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                                <p className="text-[10px] text-primary uppercase font-bold">Novo Salário</p>
                                <p className="text-lg font-bold text-white">R$ {res.next.toFixed(2)}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Aumento Real</p>
                                <p className="text-lg font-bold text-emerald-400">R$ {res.diff.toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "price-per-unit":
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Qual compensa mais?</h2>
                    <p className="text-xs text-gray-400">Compare o preço por unidade, litro ou quilo.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <p className="text-[10px] text-primary font-black uppercase text-center">Opção A</p>
                            <Input label="Preço (R$)" value={val1} onChange={setVal1} />
                            <Input label="Qtd (un/ml/g)" value={val2} onChange={setVal2} />
                        </div>
                        <div className="space-y-3">
                            <p className="text-[10px] text-primary font-black uppercase text-center">Opção B</p>
                            <Input label="Preço (R$)" value={val3} onChange={setVal3} />
                            <Input label="Qtd (un/ml/g)" value={res?.qB || ""} onChange={(v: string) => setRes({ ...res, qB: v })} />
                        </div>
                    </div>
                    <button onClick={() => {
                        const qB = Number(res?.qB || 0);
                        const pA = Number(val1) / Number(val2);
                        const pB = Number(val3) / qB;
                        const savings = Math.abs(pA - pB) / Math.max(pA, pB) * 100;
                        setRes({ ...res, pA, pB, savings, winner: pA < pB ? "Opção A" : "Opção B", calculated: true });
                    }} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Comparar Preços</button>
                    {res?.calculated && (
                        <div className="space-y-4">
                            <div className="bg-primary/20 p-6 rounded-2xl text-center border border-primary/30">
                                <p className="text-xs text-primary font-black uppercase tracking-widest mb-1">Melhor Custo-Benefício</p>
                                <p className="text-2xl font-black text-white">{res.winner}</p>
                                <p className="text-sm text-primary/80 mt-2">Economia de <span className="font-bold">{res.savings.toFixed(1)}%</span> por unidade</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Preço/Unid A</p>
                                    <p className="text-lg font-bold text-white">R$ {res.pA.toFixed(4)}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Preço/Unid B</p>
                                    <p className="text-lg font-bold text-white">R$ {res.pB.toFixed(4)}</p>
                                </div>
                            </div>
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
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white">Regra de Três Simples</h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1"><Input value={val1} onChange={setVal1} placeholder="Valor A" /></div>
                            <div className="text-primary font-black">→</div>
                            <div className="flex-1"><Input value={val2} onChange={setVal2} placeholder="Valor B" /></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1"><Input value={val3} onChange={setVal3} placeholder="Valor C" /></div>
                            <div className="text-primary font-black">→</div>
                            <div className="flex-1">
                                <div className="w-full bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 text-primary font-black text-center text-xl shadow-[0_0_15px_rgba(167,139,250,0.2)]">
                                    {res ? res.toFixed(2) : "X"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={calcRule} className="btn-primary w-full py-4 rounded-xl font-bold bg-primary text-black hover:scale-[1.02] transition-transform">Descobrir Valor de X</button>
                    <p className="text-[10px] text-gray-500 text-center uppercase font-bold tracking-widest">A está para B, assim como C está para X</p>
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
            const calcHours = (op: 'sum' | 'sub') => {
                const h1 = val1.split(":").map(Number);
                const h2 = val2.split(":").map(Number);
                const m1 = (h1[0] || 0) * 60 + (h1[1] || 0);
                const m2 = (h2[0] || 0) * 60 + (h2[1] || 0);
                const totalMin = op === 'sum' ? m1 + m2 : Math.abs(m1 - m2);
                const h = Math.floor(totalMin / 60);
                const m = totalMin % 60;
                setRes(`${h}h ${m < 10 ? '0' : ''}${m}m`);
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Calculadora de Horas</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Tempo 1 (HH:MM)" placeholder="02:30" value={val1} onChange={setVal1} />
                        <Input label="Tempo 2 (HH:MM)" placeholder="01:45" value={val2} onChange={setVal2} />
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => calcHours('sum')} className="flex-1 py-3 bg-primary text-black font-bold rounded-xl">Somar</button>
                        <button onClick={() => calcHours('sub')} className="flex-1 py-3 bg-white/5 text-white border border-white/10 font-bold rounded-xl">Subtrair</button>
                    </div>
                    {res && (
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Resultado</p>
                            <p className="text-4xl font-black text-white">{res}</p>
                        </div>
                    )}
                </div>
            );

        case "receipt":
            const generateReceipt = () => {
                const text = `RECIBO DE PAGAMENTO\n\nRecebi de ${val1 || "__________"}\na quantia de R$ ${val2 || "0,00"}\nreferente a ${val3 || "__________"}.\n\nData: ${new Date().toLocaleDateString('pt-BR')}\n\nAssinatura: ____________________`;
                setRes(text);
            };
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Gerador de Recibo</h2>
                    <div className="space-y-4">
                        <Input label="Pagador" type="text" value={val1} onChange={setVal1} placeholder="Nome completo" />
                        <Input label="Valor (R$)" value={val2} onChange={setVal2} placeholder="0,00" />
                        <Input label="Referente a" type="text" value={val3} onChange={setVal3} placeholder="Descrição do serviço" />
                    </div>
                    <button onClick={generateReceipt} className="btn-primary w-full py-3 rounded-xl font-bold bg-primary text-black">Gerar Recibo</button>
                    {res && (
                        <div className="bg-white p-6 rounded-xl space-y-4 border border-white/10 shadow-2xl">
                            <pre className="text-[10px] text-black whitespace-pre-wrap font-mono leading-relaxed">{res}</pre>
                            <button onClick={() => {
                                navigator.clipboard.writeText(res);
                                alert("Recibo copiado!");
                            }} className="w-full py-2 bg-black text-white rounded-lg text-xs flex items-center justify-center gap-2 font-bold">
                                <Copy size={14} /> Copiar Texto
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
        <div className="space-y-8 text-center py-4">
            <h2 className="text-2xl font-bold text-white">Foco Financeiro</h2>
            <div className="relative inline-block">
                <svg className="w-48 h-48 -rotate-90">
                    <circle cx="96" cy="96" r="88" className="stroke-white/5 fill-none" strokeWidth="8" />
                    <motion.circle
                        cx="96" cy="96" r="88"
                        className="stroke-primary fill-none"
                        strokeWidth="8"
                        strokeDasharray="553"
                        animate={{ strokeDashoffset: 553 - (553 * timeLeft) / (25 * 60) }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white tabular-nums">{format(timeLeft)}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Minutos</span>
                </div>
            </div>

            <div className="flex gap-4 justify-center">
                <button onClick={() => setIsActive(!isActive)} className="flex-1 py-3 bg-primary text-black font-bold rounded-xl hover:scale-105 transition-transform">
                    {isActive ? "Pausar" : "Iniciar"}
                </button>
                <button onClick={() => { setTimeLeft(25 * 60); setIsActive(false); }} className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10">
                    Resetar
                </button>
            </div>
        </div>
    );
}
