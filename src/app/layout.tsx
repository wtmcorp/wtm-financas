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
                        <Sidebar />
                        <div className="lg:pl-80 min-h-screen flex flex-col transition-all duration-500">
                            <TopHeader />
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
