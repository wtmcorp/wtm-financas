<<<<<<< HEAD
import { Card } from "@/components/ui/Card";

const sectors = [
    { name: "Finanças", change: "+2.5%", positive: true, size: "col-span-2 row-span-2" },
    { name: "Varejo", change: "-1.2%", positive: false, size: "col-span-1 row-span-1" },
    { name: "Energia", change: "+0.8%", positive: true, size: "col-span-1 row-span-1" },
    { name: "Tech", change: "+3.1%", positive: true, size: "col-span-1 row-span-2" },
    { name: "Saúde", change: "-0.5%", positive: false, size: "col-span-1 row-span-1" },
    { name: "Imóveis", change: "+1.0%", positive: true, size: "col-span-1 row-span-1" },
];

export default function Heatmap() {
    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-2 h-64">
            {sectors.map((sector) => (
                <Card
                    key={sector.name}
                    className={`${sector.size} flex flex-col justify-center items-center p-2 border-none ${sector.positive ? 'bg-green-900/40' : 'bg-red-900/40'}`}
                >
                    <span className="text-xs font-bold text-white">{sector.name}</span>
                    <span className={`text-sm font-bold ${sector.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {sector.change}
                    </span>
                </Card>
            ))}
        </div>
    );
}
=======
import { Card } from "@/components/ui/Card";

const sectors = [
    { name: "Finanças", change: "+2.5%", positive: true, size: "col-span-2 row-span-2" },
    { name: "Varejo", change: "-1.2%", positive: false, size: "col-span-1 row-span-1" },
    { name: "Energia", change: "+0.8%", positive: true, size: "col-span-1 row-span-1" },
    { name: "Tech", change: "+3.1%", positive: true, size: "col-span-1 row-span-2" },
    { name: "Saúde", change: "-0.5%", positive: false, size: "col-span-1 row-span-1" },
    { name: "Imóveis", change: "+1.0%", positive: true, size: "col-span-1 row-span-1" },
];

export default function Heatmap() {
    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-2 h-64">
            {sectors.map((sector) => (
                <Card
                    key={sector.name}
                    className={`${sector.size} flex flex-col justify-center items-center p-2 border-none ${sector.positive ? 'bg-green-900/40' : 'bg-red-900/40'}`}
                >
                    <span className="text-xs font-bold text-white">{sector.name}</span>
                    <span className={`text-sm font-bold ${sector.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {sector.change}
                    </span>
                </Card>
            ))}
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
