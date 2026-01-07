"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, DollarSign, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface FinancialEvent {
    id: string;
    title: string;
    amount: number;
    type: "income" | "expense" | "goal";
    date: Date;
    status: "pending" | "completed" | "overdue";
}

export default function FinancialCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<FinancialEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        // Mock events (replace with real data)
        const mockEvents: FinancialEvent[] = [
            {
                id: "1",
                title: "Salário",
                amount: 5000,
                type: "income",
                date: new Date(2026, 0, 5),
                status: "completed"
            },
            {
                id: "2",
                title: "Aluguel",
                amount: 1500,
                type: "expense",
                date: new Date(2026, 0, 10),
                status: "pending"
            },
            {
                id: "3",
                title: "Meta: Viagem",
                amount: 3000,
                type: "goal",
                date: new Date(2026, 0, 31),
                status: "pending"
            }
        ];
        setEvents(mockEvents);
    }, []);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getEventsForDate = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear();
        });
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const totalIncome = events
        .filter(e => e.type === "income" && e.date.getMonth() === currentDate.getMonth())
        .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = events
        .filter(e => e.type === "expense" && e.date.getMonth() === currentDate.getMonth())
        .reduce((sum, e) => sum + e.amount, 0);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 md:p-8 relative overflow-hidden group"
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-500/10 transition-all duration-700" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl shadow-blue-500/20">
                        <Calendar size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Calendário</h3>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">
                            Eventos Financeiros
                        </p>
                    </div>
                </div>
            </div>

            {/* Month Navigator */}
            <div className="flex items-center justify-between mb-6 relative z-10">
                <button
                    onClick={previousMonth}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/10"
                >
                    <ChevronLeft size={20} />
                </button>
                <h4 className="text-lg font-black text-white capitalize">{monthName}</h4>
                <button
                    onClick={nextMonth}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/10"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="relative z-10 mb-6">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => (
                        <div key={i} className="text-center text-[10px] font-black text-gray-600 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, i) => {
                        const dayEvents = day ? getEventsForDate(day) : [];
                        const isToday = day === new Date().getDate() &&
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() === new Date().getFullYear();

                        return (
                            <motion.div
                                key={i}
                                whileHover={day ? { scale: 1.05 } : {}}
                                className={`
                                    aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-bold
                                    ${day ? 'cursor-pointer' : ''}
                                    ${isToday ? 'bg-primary text-black' : day ? 'bg-white/5 text-white hover:bg-white/10' : ''}
                                    ${dayEvents.length > 0 ? 'ring-2 ring-primary/30' : ''}
                                    transition-all relative
                                `}
                                onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                            >
                                {day && (
                                    <>
                                        <span>{day}</span>
                                        {dayEvents.length > 0 && (
                                            <div className="flex gap-0.5 mt-1">
                                                {dayEvents.slice(0, 3).map((event, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`w-1 h-1 rounded-full ${event.type === 'income' ? 'bg-green-500' :
                                                                event.type === 'expense' ? 'bg-red-500' :
                                                                    'bg-blue-500'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-400">
                        <TrendingUp size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Entradas</span>
                    </div>
                    <div className="text-xl font-black text-white">
                        R$ {totalIncome.toLocaleString('pt-BR')}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-400">
                        <TrendingDown size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Saídas</span>
                    </div>
                    <div className="text-xl font-black text-white">
                        R$ {totalExpenses.toLocaleString('pt-BR')}
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
                <h5 className="text-sm font-black text-gray-500 uppercase tracking-wider mb-3">Próximos Eventos</h5>
                <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {events
                        .filter(e => e.date >= new Date())
                        .slice(0, 3)
                        .map((event, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${event.type === 'income' ? 'bg-green-500' :
                                            event.type === 'expense' ? 'bg-red-500' :
                                                'bg-blue-500'
                                        }`} />
                                    <span className="text-xs font-bold text-white">{event.title}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {event.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                </span>
                            </div>
                        ))}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(167, 139, 250, 0.3);
                    border-radius: 10px;
                }
            `}</style>
        </motion.div>
    );
}
