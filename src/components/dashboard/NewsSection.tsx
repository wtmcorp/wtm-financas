"use client";

import { TrendingUp, TrendingDown, AlertCircle, ExternalLink, Globe, Clock, ArrowRight, Newspaper, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NewsSection = () => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (data.news) {
                    setNews(data.news);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
        const updateTime = () => {
            const now = new Date();
            setLastUpdate(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(() => {
            fetchNews();
            updateTime();
        }, 60000); // Update every 1 minute

        return () => clearInterval(interval);
    }, []);

    const formatTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

            if (diffInHours < 1) return "Agora mesmo";
            if (diffInHours === 1) return "1h atrás";
            return `${diffInHours}h atrás`;
        } catch (e) {
            return "Recente";
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium p-8 h-full border border-white/5 hover:border-primary/20 transition-all group/news relative overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                <Newspaper size={200} className="text-primary" />
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />

            <div className="flex justify-between items-center mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl shadow-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Globe size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">Market Pulse</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Global Financial News</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">Live</span>
                    </div>
                    <span className="text-[9px] text-gray-600 flex items-center gap-1.5 font-black uppercase tracking-tighter mt-2">
                        <Clock size={10} className="text-primary" /> {lastUpdate}
                    </span>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                {loading ? (
                    // Loading Skeleton
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse space-y-3">
                            <div className="flex justify-between">
                                <div className="h-3 w-20 bg-white/5 rounded-full"></div>
                                <div className="h-3 w-12 bg-white/5 rounded-full"></div>
                            </div>
                            <div className="h-4 w-full bg-white/5 rounded-lg"></div>
                            <div className="w-full h-px bg-white/5 mt-4" />
                        </div>
                    ))
                ) : (
                    <AnimatePresence mode="popLayout">
                        {news.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group/item cursor-pointer relative p-4 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all"
                                onClick={() => item.url && window.open(item.url, '_blank')}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg border ${item.color || 'text-primary border-primary/20 bg-primary/10'}`}>
                                        {item.source}
                                    </span>
                                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-tighter flex items-center gap-1">
                                        <Zap size={10} className="text-yellow-500" />
                                        {formatTime(item.time)}
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-400 group-hover/item:text-white transition-all leading-relaxed pr-8 line-clamp-2">
                                    {item.title}
                                </h4>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0">
                                    <ArrowRight size={18} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            <button className="w-full mt-10 py-5 bg-white/[0.03] hover:bg-white/[0.08] text-[10px] font-black text-gray-500 hover:text-white rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] border border-white/5 hover:border-white/20 group/btn">
                Explorar Feed Completo
                <ExternalLink size={14} className="group-hover:scale-110 group-hover:text-primary transition-all" />
            </button>
        </motion.div>
    );
}

export default NewsSection;
