"use client";

import { useState } from "react";
import { Wand2, Download, Share2, ImageIcon, RefreshCw } from "lucide-react";

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageKey, setImageKey] = useState(0);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt) return;

        setIsLoading(true);
        const seed = Math.floor(Math.random() * 1000000);
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

        const img = new Image();
        img.src = url;
        img.onload = () => {
            setGeneratedImage(url);
            setIsLoading(false);
            setImageKey(prev => prev + 1);
        };
        img.onerror = () => {
            setIsLoading(false);
            // Handle error
        };
    };

    return (
        <div className="h-full flex flex-col lg:flex-row gap-6">
            {/* Controls */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Wand2 className="text-primary" size={20} />
                            Configuração
                        </h3>
                        <p className="text-sm text-gray-400">
                            Descreva sua imagem com detalhes para melhores resultados.
                        </p>
                    </div>

                    <form onSubmit={handleGenerate} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Prompt</label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Um astronauta futurista em Marte..."
                                className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !prompt}
                            className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw size={20} className="animate-spin" />
                                    Gerando...
                                </>
                            ) : (
                                <>
                                    <Wand2 size={20} />
                                    Gerar Imagem
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6">
                    <h4 className="text-sm font-bold text-white mb-4">Dicas de Prompt</h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                        <li className="flex gap-2">
                            <span className="text-primary">•</span> Use estilos: "cyberpunk", "oil painting", "realistic"
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span> Defina iluminação: "cinematic lighting", "neon lights"
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span> Resolução: "4k", "8k", "highly detailed"
                        </li>
                    </ul>
                </div>
            </div>

            {/* Preview */}
            <div className="flex-1 bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 flex items-center justify-center relative overflow-hidden group min-h-[400px]">
                {generatedImage ? (
                    <>
                        <img
                            key={imageKey}
                            src={generatedImage}
                            alt="Generated Art"
                            className="w-full h-full object-contain max-h-[600px] rounded-lg shadow-2xl"
                        />
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                                href={generatedImage}
                                download={`wtm-art-${Date.now()}.jpg`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-black/50 text-white rounded-full hover:bg-primary hover:text-black transition-colors backdrop-blur-md border border-white/10"
                                title="Baixar"
                            >
                                <Download size={20} />
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <ImageIcon size={48} className="text-gray-700" />
                        </div>
                        <p className="text-gray-500 font-medium">Sua arte aparecerá aqui</p>
                    </div>
                )}
            </div>
        </div>
    );
}
