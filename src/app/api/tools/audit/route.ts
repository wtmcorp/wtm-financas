import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const targetUrl = url.startsWith('http') ? url : `https://${url}`;

        // Fetch the page to perform a basic audit
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'WTM-Audit-Bot/1.0'
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error(`Could not fetch the page: ${response.statusText}`);
        }

        const html = await response.text();

        // Basic checks
        const hasTitle = /<title>/.test(html);
        const hasDescription = /<meta name="description"/.test(html);
        const hasViewport = /<meta name="viewport"/.test(html);
        const hasH1 = /<h1/.test(html);
        const hasFavicon = /rel="icon"|rel="shortcut icon"/.test(html);
        const hasAnalytics = /google-analytics|googletagmanager|pixel-sdk/.test(html);
        const isNextJs = /_next\/static/.test(html);
        const isWordPress = /wp-content/.test(html);

        let score = 50;
        const issues = [];
        const recommendations = [];

        if (!hasTitle) {
            score -= 10;
            issues.push("Ausência de tag <title> (SEO crítico)");
        }
        if (!hasDescription) {
            score -= 10;
            issues.push("Meta description não encontrada");
            recommendations.push("Adicionar meta description para melhorar o CTR no Google");
        }
        if (!hasViewport) {
            score -= 15;
            issues.push("Tag viewport ausente (Problemas de responsividade)");
            recommendations.push("Implementar meta viewport para suporte a dispositivos móveis");
        }
        if (!hasH1) {
            score -= 5;
            issues.push("Nenhum cabeçalho H1 detectado");
        }
        if (!hasAnalytics) {
            score -= 10;
            issues.push("Tags de rastreamento (GA4/Pixel) não detectadas");
            recommendations.push("Instalar Google Analytics e Pixel do Facebook para medir conversões");
        }

        if (isWordPress) {
            score -= 5;
            issues.push("Site construído em WordPress (Performance limitada)");
            recommendations.push("Migrar para Next.js para obter performance ultra-rápida");
        }

        // Add some random variety to make it feel "deep"
        if (html.length > 500000) {
            score -= 10;
            issues.push("Página muito pesada (>500KB HTML)");
            recommendations.push("Otimizar código e remover scripts desnecessários");
        }

        const finalScore = Math.max(10, Math.min(95, score + Math.floor(Math.random() * 10)));

        return NextResponse.json({
            url: targetUrl,
            score: finalScore,
            issues,
            recommendations: [
                ...recommendations,
                "Implementar cache de borda (Edge Caching)",
                "Otimizar imagens para formato WebP",
                "Melhorar Core Web Vitals (LCP e CLS)"
            ].slice(0, 5),
            tech: {
                isNextJs,
                isWordPress,
                hasAnalytics
            }
        });

    } catch (error: any) {
        console.error("Audit API error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
