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
                const errorText = await response.text();
                let errorMsg = `Status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMsg += ` - ${errorJson.error || errorJson.message || "Unknown error"}`;
                } catch (e) {
                    errorMsg += ` - ${errorText.substring(0, 50)}`;
                }
                throw new Error(errorMsg);
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
                className="fixed bottom-24 left-4 sm:left-6 bg-white text-black p-4 rounded-2xl shadow-[0_10px_40px_rgba(167,139,250,0.3)] hover:shadow-primary/50 hover:scale-110 transition-all z-40 group border border-primary/20"
                aria-label="Abrir Wtm AI"
            >
                <div className="relative">
                    <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-4 -right-4 bg-primary text-[8px] font-black px-1.5 py-0.5 rounded-full animate-bounce">AI</div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
                        className="fixed bottom-4 left-4 right-4 sm:bottom-36 sm:left-6 sm:right-auto sm:w-[400px] glass rounded-[2.5rem] z-50 overflow-hidden flex flex-col h-[600px] max-h-[85vh] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border-white/10"
                    >
                        {/* Header */}
                        <div className="bg-white/5 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Sparkles className="text-black" size={24} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#0f0f13] animate-pulse"></div>
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-base flex items-center gap-2 tracking-tight">
                                        Wtm AI
                                        <span className="text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Premium</span>
                                    </h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sempre Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
                                aria-label="Fechar chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-primary/20 bg-gradient-to-b from-transparent to-primary/5">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl shadow-xl ${msg.sender === "user"
                                            ? "bg-primary text-black rounded-br-none font-medium"
                                            : "bg-white/5 text-gray-200 rounded-tl-none border border-white/10 backdrop-blur-md"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                                        <p className={`text-[9px] mt-2 font-bold uppercase tracking-widest ${msg.sender === "user" ? "text-black/50" : "text-gray-500"}`}>
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
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 backdrop-blur-md">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="p-6 border-t border-white/5 bg-white/5 backdrop-blur-2xl"
                        >
                            <div className="relative flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Como posso ajudar hoje?"
                                    disabled={isLoading}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-primary/50 transition-all placeholder:text-gray-600 disabled:opacity-50 pr-14 shadow-inner"
                                    autoComplete="off"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 p-3 bg-primary text-black rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                                    aria-label="Enviar mensagem"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                </button>
                            </div>
                            <p className="text-[8px] text-center text-gray-600 mt-4 font-black uppercase tracking-[0.2em]">Powered by Wtm Intelligence</p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
