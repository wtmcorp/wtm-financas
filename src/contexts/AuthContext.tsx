<<<<<<< HEAD
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "firebase/firestore";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    income: number;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
    logout: () => Promise<void>;
    updateIncome: (income: number) => Promise<void>;
    updateUser: (updates: Partial<User>) => Promise<void>;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchProfile(userId: string): Promise<User | null> {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as User;
        }
        return null;
    } catch (e) {
        console.error("Error fetching profile:", e);
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const profile = await fetchProfile(firebaseUser.uid);
                if (profile) {
                    setUser(profile);
                } else {
                    // Fallback if profile doesn't exist yet (shouldn't happen if register works)
                    setUser({
                        id: firebaseUser.uid,
                        name: firebaseUser.displayName || firebaseUser.email || "",
                        email: firebaseUser.email || "",
                        income: 0,
                        createdAt: new Date().toISOString()
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email: string, password: string, name: string, phone?: string) => {
        if (!email || !password || !name) throw new Error("Email, senha e nome são obrigatórios");

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const newUser: User = {
            id: firebaseUser.uid,
            name,
            email,
            phone: phone || "",
            income: 0,
            createdAt: new Date().toISOString()
        };

        await setDoc(doc(db, "users", firebaseUser.uid), newUser);
        setUser(newUser);
    };

    const login = async (email: string, password: string) => {
        if (!email || !password) throw new Error("Email e senha são obrigatórios");
        await signInWithEmailAndPassword(auth, email, password);
        // State update handled by onAuthStateChanged
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        router.push("/login");
    };

    const updateIncome = async (income: number) => {
        if (!user) return;

        await updateDoc(doc(db, "users", user.id), { income });
        setUser({ ...user, income });
    };

    const updateUser = async (updates: Partial<User>) => {
        if (!user) return;

        await updateDoc(doc(db, "users", user.id), updates);
        setUser({ ...user, ...updates });
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateIncome, updateUser, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
=======
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    income: number;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateIncome: (income: number) => void;
    updateUser: (updates: Partial<User>) => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for saved user session
        const savedUser = localStorage.getItem("wtm_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse saved user", e);
                localStorage.removeItem("wtm_user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao fazer login");
            }

            // Add default income if not present
            const userWithIncome = { ...data.user, income: data.user.income || 0 };

            setUser(userWithIncome);
            localStorage.setItem("wtm_user", JSON.stringify(userWithIncome));
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("wtm_user");
        router.push("/login");
    };

    const updateIncome = (income: number) => {
        if (user) {
            const updatedUser = { ...user, income };
            setUser(updatedUser);
            localStorage.setItem("wtm_user", JSON.stringify(updatedUser));
        }
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem("wtm_user", JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateIncome,
                updateUser,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
