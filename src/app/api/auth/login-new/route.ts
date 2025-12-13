import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 401 }
            );
        }

        if (!data.user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Buscar dados do usuário
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", data.user.id)
            .single();

        if (userError) {
            return NextResponse.json(
                { error: userError.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "Logged in successfully",
                user: userData,
                session: data.session,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
