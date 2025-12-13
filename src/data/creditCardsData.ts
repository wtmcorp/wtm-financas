export interface CreditCard {
    id: string;
    name: string;
    bank: string;
    brand: "Visa" | "Mastercard" | "Elo" | "American Express";
    annualFee: number;
    interestRate: number; // % ao mês
    cashback: number; // % de cashback
    miles: boolean;
    milesRate?: number; // pontos por real gasto
    benefits: string[];
    minIncome: number;
    category: "básico" | "intermediário" | "premium";
    color: string;
    applyLink: string;
}

export const creditCardsData: CreditCard[] = [
    // BANCOS DIGITAIS
    {
        id: "nubank-roxinho",
        name: "Nubank Roxinho",
        bank: "Nubank",
        brand: "Mastercard",
        annualFee: 0,
        interestRate: 14.50,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade", "Programa de pontos (opcional)", "Controle pelo app", "Pix no Crédito"],
        minIncome: 0,
        category: "básico",
        color: "#820ad1",
        applyLink: "https://nubank.com.br/"
    },
    {
        id: "inter-gold",
        name: "Inter Gold",
        bank: "Inter",
        brand: "Mastercard",
        annualFee: 0,
        interestRate: 13.50,
        cashback: 0.25,
        miles: false,
        benefits: ["Pontos Loop", "Sem anuidade", "Shopping Inter", "Seguro Proteção de Preço"],
        minIncome: 0,
        category: "intermediário",
        color: "#ff7a00",
        applyLink: "https://inter.co/"
    },
    {
        id: "c6-carbon",
        name: "C6 Carbon",
        bank: "C6 Bank",
        brand: "Mastercard",
        annualFee: 1176, // 12x 98
        interestRate: 12.50,
        cashback: 0,
        miles: true,
        milesRate: 2.5,
        benefits: ["2.5 pontos por dólar", "4 Acessos Sala VIP", "C6 Tag Grátis", "Mastercard Black"],
        minIncome: 5000,
        category: "premium",
        color: "#242424",
        applyLink: "https://www.c6bank.com.br/"
    },
    {
        id: "btg-black",
        name: "BTG+ Black",
        bank: "BTG Pactual",
        brand: "Mastercard",
        annualFee: 360, // Modular
        interestRate: 11.90,
        cashback: 1.0,
        miles: true,
        milesRate: 2.2,
        benefits: ["Cashback de 1% ou Pontos", "IOF Especial", "Acessos LoungeKey (Modular)", "Invest+"],
        minIncome: 10000,
        category: "premium",
        color: "#002c6b",
        applyLink: "https://www.btgpactual.com/"
    },
    {
        id: "xp-visa-infinite",
        name: "XP Visa Infinite",
        bank: "XP Investimentos",
        brand: "Visa",
        annualFee: 0,
        interestRate: 10.90,
        cashback: 1.0,
        miles: false,
        milesRate: 0,
        benefits: ["Investback de 1%", "4 Acessos Sala VIP DragonPass", "Concierge", "Seguro viagem"],
        minIncome: 5000, // Com investimentos
        category: "premium",
        color: "#000000",
        applyLink: "https://www.xpi.com.br/"
    },
    {
        id: "picpay-card",
        name: "PicPay Card Black",
        bank: "PicPay",
        brand: "Mastercard",
        annualFee: 0, // Com gastos ou investimentos
        interestRate: 15.50,
        cashback: 1.2,
        miles: false,
        benefits: ["Cashback de 1.2%", "Sem anuidade (regras)", "Sala VIP (LoungeKey)", "Seguros Black"],
        minIncome: 5000,
        category: "premium",
        color: "#111111",
        applyLink: "https://www.picpay.com/"
    },
    {
        id: "will-bank",
        name: "Will Bank",
        bank: "Will Bank",
        brand: "Mastercard",
        annualFee: 0,
        interestRate: 14.90,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade", "Loja Will com Cashback", "Virtual instantâneo"],
        minIncome: 0,
        category: "básico",
        color: "#fbd400",
        applyLink: "https://www.willbank.com.br/"
    },

    // BANCOS TRADICIONAIS
    {
        id: "bb-ourocard-facil",
        name: "Ourocard Fácil",
        bank: "Banco do Brasil",
        brand: "Visa",
        annualFee: 0,
        interestRate: 13.80,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade (gasto R$ 100)", "Descontos em shows", "App Ourocard"],
        minIncome: 0,
        category: "básico",
        color: "#fbf600",
        applyLink: "https://www.bb.com.br/"
    },
    {
        id: "bradesco-neo",
        name: "Bradesco Neo",
        bank: "Bradesco",
        brand: "Visa",
        annualFee: 0,
        interestRate: 13.90,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade (gasto R$ 50)", "Descontos Cinemark", "Menu Bradesco"],
        minIncome: 0,
        category: "básico",
        color: "#cc092f",
        applyLink: "https://banco.bradesco/"
    },
    {
        id: "itau-click",
        name: "Itaú Click",
        bank: "Itaú",
        brand: "Visa",
        annualFee: 0,
        interestRate: 14.20,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade", "Tag Itaú livre", "Parcerias e descontos (iPhone pra Sempre)"],
        minIncome: 0,
        category: "básico",
        color: "#ec7000",
        applyLink: "https://www.itau.com.br/cartoes"
    },
    {
        id: "santander-sx",
        name: "Santander SX",
        bank: "Santander",
        brand: "Visa",
        annualFee: 0,
        interestRate: 14.50,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade (gasto R$ 100 ou Pix)", "Descontos Esfera", "Cartão Online"],
        minIncome: 0,
        category: "básico",
        color: "#ec0000",
        applyLink: "https://www.santander.com.br/"
    },

    // CARTÕES PREMIUM ESPECIAIS
    {
        id: "azul-visa-infinite",
        name: "Azul Visa Infinite",
        bank: "Itaú",
        brand: "Visa",
        annualFee: 1200,
        interestRate: 12.50,
        cashback: 0,
        miles: true,
        milesRate: 3.0,
        benefits: ["3.0 pontos por dólar", "Acompanhante Grátis (Companion Pass)", "Status Diamante", "Bagagem Extra"],
        minIncome: 10000,
        category: "premium",
        color: "#001489",
        applyLink: "https://www.itau.com.br/"
    },
    {
        id: "latam-pass-black",
        name: "Latam Pass Black",
        bank: "Itaú",
        brand: "Mastercard",
        annualFee: 1200,
        interestRate: 12.50,
        cashback: 0,
        miles: true,
        milesRate: 2.5,
        benefits: ["2.5 pontos por dólar (3.5 internacional)", "Sala VIP Latam", "Upgrade de Cabine", "Embarque Prioritário"],
        minIncome: 10000,
        category: "premium",
        color: "#1b0088",
        applyLink: "https://www.itau.com.br/"
    }
];
