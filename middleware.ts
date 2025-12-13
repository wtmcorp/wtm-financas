import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware simplificado: por agora permite todas as requisições.
// Substitua por validação de sessão (Supabase ou JWT) quando implementar
// a autenticação do lado servidor.
export function middleware(req: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
};
