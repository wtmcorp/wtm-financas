import { NextResponse } from "next/server";

// Simple in-memory rate limiter
const attempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const ip = req.headers.get("x-forwarded-for") || "unknown";

        // Check rate limit
        const now = Date.now();
        const userAttempts = attempts.get(ip);

        if (userAttempts && userAttempts.count >= MAX_ATTEMPTS) {
            if (now - userAttempts.lastAttempt < LOCKOUT_TIME) {
                return NextResponse.json(
                    { error: "Muitas tentativas. Tente novamente em 15 minutos." },
                    { status: 429 }
                );
            } else {
                // Reset after lockout
                attempts.delete(ip);
            }
        }

        // Verify password
        // In production, use process.env.SECRET_AREA_PASSWORD
        const correctPassword = process.env.SECRET_AREA_PASSWORD || "wtmdisparador";

        if (password === correctPassword) {
            attempts.delete(ip);
            return NextResponse.json({ success: true });
        } else {
            // Increment attempts
            const current = attempts.get(ip) || { count: 0, lastAttempt: 0 };
            attempts.set(ip, {
                count: current.count + 1,
                lastAttempt: now
            });

            return NextResponse.json(
                { error: "Senha incorreta.", attemptsRemaining: MAX_ATTEMPTS - (current.count + 1) },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
    }
}
