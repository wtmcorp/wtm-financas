"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import { Send, Loader, User, Bot, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    sender: "user" | "assistant";
    text: string;
    created_at: string;
}

interface ChatComponentProps {
    chatId?: string;
}

export default function ChatComponent({ chatId: initialChatId }: ChatComponentProps) {
    const { user, isAuthenticated } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState<string>(initialChatId || "");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) return;

        const initChat = async () => {
            if (initialChatId) {
                setChatId(initialChatId);
            } else if (!chatId) {
                const newChatRef = await addDoc(collection(db, "chats"), {
                    user_id: user.id,
                    title: "Nova Conversa",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                });
                setChatId(newChatRef.id);
            }
        };

        initChat();
    }, [user, initialChatId]);

    useEffect(() => {
        if (!chatId) return;

        const q = query(
            collection(db, "messages"),
            where("chat_id", "==", chatId),
            orderBy("created_at", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = [];
            snapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !user || !chatId || loading) return;

        const messageText = inputValue;
        setInputValue("");
        setLoading(true);

        try {
            await addDoc(collection(db, "messages"), {
                chat_id: chatId,
                user_id: user.id,
                sender: "user",
                text: messageText,
                created_at: new Date().toISOString(),
            });

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: messageText,
                    conversationHistory: messages,
                }),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const data = await response.json();

            await addDoc(collection(db, "messages"), {
                chat_id: chatId,
                user_id: user.id,
                sender: "assistant",
                text: data.message,
                created_at: new Date().toISOString(),
            });

            const chatRef = doc(db, "chats", chatId);
            await updateDoc(chatRef, { updated_at: new Date().toISOString() });

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
                    <User size={32} />
                </div>
                <p className="text-gray-400 font-medium">Por favor, faça login para usar o assistente.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-black/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5">
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Bot size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white">WTM Assistant</h3>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                <AnimatePresence initial={false}>
                    {messages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50"
                        >
                            <Sparkles size={40} className="text-primary" />
                            <p className="text-sm text-gray-400 max-w-[200px]">
                                Olá! Sou sua IA financeira. Como posso ajudar hoje?
                            </p>
                        </motion.div>
                    ) : (
                        messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                            ? "bg-primary text-black font-bold shadow-lg shadow-primary/10 rounded-tr-none"
                                            : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-md"
                                        }`}
                                >
                                    {msg.text}
                                    <div className={`text-[10px] mt-2 opacity-50 ${msg.sender === "user" ? "text-black" : "text-gray-400"}`}>
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-3">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/5">
                <form onSubmit={handleSendMessage} className="relative group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Pergunte sobre investimentos..."
                        disabled={loading}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading || !inputValue.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-black rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-primary/20"
                    >
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
}
