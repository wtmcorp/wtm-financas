import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const { email, password, name, phone } = await req.json();

        // Validar entrada
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, password, and name are required" },
                { status: 400 }
            );
        }

        // Criar usuário no Supabase Auth
        const { data: authData, error: authError } =
            await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
            });

        if (authError) {
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: "Failed to create user" },
                { status: 500 }
            );
        }

        // Criar perfil do usuário
        const { data: userData, error: userError } = await supabaseAdmin
            .from("users")
            .insert({
                id: authData.user.id,
                email,
                name,
                phone: phone || null,
                income: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (userError) {
            return NextResponse.json(
                { error: userError.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: userData,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
