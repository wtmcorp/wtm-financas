"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const SecretSalesArea = dynamic(() => import("./SecretSalesArea"), {
    ssr: false,
    loading: () => null
});

export default function SecretAreaLoader() {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const handleTrigger = () => setShouldLoad(true);
        window.addEventListener("open-secret-sales-area", handleTrigger);
        return () => window.removeEventListener("open-secret-sales-area", handleTrigger);
    }, []);

    if (!shouldLoad) return null;

    return <SecretSalesArea />;
}
