import { NextResponse } from "next/server";

// Alpha Vantage API Key
const ALPHA_VANTAGE_KEY = "4I9OGNIB890BJ0Y3";

// Cache for news data
let newsCache: any[] = [];
let lastFetch = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Financial keywords for filtering
const FINANCIAL_KEYWORDS = [
    "stock", "market", "finance", "investment", "economy", "trading",
    "bitcoin", "crypto", "dividend", "earnings", "fed", "interest rate",
    "inflation", "recession", "bull market", "bear market", "portfolio",
    "ações", "mercado", "finanças", "investimento", "economia", "bolsa"
];

// Fallback mock news in case API fails
const FALLBACK_NEWS = [
    {
        source: "Bloomberg Linea",
        title: "Mercados emergentes se fortalecem com expectativa de cortes de juros",
        tag: "Macroeconomia",
        color: "text-blue-400 border-blue-500/20 bg-blue-500/10",
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "InfoMoney",
        title: "Petrobras anuncia dividendos extraordinários para acionistas",
        tag: "Dividendos",
        color: "text-green-400 border-green-500/20 bg-green-500/10",
        time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "Valor Econômico",
        title: "Setor de tecnologia lidera alta na bolsa brasileira",
        tag: "Bolsa de Valores",
        color: "text-purple-400 border-purple-500/20 bg-purple-500/10",
        time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "CoinDesk",
        title: "Bitcoin atinge novo patamar com aumento de adoção institucional",
        tag: "Cripto",
        color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
        time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "Exame",
        title: "Fundos imobiliários registram valorização acima da média",
        tag: "FIIs",
        color: "text-red-400 border-red-500/20 bg-red-500/10",
        time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
    },
    {
        source: "Reuters",
        title: "Banco Central mantém taxa Selic em patamar atual",
        tag: "Política Monetária",
        color: "text-blue-400 border-blue-500/20 bg-blue-500/10",
        time: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=800&auto=format&fit=crop"
    }
];

async function fetchGoogleNewsRSS() {
    try {
        const response = await fetch(
            "https://news.google.com/rss/search?q=mercado+financeiro+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
            { next: { revalidate: 60 } }
        );

        if (!response.ok) {
            throw new Error("Google News RSS request failed");
        }

        const xmlText = await response.text();

        // Simple Regex Parser for RSS items
        const items = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(xmlText)) !== null) {
            if (items.length >= 6) break;
            const itemContent = match[1];

            const titleMatch = itemContent.match(/<title>(.*?)<\/title>/);
            const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
            const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
            const sourceMatch = itemContent.match(/<source url=".*?">(.*?)<\/source>/);

            if (titleMatch && linkMatch) {
                items.push({
                    title: titleMatch[1].replace(" - " + (sourceMatch ? sourceMatch[1] : ""), ""), // Clean title
                    link: linkMatch[1],
                    pubDate: pubDateMatch ? pubDateMatch[1] : new Date().toISOString(),
                    source: sourceMatch ? sourceMatch[1] : "Google News"
                });
            }
        }

        if (items.length === 0) {
            throw new Error("No news items found in RSS");
        }

        // Transform to our format
        const transformedNews = items.map((item, index) => {
            const tags = ["Mercado", "Economia", "Investimentos", "Bolsa", "Finanças", "Brasil"];
            const colors = [
                "text-blue-400 border-blue-500/20 bg-blue-500/10",
                "text-green-400 border-green-500/20 bg-green-500/10",
                "text-purple-400 border-purple-500/20 bg-purple-500/10",
                "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
                "text-red-400 border-red-500/20 bg-red-500/10",
                "text-pink-400 border-pink-500/20 bg-pink-500/10"
            ];

            return {
                source: item.source,
                title: item.title,
                tag: tags[index % tags.length],
                color: colors[index % colors.length],
                time: item.pubDate,
                url: item.link,
                image: `https://images.unsplash.com/photo-${1611974765270 + index}?q=80&w=800&auto=format&fit=crop`
            };
        });

        return transformedNews;
    } catch (error) {
        console.error("Error fetching from Google News RSS:", error);
        return null;
    }
}

export async function GET() {
    try {
        const now = Date.now();

        // Check if cache is still valid
        if (newsCache.length > 0 && now - lastFetch < CACHE_DURATION) {
            return NextResponse.json({
                news: newsCache,
                cached: true,
                timestamp: new Date(lastFetch).toISOString()
            });
        }

        // Try to fetch from Google News RSS
        const googleNews = await fetchGoogleNewsRSS();

        if (googleNews && googleNews.length > 0) {
            newsCache = googleNews;
            lastFetch = now;

            return NextResponse.json({
                news: googleNews,
                cached: false,
                timestamp: new Date().toISOString(),
                source: "Google News RSS"
            });
        }

        // Fallback to mock news with dynamic timestamps
        const fallbackWithTimestamps = FALLBACK_NEWS.map((item, index) => ({
            ...item,
            time: new Date(Date.now() - (index + 1) * 2 * 60 * 60 * 1000).toISOString()
        }));

        newsCache = fallbackWithTimestamps;
        lastFetch = now;

        return NextResponse.json({
            news: fallbackWithTimestamps,
            cached: false,
            timestamp: new Date().toISOString(),
            source: "Fallback"
        });
    } catch (error) {
        console.error("Error in news API:", error);

        // Return fallback news on error
        return NextResponse.json({
            news: FALLBACK_NEWS,
            cached: false,
            timestamp: new Date().toISOString(),
            source: "Error Fallback",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
