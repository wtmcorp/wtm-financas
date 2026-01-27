import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface NominatimResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
    address?: {
        road?: string;
        suburb?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
        house_number?: string;
    };
    extratags?: {
        website?: string;
        "contact:phone"?: string;
        "contact:website"?: string;
        "contact:instagram"?: string;
        phone?: string;
    };
}

export async function POST(req: NextRequest) {
    try {
        const { query, location } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        const searchQuery = `${query} ${location || 'Brasil'}`;
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&extratags=1&limit=20`;

        const response = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'WTM-Sales-OS/1.0 (wtmcorps@example.com)'
            }
        });

        if (!response.ok) {
            throw new Error(`Nominatim API error: ${response.statusText}`);
        }

        const data: NominatimResult[] = await response.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ leads: [] });
        }

        const leads = data.map((item) => {
            const name = item.display_name.split(",")[0];
            const city = item.address?.city || item.address?.suburb || location || "Localização desconhecida";

            // Extract contact info if available in OSM extra tags
            const website = item.extratags?.website || item.extratags?.["contact:website"];
            const phone = item.extratags?.phone || item.extratags?.["contact:phone"];
            const instagram = item.extratags?.["contact:instagram"];

            const possui_site = !!website;

            // Calculate score based on "Sales Agent" persona rules
            // If no site, high potential. If site, check if it looks generic (not possible without scraping, so we assume medium).
            let score = 0;
            let motivo = "";

            if (!possui_site) {
                score += 80;
                motivo = "Empresa sem site identificado. Alta oportunidade de venda.";
            } else {
                score += 40;
                motivo = "Empresa já possui site. Verificar se está atualizado.";
            }

            // Bonus for having phone but no site
            if (phone && !possui_site) {
                score += 10;
                motivo += " Com telefone para contato.";
            }

            return {
                id: item.place_id.toString(),
                empresa: name,
                nicho: item.type || query,
                cidade: city,
                instagram: instagram || "",
                whatsapp: phone || "", // Assuming phone is whatsapp for now, or we can't know
                email: "", // OSM rarely has email
                possui_site: possui_site,
                qualidade_site: possui_site ? "médio" : "nenhum",
                score_venda: Math.min(score, 100),
                motivo_oportunidade: motivo,
                address: item.display_name
            };
        });

        // Filter out things that are likely not businesses if possible, but Nominatim 'q' usually handles it.
        // The user wants "REAL" data. Nominatim data IS real.

        return NextResponse.json({ leads });

    } catch (error: any) {
        console.error("Search API error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
