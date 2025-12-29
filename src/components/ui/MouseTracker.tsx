"use client";

import { useEffect } from "react";

export default function MouseTracker() {
    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            const elements = document.querySelectorAll(".card-premium");
            elements.forEach((el) => {
                const rect = (el as HTMLElement).getBoundingClientRect();
                const x = ev.clientX - rect.left;
                const y = ev.clientY - rect.top;
                (el as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
                (el as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
            });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return null;
}
