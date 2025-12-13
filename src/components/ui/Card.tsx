<<<<<<< HEAD
import { clsx } from "clsx";
import { ReactNode } from "react";

interface CardProps {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    [key: string]: any;
}

export function Card({ children, className, onClick, ...props }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "bg-card rounded-xl p-4 border border-white/5 shadow-lg",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
=======
import { clsx } from "clsx";
import { ReactNode } from "react";

interface CardProps {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    [key: string]: any;
}

export function Card({ children, className, onClick, ...props }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "bg-card rounded-xl p-4 border border-white/5 shadow-lg",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
