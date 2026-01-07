"use client";

import { useState } from "react";
import {
    Sparkles,
    MessageSquare,
    Image as ImageIcon,
    Video,
    Music,
    Mic,
    Code,
    Search,
    Activity,
    LayoutGrid,
    Menu,
    ChevronRight,
    ExternalLink,
    Cpu,
    BrainCircuit,
    ArrowUpRight,
    X
} from "lucide-react";
import ChatAssistant from "@/components/ai/tools/ChatAssistant";
import ImageGenerator from "@/components/ai/tools/ImageGenerator";
import ExternalToolFrame from "@/components/ai/tools/ExternalToolFrame";
import { motion, AnimatePresence } from "framer-motion";

export default function AiToolsPage() {
    const [activeTool, setActiveTool] = useState("chat");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tools = [
        {
            id: "chat",
            name: "Chat Inteligente",
            description: "Assistente virtual ilimitado para textos, códigos e ideias.",
            icon: MessageSquare,
            type: "internal",
            component: ChatAssistant,
            tag: "GPT-4o"
        },
        {
            id: "image",
            name: "Gerador de Imagens",
            description: "Crie arte visual impressionante a partir de texto.",
            icon: ImageIcon,
            type: "internal",
            component: ImageGenerator,
            tag: "Flux.1"
        },
        {
            id: "code",
            name: "Code Master",
            description: "Especialista em programação e debug (via Chat).",
            icon: Code,
            type: "internal",
            component: ChatAssistant,
            tag: "Claude 3.5"
        },
        {
            id: "midjourney",
            name: "Midjourney",
            description: "O padrão ouro em geração de arte IA.",
            icon: ImageIcon,
            type: "external",
            url: "https://www.midjourney.com",
            tag: "v6.1"
        },
        {
            id: "suno",
            name: "Suno AI",
            description: "Crie músicas completas com letras e vocais.",
            icon: Music,
            type: "external",
            url: "https://suno.com",
            tag: "v3.5"
        },
        {
            id: "runway",
            name: "Runway Gen-3",
            description: "Transforme texto e imagens em vídeos cinematográficos.",
            icon: Video,
            type: "external",
            url: "https://runwayml.com",
            tag: "Alpha"
        },
        {
            id: "elevenlabs",
            name: "ElevenLabs",
            description: "Vozes sintéticas ultra-realistas.",
            icon: Mic,
            type: "external",
            url: "https://elevenlabs.io",
            tag: "Multilingual"
        },
        {
            id: "perplexity",
            name: "Perplexity",
            description: "Pesquisa na web com superpoderes de IA.",
            icon: Search,
            type: "external",
            url: "https://www.perplexity.ai",
            tag: "Search"
        },
        {
            id: "claude",
            name: "Claude 3",
            description: "IA com janela de contexto massiva.",
            icon: MessageSquare,
            type: "external",
            url: "https://claude.ai",
            tag: "Anthropic"
        },
        {
            id: "gemini",
            name: "Gemini Advanced",
            description: "O modelo mais capaz do Google.",
            icon: Sparkles,
            type: "external",
            url: "https://gemini.google.com",
            tag: "Google"
        },
        {
            id: "gamma",
            name: "Gamma App",
            description: "Apresentações inteiras em segundos.",
            icon: LayoutGrid,
            type: "external",
            url: "https://gamma.app",
            tag: "Design"
        },
        {
            id: "notion",
            name: "Notion AI",
            description: "Seu segundo cérebro, agora com IA.",
            icon: Sparkles,
            type: "external",
            url: "https://www.notion.so/product/ai",
            tag: "Productivity"
        }
    ];

    const activeToolData = tools.find(t => t.id === activeTool) || tools[0];
    const ActiveIcon = activeToolData.icon;
    const ActiveComponent = activeToolData.component;

    return (
        <div className="min-h-screen bg-mesh pt-28 pb-20 md:pb-8 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-8">

            {/* Sidebar (Desktop) */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`
                    ${isSidebarOpen ? 'w-96' : 'w-24'} 
                    bg-card/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] 
                    flex-col transition-all duration-500 ease-[0.23, 1, 0.32, 1] z-40
                    hidden md:flex sticky top-28 h-[calc(100vh-140px)] shadow-2xl
                `}
            >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                            <motion.h2
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-2xl font-black text-white tracking-tighter flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Sparkles className="text-primary" size={20} />
                                </div>
                                Laboratório de IA
                            </motion.h2>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all border border-transparent hover:border-white/10"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`
                                w-full flex items-center gap-4 p-4 rounded-2xl transition-all group relative overflow-hidden
                                ${activeTool === tool.id
                                    ? 'bg-primary text-black font-black shadow-[0_20px_40px_rgba(167,139,250,0.2)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
                                }
                            `}
                        >
                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500
                                ${activeTool === tool.id ? 'bg-black/10 rotate-6' : 'bg-white/5 group-hover:bg-white/10 group-hover:rotate-3'}
                            `}>
                                <tool.icon size={24} />
                            </div>

                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-left overflow-hidden flex-1"
                                    >
                                        <div className="text-sm uppercase tracking-tight truncate">{tool.name}</div>
                                        <div className={`text-[9px] font-black uppercase tracking-widest mt-1 ${activeTool === tool.id ? 'text-black/60' : 'text-gray-600'}`}>
                                            {tool.tag} • {tool.type === 'internal' ? 'Native' : 'Cloud'}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {isSidebarOpen && activeTool === tool.id && (
                                <ChevronRight size={18} className="text-black/40" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-6 border-t border-white/5">
                    <div className={`flex items-center gap-4 ${isSidebarOpen ? 'px-4' : 'justify-center'}`}>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        {isSidebarOpen && <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Core Systems Online</span>}
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden fixed bottom-8 right-6 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="w-16 h-16 bg-primary rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(167,139,250,0.4)] text-black active:scale-95 transition-all border-2 border-white/20"
                >
                    <LayoutGrid size={28} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed inset-0 bg-background/98 z-[60] md:hidden p-8 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Sparkles className="text-primary" size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Laboratório de IA</h2>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {tools.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => {
                                        setActiveTool(tool.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-5 p-6 rounded-[2rem] border transition-all ${activeTool === tool.id
                                        ? 'bg-primary text-black border-primary font-black shadow-2xl'
                                        : 'bg-white/5 text-white border-white/10'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeTool === tool.id ? 'bg-black/10' : 'bg-white/5'}`}>
                                        <tool.icon size={28} />
                                    </div>
                                    <div className="text-left flex-1">
                                        <div className="text-lg font-black uppercase tracking-tight">{tool.name}</div>
                                        <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${activeTool === tool.id ? 'text-black/60' : 'text-gray-500'}`}>{tool.tag} • {tool.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 bg-card/40 backdrop-blur-xl rounded-[3.5rem] border border-white/10 overflow-hidden flex flex-col relative min-h-[700px] shadow-2xl"
            >
                {/* Tool Header */}
                <div className="p-8 md:p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/5">
                            {ActiveIcon && <ActiveIcon size={32} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Laboratório de IA</h1>
                                <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-widest">{activeToolData.tag}</span>
                            </div>
                            <p className="text-gray-500 font-medium text-lg">A potência da IA de elite integrada em um só lugar. Crie, analise e automatize com os modelos mais avançados do mundo.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {activeToolData.type === 'internal' ? (
                            <div className="px-5 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 backdrop-blur-xl">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                Native Unlimited
                            </div>
                        ) : (
                            <a
                                href={activeToolData.url}
                                target="_blank"
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3 transition-all group/link"
                            >
                                Open External <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Tool Content */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar relative">
                    <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
                        <BrainCircuit size={400} className="text-white" />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTool}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="h-full relative z-10"
                        >
                            {activeToolData.type === 'internal' && ActiveComponent ? (
                                <ActiveComponent />
                            ) : (
                                <ExternalToolFrame
                                    url={activeToolData.url || ""}
                                    name={activeToolData.name}
                                    description={activeToolData.description}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Status Bar */}
                <div className="px-10 py-4 border-t border-white/5 bg-card/40 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Cpu size={14} className="text-primary" />
                            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Neural Engine: Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity size={14} className="text-yellow-500" />
                            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Latency: 24ms</span>
                        </div>
                    </div>
                    <div className="text-[9px] font-black text-gray-700 uppercase tracking-widest">
                        WTM Intelligence Systems © 2024
                    </div>
                </div>
            </motion.main>
        </div>
    );
}
