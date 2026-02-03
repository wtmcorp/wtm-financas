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
    Info
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

        // Bulk Send Logic (Manual List)
        stopBulkRef.current = false;
        setBulkStatus({ current: 0, total: targetNumbers.length, isActive: true });
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

            // Wait 5-8 seconds to simulate human behavior and avoid blocks
            if (i < targetNumbers.length - 1) {
                const waitTime = Math.floor(Math.random() * 3000) + 5000; // 5000ms to 8000ms
                const steps = waitTime / 100;
                for (let j = 0; j < steps; j++) {
                    if (stopBulkRef.current) break;
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        }

        setBulkStatus({ current: 0, total: 0, isActive: false });
        setIsSending(false);
        stopBulkRef.current = false;

        if (!stopBulkRef.current) {
            setSendSuccess(true);
            setTimeout(() => setSendSuccess(false), 3000);
            copyToClipboard("Disparo concluído!");
        }
    };

    const stopBulkSend = () => {
        stopBulkRef.current = true;
        setBulkStatus(prev => ({ ...prev, isActive: false }));
    };

    const handleBulkSend = async () => {
        const leadsWithPhone = savedLeads.filter(l => l.whatsapp);
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
            const cleanNumber = lead.whatsapp?.replace(/\D/g, "");
            if (cleanNumber) {
                // Rotate templates or use a default one
                const msg = TEMPLATES[0].content.replace("[Nome]", lead.empresa);
                const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
                const newWindow = window.open(url, "_blank");

                if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                    setError("Popups bloqueados! O navegador impediu a abertura. Permita popups para este site na barra de endereço para enviar para todos.");
                    stopBulkRef.current = true;
                    setBulkStatus(prev => ({ ...prev, isActive: false }));
                    break;
                }
            }

            // Wait 5 seconds as requested
            const waitTime = 5000;
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
            setSendSuccess(true);
            setTimeout(() => setSendSuccess(false), 3000);
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

        const steps = [
            "Inicializando protocolos de busca...",
            "Conectando ao satélite de geolocalização...",
            "Mapeando estabelecimentos comerciais...",
            "Filtrando por nicho e relevância...",
            "Extraindo dados de contato (WhatsApp/Site)...",
            "Calculando score de oportunidade..."
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

            if (data.leads && data.leads.length > 0) {
                let realLeads: Lead[] = data.leads;

                // Apply filters
                if (filters.onlyWithWebsite) realLeads = realLeads.filter(l => l.possui_site);
                if (filters.onlyWithPhone) realLeads = realLeads.filter(l => l.whatsapp);

                setLeads(realLeads);

                const sourceInfo = data.source === 'apify' ? "via Google Maps" : "via OpenStreetMap";
                copyToClipboard(`Busca concluída! ${realLeads.length} leads encontrados ${sourceInfo}.`);

                if (data.info) {
                    setError(data.info);
                    setTimeout(() => setError(""), 5000);
                }
            } else {
                const msg = data.warning || "NENHUM LEAD ENCONTRADO";
                copyToClipboard(msg);
                setError(msg);
                setTimeout(() => setError(""), 5000);
                setLeads([]);
            }
        } catch (err) {
            console.error("Error fetching leads:", err);
            copyToClipboard("Erro ao buscar leads.");
            setError("Erro na conexão com o servidor de busca.");
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
            copyToClipboard("Lead salvo no CRM!");
        }
    };

    const handleAddManualLead = (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualLead.empresa || !manualLead.whatsapp) return;

        const newLead: Lead = {
            id: `manual-${Date.now()}`,
            empresa: manualLead.empresa,
            whatsapp: manualLead.whatsapp,
            nicho: manualLead.nicho || "Manual",
            cidade: manualLead.cidade || "Não informada",
            possui_site: false,
            qualidade_site: "nenhum",
            score_venda: 100,
            motivo_oportunidade: "Adicionado manualmente para prospecção.",
            savedAt: Date.now()
        };

        saveLeadsToStorage([...savedLeads, newLead]);
        setManualLead({ empresa: "", whatsapp: "", nicho: "", cidade: "" });
        setIsManualModalOpen(false);
        copyToClipboard("Lead manual adicionado!");
    };

    const runAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auditUrl) return;

        setIsAuditing(true);
        setAuditResult(null);
        setError("");

        const steps = ["Iniciando scanner...", "Analisando Core Web Vitals...", "Verificando SEO On-page...", "Checando segurança SSL...", "Gerando recomendações..."];

        // Start steps in background
        let currentStepIdx = 0;
        const stepInterval = setInterval(() => {
            if (currentStepIdx < steps.length) {
                setAuditStep(steps[currentStepIdx]);
                currentStepIdx++;
            }
        }, 800);

        try {
            const response = await fetch("/api/tools/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: auditUrl })
            });

            const data = await response.json();

            if (response.ok) {
                setAuditResult(data);
                copyToClipboard("Auditoria concluída com sucesso!");
            } else {
                setError(data.error || "Erro ao auditar site.");
            }
        } catch (err) {
            console.error("Audit error:", err);
            setError("Erro de conexão ao auditar site.");
        } finally {
            clearInterval(stepInterval);
            setIsAuditing(false);
            setAuditStep("");
        }
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
                className="w-full max-w-6xl bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col h-[90vh] relative"
            >
                {/* Background Glow */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/20 backdrop-blur-md shrink-0 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                                <Zap className="text-violet-500" size={24} />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-black text-white uppercase tracking-tighter">WTM Sales OS</h2>
                                <span className="text-[10px] font-bold bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/30">v2.5 PRO</span>
                            </div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Intelligence & Automation Suite</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-6 px-6 py-2 bg-white/5 rounded-full border border-white/5">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Leads Hoje</span>
                                <span className="text-sm font-black text-white">124</span>
                            </div>
                            <div className="w-[1px] h-4 bg-white/10" />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Conversão</span>
                                <span className="text-sm font-black text-emerald-400">12.4%</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-3 hover:bg-white/10 rounded-2xl transition-all text-zinc-400 hover:text-white border border-transparent hover:border-white/10"
                        >
                            <X size={20} />
                        </button>
                    </div>
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
                    <div className="flex-1 flex overflow-hidden relative z-10">
                        {/* Sidebar */}
                        <div className="w-80 border-r border-white/5 bg-zinc-950/60 backdrop-blur-2xl p-6 space-y-8 shrink-0 flex flex-col relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" />

                            <div className="space-y-2 relative z-10">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2 mb-4">Sistemas de Vendas</p>
                                {[
                                    { id: "finder", label: "Buscador de Leads", icon: Search },
                                    { id: "crm", label: "CRM / Prospectos", icon: Users, count: savedLeads.length },
                                    { id: "bulk-sender", label: "Disparo em Massa", icon: Send },
                                    { id: "auditor", label: "Auditor de Sites", icon: BarChart3 },
                                    { id: "templates", label: "Scripts de Venda", icon: FileText },
                                    { id: "content-lab", label: "Laboratório Criativo", icon: Zap },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as any)}
                                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-sm font-black transition-all duration-300 group relative overflow-hidden ${activeTab === item.id
                                            ? "text-white"
                                            : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                            }`}
                                    >
                                        {activeTab === item.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <item.icon size={20} className={`relative z-10 transition-transform duration-500 group-hover:scale-110 ${activeTab === item.id ? "text-white" : "group-hover:text-violet-400"}`} />
                                        <span className="relative z-10 tracking-tight">{item.label}</span>
                                        {item.count !== undefined && item.count > 0 && (
                                            <span className={`ml-auto relative z-10 text-[10px] px-2.5 py-1 rounded-lg font-black ${activeTab === item.id ? "bg-white/20 text-white backdrop-blur-md" : "bg-violet-500/10 text-violet-400 border border-violet-500/20"}`}>
                                                {item.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-8 mt-auto border-t border-white/5 relative z-10">
                                <div className="p-4 bg-violet-500/5 rounded-2xl border border-violet-500/10">
                                    <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1">Status do Sistema</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-bold text-white">Operacional</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-zinc-950/20">
                            {/* Content Header Overlay */}
                            <div className="sticky top-0 z-30 w-full h-24 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none flex items-center px-12">
                                <div className="flex items-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                                    <div className="w-1 h-8 bg-violet-600 rounded-full" />
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                                        {activeTab === 'finder' && "Lead Intelligence"}
                                        {activeTab === 'crm' && "Pipeline de Vendas"}
                                        {activeTab === 'bulk-sender' && "Automação de Disparos"}
                                        {activeTab === 'auditor' && "Site Auditor PRO"}
                                        {activeTab === 'templates' && "Sales Scripts"}
                                        {activeTab === 'content-lab' && "Creative Lab"}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-12 pt-4 relative z-10">
                                <AnimatePresence mode="wait">
                                    {activeTab === "finder" && (
                                        <motion.div
                                            key="finder"
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            className="space-y-12"
                                        >
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                                                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">Nicho de Atuação</label>
                                                        <div className="relative group">
                                                            <div className="absolute inset-0 bg-violet-600/5 rounded-3xl blur-2xl group-focus-within:bg-violet-600/10 transition-all duration-500" />
                                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-400 transition-colors duration-300">
                                                                <Search size={22} />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={searchQuery}
                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                                placeholder="Ex: Padarias, Academias, Clínicas..."
                                                                className="w-full bg-zinc-900 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all relative z-10 placeholder:text-zinc-600 font-bold text-lg shadow-inner shadow-black/50"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">Geolocalização</label>
                                                        <div className="relative group">
                                                            <div className="absolute inset-0 bg-emerald-600/5 rounded-3xl blur-2xl group-focus-within:bg-emerald-600/10 transition-all duration-500" />
                                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition-colors duration-300">
                                                                <MapPin size={22} />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={location}
                                                                onChange={(e) => setLocation(e.target.value)}
                                                                placeholder="Cidade ou Bairro"
                                                                className="w-full bg-zinc-900 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all relative z-10 placeholder:text-zinc-600 font-bold text-lg shadow-inner shadow-black/50"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-3">
                                                    <button
                                                        onClick={findLeads}
                                                        disabled={isSearching || !searchQuery}
                                                        className="w-full bg-white text-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 font-black rounded-3xl h-[76px] transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(255,255,255,0.1)] group relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                                                        {isSearching ? (
                                                            <Loader2 size={24} className="animate-spin" />
                                                        ) : (
                                                            <>
                                                                <Zap size={20} className="fill-black" />
                                                                <span className="uppercase tracking-widest text-xs">Mapear Leads</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {isSearching && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-4 bg-violet-500/5 border border-violet-500/10 p-4 rounded-2xl w-fit"
                                                >
                                                    <Loader2 className="animate-spin text-violet-500" size={16} />
                                                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">{searchStep}</span>
                                                </motion.div>
                                            )}

                                            {/* Filters & History */}
                                            <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-white/5 relative">
                                                <div className="flex flex-wrap items-center gap-8">
                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.onlyWithWebsite}
                                                            onChange={(e) => setFilters({ ...filters, onlyWithWebsite: e.target.checked })}
                                                            className="hidden"
                                                        />
                                                        <div className={`w-6 h-6 rounded-xl border-2 ${filters.onlyWithWebsite ? 'bg-violet-600 border-violet-600 shadow-lg shadow-violet-600/30' : 'border-white/10 group-hover:border-white/20'} flex items-center justify-center transition-all duration-300`}>
                                                            {filters.onlyWithWebsite && <Check size={14} className="text-white" strokeWidth={4} />}
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${filters.onlyWithWebsite ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Apenas sem Site</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.onlyWithPhone}
                                                            onChange={(e) => setFilters({ ...filters, onlyWithPhone: e.target.checked })}
                                                            className="hidden"
                                                        />
                                                        <div className={`w-6 h-6 rounded-xl border-2 ${filters.onlyWithPhone ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/30' : 'border-white/10 group-hover:border-white/20'} flex items-center justify-center transition-all duration-300`}>
                                                            {filters.onlyWithPhone && <Check size={14} className="text-white" strokeWidth={4} />}
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${filters.onlyWithPhone ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Com WhatsApp</span>
                                                    </label>
                                                    <div className="h-8 w-[1px] bg-white/10 mx-2" />
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Raio:</span>
                                                        <div className="relative">
                                                            <select
                                                                value={filters.radius}
                                                                onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
                                                                className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-violet-400 focus:outline-none cursor-pointer appearance-none pr-10"
                                                            >
                                                                <option value="5km">5 KM</option>
                                                                <option value="10km">10 KM</option>
                                                                <option value="25km">25 KM</option>
                                                                <option value="50km">50 KM</option>
                                                            </select>
                                                            <ArrowRight size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 rotate-90 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {searchHistory.length > 0 && (
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Recentes:</span>
                                                        <div className="flex gap-2">
                                                            {searchHistory.map((h, i) => (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => setSearchQuery(h)}
                                                                    className="text-[10px] font-black text-zinc-500 hover:text-white bg-white/5 hover:bg-violet-600/20 px-4 py-2 rounded-xl border border-white/5 hover:border-violet-500/30 transition-all duration-300"
                                                                >
                                                                    {h}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>



                                            {!isSearching && leads.length === 0 && (
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                                                <Zap size={16} className="text-yellow-500" />
                                                            </div>
                                                            Insights de Mercado em Tempo Real
                                                        </h4>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Atualizado agora</span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        {[
                                                            { title: "Academias em Alta", desc: "Procura por academias cresceu 20% na Zona Sul.", icon: <Zap size={20} />, color: "text-yellow-500", bg: "bg-yellow-500/5", border: "border-yellow-500/10" },
                                                            { title: "Restaurantes", desc: "Novos deliverys abrindo no Centro. Oportunidade.", icon: <Store size={20} />, color: "text-emerald-500", bg: "bg-emerald-500/5", border: "border-emerald-500/10" },
                                                            { title: "Clínicas de Estética", desc: "Alta demanda por sites agendadores.", icon: <Users size={20} />, color: "text-pink-500", bg: "bg-pink-500/5", border: "border-pink-500/10" }
                                                        ].map((item, i) => (
                                                            <motion.div
                                                                key={i}
                                                                whileHover={{ y: -5, scale: 1.02 }}
                                                                className={`p-6 rounded-3xl border ${item.border} ${item.bg} flex flex-col gap-4 cursor-pointer group transition-all relative overflow-hidden`}
                                                                onClick={() => setSearchQuery(item.title.split(" ")[0])}
                                                            >
                                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                                    {item.icon}
                                                                </div>
                                                                <div className={`w-12 h-12 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center ${item.color} shadow-inner`}>
                                                                    {item.icon}
                                                                </div>
                                                                <div>
                                                                    <h5 className="font-black text-white text-base uppercase tracking-tight">{item.title}</h5>
                                                                    <p className="text-xs text-zinc-500 leading-relaxed mt-2 font-medium">{item.desc}</p>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2 group-hover:text-white transition-colors">
                                                                    Explorar Nicho <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {leads.length > 0 && (
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                                        <div className="flex items-center gap-6">
                                                            <div className="flex items-center gap-3 px-4 py-2 bg-violet-500/10 rounded-xl border border-violet-500/20">
                                                                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                                                                <span className="text-xs font-black text-violet-400 uppercase tracking-widest">{leads.length} Oportunidades Mapeadas</span>
                                                            </div>
                                                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                                {leads.filter(l => l.score_venda > 70).length} Leads de Alta Conversão
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const toSave = leads.filter(l => !savedLeads.find(sl => sl.id === l.id));
                                                                saveLeadsToStorage([...savedLeads, ...toSave.map(l => ({ ...l, savedAt: Date.now() }))]);
                                                                copyToClipboard(`${toSave.length} leads salvos no CRM!`);
                                                            }}
                                                            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 transition-all flex items-center gap-2"
                                                        >
                                                            <Save size={14} />
                                                            Salvar Todos no CRM
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {leads.map(lead => (
                                                            <motion.div
                                                                key={lead.id}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                whileHover={{ y: -5 }}
                                                                className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 hover:border-violet-500/40 transition-all group relative overflow-hidden flex flex-col h-full backdrop-blur-sm"
                                                            >
                                                                {/* Score Badge */}
                                                                <div className="absolute top-0 right-0 p-6">
                                                                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-[10px] font-black ${lead.score_venda > 70 ? 'border-emerald-500 text-emerald-500' : 'border-violet-500/30 text-violet-400'}`}>
                                                                        {lead.score_venda}%
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-col gap-5 flex-1 relative z-10">
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-[9px] font-black text-violet-500 uppercase tracking-[0.2em] bg-violet-500/10 px-2 py-0.5 rounded">{lead.nicho}</span>
                                                                            {lead.score_venda > 70 && (
                                                                                <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded uppercase tracking-widest border border-emerald-500/20">Hot Lead</span>
                                                                            )}
                                                                        </div>
                                                                        <h4 className="text-lg font-black text-white leading-tight pr-12 group-hover:text-violet-400 transition-colors line-clamp-2 uppercase tracking-tight">{lead.empresa}</h4>
                                                                    </div>

                                                                    <div className="space-y-3 flex-1">
                                                                        <div className="flex items-start gap-3 text-[11px] text-zinc-400 font-medium">
                                                                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                                                <MapPin size={12} className="text-zinc-500" />
                                                                            </div>
                                                                            <span className="line-clamp-2 mt-0.5">{lead.cidade}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                                                                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                                                <MessageCircle size={12} className={lead.whatsapp ? "text-emerald-500" : "text-zinc-700"} />
                                                                            </div>
                                                                            {lead.whatsapp || <span className="text-zinc-700 italic">Número não identificado</span>}
                                                                        </div>
                                                                        <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                                                                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                                                <Globe size={12} className={lead.possui_site ? "text-blue-500" : "text-zinc-700"} />
                                                                            </div>
                                                                            <span className={lead.possui_site ? "text-zinc-400" : "text-red-400 font-black"}>{lead.possui_site ? "Possui Website" : "SEM PRESENÇA DIGITAL"}</span>
                                                                        </div>

                                                                        <div className="mt-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5 relative group/quote">
                                                                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10">
                                                                                <Zap size={10} className="text-yellow-500" />
                                                                            </div>
                                                                            <p className="text-[10px] text-zinc-500 italic font-medium leading-relaxed">"{lead.motivo_oportunidade}"</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center gap-3 pt-5 mt-auto border-t border-white/5">
                                                                        <button
                                                                            onClick={() => handleSendWhatsApp(lead.whatsapp, `Olá ${lead.empresa}! Vi seu negócio no mapa e notei que vocês ainda não têm uma presença digital otimizada...`)}
                                                                            disabled={!lead.whatsapp}
                                                                            className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-violet-600/10 group/btn"
                                                                        >
                                                                            <Send size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                                            ABORDAR
                                                                        </button>
                                                                        <button
                                                                            onClick={() => toggleSaveLead(lead)}
                                                                            className={`p-3.5 rounded-2xl transition-all border ${savedLeads.find(l => l.id === lead.id) ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10 hover:text-white"}`}
                                                                            title={savedLeads.find(l => l.id === lead.id) ? "Remover do CRM" : "Salvar no CRM"}
                                                                        >
                                                                            <Save size={16} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {activeTab === "crm" && (
                                        <motion.div
                                            key="crm"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                                <div>
                                                    <h3 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                                                        <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                                                            <Users className="text-violet-500" size={24} />
                                                        </div>
                                                        Pipeline de Vendas
                                                    </h3>
                                                    <p className="text-zinc-500 text-sm font-medium mt-2">Gerencie seus prospectos e acompanhe o status de cada abordagem.</p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <button
                                                        onClick={() => setIsManualModalOpen(true)}
                                                        className="text-xs bg-white/5 hover:bg-white/10 text-white px-5 py-3 rounded-2xl font-black flex items-center gap-2 transition-all border border-white/10 uppercase tracking-widest"
                                                    >
                                                        <Plus size={16} />
                                                        Novo Lead
                                                    </button>
                                                    {bulkStatus.isActive ? (
                                                        <div className="flex items-center gap-4 bg-zinc-900 px-5 py-3 rounded-2xl border border-white/10 shadow-2xl">
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex justify-between text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                                                    <span>Enviando...</span>
                                                                    <span>{bulkStatus.current}/{bulkStatus.total}</span>
                                                                </div>
                                                                <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        className="h-full bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${(bulkStatus.current / bulkStatus.total) * 100}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={stopBulkSend}
                                                                className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                                title="Interromper Fluxo"
                                                            >
                                                                <Square size={14} fill="currentColor" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={handleBulkSend}
                                                            disabled={savedLeads.length === 0}
                                                            className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-violet-600/20 uppercase tracking-widest group"
                                                        >
                                                            <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                                                            Disparo em Massa
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            if (confirm("Deseja realmente limpar todos os leads salvos?")) {
                                                                saveLeadsToStorage([]);
                                                            }
                                                        }}
                                                        className="p-3 text-zinc-500 hover:text-red-500 transition-colors"
                                                        title="Limpar CRM"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                                                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Empresa / Contato</th>
                                                                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Nicho & Local</th>
                                                                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                                                                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-right">Ações</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-white/5">
                                                            {savedLeads.length === 0 ? (
                                                                <tr>
                                                                    <td colSpan={4} className="p-20 text-center">
                                                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                                                            <Users size={48} />
                                                                            <p className="text-sm font-black uppercase tracking-widest">Nenhum lead no pipeline</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                savedLeads.map(lead => (
                                                                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                                                        <td className="p-6">
                                                                            <div className="flex flex-col">
                                                                                <span className="text-base font-black text-white uppercase tracking-tight">{lead.empresa}</span>
                                                                                <div className="flex items-center gap-2 mt-1">
                                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                                                    <span className="text-[11px] font-mono text-zinc-500">{lead.whatsapp || "Sem telefone"}</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-6">
                                                                            <div className="flex flex-col">
                                                                                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">{lead.nicho}</span>
                                                                                <span className="text-[11px] text-zinc-500 font-medium mt-1">{lead.cidade}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-6">
                                                                            <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-[10px] rounded-full font-black uppercase tracking-widest border border-violet-500/20">
                                                                                Pendente
                                                                            </span>
                                                                        </td>
                                                                        <td className="p-6 text-right">
                                                                            <div className="flex items-center justify-end gap-3">
                                                                                <button
                                                                                    onClick={() => handleSendWhatsApp(lead.whatsapp)}
                                                                                    className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 shadow-lg shadow-emerald-500/5"
                                                                                >
                                                                                    <MessageCircle size={18} />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => toggleSaveLead(lead)}
                                                                                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg shadow-red-500/5"
                                                                                >
                                                                                    <Trash2 size={18} />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "auditor" && (
                                        <motion.div
                                            key="auditor"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-10"
                                        >
                                            <div className="flex flex-col gap-4">
                                                <h3 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                                                    <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                                                        <BarChart3 className="text-violet-500" size={24} />
                                                    </div>
                                                    Auditor de Performance
                                                </h3>
                                                <p className="text-zinc-500 text-sm font-medium">Gere um relatório técnico de falhas para usar como prova social e argumento de venda.</p>
                                            </div>

                                            <form onSubmit={runAudit} className="flex flex-col md:flex-row gap-4 relative">
                                                <div className="flex-1 relative group">
                                                    <div className="absolute inset-0 bg-violet-500/5 rounded-2xl blur-xl group-focus-within:bg-violet-500/10 transition-all" />
                                                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-violet-400 transition-colors" size={20} />
                                                    <input
                                                        type="text"
                                                        value={auditUrl}
                                                        onChange={(e) => setAuditUrl(e.target.value)}
                                                        placeholder="URL do site do cliente (ex: empresa.com.br)"
                                                        className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all relative z-10 placeholder:text-zinc-700 font-medium"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isAuditing || !auditUrl}
                                                    className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black rounded-2xl px-10 py-5 transition-all flex items-center justify-center gap-3 overflow-hidden relative shadow-2xl shadow-violet-600/20 h-[66px] min-w-[200px] group"
                                                >
                                                    {isAuditing ? (
                                                        <div className="flex items-center gap-3">
                                                            <Loader2 className="animate-spin" size={20} />
                                                            <span className="text-xs uppercase tracking-widest">{auditStep}</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Zap size={20} className="group-hover:scale-125 transition-transform" />
                                                            <span className="uppercase tracking-widest">Analisar Agora</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>

                                            {auditResult && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-md relative overflow-hidden"
                                                >
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-[100px] pointer-events-none" />

                                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                                                <Globe size={32} className="text-zinc-400" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xl font-black text-white uppercase tracking-tight">{auditResult.url}</h4>
                                                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Relatório Gerado em {new Date().toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className={`text-5xl font-black ${auditResult.score < 50 ? "text-red-500" : "text-yellow-500"} drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]`}>
                                                                {auditResult.score}
                                                                <span className="text-xl text-zinc-600 ml-1">/100</span>
                                                            </div>
                                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mt-2">Health Score</span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                                        <div className="space-y-4">
                                                            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                                <AlertCircle size={14} /> Critical Issues Found
                                                            </p>
                                                            <div className="space-y-3">
                                                                {auditResult.issues.map((issue, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: i * 0.1 }}
                                                                        className="flex items-start gap-3 bg-red-500/5 border border-red-500/10 p-4 rounded-2xl"
                                                                    >
                                                                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                                            <X size={10} className="text-red-500" />
                                                                        </div>
                                                                        <span className="text-xs text-zinc-300 font-medium leading-relaxed">{issue}</span>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                                <CheckCircle2 size={14} /> Recommended Actions
                                                            </p>
                                                            <div className="space-y-3">
                                                                <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl">
                                                                    <p className="text-xs text-zinc-300 font-medium leading-relaxed">Migrar para infraestrutura WTM de alta performance.</p>
                                                                </div>
                                                                <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl">
                                                                    <p className="text-xs text-zinc-300 font-medium leading-relaxed">Implementar funil de conversão otimizado.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 pt-4 relative z-10">
                                                        <button
                                                            onClick={() => copyToClipboard(`Relatório de Auditoria: ${auditResult.url}\nScore: ${auditResult.score}\n\nFalhas:\n${auditResult.issues.join("\n")}`)}
                                                            className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10 uppercase tracking-widest"
                                                        >
                                                            <Copy size={18} /> Copiar Relatório
                                                        </button>
                                                        <button
                                                            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-xs font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-violet-600/20 uppercase tracking-widest"
                                                        >
                                                            <Download size={18} /> Baixar PDF
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}

                                    {activeTab === "templates" && (
                                        <motion.div
                                            key="templates"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-10"
                                        >
                                            <div className="flex flex-col gap-4">
                                                <h3 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                                                    <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                                                        <FileText className="text-violet-500" size={24} />
                                                    </div>
                                                    Scripts de Alta Conversão
                                                </h3>
                                                <p className="text-zinc-500 text-sm font-medium">Modelos validados de abordagem para diferentes nichos e situações.</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {[
                                                    {
                                                        title: "Abordagem Direta (WhatsApp)",
                                                        nicho: "Geral",
                                                        content: "Olá [NOME]! Vi seu negócio no mapa e notei que vocês ainda não têm uma presença digital otimizada. Sou especialista em escala para [NICHO] e adoraria mostrar como podemos dobrar seus leads em 30 dias. Podemos falar amanhã?",
                                                        icon: MessageCircle
                                                    },
                                                    {
                                                        title: "Follow-up Estratégico",
                                                        nicho: "Retenção",
                                                        content: "Oi [NOME], passando para compartilhar um insight: empresas do seu setor que implementaram nossa nova estrutura de funil tiveram um aumento de 40% na conversão este mês. Topa uma call de 5 min para eu te explicar?",
                                                        icon: Zap
                                                    },
                                                    {
                                                        title: "Quebra de Objeção (Preço)",
                                                        nicho: "Fechamento",
                                                        content: "Entendo perfeitamente, [NOME]. O investimento parece alto agora, mas se pensarmos que um único novo cliente já paga a mensalidade, o risco é zero. Vamos focar no ROI que isso vai gerar para sua empresa?",
                                                        icon: CheckCircle2
                                                    },
                                                    {
                                                        title: "Abordagem por Auditoria",
                                                        nicho: "Autoridade",
                                                        content: "Olá! Acabei de rodar uma auditoria técnica no seu site e encontrei 3 falhas críticas que estão fazendo você perder dinheiro diariamente. Posso te enviar o relatório completo sem custo?",
                                                        icon: BarChart3
                                                    }
                                                ].map((script, i) => (
                                                    <motion.div
                                                        key={i}
                                                        whileHover={{ y: -5 }}
                                                        className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:border-violet-500/40 transition-all group backdrop-blur-sm"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-violet-500/10 group-hover:border-violet-500/20 transition-all">
                                                                <script.icon size={20} className="text-zinc-500 group-hover:text-violet-400" />
                                                            </div>
                                                            <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full">{script.nicho}</span>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <h4 className="text-lg font-black text-white uppercase tracking-tight">{script.title}</h4>
                                                            <p className="text-sm text-zinc-500 italic leading-relaxed font-medium">"{script.content}"</p>
                                                        </div>
                                                        <button
                                                            onClick={() => copyToClipboard(script.content)}
                                                            className="w-full py-4 bg-white/5 hover:bg-violet-600 text-white text-[10px] font-black rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10 hover:border-transparent uppercase tracking-widest"
                                                        >
                                                            <Copy size={16} /> Copiar Script
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "content-lab" && (
                                        <motion.div
                                            key="content-lab"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-10"
                                        >
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                                                        <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                                                            <Zap className="text-violet-500" size={24} />
                                                        </div>
                                                        Laboratório Criativo
                                                    </h3>
                                                    <p className="text-zinc-500 text-sm font-medium">Gere conteúdo de alta conversão para atrair clientes no automático.</p>
                                                </div>
                                                <div className="flex p-1.5 bg-zinc-900 rounded-2xl border border-white/5">
                                                    {["generator", "templates", "planner"].map((tab) => (
                                                        <button
                                                            key={tab}
                                                            onClick={() => setContentLabSubTab(tab as any)}
                                                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${contentLabSubTab === tab ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" : "text-zinc-500 hover:text-zinc-300"}`}
                                                        >
                                                            {tab === "generator" ? "IA Generator" : tab === "templates" ? "Design Hub" : "Editorial"}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {contentLabSubTab === "generator" && (
                                                <div className="space-y-8">
                                                    <div className="bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-12 text-center space-y-8 backdrop-blur-md relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />
                                                        <div className="w-20 h-20 bg-violet-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-violet-500/20 relative">
                                                            <Zap className="text-violet-500" size={40} />
                                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-zinc-900 animate-pulse" />
                                                        </div>
                                                        <div className="space-y-3 relative z-10">
                                                            <h4 className="text-2xl font-black text-white uppercase tracking-tight">Gerador de Ideias Infinitas</h4>
                                                            <p className="text-zinc-500 text-sm max-w-md mx-auto font-medium leading-relaxed">Nossa IA analisa as tendências do mercado de web design e gera conceitos de posts que convertem seguidores em clientes.</p>
                                                        </div>
                                                        <button
                                                            onClick={generateIdea}
                                                            disabled={isGenerating}
                                                            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black py-5 px-12 rounded-2xl transition-all shadow-2xl shadow-violet-600/30 flex items-center justify-center gap-3 mx-auto uppercase tracking-widest group"
                                                        >
                                                            {isGenerating ? (
                                                                <>
                                                                    <Loader2 className="animate-spin" size={20} />
                                                                    Sincronizando Criatividade...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                                                                    Gerar Novo Conceito
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>

                                                    {generatedIdea && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 30 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="bg-zinc-900 border border-violet-500/30 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden"
                                                        >
                                                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                                                <Zap size={120} className="text-violet-500" />
                                                            </div>
                                                            <div className="flex justify-between items-start relative z-10">
                                                                <span className="px-4 py-1.5 bg-violet-500/20 text-violet-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-violet-500/30">{generatedIdea.type}</span>
                                                                <button onClick={() => copyToClipboard(`${generatedIdea.title}\n\n${generatedIdea.caption}`)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-500 hover:text-white transition-all">
                                                                    <Copy size={20} />
                                                                </button>
                                                            </div>
                                                            <div className="space-y-4 relative z-10">
                                                                <h5 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{generatedIdea.title}</h5>
                                                                <p className="text-sm text-zinc-400 leading-relaxed font-medium">{generatedIdea.caption}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => addPlannedPost(generatedIdea.title)}
                                                                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10 uppercase tracking-widest"
                                                            >
                                                                <Save size={18} /> Salvar no Planejador Editorial
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            )}

                                            {contentLabSubTab === "templates" && !editingTemplate && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {[
                                                        { id: "carousel", title: "Carrossel Educativo", desc: "Estrutura: Capa chamativa > Problema > Solução > CTA", color: "from-blue-500/20", accent: "#3b82f6", gradient: "linear-gradient(135deg, #1e3a8a 0%, #000000 100%)" },
                                                        { id: "proof", title: "Post de Prova Social", desc: "Estrutura: Print de feedback > Resultado alcançado > CTA", color: "from-emerald-500/20", accent: "#10b981", gradient: "linear-gradient(135deg, #064e3b 0%, #000000 100%)" },
                                                        { id: "checklist", title: "Checklist de Valor", desc: "Estrutura: Lista de itens essenciais > Por que importa > CTA", color: "from-violet-500/20", accent: "#8b5cf6", gradient: "linear-gradient(135deg, #4c1d95 0%, #000000 100%)" },
                                                        { id: "before-after", title: "Antes e Depois", desc: "Estrutura: Site antigo > Site novo > Métricas de melhora", color: "from-orange-500/20", accent: "#f59e0b", gradient: "linear-gradient(135deg, #7c2d12 0%, #000000 100%)" }
                                                    ].map((t, i) => (
                                                        <motion.div
                                                            key={i}
                                                            whileHover={{ y: -5, scale: 1.02 }}
                                                            className={`bg-gradient-to-br ${t.color} to-zinc-950 border border-white/10 rounded-[2.5rem] p-8 space-y-6 group relative overflow-hidden cursor-pointer`}
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
                                                        >
                                                            <div className="space-y-3">
                                                                <h4 className="font-black text-white text-xl uppercase tracking-tight">{t.title}</h4>
                                                                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{t.desc}</p>
                                                            </div>
                                                            <div className="w-full py-4 bg-white/5 group-hover:bg-violet-600 text-white text-[10px] font-black rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10 group-hover:border-transparent uppercase tracking-widest">
                                                                <Zap size={16} /> Abrir no Editor
                                                            </div>
                                                        </motion.div>
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
                                                </motion.div>
                                            )}

                                            {contentLabSubTab === "planner" && (
                                                <div className="space-y-6">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Calendário Editorial</h4>
                                                        <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest bg-white/5 px-3 py-1 rounded-full">{plannedPosts.length} Posts Planejados</span>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {plannedPosts.length === 0 ? (
                                                            <div className="p-12 border-2 border-dashed border-white/5 rounded-[2rem] text-center space-y-4">
                                                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                                                    <Calendar size={24} className="text-zinc-700" />
                                                                </div>
                                                                <p className="text-zinc-500 text-sm font-medium">Nenhum post planejado ainda. Gere ideias no IA Generator!</p>
                                                            </div>
                                                        ) : (
                                                            plannedPosts.map(post => (
                                                                <motion.div
                                                                    key={post.id}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5 flex justify-between items-center group hover:border-violet-500/30 transition-all"
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500">
                                                                            <FileText size={20} />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-black text-white uppercase tracking-tight">{post.title}</p>
                                                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{post.date}</p>
                                                                        </div>
                                                                    </div>
                                                                    <button onClick={() => removePlannedPost(post.id)} className="p-2 text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                </motion.div>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "bulk-sender" && (
                    <motion.div
                        key="bulk-sender"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-10"
                    >
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                                <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                                    <Send className="text-violet-500" size={24} />
                                </div>
                                Disparo em Massa
                            </h3>
                            <p className="text-zinc-500 text-sm font-medium">Automação inteligente de WhatsApp com delay anti-bloqueio.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                            {/* Left Column - Input */}
                            <div className="flex flex-col gap-6 h-full">
                                <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                            <ListCollapse size={16} /> Lista de Contatos
                                        </label>
                                        <div className="text-[10px] font-bold text-zinc-600 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                            {phoneNumbers.split(/[\n,]+/).filter(n => n.trim()).length} LEADS IDENTIFICADOS
                                        </div>
                                    </div>

                                    <textarea
                                        value={phoneNumbers}
                                        onChange={(e) => setPhoneNumbers(e.target.value)}
                                        placeholder={`Cole sua lista de números aqui...\n\nExemplo:\n11999999999\n11988888888\n(11) 97777-7777`}
                                        className="flex-1 w-full bg-zinc-950/50 border border-white/10 rounded-2xl p-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 resize-none placeholder:text-zinc-700 font-mono custom-scrollbar transition-all"
                                    />

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => setPhoneNumbers("")}
                                            className="text-xs text-zinc-500 hover:text-red-400 transition-colors font-bold uppercase tracking-widest flex items-center gap-2"
                                        >
                                            <Trash2 size={14} /> Limpar Lista
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Controls & Message */}
                            <div className="flex flex-col gap-6 h-full">
                                <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 relative overflow-hidden h-full">
                                    <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />

                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                            <MessageCircle size={16} /> Configurar Mensagem
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl p-4 text-xs font-medium text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 appearance-none cursor-pointer"
                                            >
                                                {TEMPLATES.map(t => (
                                                    <option key={t.id} value={t.content} className="bg-zinc-950">{t.name}</option>
                                                ))}
                                            </select>
                                            <ArrowRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 rotate-90 pointer-events-none" />
                                        </div>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full h-32 bg-zinc-950/50 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 resize-none placeholder:text-zinc-700 custom-scrollbar"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-end gap-4 border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-4 p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/10">
                                            <Info size={20} className="text-yellow-500 shrink-0" />
                                            <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
                                                <strong className="text-yellow-500">Modo de Segurança Ativo:</strong> O sistema aplicará um atraso aleatório de 5 a 8 segundos entre cada envio para evitar bloqueios do WhatsApp. Mantenha esta aba aberta.
                                            </p>
                                        </div>

                                        <button
                                            onClick={bulkStatus.isActive ? stopBulkSend : () => handleSendWhatsApp()}
                                            disabled={isSending && !bulkStatus.isActive}
                                            className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-3 relative overflow-hidden group ${bulkStatus.isActive
                                                ? 'bg-zinc-900 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20'
                                                }`}
                                        >
                                            {bulkStatus.isActive ? (
                                                <>
                                                    <Square size={18} fill="currentColor" /> PARAR DISPARO ({bulkStatus.current}/{bulkStatus.total})
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> INICIAR DISPARO AUTOMÁTICO
                                                </>
                                            )}
                                        </button>

                                        {bulkStatus.isActive && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                                    <span>Progresso</span>
                                                    <span>{Math.round((bulkStatus.current / bulkStatus.total) * 100)}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(bulkStatus.current / bulkStatus.total) * 100}%` }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </div>
                                                <p className="text-[10px] text-center text-zinc-600 animate-pulse mt-2">
                                                    Processando envio... não feche esta janela.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="p-6 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 flex justify-between items-center shrink-0 relative z-10">
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        WTM Corps Sales Intelligence v2.1 • Secured Connection
                    </div>
                    <AnimatePresence>
                        {copied && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="bg-violet-600 text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-violet-600/20 uppercase tracking-widest"
                            >
                                <Check size={12} />
                                Copiado com sucesso
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Manual Lead Modal */}
                <AnimatePresence>
                    {isManualModalOpen && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsManualModalOpen(false)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Novo Prospecto</h3>
                                    <button onClick={() => setIsManualModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleAddManualLead} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Nome da Empresa</label>
                                        <input
                                            type="text"
                                            required
                                            value={manualLead.empresa}
                                            onChange={(e) => setManualLead({ ...manualLead, empresa: e.target.value })}
                                            className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                            placeholder="Ex: Padaria do João"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">WhatsApp (com DDD)</label>
                                        <input
                                            type="text"
                                            required
                                            value={manualLead.whatsapp}
                                            onChange={(e) => setManualLead({ ...manualLead, whatsapp: e.target.value })}
                                            className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            placeholder="Ex: 11999999999"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Nicho</label>
                                            <input
                                                type="text"
                                                value={manualLead.nicho}
                                                onChange={(e) => setManualLead({ ...manualLead, nicho: e.target.value })}
                                                className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                                placeholder="Ex: Alimentação"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Cidade</label>
                                            <input
                                                type="text"
                                                value={manualLead.cidade}
                                                onChange={(e) => setManualLead({ ...manualLead, cidade: e.target.value })}
                                                className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                                placeholder="Ex: São Paulo"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-violet-600/20 uppercase tracking-widest mt-4"
                                    >
                                        Adicionar ao Pipeline
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

