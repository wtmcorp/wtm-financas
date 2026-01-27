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

        // 1. Try Apify first if configured (Melhor qualidade de dados)
        if (process.env.APIFY_API_TOKEN) {
            try {
                console.log("Using Apify for leads search...");
                const apifyResults = await searchBusinessLeads(query, location || "Brasil");

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

                return NextResponse.json({ leads });

            } catch (apifyError) {
                console.error("Apify failed, falling back to Nominatim:", apifyError);
                // Fallback to Nominatim below
            }
        }

        // 2. Fallback: Nominatim (OpenStreetMap) - Gratuito
        console.log("Using Nominatim for leads search...");
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

            const website = item.extratags?.website || item.extratags?.["contact:website"];
            const phone = item.extratags?.phone || item.extratags?.["contact:phone"];
            const instagram = item.extratags?.["contact:instagram"];

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
                nicho: item.type || query,
                cidade: city,
                instagram: instagram || "",
                whatsapp: phone || "",
                email: "",
                possui_site: possui_site,
                qualidade_site: possui_site ? "médio" : "nenhum",
                score_venda: Math.min(score, 100),
                motivo_oportunidade: motivo,
                address: item.display_name
            };
        });

        return NextResponse.json({ leads });

    } catch (error: any) {
        console.error("Search API error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
