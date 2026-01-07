"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, ExternalLink, Newspaper, ArrowUpRight, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface NewsItem {
    source: string;
    title: string;
    tag: string;
    color: string;
    time: string;
    image: string;
    url?: string;
}

// Helper to format time ago
function formatTimeAgo(timestamp: string): string {
    try {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays > 0) return `${diffDays}d atrás`;
        if (diffHours > 0) return `${diffHours}h atrás`;
        return "Agora";
    } catch {
        return "Recente";
    }
}

export default function NewsFeed() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const fetchNews = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/news");
            if (!response.ok) throw new Error("Failed to fetch news");

            const data = await response.json();
            setNews(data.news || []);
            setLastUpdate(new Date());
        } catch (err) {
            console.error("Error fetching news:", err);
            setError("Erro ao carregar notícias");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();

        // Auto-refresh every 1 minute
        const interval = setInterval(fetchNews, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Newspaper className="text-primary" size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                        Manchetes do Dia
                    </h3>
                    {lastUpdate && (
                        <span className="text-[10px] text-gray-600 font-bold">
                            Atualizado {formatTimeAgo(lastUpdate.toISOString())}
                        </span>
                    )}
                </div>
                <button
                    onClick={fetchNews}
                    disabled={loading}
                    className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all hover:bg-white/5 px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 disabled:opacity-50"
                >
                    <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                    Atualizar
                </button>
            </div>

            {loading && news.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <p className="text-red-400 font-bold mb-4">{error}</p>
                    <button
                        onClick={fetchNews}
                        className="px-6 py-3 bg-primary text-black font-black rounded-xl hover:bg-white transition-all"
                    >
                        Tentar Novamente
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {news.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative glass-panel rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col"
                        >
                            <div className="aspect-[16/9] w-full overflow-hidden relative bg-white/5">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent z-10 opacity-90" />
                                <img
                                    src={item.image}
                                    alt="" // Empty alt to prevent messy text on failure
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                {/* Placeholder if image fails */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Newspaper size={48} className="text-gray-500" />
                                </div>

                                <div className="absolute top-6 left-6 z-20">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border backdrop-blur-xl ${item.color}`}>
                                        {item.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-5 flex-1 flex flex-col">
                                <div className="flex items-center justify-between text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={12} className="text-primary" />
                                        {formatTimeAgo(item.time)}
                                    </span>
                                    <span className="text-gray-600">{item.source}</span>
                                </div>

                                <h3 className="text-lg md:text-xl font-black text-white leading-[1.3] group-hover:text-primary transition-colors line-clamp-3">
                                    {item.title}
                                </h3>

                                <div className="pt-6 border-t border-white/5 mt-auto flex justify-end">
                                    {item.url ? (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] font-black text-gray-500 group-hover:text-white flex items-center gap-2 transition-all uppercase tracking-widest"
                                        >
                                            Ler Matéria <ArrowUpRight size={16} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </a>
                                    ) : (
                                        <button className="text-[10px] font-black text-gray-500 group-hover:text-white flex items-center gap-2 transition-all uppercase tracking-widest">
                                            Ler Matéria <ArrowUpRight size={16} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
