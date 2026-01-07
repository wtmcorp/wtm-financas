"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import BottomNav from "./BottomNav";
import MouseTracker from "@/components/ui/MouseTracker";
import PremiumNotifications from "@/components/ui/PremiumNotifications";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ChatBubble from "@/components/ai/ChatBubble";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import BugReportButton from "@/components/feedback/BugReportButton";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const publicPaths = ["/", "/login", "/register"];

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicPath = publicPaths.includes(pathname);

    if (isPublicPath) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 relative">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col transition-all duration-500">
            <Header />
            <main className="flex-1 relative pt-32 md:pt-32 pb-32">
                <MouseTracker />
                <PremiumNotifications />
                {children}
                <ScrollToTop />
            </main>
            <Footer />
            <ChatBubble />
            <WhatsAppButton />
            <BugReportButton />
            <BottomNav />
        </div>
    );
}
