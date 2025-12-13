<<<<<<< HEAD
"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
    const phoneNumber = "5511950916614"; // Formato internacional
    const defaultMessage = "Olá! Vim através do Wtm Corps Finanças e gostaria de mais informações.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        window.open(url, "_blank");
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-40 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-green-500/50 hover:scale-110 transition-all z-40 group"
            title="Fale conosco no WhatsApp"
        >
            <MessageSquare size={24} className="group-hover:animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </button>
    );
}
=======
"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
    const phoneNumber = "5511950916614"; // Formato internacional
    const defaultMessage = "Olá! Vim através do Wtm Corps Finanças e gostaria de mais informações.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        window.open(url, "_blank");
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-40 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-green-500/50 hover:scale-110 transition-all z-40 group"
            title="Fale conosco no WhatsApp"
        >
            <MessageSquare size={24} className="group-hover:animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </button>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
