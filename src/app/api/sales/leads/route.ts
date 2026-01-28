import { NextRequest, NextResponse } from "next/server";
import { searchBusinessLeads } from "@/lib/apify";

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
        amenity?: string;
        shop?: string;
        office?: string;
        tourism?: string;
        leisure?: string;
    };
    extratags?: {
        website?: string;
        "contact:phone"?: string;
        "contact:website"?: string;
        "contact:instagram"?: string;
        phone?: string;
        "contact:email"?: string;
        email?: string;
    };
}

export async function POST(req: NextRequest) {
    try {
        const { query, location } = await req.json();
        console.log(`Lead search request: query="${query}", location="${location}"`);

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        let apifyErrorDetail = null;

        // 1. Try Apify first if configured
        if (process.env.APIFY_API_TOKEN && process.env.APIFY_API_TOKEN !== 'apify_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
            try {
                console.log("Attempting Apify search...");
                const apifyResults = await searchBusinessLeads(query, location || "Brasil");

                if (apifyResults && apifyResults.length > 0) {
                    console.log(`Apify found ${apifyResults.length} leads.`);
                    const leads = apifyResults.map((item: any) => {
                        const possui_site = !!item.website;
                        let score = 0;
                        let motivo = "";

                        if (!possui_site) {
                            score += 80;
                            motivo = "Empresa sem site identificado. Alta oportunidade.";
                        } else {
                            score += 40;
                            motivo = "Empresa já possui site. Verificar atualização.";
                        }

                        if (item.phone && !possui_site) {
                            score += 15;
                            motivo += " Com telefone disponível.";
                        }

                        return {
                            id: item.placeId || Math.random().toString(36).substr(2, 9),
                            empresa: item.title,
                            nicho: item.categoryName || query,
                            cidade: item.city || location || "Localização desconhecida",
                            instagram: item.socialMedia?.instagram || "",
                            whatsapp: item.phone || "",
                            email: "",
                            possui_site: possui_site,
                            qualidade_site: possui_site ? "médio" : "nenhum",
                            score_venda: Math.min(score, 100),
                            motivo_oportunidade: motivo,
                            address: item.address
                        };
                    });

                    return NextResponse.json({ leads, source: 'apify' });
                } else {
                    console.log("Apify returned no results.");
                }
            } catch (apifyError: any) {
                console.error("Apify failed:", apifyError.message);
                apifyErrorDetail = apifyError.message;
            }
        } else {
            console.log("Apify token not configured or default. Skipping Apify.");
            apifyErrorDetail = "Token não configurado";
        }

        // 2. Fallback: Nominatim (OpenStreetMap)
        console.log("Attempting Nominatim fallback...");

        // Try multiple query variations for better results
        const queryVariations = [
            `${query} in ${location || 'Brasil'}`,
            `${query} ${location || 'Brasil'}`,
            location ? `${query} near ${location}` : query
        ];

        let allNominatimLeads: any[] = [];

        for (const q of queryVariations.slice(0, 2)) { // Try first two variations
            try {
                const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&extratags=1&limit=40`;
                console.log(`Fetching from Nominatim: ${nominatimUrl}`);

                const response = await fetch(nominatimUrl, {
                    headers: {
                        'User-Agent': 'WTM-Sales-OS/1.2 (wtmcorps@gmail.com)'
                    },
                    next: { revalidate: 3600 }
                });

                if (response.ok) {
                    const data: NominatimResult[] = await response.json();
                    if (data && data.length > 0) {
                        console.log(`Nominatim variation "${q}" found ${data.length} results.`);
                        allNominatimLeads = [...allNominatimLeads, ...data];
                    }
                }
            } catch (e) {
                console.error(`Nominatim variation "${q}" failed:`, e);
            }
        }

        // Remove duplicates by place_id
        const uniqueData = Array.from(new Map(allNominatimLeads.map(item => [item.place_id, item])).values());

        if (uniqueData.length === 0) {
            console.log("Nominatim found no results.");
            return NextResponse.json({
                leads: [],
                source: 'nominatim',
                warning: apifyErrorDetail ? `Apify falhou (${apifyErrorDetail}). Nominatim não encontrou resultados.` : "Nenhum lead encontrado."
            });
        }

        const leads = uniqueData.map((item) => {
            const name = item.display_name.split(",")[0];
            const city = item.address?.city || item.address?.suburb || item.address?.state || item.address?.town || location || "Localização desconhecida";

            const website = item.extratags?.website || item.extratags?.["contact:website"];
            const phone = item.extratags?.phone || item.extratags?.["contact:phone"];
            const instagram = item.extratags?.["contact:instagram"];
            const email = item.extratags?.email || item.extratags?.["contact:email"];

            const possui_site = !!website;

            let score = 0;
            let motivo = "";

            if (!possui_site) {
                score += 80;
                motivo = "Empresa sem site identificado (OSM). Alta oportunidade.";
            } else {
                score += 40;
                motivo = "Empresa já possui site. Verificar atualização.";
            }

            if (phone && !possui_site) {
                score += 10;
                motivo += " Com telefone para contato.";
            }

            return {
                id: item.place_id.toString(),
                empresa: name,
                nicho: item.address?.amenity || item.address?.shop || item.address?.office || item.address?.tourism || item.address?.leisure || item.type || query,
                cidade: city,
                instagram: instagram || "",
                whatsapp: phone || "",
                email: email || "",
                possui_site: possui_site,
                qualidade_site: possui_site ? "médio" : "nenhum",
                score_venda: Math.min(score, 100),
                motivo_oportunidade: motivo,
                address: item.display_name
            };
        });

        console.log(`Returning ${leads.length} leads from Nominatim.`);
        return NextResponse.json({
            leads,
            source: 'nominatim',
            info: apifyErrorDetail ? `Usando fallback (Apify indisponível: ${apifyErrorDetail})` : null
        });

    } catch (error: any) {
        console.error("Search API error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
