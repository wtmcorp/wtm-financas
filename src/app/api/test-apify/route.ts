// Verificar variáveis de ambiente no Next.js
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const hasToken = !!process.env.APIFY_API_TOKEN;
    const tokenPreview = process.env.APIFY_API_TOKEN
        ? `${process.env.APIFY_API_TOKEN.substring(0, 15)}...${process.env.APIFY_API_TOKEN.substring(process.env.APIFY_API_TOKEN.length - 5)}`
        : 'NÃO ENCONTRADO';

    const tokenLength = process.env.APIFY_API_TOKEN?.length || 0;

    let apiStatus = 'NÃO TESTADO';
    let apiError = null;
    let userData = null;

    if (hasToken) {
        try {
            const { ApifyClient } = require('apify-client');
            const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
            userData = await client.user().get();
            apiStatus = 'FUNCIONANDO';
        } catch (error: any) {
            apiStatus = 'ERRO';
            apiError = error.message;
        }
    }

    return NextResponse.json({
        status: 'ok',
        apify: {
            tokenConfigured: hasToken,
            tokenPreview,
            tokenLength,
            apiStatus,
            apiError,
            userData: userData ? {
                username: userData.username,
                email: userData.email,
                plan: userData.plan
            } : null
        },
        allEnvVars: {
            hasOpenAI: !!process.env.OPENAI_API_KEY,
            hasFirebase: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            hasApify: !!process.env.APIFY_API_TOKEN
        }
    });
}
