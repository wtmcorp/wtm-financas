<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
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
        const { email, password, name, phone } = await req.json();

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, senha e nome são obrigatórios" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "A senha deve ter pelo menos 6 caracteres" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const usersData = readUsers();
        const existingUser = usersData.users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
            return NextResponse.json(
                { error: "Este email já está cadastrado" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser: User = {
            id: uuidv4(),
            email: email.toLowerCase(),
            password: hashedPassword,
            name,
            phone: phone || "",
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        usersData.users.push(newUser);
        writeUsers(usersData);

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Erro ao criar conta" },
            { status: 500 }
        );
    }
}
=======
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
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
        const { email, password, name, phone } = await req.json();

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, senha e nome são obrigatórios" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "A senha deve ter pelo menos 6 caracteres" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const usersData = readUsers();
        const existingUser = usersData.users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
            return NextResponse.json(
                { error: "Este email já está cadastrado" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser: User = {
            id: uuidv4(),
            email: email.toLowerCase(),
            password: hashedPassword,
            name,
            phone: phone || "",
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        usersData.users.push(newUser);
        writeUsers(usersData);

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Erro ao criar conta" },
            { status: 500 }
        );
    }
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
