export interface CreditCard {
    id: string;
    name: string;
    bank: string;
    brand: string;
    annualFee: number;
    interestRate: number;
    cashback: number;
    miles: boolean;
    milesRate?: number; // Points/Miles per dollar or real
    pointsPerDollar?: number;
    loungeAccess: "none" | "limited" | "unlimited";
    loungeType?: string[]; // LoungeKey, DragonPass, Priority Pass, etc.
    benefits: string[];
    exclusiveBenefits?: string[];
    minIncome: number;
    category: "básico" | "intermediário" | "premium" | "rende mais";
    color: string;
    applyLink: string;
    yield?: string; // Rendimento (ex: 100% do CDI)
    yieldValue?: number; // Valor numérico para ordenação (ex: 100)
    insurance?: string[]; // Seguros inclusos
    pointsExpiration?: string; // Expiração de pontos
    annualFeeType?: "free" | "waivable" | "paid";
}
