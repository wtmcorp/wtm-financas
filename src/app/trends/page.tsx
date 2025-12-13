<<<<<<< HEAD
import NewsFeed from "@/components/trends/NewsFeed";
import Heatmap from "@/components/trends/Heatmap";

export default function TrendsPage() {
    return (
        <div className="p-6 space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Tendências de Mercado</h1>
                <p className="text-gray-400 text-sm">O que está movendo a economia hoje.</p>
            </header>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Destaques</h2>
                <NewsFeed />
            </section>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Mapa de Calor (B3)</h2>
                <Heatmap />
            </section>
        </div>
    );
}
=======
import NewsFeed from "@/components/trends/NewsFeed";
import Heatmap from "@/components/trends/Heatmap";

export default function TrendsPage() {
    return (
        <div className="p-6 space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Tendências de Mercado</h1>
                <p className="text-gray-400 text-sm">O que está movendo a economia hoje.</p>
            </header>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Destaques</h2>
                <NewsFeed />
            </section>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Mapa de Calor (B3)</h2>
                <Heatmap />
            </section>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
