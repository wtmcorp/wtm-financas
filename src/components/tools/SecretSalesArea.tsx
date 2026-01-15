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
    MapPin,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Zap,
    Save,
    Trash2,
    Users,
    FileText,
    BarChart3,
    Copy,
    Check
} from "lucide-react";

interface Lead {
    id: string;
    name: string;
    type: string;
    address: string;
    phone?: string;
    website?: string;
    potential: "high" | "medium" | "low";
    savedAt?: number;
    notes?: string;
}

interface SiteAudit {
    url: string;
    score: number;
    issues: string[];
    recommendations: string[];
}

const TEMPLATES = [
    {
        id: "first-contact",
        name: "Primeiro Contato",
        content: "Olá! Vi sua loja e notei um grande potencial para aumentarmos suas vendas com uma Landing Page profissional da WTM Corps. Podemos conversar?"
    },
    {
        id: "follow-up",
        name: "Follow-up",
        content: "Olá! Gostaria de saber se você teve tempo de ver a proposta que enviei sobre a otimização do seu site. Acredito que podemos dobrar sua conversão."
    },
    {
        id: "special-offer",
        name: "Oferta Especial",
        content: "Olá! Estamos com uma condição exclusiva para lojas do seu nicho esta semana. Que tal modernizarmos sua presença digital hoje?"
    }
];

const CONTENT_IDEAS = {
    "web-design": [
        { title: "5 Sinais que seu site está espantando clientes", type: "Carrossel", caption: "Seu site é sua vitrine virtual. Se ele demora a carregar ou não é responsivo, você está perdendo dinheiro. #WebDesign #MarketingDigital" },
        { title: "Landing Page vs Site Institucional: Qual você precisa?", type: "Reels/Vídeo", caption: "Muitos empresários confundem os dois. Explico a diferença crucial para sua conversão. #LandingPage #VendasOnline" },
        { title: "Como um design premium aumenta seu ticket médio", type: "Post Estático", caption: "A percepção de valor começa pelo olhar. Um site amador atrai clientes que buscam preço, um site premium atrai clientes que buscam qualidade. #DesignPremium #Branding" }
    ],
    "marketing": [
        { title: "O erro #1 que impede sua empresa de vender no Google", type: "Carrossel", caption: "Não adianta ter tráfego se sua página não converte. O segredo está na experiência do usuário. #GoogleAds #SEO" },
        { title: "3 Gatilhos mentais indispensáveis para sua página de vendas", type: "Reels/Vídeo", caption: "Autoridade, Escassez e Prova Social. Como usar sem parecer forçado. #Neuromarketing #Copywriting" },
        { title: "Por que o tráfego pago sozinho não faz milagre", type: "Post Estático", caption: "O anúncio traz o cliente, mas o site é quem fecha a venda. Cuide da sua casa digital. #MarketingDeResultados #Growth" }
    ],
    "lifestyle": [
        { title: "Bastidores: Como criamos uma identidade visual do zero", type: "Stories/Processo", caption: "Mostrando o processo criativo desde o briefing até o lançamento. #DesignProcess #CreativeAgency" },
        { title: "Um dia na WTM Corps: Foco em resultados", type: "Vlog Curto", caption: "Nossa rotina focada em entregar o melhor para nossos parceiros. #AgencyLife #WTMCorps" }
    ],
    "results": [
        { title: "Case de Sucesso: +200% em conversão em 30 dias", type: "Estudo de Caso", caption: "Como reformulamos o checkout de um cliente e explodimos as vendas. #CaseDeSucesso #ROI" },
        { title: "Depoimento: O que nossos clientes dizem sobre nós", type: "Prova Social", caption: "A satisfação de quem confiou sua presença digital à WTM. #Feedback #ClientesSatisfeitos" }
    ]
};

