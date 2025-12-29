"use client";

import { X, Play, FileText, CheckCircle2, ChevronRight, ChevronLeft, Menu, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: "video" | "article";
    completed: boolean;
    content: React.ReactNode;
    quiz?: QuizQuestion;
}

interface LessonModalProps {
    moduleId: string;
    moduleTitle: string;
    lessons: Lesson[];
    onClose: () => void;
    canAccessLesson: (moduleId: string, lessonIndex: number) => boolean;
    markLessonComplete: (moduleId: string, lessonId: string, lessonIndex: number) => Promise<void>;
}

export default function LessonModal({
    moduleId,
    moduleTitle,
    lessons,
    onClose,
    canAccessLesson,
    markLessonComplete
}: LessonModalProps) {
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);
    const [quizSelected, setQuizSelected] = useState<number | null>(null);
    const [quizResult, setQuizResult] = useState<"correct" | "incorrect" | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on client side only
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const activeLesson = lessons[activeLessonIndex];

    const handleQuizSubmit = () => {
        if (quizSelected === null || !activeLesson.quiz) return;

        if (quizSelected === activeLesson.quiz.correctAnswer) {
            setQuizResult("correct");
        } else {
            setQuizResult("incorrect");
        }
    };

    const handleNextLesson = async () => {
        const nextIndex = activeLessonIndex + 1;

        // Optimistic update: move to next lesson immediately
        if (activeLessonIndex < lessons.length - 1) {
            setActiveLessonIndex(nextIndex);
            setQuizSelected(null);
            setQuizResult(null);
            setIsMobileMenuOpen(false);
        } else {
            onClose();
        }

        // Mark current lesson as complete in the background
        try {
            await markLessonComplete(moduleId, activeLesson.id, activeLessonIndex);
        } catch (error) {
            console.error("Failed to mark lesson as complete:", error);
        }
    };

    const handlePrevLesson = () => {
        if (activeLessonIndex > 0) {
            setActiveLessonIndex(prev => prev - 1);
            setQuizSelected(null);
            setQuizResult(null);
            setIsMobileMenuOpen(false);
        }
    };

    // Reset quiz when lesson changes via sidebar
    const handleLessonSelect = (index: number) => {
        // Check if user can access this lesson
        if (!canAccessLesson(moduleId, index)) {
            return; // Don't allow navigation to locked lessons
        }

        setActiveLessonIndex(index);
        setQuizSelected(null);
        setQuizResult(null);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
            <div className="bg-[#0f0f13] border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl w-full max-w-7xl h-full md:h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative">

                {/* Header - Mobile Only */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-400 hover:text-white">
                        <Menu size={24} />
                    </button>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest truncate max-w-[200px]">{moduleTitle}</span>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Sidebar - Lesson List */}
                <AnimatePresence>
                    {(isMobileMenuOpen || !isMobile) && (
                        <motion.div
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            className={`w-full md:w-80 border-r border-white/10 bg-black/40 flex flex-col absolute md:relative inset-0 z-40 md:z-auto ${isMobileMenuOpen ? "flex" : "hidden md:flex"}`}
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <div>
                                    <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Módulo</h3>
                                    <h2 className="text-lg font-black text-white leading-tight">{moduleTitle}</h2>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-gray-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                                {lessons.map((lesson, index) => {
                                    const isLocked = !canAccessLesson(moduleId, index);
                                    const isActive = activeLessonIndex === index;

                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => handleLessonSelect(index)}
                                            disabled={isLocked}
                                            className={`w-full text-left p-4 rounded-2xl transition-all border ${isActive
                                                ? "bg-primary/10 border-primary/20 text-white shadow-[0_0_20px_rgba(167,139,250,0.1)]"
                                                : isLocked
                                                    ? "bg-transparent border-transparent text-gray-700 opacity-50 cursor-not-allowed"
                                                    : "bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`mt-1 shrink-0 ${isActive ? "text-primary" : isLocked ? "text-gray-700" : "text-gray-500"}`}>
                                                    {isLocked ? (
                                                        <Lock size={18} />
                                                    ) : lesson.completed ? (
                                                        <CheckCircle2 size={18} />
                                                    ) : lesson.type === 'video' ? (
                                                        <Play size={18} />
                                                    ) : (
                                                        <FileText size={18} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black mb-1 line-clamp-2">{lesson.title}</div>
                                                    <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                                                        {isLocked ? "Bloqueada" : lesson.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0a0c]">
                    {/* Desktop Close Button */}
                    <button
                        onClick={onClose}
                        className="hidden md:flex absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-white hover:text-black rounded-full text-white transition-all border border-white/10"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex-1 overflow-y-auto p-6 md:p-16 custom-scrollbar relative">
                        {/* Narrator Component */}
                        <LessonNarrator text={extractTextFromNode(activeLesson.content)} />

                        <div className="max-w-3xl mx-auto space-y-10">
                            <div className="flex items-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                                <span className="hover:text-primary cursor-pointer transition-colors">{moduleTitle}</span>
                                <ChevronRight size={12} />
                                <span className="text-white">{activeLesson.title}</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                                {activeLesson.title}
                            </h1>

                            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-black prose-p:text-gray-400 prose-p:leading-relaxed prose-strong:text-white">
                                {activeLesson.content}
                            </div>

                            {/* Quiz Section */}
                            {activeLesson.quiz && (
                                <div className="mt-16 p-8 md:p-12 bg-white/[0.02] rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-500" />

                                    <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-primary/20 rounded-lg">
                                            <BrainCircuit className="text-primary" size={24} />
                                        </div>
                                        Desafio de Conhecimento
                                    </h3>

                                    <p className="text-xl text-white mb-8 font-bold leading-snug">{activeLesson.quiz.question}</p>

                                    <div className="space-y-4">
                                        {activeLesson.quiz.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    if (quizResult) return;
                                                    setQuizSelected(idx);
                                                }}
                                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${quizSelected === idx
                                                    ? "bg-primary/20 border-primary text-white shadow-[0_0_30px_rgba(167,139,250,0.2)]"
                                                    : "bg-black/40 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
                                                    } ${quizResult === 'correct' && idx === activeLesson.quiz!.correctAnswer ? "bg-green-500/20 border-green-500 text-green-400" : ""}
                                                  ${quizResult === 'incorrect' && idx === quizSelected ? "bg-red-500/20 border-red-500 text-red-400" : ""}
                                                `}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${quizSelected === idx ? "bg-primary border-primary text-black" : "bg-white/5 border-white/10"}`}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span className="font-bold">{option}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <AnimatePresence>
                                        {!quizResult && quizSelected !== null && (
                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                onClick={handleQuizSubmit}
                                                className="mt-8 w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-primary hover:text-black transition-all shadow-xl uppercase tracking-widest text-xs"
                                            >
                                                Verificar Resposta
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    {quizResult === 'correct' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 font-black flex items-center gap-4"
                                        >
                                            <div className="p-2 bg-green-500/20 rounded-full">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <div>
                                                <div className="text-lg">Excelente! Resposta correta.</div>
                                                <div className="text-sm opacity-60 font-bold">Você está dominando o conteúdo! 🎉</div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {quizResult === 'incorrect' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-black"
                                        >
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="p-2 bg-red-500/20 rounded-full">
                                                    <X size={24} />
                                                </div>
                                                <div className="text-lg">Não foi dessa vez...</div>
                                            </div>
                                            <button onClick={() => { setQuizResult(null); setQuizSelected(null); }} className="text-sm underline hover:text-white transition-colors ml-12">
                                                Tentar novamente
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 md:p-8 border-t border-white/10 bg-black/60 backdrop-blur-md flex justify-between items-center">
                        <button
                            onClick={handlePrevLesson}
                            disabled={activeLessonIndex === 0}
                            className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${activeLessonIndex === 0 ? "opacity-20 cursor-not-allowed" : "text-gray-500 hover:text-white"}`}
                        >
                            <ChevronLeft size={16} /> Anterior
                        </button>

                        <div className="hidden md:flex items-center gap-1">
                            {lessons.map((_, i) => (
                                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === activeLessonIndex ? "w-8 bg-primary" : "w-2 bg-white/10"}`} />
                            ))}
                        </div>

                        <button
                            onClick={handleNextLesson}
                            className="flex-1 md:flex-none px-6 md:px-12 py-4 bg-primary text-black font-black rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(167,139,250,0.3)] uppercase tracking-widest text-xs"
                        >
                            <span className="truncate">{activeLessonIndex === lessons.length - 1 ? "Finalizar" : "Próxima"}</span> <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { BrainCircuit } from "lucide-react";
import LessonNarrator from "./LessonNarrator";

// Helper to extract text from ReactNode (simplified)
const extractTextFromNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractTextFromNode).join(' ');
    if (typeof node === 'object' && node && 'props' in node) {
        const props = (node as any).props;
        if (props.children) return extractTextFromNode(props.children);
    }
    return '';
};
