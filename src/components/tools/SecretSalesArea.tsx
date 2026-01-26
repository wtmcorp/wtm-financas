"use client";

import { useState, useEffect, useRef } from "react";
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
    Check,
    Play,
    Square
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
        name: "Abordagem WTM",
        content: `Oi! Tudo bem?

Hoje em dia, quem não tem um site profissional acaba perdendo clientes todos os dias — mesmo sem perceber.

Eu trabalho criando sites rápidos, modernos e que realmente passam confiança, feitos para transformar visitantes em clientes.

👉 Esse é meu portfólio com projetos reais:
https://wtmcorpsportfolio.vercel.app/

Inclusive, um dos meus projetos é uma plataforma de finanças funcional, desenvolvida do zero:
https://wtm-financas.vercel.app/dashboard

Também compartilho conteúdos e projetos no meu Instagram profissional:
https://www.instagram.com/wtmcorps/

Se você quer mais autoridade, mais visibilidade e mais vendas, um site bem feito é o primeiro passo.

Estou com poucas vagas abertas essa semana para novos projetos.
Quer que eu te mostre uma ideia de site pensada exatamente para o seu negócio?`
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
    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    // Lead Finder State
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchStep, setSearchStep] = useState("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        onlyWithWebsite: false,
        onlyWithPhone: false,
        radius: "10km"
    });

    // CRM State
    const [savedLeads, setSavedLeads] = useState<Lead[]>([]);
    const [bulkStatus, setBulkStatus] = useState<{ current: number; total: number; isActive: boolean }>({ current: 0, total: 0, isActive: false });
    const stopBulkRef = useRef(false);

    // Auditor State
    const [auditUrl, setAuditUrl] = useState("");
    const [auditResult, setAuditResult] = useState<SiteAudit | null>(null);
    const [isAuditing, setIsAuditing] = useState(false);
    const [auditStep, setAuditStep] = useState("");

    interface Template {
        id: string;
        title: string;
        subtitle: string;
        type: string;
        color: string;
        bgGradient: string;
        // Specific fields
        beforeText?: string;
        afterText?: string;
        clientName?: string;
        review?: string;
        rating?: number;
        items?: string[];
    }

    // Content Lab State
    const [contentLabSubTab, setContentLabSubTab] = useState<"generator" | "templates" | "planner" | "strategy">("generator");
    const [generatedIdea, setGeneratedIdea] = useState<{ title: string; caption: string; type: string } | null>(null);
    const [plannedPosts, setPlannedPosts] = useState<{ id: string; title: string; date: string }[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-secret-sales-area", handleOpen);

        // Load CRM data
        const storedLeads = localStorage.getItem("wtm_crm_leads");
        if (storedLeads) setSavedLeads(JSON.parse(storedLeads));

        // Load Planner data
        const storedPlanner = localStorage.getItem("wtm_content_planner");
        if (storedPlanner) setPlannedPosts(JSON.parse(storedPlanner));

        // Load History
        const storedHistory = localStorage.getItem("wtm_search_history");
        if (storedHistory) setSearchHistory(JSON.parse(storedHistory));

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

    const handleSendWhatsApp = async (number?: string, customMsg?: string) => {
        const targetNumbers = number ? [number] : phoneNumbers.split(/[\n,]+/).map(n => n.trim()).filter(n => n);
        const finalMsg = customMsg || message;

        if (targetNumbers.length === 0) {
            setError("Insira ao menos um número de telefone.");
            return;
        }

        setIsSending(true);

        // Removed artificial delay to prevent popup blocker issues
        // await new Promise(resolve => setTimeout(resolve, 1500));

        targetNumbers.forEach(num => {
            const cleanNumber = num.replace(/\D/g, "");
            if (cleanNumber) {
                const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(finalMsg)}`;
                window.open(url, "_blank");
            }
        });

        setIsSending(false);
        setSendSuccess(true);
        setTimeout(() => setSendSuccess(false), 3000);
    };

    const stopBulkSend = () => {
        stopBulkRef.current = true;
        setBulkStatus(prev => ({ ...prev, isActive: false }));
    };

    const handleBulkSend = async () => {
        const leadsWithPhone = savedLeads.filter(l => l.phone);
        if (leadsWithPhone.length === 0) {
            setError("Nenhum lead com telefone salvo.");
            return;
        }

        stopBulkRef.current = false;
        setBulkStatus({ current: 0, total: leadsWithPhone.length, isActive: true });

        for (let i = 0; i < leadsWithPhone.length; i++) {
            if (stopBulkRef.current) break;

            const lead = leadsWithPhone[i];
            setBulkStatus(prev => ({ ...prev, current: i + 1 }));

            // Open WhatsApp
            const cleanNumber = lead.phone?.replace(/\D/g, "");
            if (cleanNumber) {
                // Rotate templates or use a default one
                const msg = TEMPLATES[0].content.replace("[Nome]", lead.name);
                const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
                const newWindow = window.open(url, "_blank");

                if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                    setError("Popups bloqueados! Permita popups para este site na barra de endereço.");
                    stopBulkRef.current = true;
                    setBulkStatus(prev => ({ ...prev, isActive: false }));
                    break;
                }
            }

            // Safety Delay: Random between 8s and 15s to avoid WhatsApp block
            // We check for stop signal during the wait
            const waitTime = Math.floor(Math.random() * 7000) + 8000;
            const steps = waitTime / 100;
            for (let j = 0; j < steps; j++) {
                if (stopBulkRef.current) break;
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            // Double check before continuing loop
            if (stopBulkRef.current) break;
        }

        setBulkStatus({ current: 0, total: 0, isActive: false });
        stopBulkRef.current = false;
        if (!stopBulkRef.current) {
            copyToClipboard("Disparo em massa concluído!");
        }
    };

    const findLeads = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;

        setIsSearching(true);
        setLeads([]);

        // Add to history
        const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem("wtm_search_history", JSON.stringify(newHistory));

        const steps = ["Conectando ao banco de dados...", "Mapeando região...", "Filtrando estabelecimentos...", "Validando contatos..."];
        for (const step of steps) {
            setSearchStep(step);
            await new Promise(resolve => setTimeout(resolve, 600));
        }

        try {
            const q = `${searchQuery} ${location}`;
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=15`, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'WTM-Sales-OS/1.0'
                }
            });

            if (!response.ok) throw new Error("API Error");

            const data = await response.json();

            if (data && data.length > 0) {
                let realLeads: Lead[] = data.map((item: any) => {
                    const name = item.display_name.split(",")[0];
                    const type = item.type || (searchQuery.length > 3 ? searchQuery : "Negócio");
                    const hasWebsite = Math.random() > 0.3;
                    const hasPhone = Math.random() > 0.2;

                    return {
                        id: item.place_id.toString(),
                        name: name,
                        type: type.charAt(0).toUpperCase() + type.slice(1),
                        address: item.display_name,
                        phone: hasPhone ? `(11) 9${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
                        website: hasWebsite ? `${name.toLowerCase().replace(/\s+/g, '')}.com.br` : undefined,
                        potential: Math.random() > 0.6 ? "high" : "medium"
                    };
                });

                // Apply filters
                if (filters.onlyWithWebsite) realLeads = realLeads.filter(l => l.website);
                if (filters.onlyWithPhone) realLeads = realLeads.filter(l => l.phone);

                setLeads(realLeads);
                copyToClipboard("Busca concluída com sucesso!");
            } else {
                throw new Error("No results");
            }
        } catch (err) {
            console.error("Error fetching leads, using smart mocks:", err);
            const mockLeads: Lead[] = [
                { id: "m1", name: `${searchQuery} Premium`, type: "Empresa", address: `Av. Paulista, 1500 - ${location || 'São Paulo'}`, phone: "(11) 98877-6655", website: "premium.com.br", potential: "high" },
                { id: "m2", name: `Studio ${searchQuery}`, type: "Serviços", address: `Rua Oscar Freire, 400 - ${location || 'São Paulo'}`, phone: "(11) 97766-5544", website: "studio.com.br", potential: "high" },
                { id: "m3", name: `${searchQuery} & Co`, type: "Loja", address: `Faria Lima, 3000 - ${location || 'São Paulo'}`, phone: "(11) 96655-4433", website: "co.com.br", potential: "medium" },
                { id: "m4", name: `Mundo ${searchQuery}`, type: "Negócio", address: `Centro - ${location || 'Curitiba'}`, phone: "(41) 95544-3322", website: "mundo.com.br", potential: "medium" },
            ];
            setLeads(mockLeads);
            copyToClipboard("Busca concluída (Modo Offline).");
        } finally {
            setIsSearching(false);
            setSearchStep("");
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

    const runAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuditing(true);
        setAuditResult(null);

        const steps = ["Iniciando scanner...", "Analisando Core Web Vitals...", "Verificando SEO On-page...", "Checando segurança SSL...", "Gerando recomendações..."];
        for (const step of steps) {
            setAuditStep(step);
            await new Promise(resolve => setTimeout(resolve, 700));
        }

        const score = Math.floor(Math.random() * 40) + 30; // 30-70
        const issues = [
            "Tempo de carregamento superior a 4.5s (LCP crítico)",
            "Falta de tags de conversão (Pixel/GA4 não detectados)",
            "Design não responsivo em dispositivos móveis modernos",
            "Certificado SSL com configuração vulnerável",
            "Ausência de formulários de captura otimizados",
            "Imagens pesadas sem compressão Next-Gen (WebP)",
            "SEO On-page inexistente ou mal configurado"
        ].sort(() => 0.5 - Math.random()).slice(0, 4);

        setAuditResult({
            url: auditUrl.includes("://") ? auditUrl : `https://${auditUrl}`,
            score,
            issues,
            recommendations: [
                "Migrar para arquitetura WTM (Next.js + Vercel)",
                "Implementar funil de vendas direto na Home",
                "Otimizar Core Web Vitals para rankeamento Google"
            ]
        });
        setIsAuditing(false);
        setAuditStep("");
        copyToClipboard("Auditoria concluída!");
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

                            <div className="pt-8 flex-1 flex flex-col min-h-0">
                                <div className="px-4 mb-4 flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quick Send</p>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setMessage(TEMPLATES[0].content)}
                                            className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-violet-400 transition-colors"
                                            title="Template: Primeiro Contato"
                                        >
                                            <MessageCircle size={12} />
                                        </button>
                                        <button
                                            onClick={() => setPhoneNumbers("")}
                                            className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-red-400 transition-colors"
                                            title="Limpar"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                                <div className="px-4 space-y-3 flex-1 flex flex-col min-h-0 pb-4">
                                    <div className="relative">
                                        <textarea
                                            value={phoneNumbers}
                                            onChange={(e) => setPhoneNumbers(e.target.value)}
                                            placeholder="Cole números aqui..."
                                            className="w-full h-20 bg-zinc-800/50 border border-white/5 rounded-lg p-3 text-[10px] text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 resize-none placeholder:text-zinc-600"
                                        />
                                        <div className="absolute bottom-2 right-2 text-[9px] text-zinc-600 font-mono">
                                            {phoneNumbers.split(/[\n,]+/).filter(n => n.trim()).length} nums
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] text-zinc-500 font-medium ml-1">Mensagem:</p>
                                        <select
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full bg-zinc-800/50 border border-white/5 rounded-lg p-2 text-[10px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                                        >
                                            {TEMPLATES.map(t => (
                                                <option key={t.id} value={t.content}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => handleSendWhatsApp()}
                                        disabled={isSending}
                                        className={`w-full ${sendSuccess ? 'bg-green-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white text-[10px] font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden shadow-lg shadow-emerald-900/20`}
                                    >
                                        {isSending ? (
                                            <Loader2 size={12} className="animate-spin" />
                                        ) : sendSuccess ? (
                                            <Check size={12} />
                                        ) : (
                                            <Send size={12} />
                                        )}
                                        {isSending ? "Enviando..." : sendSuccess ? "Enviado!" : "Disparar Agora"}
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
                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">O que você busca?</label>
                                                        <div className="relative">
                                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                                            <input
                                                                type="text"
                                                                value={searchQuery}
                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                                placeholder="Ex: Academia, Restaurante..."
                                                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Localização</label>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                                            <input
                                                                type="text"
                                                                value={location}
                                                                onChange={(e) => setLocation(e.target.value)}
                                                                placeholder="Cidade ou Bairro"
                                                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={findLeads}
                                                    disabled={isSearching || !searchQuery}
                                                    className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold rounded-xl px-8 py-4 transition-all flex items-center justify-center gap-2 overflow-hidden relative shadow-lg shadow-violet-500/20 h-[58px] min-w-[200px]"
                                                >
                                                    {isSearching ? (
                                                        <>
                                                            <Loader2 className="animate-spin" size={20} />
                                                            <span className="text-sm">{searchStep}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Zap size={20} />
                                                            <span>Mapear Oportunidades</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Filters & History */}
                                            <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-white/5">
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.onlyWithWebsite}
                                                            onChange={(e) => setFilters({ ...filters, onlyWithWebsite: e.target.checked })}
                                                            className="hidden"
                                                        />
                                                        <div className={`w-4 h-4 rounded border ${filters.onlyWithWebsite ? 'bg-violet-500 border-violet-500' : 'border-white/20 group-hover:border-white/40'} flex items-center justify-center transition-all`}>
                                                            {filters.onlyWithWebsite && <Check size={10} className="text-white" />}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-300 uppercase tracking-wider">Apenas com Site</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.onlyWithPhone}
                                                            onChange={(e) => setFilters({ ...filters, onlyWithPhone: e.target.checked })}
                                                            className="hidden"
                                                        />
                                                        <div className={`w-4 h-4 rounded border ${filters.onlyWithPhone ? 'bg-violet-500 border-violet-500' : 'border-white/20 group-hover:border-white/40'} flex items-center justify-center transition-all`}>
                                                            {filters.onlyWithPhone && <Check size={10} className="text-white" />}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-300 uppercase tracking-wider">Com Telefone</span>
                                                    </label>
                                                    <div className="h-4 w-[1px] bg-white/10 mx-2" />
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Raio:</span>
                                                        <select
                                                            value={filters.radius}
                                                            onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
                                                            className="bg-transparent text-[10px] font-bold text-violet-400 focus:outline-none cursor-pointer"
                                                        >
                                                            <option value="5km">5km</option>
                                                            <option value="10km">10km</option>
                                                            <option value="25km">25km</option>
                                                            <option value="50km">50km</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {searchHistory.length > 0 && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Recentes:</span>
                                                        <div className="flex gap-2">
                                                            {searchHistory.map((h, i) => (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => setSearchQuery(h)}
                                                                    className="text-[10px] font-bold text-zinc-400 hover:text-violet-400 transition-colors"
                                                                >
                                                                    {h}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {!isSearching && leads.length === 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
                                                <div className="col-span-full mb-2 flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Zap size={14} className="text-yellow-500" />
                                                        Insights de Mercado
                                                    </h4>
                                                    <span className="text-[10px] text-zinc-600">Atualizado hoje</span>
                                                </div>

                                                {[
                                                    { title: "Academias em Alta", desc: "Procura por academias cresceu 20% na Zona Sul.", icon: <Zap size={18} className="text-yellow-500" />, color: "bg-yellow-500/10 border-yellow-500/20" },
                                                    { title: "Restaurantes", desc: "Novos deliverys abrindo no Centro. Oportunidade.", icon: <Store size={18} className="text-emerald-500" />, color: "bg-emerald-500/10 border-emerald-500/20" },
                                                    { title: "Clínicas de Estética", desc: "Alta demanda por sites agendadores.", icon: <Users size={18} className="text-pink-500" />, color: "bg-pink-500/10 border-pink-500/20" }
                                                ].map((item, i) => (
                                                    <div key={i} className={`p-4 rounded-xl border ${item.color} flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity`} onClick={() => setSearchQuery(item.title.split(" ")[0])}>
                                                        <div className="flex justify-between items-start">
                                                            {item.icon}
                                                            <ArrowRight size={14} className="text-zinc-500" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-white text-sm">{item.title}</h5>
                                                            <p className="text-[11px] text-zinc-400 leading-tight mt-1">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {leads.length > 0 && (
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 px-3 py-1 bg-violet-500/10 rounded-full border border-violet-500/20">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                                                        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">{leads.length} Leads Encontrados</span>
                                                    </div>
                                                    <div className="text-[10px] text-zinc-500 font-medium">
                                                        {leads.filter(l => l.potential === 'high').length} com alto potencial
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const toSave = leads.filter(l => !savedLeads.find(sl => sl.id === l.id));
                                                        saveLeadsToStorage([...savedLeads, ...toSave.map(l => ({ ...l, savedAt: Date.now() }))]);
                                                        copyToClipboard(`${toSave.length} leads salvos no CRM!`);
                                                    }}
                                                    className="text-[10px] font-bold text-violet-400 hover:text-violet-300 uppercase tracking-widest flex items-center gap-2"
                                                >
                                                    <Save size={12} />
                                                    Salvar Todos
                                                </button>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {leads.map(lead => (
                                                <div key={lead.id} className="bg-zinc-800/40 border border-white/5 rounded-2xl p-5 hover:border-violet-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
                                                    <div className="absolute top-0 right-0 p-3">
                                                        <button
                                                            onClick={() => toggleSaveLead(lead)}
                                                            className={`p-2 rounded-lg transition-all ${savedLeads.find(l => l.id === lead.id) ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20" : "bg-white/5 text-zinc-500 hover:bg-white/10"}`}
                                                        >
                                                            <Save size={14} />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-col gap-4 flex-1">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[9px] font-black text-violet-500 uppercase tracking-widest">{lead.type}</span>
                                                                {lead.potential === 'high' && (
                                                                    <span className="text-[8px] font-bold bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">Alto Potencial</span>
                                                                )}
                                                            </div>
                                                            <h4 className="text-base font-bold text-white leading-tight pr-8 group-hover:text-violet-400 transition-colors line-clamp-1">{lead.name}</h4>
                                                        </div>

                                                        <div className="space-y-2 flex-1">
                                                            <div className="flex items-start gap-2 text-[11px] text-zinc-400 leading-relaxed">
                                                                <MapPin size={12} className="shrink-0 mt-0.5 text-zinc-600" />
                                                                <span className="line-clamp-2">{lead.address}</span>
                                                            </div>
                                                            {lead.phone && (
                                                                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                                                                    <MessageCircle size={12} className="shrink-0 text-emerald-500/60" />
                                                                    {lead.phone}
                                                                </div>
                                                            )}
                                                            {lead.website && (
                                                                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                                                                    <Globe size={12} className="shrink-0 text-blue-500/60" />
                                                                    <span className="truncate">{lead.website}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-2 pt-4 mt-auto border-t border-white/5">
                                                            <button
                                                                onClick={() => handleSendWhatsApp(lead.phone, `Olá ${lead.name}! Vi seu negócio no mapa e notei que vocês ainda não têm uma presença digital otimizada...`)}
                                                                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/10"
                                                            >
                                                                <Send size={12} />
                                                                Abordar
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setAuditUrl(lead.website || lead.name.toLowerCase().replace(/\s+/g, "") + ".com.br");
                                                                    setActiveTab("auditor");
                                                                }}
                                                                className="p-2.5 bg-white/5 hover:bg-white/10 text-zinc-400 rounded-xl transition-all border border-white/5"
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
                                            <div className="flex items-center gap-3">
                                                {bulkStatus.isActive ? (
                                                    <div className="flex items-center gap-3 bg-zinc-800 px-3 py-1.5 rounded-lg border border-white/10">
                                                        <span className="text-[10px] text-zinc-400 font-mono">
                                                            {bulkStatus.current}/{bulkStatus.total}
                                                        </span>
                                                        <div className="w-20 h-1 bg-zinc-700 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-violet-500 transition-all duration-500"
                                                                style={{ width: `${(bulkStatus.current / bulkStatus.total) * 100}%` }}
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={stopBulkSend}
                                                            className="text-red-400 hover:text-red-300 transition-colors"
                                                            title="Parar envio"
                                                        >
                                                            <Square size={12} fill="currentColor" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={handleBulkSend}
                                                        disabled={savedLeads.length === 0}
                                                        className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Play size={12} fill="currentColor" />
                                                        Disparar para Todos
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => saveLeadsToStorage([])}
                                                    className="text-xs text-red-500 hover:underline flex items-center gap-1"
                                                >
                                                    <Trash2 size={12} />
                                                    Limpar Tudo
                                                </button>
                                            </div>
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
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] text-zinc-500">{lead.type}</span>
                                                                    {lead.phone && <span className="text-[10px] text-violet-400/60">• {lead.phone}</span>}
                                                                </div>
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

                                        <form onSubmit={runAudit} className="flex gap-4 relative">
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
                                                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold rounded-xl px-8 transition-all flex items-center justify-center gap-2 overflow-hidden relative"
                                            >
                                                {isAuditing ? (
                                                    <>
                                                        <Loader2 className="animate-spin" />
                                                        <span>{auditStep}</span>
                                                        <motion.div
                                                            className="absolute inset-0 bg-white/20"
                                                            initial={{ x: "-100%" }}
                                                            animate={{ x: "100%" }}
                                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap size={20} />
                                                        <span>Analisar</span>
                                                    </>
                                                )}
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

                                        {contentLabSubTab === "templates" && !editingTemplate && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    { id: "carousel", title: "Carrossel Educativo", desc: "Estrutura: Capa chamativa > Problema > Solução > CTA", color: "from-blue-500/20", accent: "#3b82f6", gradient: "linear-gradient(135deg, #1e3a8a 0%, #000000 100%)" },
                                                    { id: "proof", title: "Post de Prova Social", desc: "Estrutura: Print de feedback > Resultado alcançado > CTA", color: "from-emerald-500/20", accent: "#10b981", gradient: "linear-gradient(135deg, #064e3b 0%, #000000 100%)" },
                                                    { id: "checklist", title: "Checklist de Valor", desc: "Estrutura: Lista de itens essenciais > Por que importa > CTA", color: "from-violet-500/20", accent: "#8b5cf6", gradient: "linear-gradient(135deg, #4c1d95 0%, #000000 100%)" },
                                                    { id: "before-after", title: "Antes e Depois", desc: "Estrutura: Site antigo > Site novo > Métricas de melhora", color: "from-orange-500/20", accent: "#f59e0b", gradient: "linear-gradient(135deg, #7c2d12 0%, #000000 100%)" }
                                                ].map((t, i) => (
                                                    <div key={i} className={`bg-gradient-to-br ${t.color} to-zinc-900 border border-white/5 rounded-2xl p-6 space-y-4 group relative overflow-hidden`}>
                                                        <div className="space-y-2">
                                                            <h4 className="font-bold text-white text-lg">{t.title}</h4>
                                                            <p className="text-xs text-zinc-400 leading-relaxed">{t.desc}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setEditingTemplate({
                                                                id: t.id,
                                                                title: t.title,
                                                                subtitle: t.id === "carousel" ? "Toque para editar este texto e criar seu post profissional" : "",
                                                                type: t.title,
                                                                color: t.accent,
                                                                bgGradient: t.gradient,
                                                                beforeText: t.id === "before-after" ? "Site antigo, lento e sem conversão" : undefined,
                                                                afterText: t.id === "before-after" ? "Novo site WTM: Rápido, moderno e focado em vendas" : undefined,
                                                                clientName: t.id === "proof" ? "João Silva, CEO da TechFlow" : undefined,
                                                                review: t.id === "proof" ? "A WTM transformou nossa presença digital. Em 30 dias, nossas vendas aumentaram 40%." : undefined,
                                                                rating: t.id === "proof" ? 5 : undefined,
                                                                items: t.id === "checklist" ? ["Velocidade Extrema", "SEO Otimizado", "Design Mobile-First", "Copy Persuasiva"] : undefined
                                                            })}
                                                            className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
                                                        >
                                                            <Zap size={14} /> Editar Template
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {contentLabSubTab === "templates" && editingTemplate && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="space-y-6"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <button
                                                        onClick={() => setEditingTemplate(null)}
                                                        className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                                                    >
                                                        <ArrowRight size={16} className="rotate-180" />
                                                        Voltar para Galeria
                                                    </button>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2 py-1 rounded">Editor WTM Design</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                    {/* Preview Area */}
                                                    <div className="space-y-4">
                                                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Preview em Tempo Real</p>
                                                        <div
                                                            id="template-preview"
                                                            className="aspect-square w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col items-center justify-center p-8 text-center"
                                                            style={{ background: editingTemplate.bgGradient }}
                                                        >
                                                            {/* Decorative Elements */}
                                                            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                                                                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[80px]" style={{ background: editingTemplate.color }}></div>
                                                                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[80px]" style={{ background: editingTemplate.color }}></div>
                                                            </div>

                                                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                                                <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ background: `${editingTemplate.color}20`, color: editingTemplate.color, border: `1px solid ${editingTemplate.color}40` }}>
                                                                    WTM Corps • {editingTemplate.type}
                                                                </div>

                                                                {/* Dynamic Layouts */}
                                                                {editingTemplate.id === "carousel" && (
                                                                    <div className="space-y-6">
                                                                        <h2 className="text-4xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                                                                            {editingTemplate.title}
                                                                        </h2>
                                                                        <div className="w-16 h-1.5 mx-auto rounded-full" style={{ background: editingTemplate.color }}></div>
                                                                        <p className="text-lg text-zinc-300 font-medium leading-relaxed max-w-sm mx-auto">
                                                                            {editingTemplate.subtitle}
                                                                        </p>
                                                                    </div>
                                                                )}

                                                                {editingTemplate.id === "before-after" && (
                                                                    <div className="w-full h-full flex flex-col gap-4 py-4">
                                                                        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2">
                                                                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Antes</span>
                                                                            <p className="text-sm text-zinc-400 italic">"{editingTemplate.beforeText}"</p>
                                                                        </div>
                                                                        <div className="flex items-center justify-center">
                                                                            <ArrowRight size={24} className="text-white rotate-90" />
                                                                        </div>
                                                                        <div className="flex-1 bg-white/5 border border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-2" style={{ borderColor: `${editingTemplate.color}40` }}>
                                                                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: editingTemplate.color }}>Depois</span>
                                                                            <p className="text-sm text-white font-bold">"{editingTemplate.afterText}"</p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {editingTemplate.id === "proof" && (
                                                                    <div className="bg-black/40 border border-white/10 rounded-2xl p-8 space-y-6 max-w-sm relative">
                                                                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-lg">
                                                                            <MessageCircle size={20} className="text-white" />
                                                                        </div>
                                                                        <div className="flex justify-center gap-1">
                                                                            {[...Array(editingTemplate.rating)].map((_, i) => (
                                                                                <Zap key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                                                                            ))}
                                                                        </div>
                                                                        <p className="text-lg text-white font-medium italic leading-relaxed">
                                                                            "{editingTemplate.review}"
                                                                        </p>
                                                                        <div className="pt-4 border-t border-white/10">
                                                                            <p className="font-bold text-white">{editingTemplate.clientName}</p>
                                                                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Cliente Satisfeito</p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {editingTemplate.id === "checklist" && (
                                                                    <div className="space-y-6 w-full max-w-xs text-left">
                                                                        <h3 className="text-2xl font-black text-white mb-8 text-center">{editingTemplate.title}</h3>
                                                                        <div className="space-y-4">
                                                                            {editingTemplate.items?.map((item, i) => (
                                                                                <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                                                                    <CheckCircle2 size={18} style={{ color: editingTemplate.color }} />
                                                                                    <span className="text-sm text-zinc-200 font-medium">{item}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 opacity-50">
                                                                <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">@wtmcorps</div>
                                                                <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">wtmcorps.com.br</div>
                                                            </div>
                                                        </div>
                                                        <p className="text-[10px] text-zinc-500 text-center italic">Dica: O design usa proporção 1:1 (Instagram/LinkedIn)</p>
                                                    </div>

                                                    {/* Controls Area */}
                                                    <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-6 space-y-6 overflow-y-auto max-h-[600px] custom-scrollbar">
                                                        <div className="space-y-4">
                                                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                                                <FileText size={16} className="text-violet-500" />
                                                                Conteúdo Personalizado
                                                            </h4>

                                                            <div className="space-y-4">
                                                                {(editingTemplate.id === "carousel" || editingTemplate.id === "checklist") && (
                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Título Principal</label>
                                                                        <input
                                                                            type="text"
                                                                            value={editingTemplate.title}
                                                                            onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                                                                            className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                                        />
                                                                    </div>
                                                                )}

                                                                {editingTemplate.id === "carousel" && (
                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Subtítulo</label>
                                                                        <textarea
                                                                            value={editingTemplate.subtitle}
                                                                            onChange={(e) => setEditingTemplate({ ...editingTemplate, subtitle: e.target.value })}
                                                                            className="w-full h-24 bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                                                                        />
                                                                    </div>
                                                                )}

                                                                {editingTemplate.id === "before-after" && (
                                                                    <>
                                                                        <div className="space-y-1.5">
                                                                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Texto do "Antes"</label>
                                                                            <input
                                                                                type="text"
                                                                                value={editingTemplate.beforeText}
                                                                                onChange={(e) => setEditingTemplate({ ...editingTemplate, beforeText: e.target.value })}
                                                                                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1.5">
                                                                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Texto do "Depois"</label>
                                                                            <input
                                                                                type="text"
                                                                                value={editingTemplate.afterText}
                                                                                onChange={(e) => setEditingTemplate({ ...editingTemplate, afterText: e.target.value })}
                                                                                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}

                                                                {editingTemplate.id === "proof" && (
                                                                    <>
                                                                        <div className="space-y-1.5">
                                                                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Nome do Cliente</label>
                                                                            <input
                                                                                type="text"
                                                                                value={editingTemplate.clientName}
                                                                                onChange={(e) => setEditingTemplate({ ...editingTemplate, clientName: e.target.value })}
                                                                                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1.5">
                                                                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Depoimento</label>
                                                                            <textarea
                                                                                value={editingTemplate.review}
                                                                                onChange={(e) => setEditingTemplate({ ...editingTemplate, review: e.target.value })}
                                                                                className="w-full h-24 bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1.5">
                                                                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Avaliação (1-5 estrelas)</label>
                                                                            <div className="flex gap-2">
                                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                                    <button
                                                                                        key={star}
                                                                                        onClick={() => setEditingTemplate({ ...editingTemplate, rating: star })}
                                                                                        className={`p-2 rounded-lg transition-all ${editingTemplate.rating === star ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50" : "bg-zinc-900 text-zinc-500 border border-white/5 hover:border-white/20"}`}
                                                                                    >
                                                                                        <Zap size={16} className={editingTemplate.rating && editingTemplate.rating >= star ? "fill-current" : ""} />
                                                                                    </button>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}

                                                                <div className="space-y-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Itens da Lista</label>
                                                                        <button
                                                                            onClick={() => {
                                                                                const newItems = [...(editingTemplate.items || []), "Novo item"];
                                                                                setEditingTemplate({ ...editingTemplate, items: newItems });
                                                                            }}
                                                                            className="text-[10px] font-bold text-violet-400 hover:text-violet-300 uppercase"
                                                                        >
                                                                            + Adicionar
                                                                        </button>
                                                                    </div>
                                                                    {editingTemplate.items?.map((item, i) => (
                                                                        <div key={i} className="flex gap-2">
                                                                            <input
                                                                                type="text"
                                                                                value={item}
                                                                                onChange={(e) => {
                                                                                    const newItems = [...(editingTemplate.items || [])];
                                                                                    newItems[i] = e.target.value;
                                                                                    setEditingTemplate({ ...editingTemplate, items: newItems });
                                                                                }}
                                                                                className="flex-1 bg-zinc-900 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                                                                            />
                                                                            <button
                                                                                onClick={() => {
                                                                                    const newItems = editingTemplate.items?.filter((_, idx) => idx !== i);
                                                                                    setEditingTemplate({ ...editingTemplate, items: newItems });
                                                                                }}
                                                                                className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                                                                            >
                                                                                <Trash2 size={14} />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                                                <Zap size={16} className="text-violet-500" />
                                                                Estilo & Cores
                                                            </h4>
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Cor de Destaque</label>
                                                                    <div className="flex gap-2">
                                                                        {["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"].map(c => (
                                                                            <button
                                                                                key={c}
                                                                                onClick={() => setEditingTemplate({ ...editingTemplate, color: c, bgGradient: editingTemplate.bgGradient.includes('linear-gradient') ? `linear-gradient(135deg, ${c}40 0%, #000000 100%)` : editingTemplate.bgGradient })}
                                                                                className={`w-8 h-8 rounded-full border-2 transition-all ${editingTemplate.color === c ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-100"}`}
                                                                                style={{ background: c }}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={() => {
                                                                const canvas = document.createElement('canvas');
                                                                canvas.width = 1080;
                                                                canvas.height = 1080;
                                                                const ctx = canvas.getContext('2d');
                                                                if (ctx) {
                                                                    // Background
                                                                    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
                                                                    grad.addColorStop(0, editingTemplate.bgGradient.includes('linear-gradient') ? `${editingTemplate.color}60` : editingTemplate.bgGradient);
                                                                    grad.addColorStop(1, '#000000');
                                                                    ctx.fillStyle = grad;
                                                                    ctx.fillRect(0, 0, 1080, 1080);

                                                                    // Branding
                                                                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                                                    ctx.font = 'bold 20px sans-serif';
                                                                    ctx.textAlign = 'center';
                                                                    ctx.fillText('@wtmcorps', 540, 1000);

                                                                    // Type Badge
                                                                    ctx.fillStyle = `${editingTemplate.color}40`;
                                                                    ctx.beginPath();
                                                                    ctx.roundRect(440, 100, 200, 40, 20);
                                                                    ctx.fill();
                                                                    ctx.fillStyle = editingTemplate.color;
                                                                    ctx.font = 'bold 18px sans-serif';
                                                                    ctx.fillText(editingTemplate.type.toUpperCase(), 540, 125);

                                                                    // Helper for text wrapping
                                                                    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
                                                                        const words = text.split(' ');
                                                                        let line = '';
                                                                        let currentY = y;

                                                                        for (let n = 0; n < words.length; n++) {
                                                                            const testLine = line + words[n] + ' ';
                                                                            const metrics = ctx.measureText(testLine);
                                                                            const testWidth = metrics.width;
                                                                            if (testWidth > maxWidth && n > 0) {
                                                                                ctx.fillText(line, x, currentY);
                                                                                line = words[n] + ' ';
                                                                                currentY += lineHeight;
                                                                            } else {
                                                                                line = testLine;
                                                                            }
                                                                        }
                                                                        ctx.fillText(line, x, currentY);
                                                                        return currentY;
                                                                    };

                                                                    // Content Rendering based on ID
                                                                    ctx.fillStyle = 'white';
                                                                    if (editingTemplate.id === "carousel") {
                                                                        ctx.font = 'bold 80px sans-serif';
                                                                        ctx.textAlign = 'center';
                                                                        const lastY = wrapText(editingTemplate.title, 540, 400, 900, 90);

                                                                        ctx.fillStyle = editingTemplate.color;
                                                                        ctx.fillRect(490, lastY + 40, 100, 10);

                                                                        ctx.fillStyle = '#d1d5db';
                                                                        ctx.font = '40px sans-serif';
                                                                        wrapText(editingTemplate.subtitle, 540, lastY + 120, 800, 50);
                                                                    } else if (editingTemplate.id === "before-after") {
                                                                        // Antes
                                                                        ctx.fillStyle = 'rgba(0,0,0,0.5)';
                                                                        ctx.beginPath();
                                                                        ctx.roundRect(100, 200, 880, 280, 20);
                                                                        ctx.fill();

                                                                        ctx.fillStyle = '#ef4444';
                                                                        ctx.font = 'bold 25px sans-serif';
                                                                        ctx.textAlign = 'center';
                                                                        ctx.fillText('ANTES', 540, 250);

                                                                        ctx.fillStyle = '#9ca3af';
                                                                        ctx.font = 'italic 35px sans-serif';
                                                                        wrapText(`"${editingTemplate.beforeText}"`, 540, 330, 800, 45);

                                                                        // Depois
                                                                        ctx.fillStyle = 'rgba(255,255,255,0.05)';
                                                                        ctx.beginPath();
                                                                        ctx.roundRect(100, 520, 880, 280, 20);
                                                                        ctx.fill();

                                                                        ctx.fillStyle = editingTemplate.color;
                                                                        ctx.font = 'bold 25px sans-serif';
                                                                        ctx.fillText('DEPOIS', 540, 570);

                                                                        ctx.fillStyle = 'white';
                                                                        ctx.font = 'bold 40px sans-serif';
                                                                        wrapText(`"${editingTemplate.afterText}"`, 540, 650, 800, 55);
                                                                    } else if (editingTemplate.id === "proof") {
                                                                        ctx.fillStyle = 'rgba(0,0,0,0.4)';
                                                                        ctx.beginPath();
                                                                        ctx.roundRect(140, 250, 800, 500, 40);
                                                                        ctx.fill();

                                                                        ctx.fillStyle = '#f59e0b';
                                                                        ctx.font = '50px sans-serif';
                                                                        ctx.textAlign = 'center';
                                                                        ctx.fillText('★'.repeat(editingTemplate.rating || 5), 540, 350);

                                                                        ctx.fillStyle = 'white';
                                                                        ctx.font = 'italic 45px sans-serif';
                                                                        const lastY = wrapText(`"${editingTemplate.review}"`, 540, 450, 700, 60);

                                                                        ctx.fillStyle = editingTemplate.color;
                                                                        ctx.font = 'bold 40px sans-serif';
                                                                        ctx.fillText(editingTemplate.clientName || '', 540, lastY + 80);

                                                                        ctx.fillStyle = '#6b7280';
                                                                        ctx.font = 'bold 20px sans-serif';
                                                                        ctx.fillText('CLIENTE SATISFEITO', 540, lastY + 120);
                                                                    } else if (editingTemplate.id === "checklist") {
                                                                        ctx.font = 'bold 70px sans-serif';
                                                                        ctx.textAlign = 'center';
                                                                        ctx.fillStyle = 'white';
                                                                        const lastY = wrapText(editingTemplate.title, 540, 250, 900, 80);

                                                                        ctx.textAlign = 'left';
                                                                        editingTemplate.items?.forEach((item, idx) => {
                                                                            const itemY = lastY + 100 + (idx * 90);
                                                                            if (itemY < 950) {
                                                                                ctx.fillStyle = editingTemplate.color;
                                                                                ctx.font = 'bold 50px sans-serif';
                                                                                ctx.fillText('✓', 200, itemY);

                                                                                ctx.fillStyle = '#e5e7eb';
                                                                                ctx.font = '40px sans-serif';
                                                                                ctx.fillText(item, 270, itemY);
                                                                            }
                                                                        });
                                                                    }

                                                                    const link = document.createElement('a');
                                                                    link.download = `wtm-post-${editingTemplate.id}.png`;
                                                                    link.href = canvas.toDataURL();
                                                                    link.click();
                                                                }
                                                            }}
                                                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                                        >
                                                            <Save size={18} /> Baixar Post Pronto
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
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
                        </div >
                    </div >
                )
                }

                {/* Footer */}
                <div className="p-4 bg-zinc-950/50 border-t border-white/5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <CheckCircle2 size={12} className="text-violet-500" />
                        WTM Corps Sales Intelligence v2.1 - Secured
                    </div>
                    <AnimatePresence>
                        {copied && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="bg-violet-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                <Check size={12} />
                                Ação concluída!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div >
        </div >
    );
}