const STRATEGY_GUIDE = {
    scripts: [
        { title: "Script de Abordagem Fria (Direct)", content: "Olá [Nome], vi seu perfil e notei que sua empresa tem um potencial incrível, mas seu site atual pode estar limitando seu crescimento. Trabalhamos com design de alta conversão na WTM Corps. Toparia uma análise gratuita de 5 min?" },
        { title: "Quebra de Objeção: 'Está caro'", content: "Entendo perfeitamente. Na verdade, o investimento se paga com o aumento da conversão. Se recuperarmos apenas 2 clientes que você perde hoje por causa do site, o projeto já se pagou. Faz sentido?" },
        { title: "Follow-up Estratégico", content: "Oi [Nome], passando para compartilhar um case de um cliente do seu nicho que teve resultados excelentes após a nossa intervenção. Pensei que você gostaria de ver!" },
        { title: "Script de Indicação", content: "Olá [Parceiro], estamos expandindo nossa operação e buscando 3 novas empresas para escalar este mês. Se conhecer alguém que precise profissionalizar o site, ficarei muito grato pela indicação!" }
    ],
    hashtags: "#WebDesignProfissional #MarketingDeServiços #WTMCorps #VendasOnline #LandingPageAltaConversão #EmpreendedorismoDigital #DesignEstratégico",
    tips: [
        "Poste 3x por semana focando em resolver dores do seu cliente ideal.",
        "Interaja com 20 perfis de potenciais clientes todos os dias (comentários sinceros).",
        "Use os Stories para mostrar os bastidores e gerar autoridade.",
        "Sempre tenha uma CTA (Chamada para Ação) clara em todos os posts.",
        "Responda todos os directs em menos de 1 hora para não perder o timing."
    ]
};

