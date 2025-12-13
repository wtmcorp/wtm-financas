<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "src", "data", "users.json");

interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    createdAt: string;
    lastLogin?: string;
}

interface UsersData {
    users: User[];
}

function readUsers(): UsersData {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return { users: [] };
    }
}

function writeUsers(data: UsersData) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email e senha são obrigatórios" },
                { status: 400 }
            );
        }

        const usersData = readUsers();
        const user = usersData.users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return NextResponse.json(
                { error: "Email ou senha incorretos" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Email ou senha incorretos" },
                { status: 401 }
            );
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        writeUsers(usersData);

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Erro ao fazer login" },
            { status: 500 }
        );
    }
}
=======
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "src", "data", "users.json");

interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    createdAt: string;
    lastLogin?: string;
}

interface UsersData {
    users: User[];
}

function readUsers(): UsersData {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return { users: [] };
    }
}

function writeUsers(data: UsersData) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email e senha são obrigatórios" },
                { status: 400 }
            );
        }

        const usersData = readUsers();
        const user = usersData.users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return NextResponse.json(
                { error: "Email ou senha incorretos" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Email ou senha incorretos" },
                { status: 401 }
            );
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        writeUsers(usersData);

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Erro ao fazer login" },
            { status: 500 }
        );
    }
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
