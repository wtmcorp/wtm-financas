"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Newspaper } from "lucide-react";
import AiInsights from "./AiInsights";
import NewsSection from "./NewsSection";

export default function DashboardTabs() {
    const [activeTab, setActiveTab] = useState<"insights" | "news">("insights");

    return (
        <div className="space-y-6">
            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <button
                    onClick={() => setActiveTab("insights")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "insights"
                            ? "bg-primary text-black shadow-lg shadow-primary/20"
                            : "text-gray-500 hover:text-white"
                        }`}
                >
                    <Sparkles size={14} />
                    Insights
                </button>
                <button
                    onClick={() => setActiveTab("news")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "news"
                            ? "bg-primary text-black shadow-lg shadow-primary/20"
                            : "text-gray-500 hover:text-white"
                        }`}
                >
                    <Newspaper size={14} />
                    Notícias
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === "insights" ? <AiInsights /> : <NewsSection />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
