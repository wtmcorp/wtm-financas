"use client";

import { Calendar, Clock, ExternalLink, Newspaper, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const news = [
    {
        source: "Bloomberg Linea",
        title: "Fed sinaliza cortes de juros para 2025, impulsionando mercados emergentes",
        tag: "Macroeconomia",
        color: "text-blue-400 border-blue-500/20 bg-blue-500/10",
        time: "2h atrás",
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "InfoMoney",
        title: "Petrobras (PETR4) anuncia pagamento recorde de dividendos",
        tag: "Dividendos",
        color: "text-green-400 border-green-500/20 bg-green-500/10",
        time: "4h atrás",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "Valor Econômico",
        title: "Varejo brasileiro enfrenta desafios com inadimplência em alta",
        tag: "Setor Varejo",
        color: "text-red-400 border-red-500/20 bg-red-500/10",
        time: "5h atrás",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "CoinDesk",
        title: "Bitcoin supera resistência de $45k com aprovação de ETF à vista",
        tag: "Cripto",
        color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
        time: "6h atrás",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "Exame",
        title: "FIIs de Logística lideram rentabilidade no ano",
        tag: "FIIs",
        color: "text-purple-400 border-purple-500/20 bg-purple-500/10",
        time: "8h atrás",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
    },
];

export default function NewsFeed() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Newspaper className="text-primary" size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                        Manchetes do Dia
                    </h3>
                </div>
                <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-all hover:bg-white/5 px-4 py-2 rounded-full border border-white/5">Ver Todas</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group relative bg-[#0f0f13] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                    >
                        <div className="aspect-[16/10] w-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent z-10 opacity-90" />
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-6 left-6 z-20">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border backdrop-blur-xl ${item.color}`}>
                                    {item.tag}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 space-y-5">
                            <div className="flex items-center justify-between text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> {item.time}</span>
                                <span className="text-gray-600">{item.source}</span>
                            </div>

                            <h3 className="text-xl font-black text-white leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
                                {item.title}
                            </h3>

                            <div className="pt-6 border-t border-white/5 flex justify-end">
                                <button className="text-[10px] font-black text-gray-500 group-hover:text-white flex items-center gap-2 transition-all uppercase tracking-widest">
                                    Ler Matéria <ArrowUpRight size={16} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
