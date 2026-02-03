"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Lock,
    Search,
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Zap,
    Save,
    Trash2,
    FileText,
    Copy,
    Check,
    Sparkles,
    Calendar,
    Download,
    Users,
    BarChart3,
    Send,
    MapPin,
    Store,
    Globe,
    Plus,
    Square,
    Play,
    ListCollapse,
    Info,
    ChevronDown,
    ShieldCheck,
    Smartphone,
    Smartphone as DeviceMobile,
    Layout,
    Clock,
    Filter,
    ArrowUpRight,
    Eye,
    Star,
    Monitor,
    MousePointer2,
    Mail,
    Phone,
    LineChart,
    Settings,
    Layers,
    Type,
    Image as ImageIcon
} from "lucide-react";

interface Lead {
    id: string;
    empresa: string;
    nicho: string;
    cidade: string;
    instagram?: string;
    whatsapp?: string;
    email?: string;
    possui_site: boolean;
    qualidade_site: "nenhum" | "fraco" | "médio" | "bom";
    score_venda: number;
    motivo_oportunidade: string;
    savedAt?: number;
    notes?: string;
    // Legacy fields for compatibility if needed, or mapped
    address?: string;
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
        { title: "Como um design premium aumenta seu ticket médio", type: "Post Estático", caption: "A percepção de valor começa pelo olhar. Um site amador atrai clientes que buscam preço, um site premium atrai clientes que buscam qualidade. #DesignPremium #Branding" },
        { title: "A psicologia das cores no seu site", type: "Carrossel", caption: "Como as cores influenciam a decisão de compra do seu cliente. #Neuromarketing #WebDesign" },
        { title: "Por que o 'Mobile First' não é mais opcional", type: "Reels", caption: "Mais de 70% do tráfego vem do celular. Se seu site não é perfeito no mobile, você não existe. #MobileFirst #UX" }
    ],
    "marketing": [
        { title: "O erro #1 que impede sua empresa de vender no Google", type: "Carrossel", caption: "Não adianta ter tráfego se sua página não converte. O segredo está na experiência do usuário. #GoogleAds #SEO" },
        { title: "3 Gatilhos mentais indispensáveis para sua página de vendas", type: "Reels/Vídeo", caption: "Autoridade, Escassez e Prova Social. Como usar sem parecer forçado. #Neuromarketing #Copywriting" },
        { title: "Por que o tráfego pago sozinho não faz milagre", type: "Post Estático", caption: "O anúncio traz o cliente, mas o site é quem fecha a venda. Cuide da sua casa digital. #MarketingDeResultados #Growth" },
        { title: "Como criar uma oferta irresistível", type: "Carrossel", caption: "O segredo para vender mais não é baixar o preço, é aumentar o valor percebido. #Vendas #Marketing" },
        { title: "SEO em 2026: O que realmente importa", type: "Post Estático", caption: "Velocidade, conteúdo útil e autoridade. Esqueça os truques baratos. #SEO #MarketingDigital" }
    ],
    "lifestyle": [
        { title: "Bastidores: Como criamos uma identidade visual do zero", type: "Stories/Processo", caption: "Mostrando o processo criativo desde o briefing até o lançamento. #DesignProcess #CreativeAgency" },
        { title: "Um dia na WTM Corps: Foco em resultados", type: "Vlog Curto", caption: "Nossa rotina focada em entregar o melhor para nossos parceiros. #AgencyLife #WTMCorps" },
        { title: "Minha configuração de trabalho para alta produtividade", type: "Post Estático", caption: "Onde a mágica acontece. Organização é a chave para a criatividade. #Setup #Productivity" }
    ],
    "results": [
        { title: "Case de Sucesso: +200% em conversão em 30 dias", type: "Estudo de Caso", caption: "Como reformulamos o checkout de um cliente e explodimos as vendas. #CaseDeSucesso #ROI" },
        { title: "Depoimento: O que nossos clientes dizem sobre nós", type: "Prova Social", caption: "A satisfação de quem confiou sua presença digital à WTM. #Feedback #ClientesSatisfeitos" },
        { title: "Antes vs Depois: Redesign de uma loja de móveis", type: "Carrossel", caption: "A transformação visual que gerou autoridade imediata. #Redesign #WebDesign" }
    ]
};

