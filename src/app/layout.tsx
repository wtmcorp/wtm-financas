import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import MouseTracker from "@/components/ui/MouseTracker";
import PremiumNotifications from "@/components/ui/PremiumNotifications";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ScrollToTop from "@/components/ui/ScrollToTop";
import AuthGuard from "@/components/auth/AuthGuard";

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
            <body className={`${inter.className} text-white antialiased overflow-x-hidden selection:bg-primary selection:text-black`}>
                <Providers>
                    <AuthGuard>
                        {/* Global Ambient Background */}
                        <StarfieldBackground />

                        <div className="min-h-screen flex flex-col transition-all duration-500">
                            <Header />
                            <main className="flex-1 relative pt-32">
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
