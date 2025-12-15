"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ChatBubble from "@/components/ai/ChatBubble";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import BugReportButton from "@/components/feedback/BugReportButton";
import WelcomeModal from "@/components/onboarding/WelcomeModal";
import { AuthProvider } from "@/contexts/AuthContext";
import { FinanceProvider } from "@/contexts/FinanceContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}>
                <AuthProvider>
                    <FinanceProvider>
                        <Toaster position="top-center" toastOptions={{
                            style: {
                                background: '#1a1a1a',
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.1)',
                            },
                        }} />

                        {/* Welcome Modal */}
                        <WelcomeModal />

                        {/* Header */}
                        <Header />

                        <main className="pb-20 pt-16 flex-1">
                            {children}
                        </main>

                        <Footer />

                        {/* Floating Action Buttons */}
                        <ChatBubble />
                        <WhatsAppButton />
                        <BugReportButton />

                        <BottomNav />
                    </FinanceProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
