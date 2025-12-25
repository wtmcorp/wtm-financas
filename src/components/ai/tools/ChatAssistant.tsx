"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Copy, Check, Sparkles, Code, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Olá! Sou sua IA pessoal. Posso ajudar com códigos, textos, análises e muito mais. O que vamos criar hoje?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Using Pollinations AI Text API (OpenAI compatible)
            const response = await fetch("https://text.pollinations.ai/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "You are a helpful, expert AI assistant embedded in the Wtm Corps Finance platform. You are excellent at coding, finance, and general tasks. Reply in Portuguese." },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: "user", content: userMessage }
                    ],
                    model: "openai", // Pollinations uses this to route to best available model
                    seed: Math.floor(Math.random() * 1000)
                }),
            });

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.text(); // Pollinations returns raw text usually

            setMessages(prev => [...prev, { role: "assistant", content: data }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Desculpe, tive um erro ao processar sua solicitação. Tente novamente." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-white">Assistente Virtual Wtm</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Online • Ilimitado
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary text-black" : "bg-white/10 text-white"
                            }`}>
                            {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                        </div>

                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user"
                                ? "bg-primary text-black font-medium"
                                : "bg-white/5 text-gray-200 border border-white/5"
                            }`}>
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            return !inline ? (
                                                <div className="bg-black/50 rounded-lg p-3 my-2 border border-white/10 overflow-x-auto">
                                                    <code className="text-sm font-mono text-blue-300" {...props}>
                                                        {children}
                                                    </code>
                                                </div>
                                            ) : (
                                                <code className="bg-black/30 px-1 py-0.5 rounded text-blue-300 font-mono text-xs" {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="mt-2 flex justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                    <span className="flex items-center gap-1"><Sparkles size={10} /> GPT-4o Compatible</span>
                    <span className="flex items-center gap-1"><Code size={10} /> Code Expert</span>
                    <span className="flex items-center gap-1"><Terminal size={10} /> No Limits</span>
                </div>
            </form>
        </div>
    );
}