const STRATEGY_GUIDE = {
    scripts: [
        { title: "Script de Abordagem Fria (Direct)", content: "Olá [Nome], vi seu perfil e notei que sua empresa tem um potencial incrível, mas seu site atual pode estar limitando seu crescimento. Trabalhamos com design de alta conversão na WTM Corps. Toparia uma análise gratuita de 5 min?" },
        { title: "Quebra de Objeção: 'Está caro'", content: "Entendo perfeitamente. Na verdade, o investimento se paga com o aumento da conversão. Se recuperarmos apenas 2 clientes que você perde hoje por causa do site, o projeto já se pagou. Faz sentido?" },
        { title: "Follow-up Estratégico", content: "Oi [Nome], passando para compartilhar um case de um cliente do seu nicho que teve resultados excelentes após a nossa intervenção. Pensei que você gostaria de ver!" },
        { title: "Script de Indicação", content: "Olá [Parceiro], estamos expandindo nossa operação e buscando 3 novas empresas para escalar este mês. Se conhecer alguém que precise profissionalizar o site, ficarei muito grato pela indicação!" },
        { title: "Abordagem Google Maps", content: "Olá [Nome], encontrei sua empresa no Google Maps e notei que vocês ainda não têm um site otimizado. Isso faz com que vocês percam muitos clientes locais. Podemos conversar sobre como resolver isso?" }
    ],
    hashtags: "#WebDesignProfissional #MarketingDeServiços #WTMCorps #VendasOnline #LandingPageAltaConversão #EmpreendedorismoDigital #DesignEstratégico #WebDesignBrasil #MarketingParaEmpresas",
    tips: [
        "Poste 3x por semana focando em resolver dores do seu cliente ideal.",
        "Interaja com 20 perfis de potenciais clientes todos os dias (comentários sinceros).",
        "Use os Stories para mostrar os bastidores e gerar autoridade.",
        "Sempre tenha uma CTA (Chamada para Ação) clara em todos os posts.",
        "Responda todos os directs em menos de 1 hora para não perder o timing.",
        "Use depoimentos de clientes em vídeo para aumentar a prova social.",
        "Crie um portfólio em PDF para enviar rapidamente via WhatsApp."
    ]
};

