"use client";

import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
}

export default function ChatBubble() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Inicializar Chat
    useEffect(() => {
        if (user && isOpen && !chatId) {
            const initChat = async () => {
                try {
                    // Criar um novo chat para a sessão do bubble
                    const newChatRef = await addDoc(collection(db, "chats"), {
                        user_id: user.id,
                        title: "Chat Rápido",
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });
                    setChatId(newChatRef.id);
                } catch (error) {
                    console.error("Error creating chat:", error);
                    setMessages([{
                        id: "init-error",
                        text: `Erro ao iniciar chat: ${error instanceof Error ? error.message : "Desconhecido"}. Verifique sua conexão.`,
                        sender: "ai",
                        timestamp: new Date()
                    }]);
                }
            };
            initChat();
        }
    }, [user, isOpen, chatId]);

    // Escutar mensagens
    useEffect(() => {
        if (!chatId) return;

        const q = query(
            collection(db, "messages"),
            where("chat_id", "==", chatId)
            // orderBy("created_at", "asc") // Removido temporariamente para teste
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                msgs.push({
                    id: doc.id,
                    text: data.text,
                    sender: data.sender === "user" ? "user" : "ai",
                    timestamp: new Date(data.created_at)
                });
            });

            if (msgs.length === 0 && user) {
                // Mensagem de boas-vindas local (não salva no banco para não duplicar)
                setMessages([{
                    id: "welcome",
                    text: `Olá${user.name !== "Usuário" ? `, ${user.name}` : ""}! 👋\n\nSou o Wtm AI. Como posso ajudar com suas finanças hoje?`,
                    sender: "ai",
                    timestamp: new Date()
                }]);
            } else {
                // Ordenar client-side já que removemos o orderBy do Firestore
                msgs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
                setMessages(msgs);
            }
            scrollToBottom();
        });

        return () => unsubscribe();
    }, [chatId, user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading || !chatId || !user) return;

        const messageText = inputValue;
        setInputValue("");
        setIsLoading(true);

        try {
            // 1. Salvar mensagem do usuário
            await addDoc(collection(db, "messages"), {
                chat_id: chatId,
                user_id: user.id,
                sender: "user",
                text: messageText,
                created_at: new Date().toISOString(),
            });

            // 2. Chamar API
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    conversationHistory: messages.map(m => ({
                        sender: m.sender === "user" ? "user" : "assistant",
                        text: m.text
                    }))
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to get response");
            }

            const data = await response.json();

            // 3. Salvar resposta da IA
            await addDoc(collection(db, "messages"), {
                chat_id: chatId,
                user_id: user.id,
                sender: "assistant",
                text: data.message,
                created_at: new Date().toISOString(),
            });

            // 4. Atualizar chat
            await updateDoc(doc(db, "chats", chatId), {
                updated_at: new Date().toISOString()
            });

        } catch (error) {
            console.error("Error calling ChatGPT:", error);
            // Mensagem de erro local
            setMessages(prev => [...prev, {
                id: "error-" + Date.now(),
                text: `Erro: ${error instanceof Error ? error.message : "Desconhecido"}`,
                sender: "ai",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null; // Não mostrar se não estiver logado

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 left-4 sm:left-6 bg-gradient-to-br from-primary to-primary/70 text-black p-3 rounded-full shadow-lg hover:shadow-primary/50 hover:scale-110 transition-all z-40 group"
                aria-label="Abrir Wtm AI"
            >
                <MessageCircle size={24} className="group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-4 left-4 right-4 sm:bottom-36 sm:left-6 sm:right-auto sm:w-96 bg-gradient-to-b from-card to-black border border-primary/20 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
                    >
                        <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 flex justify-between items-center border-b border-primary/20">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Sparkles className="text-primary" size={20} />
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-sm flex items-center gap-2">
                                        Wtm AI
                                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">GPT-4</span>
                                    </h3>
                                    <p className="text-xs text-gray-400">Assistente Financeiro Inteligente</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                                aria-label="Fechar chat"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-primary/20">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-lg ${msg.sender === "user"
                                            ? "bg-primary/20 text-white rounded-br-none border border-primary/30"
                                            : "bg-white/5 text-gray-300 rounded-tl-none border border-white/10"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 border border-white/10 rounded-lg rounded-tl-none p-3">
                                        <Loader2 className="animate-spin text-primary" size={20} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="p-3 border-t border-white/10 flex gap-2 bg-black/30"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Pergunte sobre finanças..."
                                disabled={isLoading}
                                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary/50 transition-colors placeholder:text-gray-500 disabled:opacity-50"
                                autoComplete="off"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className="p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Enviar mensagem"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
