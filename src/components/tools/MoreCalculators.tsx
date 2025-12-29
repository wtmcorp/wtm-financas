"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Sparkles, TrendingUp, Calculator, Calendar, Clock, DollarSign, Percent, Scale, Check } from "lucide-react";

interface Props {
    type: string;
}

const Input = ({ label, value, onChange, placeholder, type = "text", inputMode = "text" }: any) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
        <input
            type={type}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-700"
        />
    </div>
);

const ResultCard = ({ label, value, prefix = "R$", color = "primary" }: { label: string, value: string | number, prefix?: string, color?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-2xl border text-center relative overflow-hidden group/res ${color === "primary" ? "bg-primary/10 border-primary/20" :
            color === "emerald" ? "bg-emerald-500/10 border-emerald-500/20" :
                "bg-red-500/10 border-red-500/20"
            }`}
    >
        <div className={`absolute inset-0 opacity-0 group-hover/res:opacity-100 transition-opacity ${color === "primary" ? "bg-primary/5" :
            color === "emerald" ? "bg-emerald-500/5" :
                "bg-red-500/5"
            }`} />
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${color === "primary" ? "text-primary/60" :
            color === "emerald" ? "text-emerald-400/60" :
                "text-red-400/60"
            }`}>{label}</p>
        <p className="text-3xl font-black text-white flex items-center justify-center gap-2">
            <span className={`text-sm font-bold ${color === "primary" ? "text-primary" :
                color === "emerald" ? "text-emerald-400" :
                    "text-red-400"
                }`}>{prefix}</span>
            {value}
        </p>
        <Sparkles className={`absolute top-2 right-2 opacity-20 ${color === "primary" ? "text-primary" :
            color === "emerald" ? "text-emerald-400" :
                "text-red-400"
            }`} size={12} />
    </motion.div>
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
        case "compound-interest":
            const calcCompound = () => {
                const p = Number(val1);
                const m = Number(val2);
                const r = Number(val3) / 100;
                const total = p * Math.pow(1 + r, m);
                setRes({ total, interest: total - p });
            };
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <TrendingUp className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Juros Compostos</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Aporte Inicial (R$)" value={val1} onChange={setVal1} placeholder="1000" type="number" />
                        <Input label="Taxa Mensal (%)" value={val3} onChange={setVal3} placeholder="1" type="number" />
                    </div>
                    <Input label="Prazo (Meses)" value={val2} onChange={setVal2} placeholder="12" type="number" />
                    <button onClick={calcCompound} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Simular Crescimento</button>
                    {res && (
                        <div className="space-y-4">
                            <ResultCard label="Total Acumulado" value={res.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} />
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-bold">Total em Juros: <span className="text-emerald-400">R$ {res.interest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            );

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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Calculator className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">SAC vs PRICE</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Valor do Bem (R$)" value={val1} onChange={setVal1} placeholder="200000" type="number" />
                        <Input label="Taxa Mensal (%)" value={val2} onChange={setVal2} placeholder="1" type="number" />
                    </div>
                    <Input label="Prazo (Meses)" value={val3} onChange={setVal3} placeholder="360" type="number" />
                    <button onClick={calcAmort} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Comparar Sistemas</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <p className="text-[10px] text-primary font-black uppercase mb-1">Tabela PRICE</p>
                                    <p className="text-sm text-gray-400">Parcela Fixa: <span className="text-white font-bold">R$ {res.pmtPrice.toFixed(2)}</span></p>
                                    <p className="text-sm text-gray-400">Total Juros: <span className="text-red-400 font-bold">R$ {res.interestPrice.toFixed(2)}</span></p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <p className="text-[10px] text-primary font-black uppercase mb-1">Tabela SAC</p>
                                    <p className="text-sm text-gray-400">1ª Parcela: <span className="text-white font-bold">R$ {res.pmtSacFirst.toFixed(2)}</span></p>
                                    <p className="text-sm text-gray-400">Total Juros: <span className="text-emerald-400 font-bold">R$ {res.interestSac.toFixed(2)}</span></p>
                                </div>
                            </div>
                            <ResultCard label="Economia Real com SAC" value={(res.interestPrice - res.interestSac).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} color="emerald" />
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                            <Percent className="text-red-400" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Efeito Bola de Neve</h2>
                    </div>
                    <p className="text-xs text-gray-500 font-bold">Veja o perigo real de pagar apenas o mínimo da fatura do cartão.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Dívida Atual (R$)" value={val1} onChange={setVal1} placeholder="5000" type="number" />
                        <Input label="Juros Mensais (%)" value={val2} onChange={setVal2} placeholder="14" type="number" />
                    </div>
                    <button onClick={calcCard} className="w-full py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl uppercase tracking-widest text-xs">Simular Impacto</button>
                    {res && (
                        <div className="space-y-4">
                            <ResultCard label="Custo Total da Dívida" value={res.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} color="red" />
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                                <p className="text-sm text-gray-400">Tempo para quitar: <span className="text-white font-bold">{res.months === 999 ? "Infinita (Juros > Pagamento)" : `${res.months} meses`}</span></p>
                                <p className="text-xs text-red-400 mt-1">Juros pagos: R$ {res.interest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
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
                const r = 0.005; // 0.5% fixo + TR (simplificado)
                const total = p * Math.pow(1 + r, m);
                setRes({ total, interest: total - p });
            };
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <TrendingUp className="text-emerald-400" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Rendimento Poupança</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Valor Inicial (R$)" value={val1} onChange={setVal1} placeholder="1000" type="number" />
                        <Input label="Meses" value={val2} onChange={setVal2} placeholder="12" type="number" />
                    </div>
                    <button onClick={calcSavings} className="w-full py-4 bg-emerald-500 text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Calcular Rendimento</button>
                    {res && (
                        <div className="space-y-4">
                            <ResultCard label="Total Acumulado" value={res.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} color="emerald" />
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-bold">Lucro Estimado: <span className="text-emerald-400">R$ {res.interest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "cdi-vs-savings":
            const calcCompCDI = () => {
                const p = Number(val1);
                const m = Number(val2);
                const sav = p * Math.pow(1.005, m);
                const cdi = p * Math.pow(1.0085, m); // 100% CDI aprox
                setRes({ sav, cdi, diff: cdi - sav });
            };
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Scale className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">CDI vs Poupança</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Valor (R$)" value={val1} onChange={setVal1} placeholder="1000" type="number" />
                        <Input label="Meses" value={val2} onChange={setVal2} placeholder="12" type="number" />
                    </div>
                    <button onClick={calcCompCDI} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Comparar Ganhos</button>
                    {res && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Poupança</p>
                                    <p className="text-lg font-black text-white">R$ {res.sav.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 text-center">
                                    <p className="text-[10px] text-primary font-black uppercase mb-1">100% CDI</p>
                                    <p className="text-lg font-black text-white">R$ {res.cdi.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                            <ResultCard label="Diferença a Favor do CDI" value={res.diff.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} color="emerald" />
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Percent className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Calculadora de ROI</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Ganho Total (R$)" value={val1} onChange={setVal1} placeholder="1500" type="number" />
                        <Input label="Custo Total (R$)" value={val2} onChange={setVal2} placeholder="1000" type="number" />
                    </div>
                    <button onClick={calcRoi} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Calcular Retorno</button>
                    {res !== null && (
                        <ResultCard label="Retorno sobre Investimento" value={res.toFixed(2)} prefix="%" color={res >= 0 ? "emerald" : "red"} />
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <DollarSign className="text-emerald-400" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Margem de Lucro</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Custo (R$)" value={val1} onChange={setVal1} placeholder="100" type="number" />
                        <Input label="Venda (R$)" value={val2} onChange={setVal2} placeholder="150" type="number" />
                    </div>
                    <button onClick={calcMargin} className="w-full py-4 bg-emerald-500 text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Analisar Lucratividade</button>
                    {res && (
                        <div className="space-y-4">
                            <ResultCard label="Lucro por Unidade" value={res.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} color="emerald" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Margem (Venda)</p>
                                    <p className="text-lg font-black text-emerald-400">{res.margin.toFixed(2)}%</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Markup (Custo)</p>
                                    <p className="text-lg font-black text-white">{res.markup.toFixed(2)}%</p>
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <TrendingUp className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Ponto de Equilíbrio</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Custos Fixos (R$)" value={val1} onChange={setVal1} placeholder="5000" type="number" />
                        <Input label="Preço Venda (R$)" value={val2} onChange={setVal2} placeholder="100" type="number" />
                    </div>
                    <Input label="Custo Variável/Unid (R$)" value={val3} onChange={setVal3} placeholder="40" type="number" />
                    <button onClick={calcBE} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Calcular Equilíbrio</button>
                    {res && (
                        <div className="space-y-4">
                            <ResultCard label="Meta de Vendas (Unidades)" value={Math.ceil(res.units)} prefix="" />
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-bold">Faturamento Mínimo: <span className="text-primary">R$ {res.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <Percent className="text-emerald-400" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Calculadora de Desconto</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Preço Original (R$)" value={val1} onChange={setVal1} placeholder="100" type="number" />
                        <Input label="Desconto (%)" value={val2} onChange={setVal2} placeholder="10" type="number" />
                    </div>
                    <button onClick={calcDisc} className="w-full py-4 bg-emerald-500 text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Aplicar Desconto</button>
                    {res && (
                        <div className="space-y-4">
                            <ResultCard label="Preço com Desconto" value={res.final.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} color="emerald" />
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-bold">Você economiza: <span className="text-emerald-400">R$ {res.saved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <TrendingUp className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Calculadora de Aumento</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Salário Atual (R$)" value={val1} onChange={setVal1} placeholder="3000" type="number" />
                        <Input label="Aumento (%)" value={val2} onChange={setVal2} placeholder="10" type="number" />
                    </div>
                    <button onClick={calcRaise} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Calcular Novo Valor</button>
                    {res && (
                        <div className="space-y-4">
                            <ResultCard label="Novo Salário" value={res.next.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} />
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-bold">Aumento Real: <span className="text-emerald-400">R$ {res.diff.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            );

        case "price-per-unit":
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Scale className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Qual compensa mais?</h2>
                    </div>
                    <p className="text-xs text-gray-500 font-bold">Compare o preço por unidade, litro ou quilo para economizar no mercado.</p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-primary font-black uppercase text-center tracking-widest">Opção A</p>
                            <Input label="Preço (R$)" value={val1} onChange={setVal1} placeholder="10.00" type="number" />
                            <Input label="Qtd (un/ml/g)" value={val2} onChange={setVal2} placeholder="1000" type="number" />
                        </div>
                        <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-primary font-black uppercase text-center tracking-widest">Opção B</p>
                            <Input label="Preço (R$)" value={val3} onChange={setVal3} placeholder="8.50" type="number" />
                            <Input label="Qtd (un/ml/g)" value={res?.qB || ""} onChange={(v: string) => setRes({ ...res, qB: v })} placeholder="800" type="number" />
                        </div>
                    </div>
                    <button onClick={() => {
                        const qB = Number(res?.qB || 0);
                        const pA = Number(val1) / Number(val2);
                        const pB = Number(val3) / qB;
                        const savings = Math.abs(pA - pB) / Math.max(pA, pB) * 100;
                        setRes({ ...res, pA, pB, savings, winner: pA < pB ? "Opção A" : "Opção B", calculated: true });
                    }} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Comparar Preços</button>
                    {res?.calculated && (
                        <div className="space-y-4">
                            <ResultCard label="Melhor Custo-Benefício" value={res.winner} prefix="" />
                            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                                <p className="text-sm text-emerald-400 font-bold">Economia de <span className="text-white font-black">{res.savings.toFixed(1)}%</span> por unidade</p>
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Calculator className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Regra de Três</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1"><Input label="Se" value={val1} onChange={setVal1} placeholder="Valor A" type="number" /></div>
                            <div className="text-primary font-black mt-6">→</div>
                            <div className="flex-1"><Input label="Vale" value={val2} onChange={setVal2} placeholder="Valor B" type="number" /></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1"><Input label="Então" value={val3} onChange={setVal3} placeholder="Valor C" type="number" /></div>
                            <div className="text-primary font-black mt-6">→</div>
                            <div className="flex-1">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Resultado (X)</label>
                                    <div className="w-full bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 text-primary font-black text-center text-xl shadow-[0_0_15px_rgba(167,139,250,0.1)]">
                                        {res ? res.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : "?"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={calcRule} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Descobrir Valor de X</button>
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
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Calendar className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Dias Úteis</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Data Inicial" type="date" value={val1} onChange={setVal1} />
                        <Input label="Data Final" type="date" value={val2} onChange={setVal2} />
                    </div>
                    <button onClick={calcBusinessDays} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Calcular Período</button>
                    {res !== null && (
                        <ResultCard label="Total de Dias Úteis" value={res} prefix="" />
                    )}
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Clock className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Calculadora de Horas</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Tempo 1 (HH:MM)" placeholder="02:30" value={val1} onChange={setVal1} />
                        <Input label="Tempo 2 (HH:MM)" placeholder="01:45" value={val2} onChange={setVal2} />
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => calcHours('sum')} className="flex-1 py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Somar</button>
                        <button onClick={() => calcHours('sub')} className="flex-1 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">Subtrair</button>
                    </div>
                    {res && (
                        <ResultCard label="Resultado do Cálculo" value={res} prefix="" />
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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <DollarSign className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Gerador de Recibo</h2>
                    </div>
                    <div className="space-y-4">
                        <Input label="Pagador" type="text" value={val1} onChange={setVal1} placeholder="Nome completo" />
                        <Input label="Valor (R$)" value={val2} onChange={setVal2} placeholder="0,00" />
                        <Input label="Referente a" type="text" value={val3} onChange={setVal3} placeholder="Descrição do serviço" />
                    </div>
                    <button onClick={generateReceipt} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Gerar Recibo Profissional</button>
                    {res && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-2xl space-y-6 border border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                            <pre className="text-xs text-black whitespace-pre-wrap font-mono leading-relaxed">{res}</pre>
                            <button onClick={() => {
                                navigator.clipboard.writeText(res);
                            }} className="w-full py-3 bg-black text-white rounded-xl text-xs flex items-center justify-center gap-2 font-black uppercase tracking-widest hover:bg-gray-900 transition-all">
                                <Copy size={16} /> Copiar Recibo
                            </button>
                        </motion.div>
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
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Check className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Validador de CPF</h2>
                    </div>
                    <Input label="CPF" type="text" inputMode="numeric" value={val1} onChange={handleCPFChange} placeholder="000.000.000-00" />
                    <button onClick={validateCPF} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Validar Documento</button>
                    {res && (
                        <ResultCard label="Status da Validação" value={res} prefix="" color={res.includes("Válido") ? "emerald" : "red"} />
                    )}
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
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Check className="text-primary" size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Validador de CNPJ</h2>
                    </div>
                    <Input label="CNPJ" type="text" inputMode="numeric" value={val1} onChange={handleCNPJChange} placeholder="00.000.000/0000-00" />
                    <button onClick={validateCNPJ} className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-xs">Validar Empresa</button>
                    {res && (
                        <ResultCard label="Status da Validação" value={res} prefix="" color={res.includes("Válido") ? "emerald" : "red"} />
                    )}
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
            alert("Tempo esgotado! Hora de uma pausa.");
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const format = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? "0" : ""}${sec}`;
    };

    return (
        <div className="space-y-10 text-center py-6">
            <div className="flex items-center justify-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <Clock className="text-primary" size={20} />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Foco Financeiro</h2>
            </div>

            <div className="relative inline-block group">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <svg className="w-64 h-64 -rotate-90 relative z-10">
                    <circle cx="128" cy="128" r="120" className="stroke-white/5 fill-none" strokeWidth="4" />
                    <motion.circle
                        cx="128" cy="128" r="120"
                        className="stroke-primary fill-none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="754"
                        animate={{ strokeDashoffset: 754 - (754 * timeLeft) / (25 * 60) }}
                        transition={{ duration: 1, ease: "linear" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <span className="text-6xl font-black text-white tabular-nums tracking-tighter">{format(timeLeft)}</span>
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-2">Sessão de Foco</span>
                </div>
            </div>

            <div className="flex gap-4 justify-center max-w-sm mx-auto">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`flex-1 py-4 font-black rounded-2xl transition-all shadow-xl uppercase tracking-widest text-xs ${isActive ? "bg-white text-black" : "bg-primary text-black hover:scale-105"
                        }`}
                >
                    {isActive ? "Pausar" : "Iniciar"}
                </button>
                <button
                    onClick={() => { setTimeLeft(25 * 60); setIsActive(false); }}
                    className="px-8 py-4 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                >
                    Resetar
                </button>
            </div>
        </div>
    );
}