export default function SecretSalesArea() {
    const [isOpen, setIsOpen] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [activeTab, setActiveTab] = useState<"finder" | "crm" | "bulk-sender" | "auditor" | "templates" | "content-lab">("finder");

    // WhatsApp Sender State
    const [phoneNumbers, setPhoneNumbers] = useState("");
    const [message, setMessage] = useState(TEMPLATES[0].content);
    const [copied, setCopied] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    // Lead Finder State
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("Suzano, SP");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchStep, setSearchStep] = useState("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        onlyWithWebsite: false,
        onlyWithPhone: false,
        radius: "10km",
        minScore: 0
    });

    // CRM State
    const [savedLeads, setSavedLeads] = useState<Lead[]>([]);
    const [bulkStatus, setBulkStatus] = useState<{ current: number; total: number; isActive: boolean; isPaused: boolean }>({ current: 0, total: 0, isActive: false, isPaused: false });
    const stopBulkRef = useRef(false);
    const bulkPauseRef = useRef(false);

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
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);
    const [manualLead, setManualLead] = useState({ empresa: "", whatsapp: "", nicho: "", cidade: "" });

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

        // Single Send (Instant)
        if (targetNumbers.length === 1) {
            setIsSending(true);
            const cleanNumber = targetNumbers[0].replace(/\D/g, "");
            if (cleanNumber) {
                const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(finalMsg)}`;
                window.open(url, "_blank");
            }
            setIsSending(false);
            setSendSuccess(true);
            setTimeout(() => setSendSuccess(false), 3000);
            return;
        }

        // Force user to confirm safe mode for bulk
        const confirmSafe = window.confirm("MODO DE SEGURANÇA ATIVADO:\n\nPara evitar o banimento do seu WhatsApp, o sistema enviará mensagens com intervalos de 60 a 120 segundos e fará uma pausa de 5 minutos a cada 5 envios.\n\nEste processo é LENTO mas SEGURO. Deseja continuar?");
        if (!confirmSafe) return;

        // Bulk Send Logic (Manual List)
        stopBulkRef.current = false;
        setBulkStatus({ current: 0, total: targetNumbers.length, isActive: true, isPaused: false });
        setIsSending(true);

        for (let i = 0; i < targetNumbers.length; i++) {
            if (stopBulkRef.current) break;

            setBulkStatus(prev => ({ ...prev, current: i + 1 }));
            const cleanNumber = targetNumbers[i].replace(/\D/g, "");

            if (cleanNumber) {
                const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(finalMsg)}`;
                const newWindow = window.open(url, "_blank");

                if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                    setError("Popups bloqueados! Permita popups para este site na barra de endereço.");
                    stopBulkRef.current = true;
                    break;
                }
            }

            // Safety Delays
            if (i < targetNumbers.length - 1) {
                // Every 5 messages, take a long break (5 minutes)
                if ((i + 1) % 5 === 0) {
                    setError("Pausa de segurança: 5 minutos para evitar bloqueio...");
                    setBulkStatus(prev => ({ ...prev, isPaused: true }));
                    const cooldownTime = 5 * 60 * 1000; // 5 minutes
                    const steps = 3000; // 0.1s steps
                    for (let j = 0; j < steps; j++) {
                        if (stopBulkRef.current) break;
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                    setBulkStatus(prev => ({ ...prev, isPaused: false }));
                    setError("");
                } else {
                    // Random delay between 60 and 120 seconds
                    const waitTime = Math.floor(Math.random() * 60000) + 60000;
                    const steps = waitTime / 100;
                    for (let j = 0; j < steps; j++) {
                        if (stopBulkRef.current) break;
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
            }
        }

        setBulkStatus({ current: 0, total: 0, isActive: false, isPaused: false });
        setIsSending(false);
        stopBulkRef.current = false;

        if (!stopBulkRef.current) {
            setSendSuccess(true);
            setTimeout(() => setSendSuccess(false), 3000);
            copyToClipboard("Disparo concluído com segurança!");
        }
    };

    const startBulkSend = async () => {
        await handleSendWhatsApp();
    };

    const stopOperation = () => {
        stopBulkRef.current = true;
        setBulkStatus(prev => ({ ...prev, isActive: false }));
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

        const steps = [
            "Mapeando estabelecimentos...",
            "Extraindo contatos...",
            "Calculando scores..."
        ];
        for (const step of steps) {
            setSearchStep(step);
            await new Promise(resolve => setTimeout(resolve, 600));
        }

        try {
            const response = await fetch("/api/sales/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: searchQuery, location })
            });

            const data = await response.json();
            if (data.leads) setLeads(data.leads);
        } catch (err) {
            setError("Erro ao buscar leads.");
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

    const handleAddManualLead = (e: React.FormEvent) => {
        e.preventDefault();
        const newLead: Lead = {
            id: `manual-${Date.now()}`,
            empresa: manualLead.empresa,
            whatsapp: manualLead.whatsapp,
            nicho: manualLead.nicho,
            cidade: manualLead.cidade,
            possui_site: false,
            qualidade_site: "nenhum",
            score_venda: 100,
            motivo_oportunidade: "Lead manual",
            savedAt: Date.now()
        };
        saveLeadsToStorage([...savedLeads, newLead]);
        setIsManualModalOpen(false);
        setManualLead({ empresa: "", whatsapp: "", nicho: "", cidade: "" });
    };

    const runAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuditing(true);
        try {
            const response = await fetch("/api/tools/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: auditUrl })
            });
            const data = await response.json();
            setAuditResult(data);
        } catch (err) {
            setError("Erro na auditoria.");
        } finally {
            setIsAuditing(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateIdea = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const categories = Object.keys(CONTENT_IDEAS) as Array<keyof typeof CONTENT_IDEAS>;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const idea = CONTENT_IDEAS[category][0];
        setGeneratedIdea(idea);
        setIsGenerating(false);
    };

    const removePlannedPost = (id: string) => {
        savePlannerToStorage(plannedPosts.filter(p => p.id !== id));
    };

    const addPlannedPost = (title: string) => {
        const newPost = { id: Date.now().toString(), title, date: new Date().toLocaleDateString() };
        savePlannerToStorage([...plannedPosts, newPost]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-[1400px] bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[96vh] relative h-full"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/5 bg-zinc-900/40 backdrop-blur-2xl shrink-0 relative z-30">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl shadow-lg">
                            <Zap className="text-white" size={24} fill="white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter">WTM SALES OS</h2>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Enterprise Suite v3.2</span>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-all text-zinc-500 hover:text-white border border-transparent hover:border-white/10">
                        <X size={24} />
                    </button>
                </div>

                {!isUnlocked ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <Lock className="text-violet-500 mb-8" size={64} />
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">Acesso Restrito</h3>
                        <form onSubmit={handleUnlock} className="w-full max-w-sm space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="SENHA MESTRA"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 px-8 text-white focus:outline-none focus:ring-4 focus:ring-violet-500/20 text-center text-xl font-black tracking-[0.5em]"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
                            <button type="submit" className="w-full bg-white text-black font-black py-6 rounded-2xl hover:bg-violet-50 transition-all uppercase tracking-widest text-xs">
                                Desbloquear Sistema
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex-1 flex overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-64 bg-black/20 border-r border-white/5 p-4 shrink-0 flex flex-col">
                            <div className="space-y-1">
                                {[
                                    { id: "finder", label: "Lead Finder", icon: Search },
                                    { id: "crm", label: "Pipeline CRM", icon: Users },
                                    { id: "bulk-sender", label: "Bulk Sender", icon: Send },
                                    { id: "auditor", label: "Site Auditor", icon: BarChart3 },
                                    { id: "templates", label: "Scripts PRO", icon: FileText },
                                    { id: "content-lab", label: "Creative Lab", icon: Zap },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as any)}
                                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? "bg-violet-600/20 text-white border border-violet-500/20 shadow-lg" : "text-zinc-500 hover:text-white"}`}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Sistema Ativo
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col min-w-0 bg-[#0c0c0e]">
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 xl:p-8">
                                <AnimatePresence mode="wait">
                                    {activeTab === "finder" && (
                                        <motion.div key="finder" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                            <div className="flex items-center gap-3 mb-8">
                                                <Search className="text-violet-500" size={24} />
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Exploração de Leads</h3>
                                            </div>

                                            <form onSubmit={findLeads} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                                <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        placeholder="Nicho (Ex: Academias)"
                                                        className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-bold"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        placeholder="Localização"
                                                        className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-bold"
                                                    />
                                                </div>
                                                <button disabled={isSearching} className="lg:col-span-2 bg-white text-black font-black rounded-2xl flex items-center justify-center p-4 hover:bg-violet-50 transition-all uppercase tracking-widest text-[10px]">
                                                    {isSearching ? <Loader2 className="animate-spin" /> : "Buscar"}
                                                </button>
                                            </form>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                                                {leads.map((lead) => (
                                                    <div key={lead.id} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all group">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                                                                <Store className="text-zinc-400" size={20} />
                                                            </div>
                                                            <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20">
                                                                SCORE: {lead.score_venda}%
                                                            </div>
                                                        </div>
                                                        <h4 className="text-lg font-black text-white mb-1 line-clamp-1">{lead.empresa}</h4>
                                                        <p className="text-xs text-zinc-500 mb-6 flex items-center gap-2">
                                                            <MapPin size={12} /> {lead.cidade}
                                                        </p>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => toggleSaveLead(lead)}
                                                                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${savedLeads.find(l => l.id === lead.id) ? "bg-emerald-500 text-white" : "bg-white/5 text-white hover:bg-white/10 border border-white/5"}`}
                                                            >
                                                                {savedLeads.find(l => l.id === lead.id) ? "Salvo" : "Salvar no CRM"}
                                                            </button>
                                                            {lead.whatsapp && (
                                                                <button onClick={() => handleSendWhatsApp(lead.whatsapp)} className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
                                                                    <MessageCircle size={20} fill="currentColor" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "crm" && (
                                        <motion.div key="crm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-3">
                                                    <Users className="text-emerald-500" size={24} />
                                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">CRM Pipeline</h3>
                                                </div>
                                                <button onClick={() => setIsManualModalOpen(true)} className="bg-violet-600 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-violet-500 transition-all uppercase tracking-widest text-[10px]">
                                                    <Plus size={16} /> Novo Lead
                                                </button>
                                            </div>

                                            <div className="bg-black/20 border border-white/5 rounded-3xl overflow-hidden">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                                            <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Empresa</th>
                                                            <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Contato</th>
                                                            <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Score</th>
                                                            <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-white/5">
                                                        {savedLeads.map(lead => (
                                                            <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                                                                <td className="p-6">
                                                                    <div className="font-black text-white text-sm">{lead.empresa}</div>
                                                                    <div className="text-[10px] text-zinc-500 uppercase tracking-tight mt-1">{lead.nicho} • {lead.cidade}</div>
                                                                </td>
                                                                <td className="p-6 text-sm text-zinc-400 font-mono">{lead.whatsapp || "N/A"}</td>
                                                                <td className="p-6">
                                                                    <span className="bg-violet-500/10 text-violet-400 text-[10px] font-black px-3 py-1 rounded-full border border-violet-500/20">
                                                                        {lead.score_venda}%
                                                                    </span>
                                                                </td>
                                                                <td className="p-6">
                                                                    <div className="flex items-center gap-3">
                                                                        <button onClick={() => handleSendWhatsApp(lead.whatsapp)} className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all">
                                                                            <MessageCircle size={18} fill="currentColor" />
                                                                        </button>
                                                                        <button onClick={() => toggleSaveLead(lead)} className="p-2 text-zinc-600 hover:text-red-500 rounded-lg transition-all">
                                                                            <Trash2 size={18} />
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

                                    {activeTab === "bulk-sender" && (
                                        <motion.div key="bulk-sender" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="flex flex-col gap-8">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Send className="text-violet-500" size={24} />
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Automação de Mensagens</h3>
                                            </div>

                                            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                                                <div className="xl:col-span-1 space-y-4">
                                                    <div className="bg-black/40 border border-white/5 rounded-3xl p-6">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="text-[10px] font-black text-white uppercase">Lista de Contatos</span>
                                                            <span className="text-[9px] text-zinc-500">{phoneNumbers.split("\n").filter(n => n).length} leads</span>
                                                        </div>
                                                        <textarea
                                                            value={phoneNumbers}
                                                            onChange={(e) => setPhoneNumbers(e.target.value)}
                                                            placeholder="Números (um por linha)..."
                                                            className="w-full h-80 bg-black/20 border border-white/5 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-violet-500/50 resize-none font-mono"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="xl:col-span-2 space-y-4">
                                                    <div className="bg-black/40 border border-white/5 rounded-3xl p-6">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Mensagem do Fluxo</span>
                                                            <select
                                                                className="bg-zinc-900 text-violet-400 text-[10px] px-3 py-1 rounded-lg border border-white/10 outline-none"
                                                                onChange={(e) => setMessage(e.target.value)}
                                                            >
                                                                {TEMPLATES.map(t => <option key={t.id} value={t.content}>{t.name}</option>)}
                                                            </select>
                                                        </div>
                                                        <textarea
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            className="w-full h-80 bg-black/20 border border-white/5 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none leading-relaxed"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="xl:col-span-1 space-y-6">
                                                    <div className="bg-[#111b21] rounded-3xl overflow-hidden border border-white/5 h-80 flex flex-col shadow-2xl relative">
                                                        <div className="bg-[#202c33] p-3 flex items-center gap-2">
                                                            <div className="w-8 h-8 bg-zinc-600 rounded-full" />
                                                            <span className="text-[10px] font-bold text-white uppercase">Preview</span>
                                                        </div>
                                                        <div className="flex-1 p-4 bg-[#0b141a] overflow-y-auto">
                                                            <div className="bg-[#005c4b] text-white p-3 rounded-xl rounded-tr-none text-xs ml-4 mb-2 shadow-sm">
                                                                {message || "Aguardando..."}
                                                            </div>
                                                        </div>
                                                        <div className="p-3 bg-zinc-950/50 flex gap-2">
                                                            <div className="flex-1 h-8 bg-white/5 rounded-full" />
                                                            <div className="w-8 h-8 bg-[#00a884] rounded-full flex items-center justify-center text-white"><Send size={14} fill="white" /></div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 mb-4">
                                                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                                                            <ShieldCheck size={16} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Safe Mode Active</span>
                                                        </div>
                                                        <p className="text-[9px] text-zinc-500 leading-relaxed font-medium">
                                                            Intervalos de 60-120s entre mensagens + Pausa de 5min a cada 5 envios.
                                                            <span className="text-zinc-400 block mt-1">Proteção máxima contra banimento.</span>
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <button
                                                            onClick={startBulkSend}
                                                            disabled={bulkStatus.isActive || !phoneNumbers}
                                                            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black py-6 rounded-2xl transition-all shadow-xl shadow-violet-600/20 uppercase tracking-widest text-[11px] flex items-center justify-center gap-3"
                                                        >
                                                            {bulkStatus.isActive ? <Loader2 className="animate-spin" /> : <Zap size={18} fill="white" />}
                                                            Iniciar Disparos
                                                        </button>
                                                        {bulkStatus.isActive && (
                                                            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 space-y-2">
                                                                <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase">
                                                                    <span>Status</span>
                                                                    <span className="text-violet-400">{bulkStatus.current}/{bulkStatus.total}</span>
                                                                </div>
                                                                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                                                                    <div className="h-full bg-violet-600 transition-all duration-300" style={{ width: `${(bulkStatus.current / bulkStatus.total) * 100}%` }} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "auditor" && (
                                        <motion.div key="auditor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                            <div className="flex items-center gap-3 mb-8">
                                                <BarChart3 className="text-orange-500" size={24} />
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Auditor de Performance</h3>
                                            </div>

                                            <form onSubmit={runAudit} className="flex gap-4">
                                                <input
                                                    type="url"
                                                    value={auditUrl}
                                                    onChange={(e) => setAuditUrl(e.target.value)}
                                                    placeholder="URL do site (https://...)"
                                                    className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-bold"
                                                />
                                                <button disabled={isAuditing} className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 rounded-2xl transition-all uppercase tracking-widest text-[10px]">
                                                    {isAuditing ? <Loader2 className="animate-spin" /> : "Auditar"}
                                                </button>
                                            </form>

                                            {auditResult && (
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
                                                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                                                        <div className="flex items-center justify-between mb-8">
                                                            <div className="text-4xl font-black text-white">{auditResult.score}/100</div>
                                                            <div className="text-[10px] font-black text-zinc-500 uppercase">Global Score</div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                                <AlertCircle size={14} className="text-red-500" /> Problemas Encontrados
                                                            </h4>
                                                            <div className="space-y-2">
                                                                {auditResult.issues.map((i, idx) => (
                                                                    <div key={idx} className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-[11px] text-red-500 font-bold">{i}</div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                                                        <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6">
                                                            <CheckCircle2 size={14} className="text-emerald-500" /> Recomendações Estratégicas
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {auditResult.recommendations.map((r, idx) => (
                                                                <div key={idx} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[11px] text-emerald-400 font-bold">{r}</div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {activeTab === "templates" && (
                                        <motion.div key="templates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {STRATEGY_GUIDE.scripts.map((script, idx) => (
                                                <div key={idx} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 group hover:border-violet-500/30 transition-all">
                                                    <h4 className="text-white font-black text-sm uppercase mb-4 tracking-tight">{script.title}</h4>
                                                    <div className="bg-black/40 rounded-2xl p-6 text-xs text-zinc-400 leading-relaxed font-medium mb-6 min-h-[100px]">
                                                        {script.content}
                                                    </div>
                                                    <button onClick={() => copyToClipboard(script.content)} className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                                        <Copy size={14} /> Copiar Script
                                                    </button>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {activeTab === "content-lab" && (
                                        <motion.div key="content-lab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                            <div className="flex items-center gap-3 mb-8">
                                                <Zap className="text-yellow-500" size={24} />
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Creative Lab</h3>
                                            </div>

                                            <div className="bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-3xl p-10 text-center">
                                                <h4 className="text-3xl font-black text-white mb-4 italic tracking-tighter uppercase">Gerador de Ideias Virais</h4>
                                                <p className="text-zinc-500 mb-8 max-w-lg mx-auto text-sm font-medium">Use nosso algoritmo focado em conversão para criar conteúdos que atraem sites de alto ticket.</p>
                                                <button onClick={generateIdea} disabled={isGenerating} className="bg-white text-black font-black px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5 uppercase tracking-widest text-xs flex items-center justify-center gap-3 mx-auto">
                                                    {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={20} fill="currentColor" />}
                                                    {isGenerating ? "Processando..." : "Gerar Nova Ideia"}
                                                </button>
                                            </div>

                                            {generatedIdea && (
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-10 duration-500">
                                                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                                                        <span className="bg-yellow-500/10 text-yellow-500 text-[9px] font-black px-3 py-1 rounded-full border border-yellow-500/20 uppercase tracking-widest mb-4 inline-block">{generatedIdea.type}</span>
                                                        <h5 className="text-2xl font-black text-white mb-6 leading-tight">{generatedIdea.title}</h5>
                                                        <div className="bg-black/60 rounded-2xl p-6">
                                                            <p className="text-zinc-400 text-sm leading-relaxed font-medium">{generatedIdea.caption}</p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col justify-center gap-4">
                                                        <button onClick={() => addPlannedPost(generatedIdea.title)} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-[10px]">
                                                            <Calendar size={18} /> Agendar Conteúdo
                                                        </button>
                                                        <button onClick={() => copyToClipboard(`${generatedIdea.title}\n\n${generatedIdea.caption}`)} className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-[10px] border border-white/5">
                                                            <Copy size={18} /> Copiar Completo
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer Status */}
                            <div className="p-6 bg-zinc-950/80 border-t border-white/5 flex justify-between items-center relative z-40">
                                <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    WTM Corps intelligence v3.2 • Secured
                                </div>
                                <AnimatePresence>
                                    {copied && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="bg-violet-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                            Sucesso
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Manual Modal Overlay */}
            <AnimatePresence>
                {isManualModalOpen && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative">
                            <button onClick={() => setIsManualModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X size={20} /></button>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 italic">Adicionar Prospecto</h3>
                            <form onSubmit={handleAddManualLead} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Empresa</label>
                                    <input required value={manualLead.empresa} onChange={e => setManualLead({ ...manualLead, empresa: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-4 text-white focus:ring-2 focus:ring-violet-500/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">WhatsApp</label>
                                    <input required value={manualLead.whatsapp} onChange={e => setManualLead({ ...manualLead, whatsapp: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-4 text-white focus:ring-2 focus:ring-violet-500/50" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Nicho</label>
                                        <input value={manualLead.nicho} onChange={e => setManualLead({ ...manualLead, nicho: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-4 text-white focus:ring-2 focus:ring-violet-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Cidade</label>
                                        <input value={manualLead.cidade} onChange={e => setManualLead({ ...manualLead, cidade: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-4 text-white focus:ring-2 focus:ring-violet-500/50" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-violet-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px]">Salvar Lead</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
