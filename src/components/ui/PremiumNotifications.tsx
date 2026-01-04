"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
}

export default function PremiumNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Exemplo de notificação automática ao carregar
    // Fetch real news for notification
    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (data.news && data.news.length > 0) {
                    const latest = data.news[0];
                    addNotification({
                        title: latest.source,
                        message: latest.title,
                        type: "info"
                    });
                }
            } catch (error) {
                console.error("Error fetching notification news:", error);
            }
        };

        const timer = setTimeout(fetchLatestNews, 3000);
        return () => clearTimeout(timer);
    }, []);

    const addNotification = (n: Omit<Notification, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications(prev => [...prev, { ...n, id }]);
        setTimeout(() => removeNotification(id), 6000);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const icons = {
        success: <CheckCircle className="text-green-400" size={20} />,
        error: <AlertCircle className="text-red-400" size={20} />,
        info: <Info className="text-blue-400" size={20} />,
        warning: <AlertTriangle className="text-yellow-400" size={20} />,
    };

    return (
        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-4 w-full max-w-[400px] pointer-events-none">
            <AnimatePresence>
                {notifications.map(n => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="pointer-events-auto relative overflow-hidden card-premium p-5 bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl group"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

                        <div className="flex gap-4">
                            <div className="mt-1">{icons[n.type]}</div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white mb-1">{n.title}</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">{n.message}</p>
                            </div>
                            <button
                                onClick={() => removeNotification(n.id)}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 6, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-[2px] bg-primary/30"
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
