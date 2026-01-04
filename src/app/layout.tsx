import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import MouseTracker from "@/components/ui/MouseTracker";
import PremiumNotifications from "@/components/ui/PremiumNotifications";
import BottomNav from "@/components/layout/BottomNav";
import ScrollToTop from "@/components/ui/ScrollToTop";
import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";
import NewsTicker from "@/components/dashboard/NewsTicker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "WTM CORPS - Intelligence OS",
    description: "Sua plataforma completa de gestão financeira e investimentos.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden selection:bg-primary selection:text-black`}>
                <Providers>
                    <AuthGuard>
                        {/* Global Ambient Background */}
                        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
                            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" />
                            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow delay-1000" />
                        </div>

                        {/* <Sidebar /> - Removed as per user request */}

                        <div className="min-h-screen flex flex-col transition-all duration-500">
                            <TopHeader />
                            <NewsTicker />
                            <main className="flex-1 relative">
                                <MouseTracker />
                                <PremiumNotifications />
                                {children}
                                <ScrollToTop />
                            </main>
                            <BottomNav />
                        </div>
                    </AuthGuard>
                </Providers>
            </body>
        </html>
    );
}
