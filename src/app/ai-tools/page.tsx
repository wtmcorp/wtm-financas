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
    Zap,
    LayoutGrid,
    Menu
} from "lucide-react";
import ChatAssistant from "@/components/ai/tools/ChatAssistant";
import ImageGenerator from "@/components/ai/tools/ImageGenerator";
import ExternalToolFrame from "@/components/ai/tools/ExternalToolFrame";

export default function AiToolsPage() {
    const [activeTool, setActiveTool] = useState("chat");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tools = [
        // ... (tools array remains the same)
        {
            id: "chat",
            name: "Chat Inteligente",
            description: "Assistente virtual ilimitado para textos, códigos e ideias.",
            icon: MessageSquare,
            type: "internal",
            component: ChatAssistant
        },
        {
            id: "image",
            name: "Gerador de Imagens",
            description: "Crie arte visual impressionante a partir de texto.",
            icon: ImageIcon,
            type: "internal",
            component: ImageGenerator
        },
        {
            id: "code",
            name: "Code Master",
            description: "Especialista em programação e debug (via Chat).",
            icon: Code,
            type: "internal",
            component: ChatAssistant
        },
        {
            id: "midjourney",
            name: "Midjourney",
            description: "O padrão ouro em geração de arte IA.",
            icon: ImageIcon,
            type: "external",
            url: "https://www.midjourney.com"
        },
        {
            id: "suno",
            name: "Suno AI",
            description: "Crie músicas completas com letras e vocais.",
            icon: Music,
            type: "external",
            url: "https://suno.com"
        },
        {
            id: "runway",
            name: "Runway Gen-2",
            description: "Transforme texto e imagens em vídeos cinematográficos.",
            icon: Video,
            type: "external",
            url: "https://runwayml.com"
        },
        {
            id: "elevenlabs",
            name: "ElevenLabs",
            description: "Vozes sintéticas ultra-realistas.",
            icon: Mic,
            type: "external",
            url: "https://elevenlabs.io"
        },
        {
            id: "perplexity",
            name: "Perplexity",
            description: "Pesquisa na web com superpoderes de IA.",
            icon: Search,
            type: "external",
            url: "https://www.perplexity.ai"
        },
        {
            id: "claude",
            name: "Claude 3",
            description: "IA com janela de contexto massiva.",
            icon: MessageSquare,
            type: "external",
            url: "https://claude.ai"
        },
        {
            id: "gemini",
            name: "Gemini Advanced",
            description: "O modelo mais capaz do Google.",
            icon: Sparkles,
            type: "external",
            url: "https://gemini.google.com"
        },
        {
            id: "gamma",
            name: "Gamma App",
            description: "Apresentações inteiras em segundos.",
            icon: LayoutGrid,
            type: "external",
            url: "https://gamma.app"
        },
        {
            id: "notion",
            name: "Notion AI",
            description: "Seu segundo cérebro, agora com IA.",
            icon: Zap,
            type: "external",
            url: "https://www.notion.so/product/ai"
        },
        {
            id: "leonardo",
            name: "Leonardo.ai",
            description: "Assets para jogos e arte conceitual.",
            icon: ImageIcon,
            type: "external",
            url: "https://leonardo.ai"
        },
        {
            id: "pika",
            name: "Pika Labs",
            description: "Animação de vídeo divertida e rápida.",
            icon: Video,
            type: "external",
            url: "https://pika.art"
        },
        {
            id: "udio",
            name: "Udio Music",
            description: "Música de alta fidelidade gerada por IA.",
            icon: Music,
            type: "external",
            url: "https://www.udio.com"
        }
    ];

    const activeToolData = tools.find(t => t.id === activeTool) || tools[0];

    return (
        <div className="min-h-screen bg-mesh pt-24 pb-20 md:pb-4 px-4 md:px-6 flex flex-col md:flex-row gap-6">
            {/* Sidebar (Desktop) */}
            <aside
                className={`
                    ${isSidebarOpen ? 'w-80' : 'w-20'} 
                    bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl 
                    flex-col transition-all duration-300 ease-in-out z-40
                    hidden md:flex sticky top-24 h-[calc(100vh-120px)]
                `}
            >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    {isSidebarOpen && (
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                            <Sparkles className="text-primary" size={20} />
                            AI Studio
                        </h2>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`
                                w-full flex items-center gap-4 p-3 rounded-xl transition-all group
                                ${activeTool === tool.id
                                    ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(204,251,241,0.3)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }
                            `}
                        >
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                                ${activeTool === tool.id ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}
                            `}>
                                <tool.icon size={20} />
                            </div>

                            {isSidebarOpen && (
                                <div className="text-left overflow-hidden">
                                    <div className="truncate">{tool.name}</div>
                                    <div className={`text-[10px] truncate ${activeTool === tool.id ? 'text-black/70' : 'text-gray-600'}`}>
                                        {tool.type === 'internal' ? '⚡ Integrado' : '🔗 Externo'}
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden fixed bottom-6 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-2xl text-black active:scale-95 transition-transform"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/95 z-[60] md:hidden p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-white tracking-tighter">AI Studio</h2>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => {
                                    setActiveTool(tool.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${activeTool === tool.id
                                    ? 'bg-primary text-black border-primary font-bold'
                                    : 'bg-white/5 text-white border-white/10'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTool === tool.id ? 'bg-black/10' : 'bg-white/5'}`}>
                                    <tool.icon size={24} />
                                </div>
                                <div className="text-left">
                                    <div className="text-base">{tool.name}</div>
                                    <div className={`text-xs ${activeTool === tool.id ? 'text-black/60' : 'text-gray-500'}`}>{tool.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden flex flex-col relative min-h-[600px]">
                {/* Tool Header */}
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a0a]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">{activeToolData.name}</h1>
                        <p className="text-gray-400 text-sm">{activeToolData.description}</p>
                    </div>
                    {activeToolData.type === 'internal' && (
                        <div className="w-fit px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Uso Ilimitado
                        </div>
                    )}
                </div>

                {/* Tool Content */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    {activeToolData.type === 'internal' && activeToolData.component ? (
                        <activeToolData.component />
                    ) : (
                        <ExternalToolFrame
                            url={activeToolData.url || ""}
                            name={activeToolData.name}
                            description={activeToolData.description}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
