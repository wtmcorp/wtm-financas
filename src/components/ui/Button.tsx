<<<<<<< HEAD
import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "outline";
    children?: ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    [key: string]: any;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
    const variants = {
        primary: "bg-primary text-black hover:bg-yellow-500 font-bold",
        ghost: "bg-transparent text-primary hover:bg-white/5",
        outline: "border border-primary text-primary hover:bg-primary/10",
    };

    return (
        <button
            className={clsx(
                "px-4 py-2 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
=======
import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "outline";
    children?: ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    [key: string]: any;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
    const variants = {
        primary: "bg-primary text-black hover:bg-yellow-500 font-bold",
        ghost: "bg-transparent text-primary hover:bg-white/5",
        outline: "border border-primary text-primary hover:bg-primary/10",
    };

    return (
        <button
            className={clsx(
                "px-4 py-2 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
