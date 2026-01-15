"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Lock,
    Send,
    Search,
    MessageCircle,
    Store,
    Globe,
    Phone,
    MapPin,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Sparkles
} from "lucide-react";

interface Lead {
    id: string;
    name: string;
    type: string;
    address: string;
    phone: string;
    website?: string;
    potential: "high" | "medium" | "low";
}

export default function SecretSalesArea() {
    const [isOpen, setIsOpen] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // WhatsApp Sender State
    const [phoneNumbers, setPhoneNumbers] = useState("");
    const [message, setMessage] = useState("Olá! Vi sua loja e notei um grande potencial para aumentarmos suas vendas com uma Landing Page profissional da WTM Corps. Podemos conversar?");

    // Lead Finder State
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-secret-sales-area", handleOpen);
        return () => window.removeEventListener("open-secret-sales-area", handleOpen);
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "wtmdisparador") {
            setIsUnlocked(true);
            setError("");
        } else {
            setError("Senha incorreta. Tente novamente.");
            setPassword("");
        }
    };

    const handleSendWhatsApp = (number?: string) => {
        const targetNumbers = number ? [number] : phoneNumbers.split(/[\n,]+/).map(n => n.trim()).filter(n => n);

        targetNumbers.forEach(num => {
            const cleanNumber = num.replace(/\D/g, "");
            const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        });
    };

    const findLeads = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);

        // Simulating API call for leads
        // In a real scenario, this would call a backend or a search API
        setTimeout(() => {
            const mockLeads: Lead[] = [
                {
                    id: "1",
                    name: "Fashion Store Deluxe",
                    type: "Loja de Roupas",
                    address: "Av. Paulista, 1000 - SP",
                    phone: "5511999999999",
                    website: "fashiondeluxe.com.br",
                    potential: "high"
                },
                {
                    id: "2",
                    name: "Tech Solutions",
                    type: "Informática",
                    address: "Rua Augusta, 500 - SP",
                    phone: "5511988888888",
                    potential: "medium"
                },
                {
                    id: "3",
                    name: "Gourmet Bistro",
                    type: "Restaurante",
                    address: "Vila Madalena - SP",
                    phone: "5511977777777",
                    website: "gourmetbistro.com",
                    potential: "high"
                }
            ];
            setLeads(mockLeads);
            setIsSearching(false);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-500/10 rounded-lg">
                            <Sparkles className="text-violet-500" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Área Secreta WTM</h2>
                            <p className="text-xs text-zinc-400">Ferramentas de Alavancagem de Vendas</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X size={20} className="text-zinc-400" />
                    </button>
                </div>

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {!isUnlocked ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mb-6">
                                <Lock className="text-violet-500" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Acesso Restrito</h3>
                            <p className="text-zinc-400 text-center mb-8 max-w-xs">
                                Insira a senha mestra para desbloquear as ferramentas de elite.
                            </p>

                            <form onSubmit={handleUnlock} className="w-full max-w-sm space-y-4">
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Digite a senha..."
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                                        autoFocus
                                    />
                                    {error && (
                                        <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                                            <AlertCircle size={14} />
                                            <span>{error}</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
                                >
                                    Desbloquear
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* WhatsApp Disparador */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageCircle className="text-emerald-500" size={20} />
                                    <h3 className="text-lg font-bold text-white">Disparador WhatsApp</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">
                                            Números (um por linha ou vírgula)
                                        </label>
                                        <textarea
                                            value={phoneNumbers}
                                            onChange={(e) => setPhoneNumbers(e.target.value)}
                                            placeholder="Ex: 5511999999999, 5511988888888"
                                            className="w-full h-32 bg-zinc-800/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">
                                            Mensagem de Abordagem
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full h-32 bg-zinc-800/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleSendWhatsApp()}
                                        disabled={!phoneNumbers}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send size={18} />
                                        Disparar Mensagens
                                    </button>
                                </div>
                            </div>

                            {/* Lead Finder */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Search className="text-blue-500" size={20} />
                                    <h3 className="text-lg font-bold text-white">Buscador de Clientes</h3>
                                </div>

                                <form onSubmit={findLeads} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="O que busca? (ex: Lojas)"
                                            className="bg-zinc-800/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        />
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Cidade/Estado"
                                            className="bg-zinc-800/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSearching || !searchQuery}
                                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                                        Buscar Potenciais Clientes
                                    </button>
                                </form>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">
                                        Resultados Encontrados
                                    </label>

                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {leads.length > 0 ? leads.map(lead => (
                                            <div key={lead.id} className="bg-zinc-800/30 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                                            {lead.name}
                                                            {lead.potential === "high" && (
                                                                <span className="px-1.5 py-0.5 bg-violet-500/20 text-violet-400 text-[10px] rounded uppercase font-black">Alta</span>
                                                            )}
                                                        </h4>
                                                        <p className="text-xs text-zinc-500">{lead.type}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleSendWhatsApp(lead.phone)}
                                                        className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                                                        title="Enviar WhatsApp"
                                                    >
                                                        <MessageCircle size={16} />
                                                    </button>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                                                        <MapPin size={12} />
                                                        {lead.address}
                                                    </div>
                                                    {lead.website && (
                                                        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                                                            <Globe size={12} />
                                                            {lead.website}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )) : !isSearching && (
                                            <div className="flex flex-col items-center justify-center py-8 text-zinc-600">
                                                <Store size={32} className="mb-2 opacity-20" />
                                                <p className="text-xs">Nenhum lead encontrado ainda.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-zinc-950/50 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <CheckCircle2 size={12} className="text-violet-500" />
                        WTM Corps Sales Intelligence v1.0
                    </div>
                    <div className="text-[10px] text-zinc-600 italic">
                        "Vender é uma arte, automatizar é estratégia."
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