export default function SecretSalesArea() {
    const [isOpen, setIsOpen] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [activeTab, setActiveTab] = useState<"finder" | "crm" | "auditor" | "templates" | "content-lab">("finder");

    // WhatsApp Sender State
    const [phoneNumbers, setPhoneNumbers] = useState("");
    const [message, setMessage] = useState(TEMPLATES[0].content);
    const [copied, setCopied] = useState(false);

    // Lead Finder State
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // CRM State
    const [savedLeads, setSavedLeads] = useState<Lead[]>([]);

    // Auditor State
    const [auditUrl, setAuditUrl] = useState("");
    const [auditResult, setAuditResult] = useState<SiteAudit | null>(null);
    const [isAuditing, setIsAuditing] = useState(false);

    // Content Lab State
    const [contentLabSubTab, setContentLabSubTab] = useState<"generator" | "templates" | "planner" | "strategy">("generator");
    const [generatedIdea, setGeneratedIdea] = useState<{ title: string; caption: string; type: string } | null>(null);
    const [plannedPosts, setPlannedPosts] = useState<{ id: string; title: string; date: string }[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-secret-sales-area", handleOpen);

        // Load CRM data
        const storedLeads = localStorage.getItem("wtm_crm_leads");
        if (storedLeads) setSavedLeads(JSON.parse(storedLeads));

        // Load Planner data
        const storedPlanner = localStorage.getItem("wtm_content_planner");
        if (storedPlanner) setPlannedPosts(JSON.parse(storedPlanner));

        return () => window.removeEventListener("open-secret-sales-area", handleOpen);
    }, []);

    const saveLeadsToStorage = (updatedLeads: Lead[]) => {
        setSavedLeads(updatedLeads);
        localStorage.setItem("wtm_crm_leads", JSON.stringify(updatedLeads));
    };

    const savePlannerToStorage = (updatedPosts: { id: string; title: string; date: string }[]) => {
        setPlannedPosts(updatedPosts);
        localStorage.setItem("wtm_content_planner", JSON.stringify(updatedPosts));
    };

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setError("");

        try {
            const response = await fetch("/api/secret/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (response.ok) {
                setIsUnlocked(true);
            } else {
                setError(data.error || "Senha incorreta.");
                setPassword("");
            }
        } catch (err) {
            setError("Erro de conexão. Tente novamente.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleSendWhatsApp = (number?: string, customMsg?: string) => {
        const targetNumbers = number ? [number] : phoneNumbers.split(/[\n,]+/).map(n => n.trim()).filter(n => n);
        const finalMsg = customMsg || message;

        targetNumbers.forEach(num => {
            const cleanNumber = num.replace(/\D/g, "");
            const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(finalMsg)}`;
            window.open(url, "_blank");
        });
    };

    const findLeads = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);

        try {
            const q = `${searchQuery} ${location}`;
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=10`);
            const data = await response.json();

            const realLeads: Lead[] = data.map((item: any) => ({
                id: item.place_id.toString(),
                name: item.display_name.split(",")[0],
                type: item.type || "Negócio",
                address: item.display_name,
                phone: "",
                website: "",
                potential: Math.random() > 0.5 ? "high" : "medium"
            }));

            setLeads(realLeads);
        } catch (err) {
            console.error("Error fetching leads:", err);
        } finally {
            setIsSearching(false);
        }
    };

    const toggleSaveLead = (lead: Lead) => {
        const isSaved = savedLeads.find(l => l.id === lead.id);
        if (isSaved) {
            saveLeadsToStorage(savedLeads.filter(l => l.id !== lead.id));
        } else {
            saveLeadsToStorage([...savedLeads, { ...lead, savedAt: Date.now() }]);
        }
    };

    const runAudit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuditing(true);

        setTimeout(() => {
            const mockAudit: SiteAudit = {
                url: auditUrl,
                score: Math.floor(Math.random() * 40) + 30,
                issues: [
                    "Tempo de carregamento superior a 4 segundos",
                    "Falta de otimização para dispositivos móveis",
                    "Ausência de certificados de segurança (SSL) visíveis",
                    "SEO técnico com erros críticos de indexação",
                    "Baixa taxa de contraste em botões de conversão"
                ],
                recommendations: [
                    "Migrar para arquitetura Next.js para performance extrema",
                    "Implementar design Mobile-First responsivo",
                    "Otimizar Core Web Vitals para melhor ranking no Google",
                    "Adicionar gatilhos mentais e provas sociais estratégicas"
                ]
            };
            setAuditResult(mockAudit);
            setIsAuditing(false);
        }, 2000);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateIdea = async () => {
        setIsGenerating(true);
        setGeneratedIdea(null);

        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 1500));

        const categories = Object.keys(CONTENT_IDEAS) as Array<keyof typeof CONTENT_IDEAS>;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const ideas = CONTENT_IDEAS[category];
        const idea = ideas[Math.floor(Math.random() * ideas.length)];

        setGeneratedIdea(idea);
        setIsGenerating(false);
    };

    const addPlannedPost = (title: string) => {
        const newPost = { id: Date.now().toString(), title, date: new Date().toLocaleDateString() };
        savePlannerToStorage([...plannedPosts, newPost]);
    };

    const removePlannedPost = (id: string) => {
        savePlannerToStorage(plannedPosts.filter(p => p.id !== id));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-500/10 rounded-lg">
                            <Zap className="text-violet-500" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">WTM Sales OS</h2>
                            <p className="text-xs text-zinc-400">Intelligence & Automation Suite</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X size={20} className="text-zinc-400" />
                    </button>
                </div>

                {!isUnlocked ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-12">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 5 }}
                            className="w-20 h-20 bg-violet-500/10 rounded-full flex items-center justify-center mb-6"
                        >
                            <Lock className="text-violet-500" size={40} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h3>
                        <p className="text-zinc-400 text-center mb-8 max-w-xs">
                            Insira a senha mestra para desbloquear o ecossistema de vendas.
                        </p>

                        <form onSubmit={handleUnlock} className="w-full max-w-sm space-y-4">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite a senha..."
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-center text-lg tracking-widest"
                                    autoFocus
                                />
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-center gap-2 mt-3 text-red-400 text-sm"
                                    >
                                        <AlertCircle size={16} />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isVerifying || !password}
                                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-violet-500/20"
                            >
                                {isVerifying ? <Loader2 className="animate-spin" size={20} /> : "Desbloquear Sistema"}
                                {!isVerifying && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex-1 flex overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-64 border-r border-white/5 bg-zinc-950/20 p-4 space-y-2 shrink-0">
                            <button
                                onClick={() => setActiveTab("finder")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "finder" ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "text-zinc-400 hover:bg-white/5"}`}
                            >
                                <Search size={18} />
                                Buscador de Leads
                            </button>
                            <button
                                onClick={() => setActiveTab("crm")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "crm" ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "text-zinc-400 hover:bg-white/5"}`}
                            >
                                <Users size={18} />
                                CRM / Salvos
                                {savedLeads.length > 0 && (
                                    <span className="ml-auto bg-violet-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                        {savedLeads.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("auditor")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "auditor" ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "text-zinc-400 hover:bg-white/5"}`}
                            >
                                <BarChart3 size={18} />
                                Auditor de Sites
                            </button>
                            <button
                                onClick={() => setActiveTab("templates")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "templates" ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "text-zinc-400 hover:bg-white/5"}`}
                            >
                                <FileText size={18} />
                                Templates
                            </button>
                            <button
                                onClick={() => setActiveTab("content-lab")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "content-lab" ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "text-zinc-400 hover:bg-white/5"}`}
                            >
                                <Zap size={18} />
                                Content Lab
                            </button>

                            <div className="pt-8">
                                <div className="px-4 mb-4">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quick Send</p>
                                </div>
                                <div className="px-4 space-y-4">
                                    <textarea
                                        value={phoneNumbers}
                                        onChange={(e) => setPhoneNumbers(e.target.value)}
                                        placeholder="Números..."
                                        className="w-full h-24 bg-zinc-800/50 border border-white/5 rounded-lg p-2 text-[10px] text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 resize-none"
                                    />
                                    <button
                                        onClick={() => handleSendWhatsApp()}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send size={12} />
                                        Disparo Rápido
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {activeTab === "finder" && (
                                    <motion.div
                                        key="finder"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                <Search className="text-violet-500" />
                                                Encontrar Novos Clientes
                                            </h3>
                                            <p className="text-zinc-400 text-sm">Busque por estabelecimentos reais em qualquer região do Brasil.</p>
                                        </div>

                                        <form onSubmit={findLeads} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-1">
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    placeholder="O que busca? (ex: Academia)"
                                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                                />
                                            </div>
                                            <div className="md:col-span-1">
                                                <input
                                                    type="text"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    placeholder="Cidade ou Bairro"
                                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSearching || !searchQuery}
                                                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold rounded-xl p-4 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isSearching ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                                                Mapear Oportunidades
                                            </button>
                                        </form>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {leads.map(lead => (
                                                <div key={lead.id} className="bg-zinc-800/50 border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all group relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-4">
                                                        <button
                                                            onClick={() => toggleSaveLead(lead)}
                                                            className={`p-2 rounded-lg transition-all ${savedLeads.find(l => l.id === lead.id) ? "bg-violet-500 text-white" : "bg-white/5 text-zinc-500 hover:bg-white/10"}`}
                                                        >
                                                            <Save size={16} />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-col gap-4">
                                                        <div>
                                                            <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1 block">{lead.type}</span>
                                                            <h4 className="text-lg font-bold text-white leading-tight pr-8">{lead.name}</h4>
                                                        </div>

                                                        <div className="flex items-start gap-2 text-xs text-zinc-400">
                                                            <MapPin size={14} className="shrink-0 mt-0.5" />
                                                            {lead.address}
                                                        </div>

                                                        <div className="flex items-center gap-2 pt-2">
                                                            <button
                                                                onClick={() => handleSendWhatsApp(undefined, `Olá ${lead.name}! Vi seu negócio no mapa e notei que vocês ainda não têm uma presença digital otimizada...`)}
                                                                className="flex-1 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white text-xs font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                                                            >
                                                                <MessageCircle size={14} />
                                                                Abordar
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setAuditUrl(lead.name.toLowerCase().replace(/\s+/g, "") + ".com.br");
                                                                    setActiveTab("auditor");
                                                                }}
                                                                className="p-2.5 bg-white/5 hover:bg-white/10 text-zinc-400 rounded-lg transition-all"
                                                                title="Auditar Site"
                                                            >
                                                                <BarChart3 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "crm" && (
                                    <motion.div
                                        key="crm"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                    <Users className="text-violet-500" />
                                                    Meus Prospectos
                                                </h3>
                                                <p className="text-zinc-400 text-sm">Gerencie os leads que você salvou para acompanhamento.</p>
                                            </div>
                                            <button
                                                onClick={() => saveLeadsToStorage([])}
                                                className="text-xs text-red-500 hover:underline flex items-center gap-1"
                                            >
                                                <Trash2 size={12} />
                                                Limpar Tudo
                                            </button>
                                        </div>

                                        <div className="bg-zinc-800/30 border border-white/5 rounded-2xl overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-white/5 bg-white/5">
                                                        <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nome / Empresa</th>
                                                        <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                                                        <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {savedLeads.map(lead => (
                                                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                                            <td className="p-4">
                                                                <p className="text-sm font-bold text-white">{lead.name}</p>
                                                                <p className="text-[10px] text-zinc-500">{lead.type}</p>
                                                            </td>
                                                            <td className="p-4">
                                                                <span className="px-2 py-0.5 bg-violet-500/10 text-violet-400 text-[10px] rounded-full font-bold">Pendente</span>
                                                            </td>
                                                            <td className="p-4 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        onClick={() => handleSendWhatsApp(undefined, `Olá ${lead.name}, estou entrando em contato novamente...`)}
                                                                        className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                                                                    >
                                                                        <MessageCircle size={14} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => toggleSaveLead(lead)}
                                                                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "auditor" && (
                                    <motion.div
                                        key="auditor"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                <BarChart3 className="text-violet-500" />
                                                Auditor de Sites
                                            </h3>
                                            <p className="text-zinc-400 text-sm">Gere um relatório de falhas para usar como argumento de venda.</p>
                                        </div>

                                        <form onSubmit={runAudit} className="flex gap-4">
                                            <input
                                                type="text"
                                                value={auditUrl}
                                                onChange={(e) => setAuditUrl(e.target.value)}
                                                placeholder="URL do site do cliente"
                                                className="flex-1 bg-zinc-800 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isAuditing || !auditUrl}
                                                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold rounded-xl px-8 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isAuditing ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                                                Analisar
                                            </button>
                                        </form>

                                        {auditResult && (
                                            <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-6 space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-white">{auditResult.url}</h4>
                                                    <span className={`text-2xl font-black ${auditResult.score < 50 ? "text-red-500" : "text-yellow-500"}`}>
                                                        {auditResult.score}/100
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xs font-bold text-zinc-500 uppercase">Falhas:</p>
                                                    {auditResult.issues.map((issue, i) => (
                                                        <p key={i} className="text-xs text-red-400 flex items-center gap-2">
                                                            <AlertCircle size={12} /> {issue}
                                                        </p>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(`Relatório de Auditoria: ${auditResult.url}\nScore: ${auditResult.score}\n\nFalhas:\n${auditResult.issues.join("\n")}`)}
                                                    className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Copy size={14} /> Copiar Relatório
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === "content-lab" && (
                                    <motion.div
                                        key="content-lab"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                <Zap className="text-violet-500" />
                                                Laboratório de Conteúdo
                                            </h3>
                                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                {["generator", "templates", "planner", "strategy"].map((tab) => (
                                                    <button
                                                        key={tab}
                                                        onClick={() => setContentLabSubTab(tab as any)}
                                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${contentLabSubTab === tab ? "bg-violet-500 text-white" : "bg-white/5 text-zinc-400 hover:bg-white/10"}`}
                                                    >
                                                        {tab === "generator" ? "Gerador" : tab === "templates" ? "Templates" : tab === "planner" ? "Planejador" : "Estratégia"}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {contentLabSubTab === "generator" && (
                                            <div className="space-y-6">
                                                <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-8 text-center space-y-6">
                                                    <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto">
                                                        <Zap className="text-violet-500" size={32} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="text-xl font-bold text-white">Gerador de Ideias</h4>
                                                        <p className="text-zinc-400 text-sm max-w-md mx-auto">Gere conceitos de posts e vídeos focados em marketing de serviços de web design.</p>
                                                    </div>
                                                    <button
                                                        onClick={generateIdea}
                                                        disabled={isGenerating}
                                                        className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2 mx-auto"
                                                    >
                                                        {isGenerating ? (
                                                            <>
                                                                <Loader2 className="animate-spin" size={20} />
                                                                IA Criando...
                                                            </>
                                                        ) : (
                                                            "Gerar Nova Ideia"
                                                        )}
                                                    </button>
                                                </div>

                                                {generatedIdea && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="bg-zinc-800 border border-violet-500/30 rounded-2xl p-6 space-y-4"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <span className="px-2 py-1 bg-violet-500/20 text-violet-400 text-[10px] font-bold rounded uppercase">{generatedIdea.type}</span>
                                                            <button onClick={() => copyToClipboard(`${generatedIdea.title}\n\n${generatedIdea.caption}`)} className="text-zinc-500 hover:text-white transition-colors">
                                                                <Copy size={16} />
                                                            </button>
                                                        </div>
                                                        <h5 className="text-lg font-bold text-white">{generatedIdea.title}</h5>
                                                        <p className="text-sm text-zinc-400 leading-relaxed">{generatedIdea.caption}</p>
                                                        <button
                                                            onClick={() => addPlannedPost(generatedIdea.title)}
                                                            className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <Save size={14} /> Salvar no Planejador
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}

                                        {contentLabSubTab === "templates" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    { title: "Carrossel Educativo", desc: "Estrutura: Capa chamativa > Problema > Solução > CTA", color: "from-blue-500/20" },
                                                    { title: "Post de Prova Social", desc: "Estrutura: Print de feedback > Resultado alcançado > CTA", color: "from-emerald-500/20" },
                                                    { title: "Checklist de Valor", desc: "Estrutura: Lista de itens essenciais > Por que importa > CTA", color: "from-violet-500/20" },
                                                    { title: "Antes e Depois", desc: "Estrutura: Site antigo > Site novo > Métricas de melhora", color: "from-orange-500/20" }
                                                ].map((t, i) => (
                                                    <div key={i} className={`bg-gradient-to-br ${t.color} to-zinc-900 border border-white/5 rounded-2xl p-6 space-y-3`}>
                                                        <h4 className="font-bold text-white">{t.title}</h4>
                                                        <p className="text-xs text-zinc-400">{t.desc}</p>
                                                        <button className="text-[10px] font-bold text-violet-400 uppercase hover:underline">Ver no Canva (Mock)</button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {contentLabSubTab === "planner" && (
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-bold text-white">Calendário Editorial</h4>
                                                    <span className="text-[10px] text-zinc-500 uppercase font-bold">{plannedPosts.length} Posts Planejados</span>
                                                </div>
                                                <div className="space-y-3">
                                                    {plannedPosts.length === 0 ? (
                                                        <div className="p-12 border-2 border-dashed border-white/5 rounded-2xl text-center text-zinc-500 text-sm">
                                                            Nenhum post planejado ainda.
                                                        </div>
                                                    ) : (
                                                        plannedPosts.map(post => (
                                                            <div key={post.id} className="bg-zinc-800/50 border border-white/5 rounded-xl p-4 flex justify-between items-center">
                                                                <div>
                                                                    <p className="text-sm font-bold text-white">{post.title}</p>
                                                                    <p className="text-[10px] text-zinc-500">{post.date}</p>
                                                                </div>
                                                                <button onClick={() => removePlannedPost(post.id)} className="text-red-500/50 hover:text-red-500 transition-colors">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {contentLabSubTab === "strategy" && (
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest">Scripts de Abordagem</h4>
                                                        <button
                                                            onClick={() => copyToClipboard(STRATEGY_GUIDE.scripts.map(s => `${s.title}:\n${s.content}`).join("\n\n"))}
                                                            className="text-[10px] text-zinc-500 hover:text-violet-400 transition-colors flex items-center gap-1"
                                                        >
                                                            <Copy size={12} /> Copiar Todos
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        {STRATEGY_GUIDE.scripts.map((s, i) => (
                                                            <div key={i} className="bg-zinc-800/50 border border-white/5 rounded-xl p-4 space-y-2 group relative">
                                                                <p className="text-xs font-bold text-white">{s.title}</p>
                                                                <p className="text-xs text-zinc-400 italic">"{s.content}"</p>
                                                                <button onClick={() => copyToClipboard(s.content)} className="text-[10px] text-violet-500 font-bold hover:underline">Copiar Script</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest">Dicas de Crescimento Orgânico</h4>
                                                        <button
                                                            onClick={() => copyToClipboard(STRATEGY_GUIDE.tips.join("\n"))}
                                                            className="text-[10px] text-zinc-500 hover:text-violet-400 transition-colors flex items-center gap-1"
                                                        >
                                                            <Copy size={12} /> Copiar Todas
                                                        </button>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {STRATEGY_GUIDE.tips.map((tip, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                                                                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                                {tip}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-xs font-bold text-white uppercase">Hashtags Estratégicas</h4>
                                                        <button onClick={() => copyToClipboard(STRATEGY_GUIDE.hashtags)} className="text-violet-400 hover:text-white transition-colors">
                                                            <Copy size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-zinc-400">{STRATEGY_GUIDE.hashtags}</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="p-4 bg-zinc-950/50 border-t border-white/5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <CheckCircle2 size={12} className="text-violet-500" />
                        WTM Corps Sales Intelligence v2.1 - Secured
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
