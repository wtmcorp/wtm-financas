<<<<<<< HEAD
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
=======
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
        interestRate: 15.99,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade", "Programa de pontos", "Controle pelo app", "Cashback em parceiros"],
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
        interestRate: 14.99,
        cashback: 1.0,
        miles: false,
        benefits: ["Cashback de 1%", "Sem anuidade", "Salas VIP", "Seguro viagem"],
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
        annualFee: 0,
        interestRate: 13.99,
        cashback: 0,
        miles: true,
        milesRate: 1.2,
        benefits: ["1.2 pontos por dólar", "Sem anuidade", "Programa Átomos", "Cashback em parceiros"],
        minIncome: 3000,
        category: "intermediário",
        color: "#242424",
        applyLink: "https://www.c6bank.com.br/"
    },
    {
        id: "btg-black",
        name: "BTG+ Black",
        bank: "BTG Pactual",
        brand: "Visa",
        annualFee: 0,
        interestRate: 12.99,
        cashback: 1.0,
        miles: true,
        milesRate: 1.8,
        benefits: ["Cashback de 1%", "Pontos Livelo", "Sem anuidade", "Investback"],
        minIncome: 5000,
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
        interestRate: 11.99,
        cashback: 1.0,
        miles: true,
        milesRate: 2.0,
        benefits: ["Investback de 1%", "Salas VIP DragonPass", "Concierge 24h", "Seguro viagem"],
        minIncome: 5000,
        category: "premium",
        color: "#000000",
        applyLink: "https://www.xpi.com.br/"
    },
    {
        id: "picpay-mastercard",
        name: "PicPay Mastercard",
        bank: "PicPay",
        brand: "Mastercard",
        annualFee: 0,
        interestRate: 16.49,
        cashback: 2.0,
        miles: false,
        benefits: ["Cashback de até 2%", "Sem anuidade", "Integração com carteira digital"],
        minIncome: 0,
        category: "básico",
        color: "#21c25e",
        applyLink: "https://www.picpay.com/"
    },
    {
        id: "will-bank-visa",
        name: "Will Bank Visa",
        bank: "Will Bank",
        brand: "Visa",
        annualFee: 0,
        interestRate: 15.49,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade", "Programa de pontos", "Cashback em parceiros"],
        minIncome: 0,
        category: "básico",
        color: "#00d9c6",
        applyLink: "https://www.willbank.com.br/"
    },

    // BANCOS TRADICIONAIS
    {
        id: "bb-ourocard-facil",
        name: "Ourocard Fácil",
        bank: "Banco do Brasil",
        brand: "Visa",
        annualFee: 0,
        interestRate: 17.99,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade com R$ 100/mês", "Descontos em parceiros", "App Ourocard"],
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
        interestRate: 17.49,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade com R$ 50/mês", "Descontos Cinemark", "Menu Bradesco"],
        minIncome: 0,
        category: "básico",
        color: "#cc092f",
        applyLink: "https://banco.bradesco/"
    },
    {
        id: "caixa-sim",
        name: "Caixa Sim",
        bank: "Caixa",
        brand: "Elo",
        annualFee: 0,
        interestRate: 16.99,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade", "Descontos em parceiros", "App Cartões Caixa"],
        minIncome: 0,
        category: "básico",
        color: "#005ca9",
        applyLink: "https://www.caixa.gov.br/"
    },
    {
        id: "itau-click",
        name: "Itaú Click",
        bank: "Itaú",
        brand: "Visa",
        annualFee: 0,
        interestRate: 17.99,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade", "Tag Itaú livre de mensalidade", "Parcerias e descontos"],
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
        interestRate: 18.49,
        cashback: 0,
        miles: false,
        benefits: ["Sem anuidade com R$ 100/mês", "Descontos Esfera", "Cartão Online"],
        minIncome: 0,
        category: "básico",
        color: "#ec0000",
        applyLink: "https://www.santander.com.br/"
    },

    // CARTÕES INTERMEDIÁRIOS/PREMIUM BANCOS TRADICIONAIS
    {
        id: "bb-ourocard-platinum",
        name: "Ourocard Platinum",
        bank: "Banco do Brasil",
        brand: "Visa",
        annualFee: 468,
        interestRate: 15.99,
        cashback: 0,
        miles: true,
        milesRate: 1.2,
        benefits: ["1.2 pontos por dólar", "Seguro Viagem", "Garantia Estendida", "Salas VIP"],
        minIncome: 5000,
        category: "intermediário",
        color: "#fbf600",
        applyLink: "https://www.bb.com.br/"
    },
    {
        id: "bradesco-prime",
        name: "Bradesco Prime",
        bank: "Bradesco",
        brand: "Visa",
        annualFee: 540,
        interestRate: 15.49,
        cashback: 1.0,
        miles: true,
        milesRate: 1.5,
        benefits: ["Cashback de 1%", "Pontos Livelo", "Concierge", "Seguros Visa"],
        minIncome: 4000,
        category: "intermediário",
        color: "#cc092f",
        applyLink: "https://banco.bradesco/"
    },
    {
        id: "itau-personnalite",
        name: "Itaú Personnalité",
        bank: "Itaú",
        brand: "Mastercard",
        annualFee: 720,
        interestRate: 14.99,
        cashback: 0,
        miles: true,
        milesRate: 2.0,
        benefits: ["2 pontos por dólar", "Salas VIP", "Concierge", "Seguros completos"],
        minIncome: 10000,
        category: "premium",
        color: "#ec7000",
        applyLink: "https://www.itau.com.br/"
    },
    {
        id: "santander-unique",
        name: "Santander Unique",
        bank: "Santander",
        brand: "Mastercard",
        annualFee: 900,
        interestRate: 13.99,
        cashback: 0,
        miles: true,
        milesRate: 2.5,
        benefits: ["2.5 pontos por dólar", "Esfera Infinite", "Concierge 24h", "Seguros premium"],
        minIncome: 15000,
        category: "premium",
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
        interestRate: 12.99,
        cashback: 0,
        miles: true,
        milesRate: 3.0,
        benefits: ["3 pontos Azul por dólar", "Salas VIP", "Upgrade de categoria", "Seguro viagem"],
        minIncome: 8000,
        category: "premium",
        color: "#001489",
        applyLink: "https://www.itau.com.br/"
    },
    {
        id: "smiles-platinum",
        name: "Smiles Platinum",
        bank: "Banco do Brasil",
        brand: "Mastercard",
        annualFee: 600,
        interestRate: 14.99,
        cashback: 0,
        miles: true,
        milesRate: 2.5,
        benefits: ["2.5 milhas por dólar", "Bônus de boas-vindas", "Salas VIP", "Seguro viagem"],
        minIncome: 6000,
        category: "premium",
        color: "#ff6b00",
        applyLink: "https://www.bb.com.br/"
    }
];
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
