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
    getDoc,
    setDoc,
    updateDoc
} from "firebase/firestore";
import { Send, Loader } from "lucide-react";

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

    // Criar ou recuperar chat
    useEffect(() => {
        if (!user) return;

        const initChat = async () => {
            if (initialChatId) {
                setChatId(initialChatId);
            } else {
                // Verificar se já existe um chat ativo ou criar um novo
                // Simplificação: criar um ID novo se não fornecido, mas idealmente gerenciar chats
                // Aqui vamos criar um chat novo se não tiver ID
                if (!chatId) {
                    const newChatRef = await addDoc(collection(db, "chats"), {
                        user_id: user.id,
                        title: "Nova Conversa",
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });
                    setChatId(newChatRef.id);
                }
            }
        };

        initChat();
    }, [user, initialChatId]);

    // Escutar mensagens em tempo real
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
            scrollToBottom();
        });

        return () => unsubscribe();
    }, [chatId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim() || !user || !chatId || loading) return;

        const messageText = inputValue;
        setInputValue("");
        setLoading(true);

        try {
            // 1. Salvar mensagem do usuário (Client Side)
            await addDoc(collection(db, "messages"), {
                chat_id: chatId,
                user_id: user.id,
                sender: "user",
                text: messageText,
                created_at: new Date().toISOString(),
            });

            // 2. Chamar API para obter resposta
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    conversationHistory: messages,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            const aiMessage = data.message;

            // 3. Salvar resposta da IA (Client Side)
            await addDoc(collection(db, "messages"), {
                chat_id: chatId,
                user_id: user.id,
                sender: "assistant",
                text: aiMessage,
                created_at: new Date().toISOString(),
            });

            // 4. Atualizar timestamp do chat
            const chatRef = doc(db, "chats", chatId);
            await updateDoc(chatRef, { updated_at: new Date().toISOString() });

        } catch (error) {
            console.error("Error sending message:", error);
            alert("Erro ao enviar mensagem. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Por favor, faça login para usar o chat.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Nenhuma mensagem ainda. Comece uma conversa!</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-900"
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs mt-1 opacity-70">
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2">
                            <Loader className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Digitando...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        disabled={loading}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading || !inputValue.trim()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
