"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Dashboard Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="glass-panel p-8 md:p-12 max-w-md w-full text-center space-y-6 border border-red-500/20">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                    <AlertTriangle size={32} className="text-red-500" />
                </div>

                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                        Algo deu errado
                    </h2>
                    <p className="text-gray-400 text-sm font-medium">
                        Não foi possível carregar o dashboard completamente.
                    </p>
                    <p className="text-xs text-gray-600 mt-2 font-mono bg-black/30 p-2 rounded">
                        {error.message || "Erro desconhecido"}
                    </p>
                </div>

                <button
                    onClick={() => reset()}
                    className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                    <RefreshCcw size={16} />
                    Tentar Novamente
                </button>
            </div>
        </div>
    );
}
