"use client";

import { useState } from "react";
import {
    Sparkles,
    Zap,
    MessageSquare,
    Image as ImageIcon,
    Video,
    Music,
    Mic,
    Presentation,
    Code,
    Search,
    ExternalLink,
    Wand2,
    Download,
    Share2
} from "lucide-react";

export default function AiToolsPage() {
    const [prompt, setPrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageKey, setImageKey] = useState(0); // To force refresh if needed

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt) return;

        setIsLoading(true);
        // Pollinations.ai generates directly via URL, so we just set the URL
        // Adding a random seed or timestamp to ensure unique generation if the user retries same prompt
        const seed = Math.floor(Math.random() * 1000000);
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

        // Pre-load the image to avoid showing broken link while generating
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setGeneratedImage(url);
            setIsLoading(false);
            setImageKey(prev => prev + 1);
        };
        img.onerror = () => {
            setIsLoading(false);
            // Handle error if needed
        };
    };

    const aiTools = [
        {
            name: "ChatGPT",
            description: "O assistente de IA mais popular para conversas, redação e código.",
            category: "Chat & Texto",
            icon: MessageSquare,
            url: "https://chat.openai.com",
            color: "text-green-400"
        },
        {
            name: "Claude",
            description: "IA da Anthropic com grande contexto e raciocínio avançado.",
            category: "Chat & Texto",
            icon: MessageSquare,
            url: "https://claude.ai",
            color: "text-orange-400"
        },
        {
            name: "Gemini",
            description: "Modelo multimodal do Google integrado ao ecossistema Google.",
            category: "Multimodal",
            icon: Sparkles,
            url: "https://gemini.google.com",
            color: "text-blue-400"
        },
        {
            name: "Perplexity",
            description: "Motor de busca conversacional que cita fontes em tempo real.",
            category: "Pesquisa",
            icon: Search,
            url: "https://www.perplexity.ai",
            color: "text-teal-400"
        },
        {
            name: "Midjourney",
            description: "Gerador de imagens artísticas de altíssima qualidade (via Discord).",
            category: "Imagem",
            icon: ImageIcon,
            url: "https://www.midjourney.com",
            color: "text-purple-400"
        },
        {
            name: "Leonardo.ai",
            description: "Plataforma completa para geração de assets de jogos e arte.",
            category: "Imagem",
            icon: ImageIcon,
            url: "https://leonardo.ai",
            color: "text-pink-400"
        },
        {
            name: "Runway",
            description: "Ferramentas avançadas para edição e geração de vídeo com IA.",
            category: "Vídeo",
            icon: Video,
            url: "https://runwayml.com",
            color: "text-yellow-400"
        },
        {
            name: "Suno",
            description: "Crie músicas completas com vocais e letras a partir de texto.",
            category: "Música",
            icon: Music,
            url: "https://suno.com",
            color: "text-indigo-400"
        },
        {
            name: "Udio",
            description: "Outra ferramenta poderosa para geração de música de alta fidelidade.",
            category: "Música",
            icon: Music,
            url: "https://www.udio.com",
            color: "text-red-400"
        },
        {
            name: "ElevenLabs",
            description: "Síntese de voz ultra-realista e clonagem de voz.",
            category: "Áudio",
            icon: Mic,
            url: "https://elevenlabs.io",
            color: "text-gray-200"
        },
        {
            name: "Gamma",
            description: "Crie apresentações, documentos e sites bonitos em segundos.",
            category: "Produtividade",
            icon: Presentation,
            url: "https://gamma.app",
            color: "text-amber-400"
        },
        {
            name: "Beautiful.ai",
            description: "Software de apresentação que projeta seus slides para você.",
            category: "Produtividade",
            icon: Presentation,
            url: "https://www.beautiful.ai",
            color: "text-blue-300"
        },
        {
            name: "Copy.ai",
            description: "Plataforma de IA para marketing e redação de vendas.",
            category: "Marketing",
            icon: Zap,
            url: "https://www.copy.ai",
            color: "text-lime-400"
        },
        {
            name: "Hugging Face",
            description: "A comunidade e plataforma para modelos de IA open-source.",
            category: "Dev & Modelos",
            icon: Code,
            url: "https://huggingface.co",
            color: "text-yellow-200"
        },
        {
            name: "Replit",
            description: "IDE online com assistente de codificação IA integrado (Ghostwriter).",
            category: "Dev",
            icon: Code,
            url: "https://replit.com",
            color: "text-orange-500"
        }
    ];

    return (
        <div className="min-h-screen bg-mesh p-4 md:p-8 lg:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <header className="reveal space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                        <Sparkles size={16} className="text-primary" />
                        <span className="text-sm font-medium text-gray-300">Potencialize sua produtividade</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Central de <span className="gradient-text">Inteligência Artificial</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore o poder da IA generativa. Crie imagens sem limites e descubra as melhores ferramentas do mercado.
                    </p>
                </header>

                {/* Image Generator Section */}
                <section className="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 md:p-12">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 opacity-50" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                    <Wand2 className="text-primary" />
                                    Gerador de Imagens <span className="text-primary">Pro</span>
                                </h2>
                                <p className="text-gray-400">
                                    Crie imagens incríveis instantaneamente. Sem limites, sem créditos, totalmente gratuito. Basta descrever o que você quer ver.
                                </p>
                            </div>

                            <form onSubmit={handleGenerate} className="space-y-4">
                                <div className="relative group">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Descreva sua imaginação aqui... (ex: Um astronauta futurista em Marte estilo cyberpunk, 4k, ultra detalhado)"
                                        className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                                    />
                                    <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                                        Powered by Pollinations.ai
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading || !prompt}
                                    className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Gerando Mágica...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} />
                                            Gerar Imagem
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center group">
                            {generatedImage ? (
                                <>
                                    <img
                                        key={imageKey}
                                        src={generatedImage}
                                        alt="Generated Art"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <a
                                            href={generatedImage}
                                            download={`wtm-ai-art-${Date.now()}.jpg`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white text-black rounded-full hover:bg-primary transition-colors"
                                            title="Baixar/Abrir Original"
                                        >
                                            <Download size={24} />
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(generatedImage);
                                                // Could add a toast here
                                            }}
                                            className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                                            title="Copiar Link"
                                        >
                                            <Share2 size={24} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center space-y-4 p-6">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ImageIcon size={40} className="text-gray-600" />
                                    </div>
                                    <p className="text-gray-500 font-medium">Sua obra de arte aparecerá aqui</p>
                                    <p className="text-xs text-gray-600 max-w-xs mx-auto">
                                        Dica: Use termos em inglês para melhores resultados, mas português também funciona!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* AI Tools Menu */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Arsenal de I.As</h2>
                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Selecionadas
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aiTools.map((tool, index) => (
                            <a
                                key={index}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-primary/50 hover:bg-white/[0.02] transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                                    <ExternalLink size={20} />
                                </div>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
                                        <tool.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                                            {tool.name}
                                        </h3>
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {tool.category}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                    {tool.description}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
