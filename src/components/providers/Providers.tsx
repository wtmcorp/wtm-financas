"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { FinanceProvider } from "@/contexts/FinanceContext";
import { Toaster } from "react-hot-toast";
import WelcomeModal from "@/components/onboarding/WelcomeModal";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <FinanceProvider>
                <Toaster position="top-center" toastOptions={{
                    style: {
                        background: '#1a1a1a',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.1)',
                    },
                }} />

                <WelcomeModal />
                {children}
            </FinanceProvider>
        </AuthProvider>
    );
}
