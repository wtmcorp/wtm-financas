import { Card } from "@/components/ui/Card";

const news = [
    { source: "Valor", title: "Ibovespa fecha em alta com otimismo no exterior", tag: "Alta", color: "bg-green-500/20 text-green-400" },
    { source: "InfoMoney", title: "Dólar cai a R$ 4,90 com dados de inflação nos EUA", tag: "Oportunidade", color: "bg-yellow-500/20 text-yellow-400" },
    { source: "TC", title: "Setor de varejo sofre com juros altos", tag: "Queda", color: "bg-red-500/20 text-red-400" },
    { source: "Bloomberg", title: "Petrobras anuncia novos dividendos", tag: "Alta", color: "bg-green-500/20 text-green-400" },
];

export default function NewsFeed() {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {news.map((item, i) => (
                <Card key={i} className="min-w-[280px] flex flex-col justify-between h-32">
                    <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.source}</span>
                        <h3 className="text-sm font-medium text-white mt-1 line-clamp-2">{item.title}</h3>
                    </div>
                    <span className={`self-start px-2 py-1 rounded text-[10px] font-bold uppercase ${item.color}`}>
                        {item.tag}
                    </span>
                </Card>
            ))}
        </div>
    );
}
