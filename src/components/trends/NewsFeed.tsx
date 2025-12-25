"use client";

import { Calendar, Clock, ExternalLink, Newspaper } from "lucide-react";

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Newspaper className="text-primary" />
                    Manchetes do Dia
                </h3>
                <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Ver Todas</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, i) => (
                    <div key={i} className="group relative bg-[#0f0f13] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                        <div className="aspect-video w-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 z-20">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${item.color}`}>
                                    {item.tag}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                                <span className="uppercase tracking-wider">{item.source}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <button className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                                    Ler Matéria <ExternalLink size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
