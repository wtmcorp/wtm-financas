"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { FinanceProvider } from "@/contexts/FinanceContext";
import { Toaster } from "react-hot-toast";
import WelcomeModal from "@/components/onboarding/WelcomeModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import ChatBubble from "@/components/ai/ChatBubble";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import BugReportButton from "@/components/feedback/BugReportButton";
import MouseTracker from "@/components/ui/MouseTracker";

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
                <MouseTracker />
                <Header />

                <main className="pb-20 pt-20 md:pt-32 flex-1">
                    {children}
                </main>

                <Footer />

                <ChatBubble />
                <WhatsAppButton />
                <BugReportButton />

                <BottomNav />
            </FinanceProvider>
        </AuthProvider>
    );
}
