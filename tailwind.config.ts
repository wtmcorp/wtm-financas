<<<<<<< HEAD
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                card: "var(--card)",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
        },
    },
    plugins: [],
};
export default config;
=======
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                card: "var(--card)",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
        },
    },
    plugins: [],
};
export default config;
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
