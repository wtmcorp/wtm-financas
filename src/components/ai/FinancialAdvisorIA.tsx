"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Send,
    Sparkles,
    Bot,
    User,
    MessageSquare,
    Zap,
    TrendingUp,
    ShieldAlert,
    Lightbulb,
    ChevronRight,
    Loader2,
    Mic,
    Volume2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ReactMarkdown from "react-markdown";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    type?: "insight" | "alert" | "suggestion";
}

export default function FinancialAdvisorIA() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: `Olá ${user?.name?.split(" ")[0] || "Investidor"}! Sou seu Assistente de Inteligência Financeira. Como posso ajudar você a multiplicar seu patrimônio hoje?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // In a real app, we would call the Gemini API here
            // For now, we simulate a smart response
            setTimeout(() => {
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: generateMockResponse(input),
                    timestamp: new Date(),
                    type: "insight"
                };
                setMessages(prev => [...prev, assistantMessage]);
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            console.error("Error calling AI:", error);
            setIsLoading(false);
        }
    };

    const generateMockResponse = (query: string) => {
        const q = query.toLowerCase();
        if (q.includes("investir") || q.includes("investimento")) {
            return "Com base no seu perfil, recomendo diversificar 60% em Renda Fixa (CDB 120% CDI) para segurança e 40% em FIIs para renda passiva mensal. O momento atual da Selic favorece títulos pós-fixados.";
        }
        if (q.includes("economizar") || q.includes("poupar")) {
            return "Analisando seus gastos do último mês, notei que assinaturas recorrentes representam 15% da sua renda. Cancelar serviços não utilizados pode liberar R$ 250,00 extras para seus investimentos mensais.";
        }
        if (q.includes("dívida") || q.includes("devendo")) {
            return "Priorize o pagamento do cartão de crédito, pois os juros superam 400% ao ano. Use sua reserva de emergência se necessário, pois o custo da dívida é muito superior ao rendimento de qualquer investimento conservador.";
        }
        return "Entendi sua dúvida. Para uma análise mais precisa, você pode me perguntar sobre estratégias de investimento, como sair das dívidas ou como otimizar seu orçamento mensal.";
    };

    const quickActions = [
        { icon: TrendingUp, label: "Onde investir hoje?", query: "Onde devo investir meu dinheiro hoje?" },
        { icon: Lightbulb, label: "Dicas de economia", query: "Como posso economizar mais este mês?" },
        { icon: ShieldAlert, label: "Análise de riscos", query: "Quais os riscos da minha carteira atual?" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel h-[600px] flex flex-col relative overflow-hidden border-primary/20"
        >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />

            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <Brain size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white tracking-tight uppercase">Intelligence AI</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Online & Analisando</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all">
                        <Volume2 size={20} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'
                                    }`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`
                                    p-4 rounded-2xl text-sm leading-relaxed
                                    ${msg.role === 'user'
                                        ? 'bg-primary text-black font-bold rounded-tr-none shadow-lg shadow-primary/10'
                                        : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
                                    }
                                `}>
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    <div className={`text-[8px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-black' : 'text-gray-500'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                            <Loader2 size={16} className="text-primary animate-spin" />
                            <span className="text-xs text-gray-500 font-black uppercase tracking-widest">IA está processando...</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setInput(action.query);
                            handleSend();
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 text-[10px] font-black text-gray-400 hover:text-primary transition-all whitespace-nowrap"
                    >
                        <action.icon size={14} />
                        {action.label}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5">
                <div className="relative flex items-center gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Pergunte qualquer coisa sobre suas finanças..."
                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-6 pr-12 py-4 text-sm text-white placeholder:text-gray-700 outline-none focus:border-primary/50 transition-all"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-primary transition-colors">
                            <Mic size={18} />
                        </button>
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="w-12 h-12 rounded-2xl bg-primary hover:bg-white text-black flex items-center justify-center transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:grayscale"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(167, 139, 250, 0.2);
                    border-radius: 10px;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </motion.div>
    );
}
