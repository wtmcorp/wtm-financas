"use client";

import { X, Play, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";

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
    moduleTitle: string;
    lessons: Lesson[];
    onClose: () => void;
}

export default function LessonModal({ moduleTitle, lessons, onClose }: LessonModalProps) {
    const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
    const [quizSelected, setQuizSelected] = useState<number | null>(null);
    const [quizResult, setQuizResult] = useState<"correct" | "incorrect" | null>(null);

    const handleQuizSubmit = () => {
        if (quizSelected === null || !activeLesson.quiz) return;

        if (quizSelected === activeLesson.quiz.correctAnswer) {
            setQuizResult("correct");
        } else {
            setQuizResult("incorrect");
        }
    };

    // Reset quiz when lesson changes
    const handleLessonChange = (lesson: Lesson) => {
        setActiveLesson(lesson);
        setQuizSelected(null);
        setQuizResult(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-[#0f0f13] border border-white/10 rounded-3xl w-full max-w-6xl h-[85vh] flex overflow-hidden shadow-2xl relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-all"
                >
                    <X size={20} />
                </button>

                {/* Sidebar - Lesson List */}
                <div className="w-80 border-r border-white/10 bg-black/20 flex flex-col hidden md:flex">
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Módulo</h3>
                        <h2 className="text-xl font-black text-white leading-tight">{moduleTitle}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {lessons.map((lesson, index) => (
                            <button
                                key={lesson.id}
                                onClick={() => handleLessonChange(lesson)}
                                className={`w-full text-left p-4 rounded-xl transition-all border ${activeLesson.id === lesson.id
                                        ? "bg-primary/10 border-primary/20 text-white"
                                        : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 ${activeLesson.id === lesson.id ? "text-primary" : "text-gray-600"}`}>
                                        {lesson.completed ? <CheckCircle2 size={16} /> : (lesson.type === 'video' ? <Play size={16} /> : <FileText size={16} />)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold mb-1 line-clamp-2">{index + 1}. {lesson.title}</div>
                                        <div className="text-xs opacity-60">{lesson.duration}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0a0c]">
                    <div className="flex-1 overflow-y-auto p-8 md:p-12">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
                                <span>{moduleTitle}</span>
                                <ChevronRight size={14} />
                                <span className="text-white font-medium">{activeLesson.title}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                {activeLesson.title}
                            </h1>

                            <div className="prose prose-invert prose-lg max-w-none">
                                {activeLesson.content}
                            </div>

                            {/* Quiz Section */}
                            {activeLesson.quiz && (
                                <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <CheckCircle2 className="text-primary" />
                                        Teste seu Conhecimento
                                    </h3>
                                    <p className="text-lg text-white mb-6 font-medium">{activeLesson.quiz.question}</p>

                                    <div className="space-y-3">
                                        {activeLesson.quiz.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    if (quizResult) return;
                                                    setQuizSelected(idx);
                                                }}
                                                className={`w-full text-left p-4 rounded-xl border transition-all ${quizSelected === idx
                                                        ? "bg-primary/20 border-primary text-white"
                                                        : "bg-black/20 border-white/10 text-gray-400 hover:bg-white/5"
                                                    } ${quizResult === 'correct' && idx === activeLesson.quiz!.correctAnswer ? "bg-green-500/20 border-green-500 text-green-400" : ""}
                                                  ${quizResult === 'incorrect' && idx === quizSelected ? "bg-red-500/20 border-red-500 text-red-400" : ""}
                                                `}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>

                                    {!quizResult && quizSelected !== null && (
                                        <button
                                            onClick={handleQuizSubmit}
                                            className="mt-6 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                        >
                                            Verificar Resposta
                                        </button>
                                    )}

                                    {quizResult === 'correct' && (
                                        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 font-bold animate-in fade-in slide-in-from-bottom-2">
                                            Parabéns! Você acertou. 🎉
                                        </div>
                                    )}

                                    {quizResult === 'incorrect' && (
                                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-bold animate-in fade-in slide-in-from-bottom-2">
                                            Ops! Tente novamente.
                                            <button onClick={() => setQuizResult(null)} className="ml-4 underline">Tentar de novo</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-white/10 bg-black/40 flex justify-between items-center">
                        <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors">
                            Anterior
                        </button>
                        <button className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2">
                            Próxima Aula <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
