import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import AuthGuard from "@/components/auth/AuthGuard";
import MainLayout from "@/components/layout/MainLayout";
import SecretSalesArea from "@/components/tools/SecretSalesArea";

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
                    <StarfieldBackground />
                    <AuthGuard>
                        <MainLayout>
                            {children}
                        </MainLayout>
                        <SecretSalesArea />
                    </AuthGuard>
                </Providers>
            </body>
        </html>
    );
}
