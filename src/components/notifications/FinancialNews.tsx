"use client";

import { Bell, X, TrendingUp, TrendingDown, DollarSign, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
    id: number;
    title: string;
    description: string;
    type: "positive" | "negative" | "neutral" | "alert";
    timestamp: Date;
    source: string;
}

const MOCK_NEWS: NewsItem[] = [
    {
        id: 1,
        title: "Selic mantida em 15,00%",
        description: "Copom decide manter a taxa básica de juros. Bom momento para Renda Fixa! Investimentos em CDB e Tesouro Direto estão rendendo acima da inflação.",
        type: "positive",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        source: "Banco Central"
    },
    {
        id: 2,
        title: "Dólar em alta",
        description: "Moeda americana sobe 1,2% e fecha a R$ 5,85. Atenção aos investimentos em dólar. Momento de cautela para quem tem dívidas em moeda estrangeira.",
        type: "alert",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        source: "Mercado Financeiro"
    },
    {
        id: 3,
        title: "Ibovespa recua 0,8%",
        description: "Bolsa fecha em queda com incertezas no cenário internacional. Investidores buscam ativos mais seguros como Tesouro Direto.",
        type: "negative",
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        source: "B3"
    },
    {
        id: 4,
        title: "Inflação desacelera",
        description: "IPCA de novembro fica em 0,39%, abaixo das expectativas do mercado. Boas notícias para o poder de compra dos brasileiros.",
        type: "positive",
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        source: "IBGE"
    },
    {
        id: 5,
        title: "Tesouro Direto atinge recorde",
        description: "Número de investidores cadastrados ultrapassa 25 milhões. Brasileiros estão descobrindo os benefícios da renda fixa.",
        type: "neutral",
        timestamp: new Date(Date.now() - 1000 * 60 * 240),
        source: "Tesouro Nacional"
    }
];

export default function FinancialNews() {
    const [isOpen, setIsOpen] = useState(false);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [hasUnread, setHasUnread] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Simular carregamento para parecer mais real
        if (isOpen && news.length === 0) {
            setIsLoading(true);
            setTimeout(() => {
                setNews(MOCK_NEWS);
                setIsLoading(false);
            }, 800);
        }
    }, [isOpen, news.length]);

    const getIcon = (type: string) => {
        switch (type) {
            case "positive":
                return <TrendingUp className="text-green-500" size={20} />;
            case "negative":
                return <TrendingDown className="text-red-500" size={20} />;
            case "alert":
                return <AlertCircle className="text-yellow-500" size={20} />;
            default:
                return <DollarSign className="text-primary" size={20} />;
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);

        if (diff < 60) return `${diff}min atrás`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h atrás`;
        return `${Math.floor(diff / 1440)}d atrás`;
    };

    const handleOpen = () => {
        setIsOpen(true);
        setHasUnread(false);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Notícias Financeiras"
                aria-label="Abrir notícias financeiras"
            >
                <Bell size={20} className="text-gray-400" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full sm:w-[450px] md:w-[550px] lg:w-[650px] bg-gradient-to-b from-card to-black border-l border-primary/20 shadow-2xl z-[70] flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-primary/10">
                                <div>
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Bell className="text-primary" size={24} />
                                        Notícias Financeiras
                                    </h2>
                                    <p className="text-sm text-gray-400 mt-1">Atualizações em tempo real</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Fechar notícias"
                                >
                                    <X size={20} className="text-gray-400 hover:text-white" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                        <RefreshCw className="animate-spin mb-4 text-primary" size={32} />
                                        <p>Buscando últimas notícias...</p>
                                    </div>
                                ) : news.length > 0 ? (
                                    news.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all cursor-pointer hover:border-primary/30 group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 flex-shrink-0 p-2 bg-black/30 rounded-lg group-hover:scale-110 transition-transform">
                                                    {getIcon(item.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-[10px] uppercase tracking-wider text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">
                                                            {item.source}
                                                        </span>
                                                        <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
                                                    </div>
                                                    <h3 className="text-white font-bold text-base mb-2 leading-tight">{item.title}</h3>
                                                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.description}</p>
                                                    <div className="flex items-center justify-end">
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.type === 'positive' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                            item.type === 'negative' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                                item.type === 'alert' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                                    'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                                            }`}>
                                                            {item.type === 'positive' ? 'Positivo' :
                                                                item.type === 'negative' ? 'Negativo' :
                                                                    item.type === 'alert' ? 'Alerta' : 'Neutro'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-400">
                                        <Bell size={64} className="mx-auto mb-4 opacity-20" />
                                        <p className="text-lg">Nenhuma notícia disponível no momento</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-white/10 bg-black/30">
                                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Sistema online • Última atualização: {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
