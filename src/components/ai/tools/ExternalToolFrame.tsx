"use client";

import { ExternalLink, Lock } from "lucide-react";

interface ExternalToolFrameProps {
    url: string;
    name: string;
    description: string;
}

export default function ExternalToolFrame({ url, name, description }: ExternalToolFrameProps) {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-500">
                <Lock size={40} />
            </div>

            <div className="space-y-2 max-w-md">
                <h3 className="text-2xl font-bold text-white">{name}</h3>
                <p className="text-gray-400">{description}</p>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl max-w-lg">
                <p className="text-yellow-200 text-sm">
                    <strong>Nota de Segurança:</strong> Esta ferramenta ({name}) não permite ser usada dentro de outros sites (proteção contra clickjacking).
                </p>
            </div>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2"
            >
                Abrir {name} em Nova Aba
                <ExternalLink size={18} />
            </a>
        </div>
    );
}
