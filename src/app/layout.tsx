import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import MouseTracker from "@/components/ui/MouseTracker";
import PremiumNotifications from "@/components/ui/PremiumNotifications";
import BottomNav from "@/components/layout/BottomNav";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "Wtm Corps - Finanças Inteligentes",
    description: "Sua plataforma completa de gestão financeira e investimentos.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
                <Providers>
                    <MouseTracker />
                    <PremiumNotifications />
                    {children}
                    <BottomNav />
                    <ScrollToTop />
                </Providers>
            </body>
        </html>
    );
}
