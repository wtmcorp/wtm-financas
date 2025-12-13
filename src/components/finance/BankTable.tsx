<<<<<<< HEAD
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ArrowUpDown, ExternalLink } from "lucide-react";

type Bank = {
    name: string;
    cdi: number;
    liquidity: string;
    min: number;
    link: string;
    color: string;
};

const banksData: Bank[] = [
    { name: "Sofisa", cdi: 110, liquidity: "Diária", min: 1, link: "#", color: "#e30613" },
    { name: "Nu", cdi: 100, liquidity: "Diária", min: 0, link: "#", color: "#820ad1" },
    { name: "Inter", cdi: 100, liquidity: "Diária", min: 0, link: "#", color: "#ff7a00" },
    { name: "C6", cdi: 104, liquidity: "D+2", min: 100, link: "#", color: "#242424" },
    { name: "BTG", cdi: 103, liquidity: "Diária", min: 100, link: "#", color: "#002c6b" },
];

export default function BankTable() {
    const [banks, setBanks] = useState(banksData);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Bank; direction: "asc" | "desc" } | null>(null);

    const sort = (key: keyof Bank) => {
        let direction: "asc" | "desc" = "desc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
            direction = "asc";
        }

        const sorted = [...banks].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setBanks(sorted);
        setSortConfig({ key, direction });
    };

    return (
        <Card className="overflow-hidden p-0">
            <div className="p-4 border-b border-white/10">
                <h3 className="font-bold text-primary">Melhores Bancos (CDI)</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                            <th className="px-4 py-3">Banco</th>
                            <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => sort("cdi")}>
                                <div className="flex items-center gap-1">% CDI <ArrowUpDown size={12} /></div>
                            </th>
                            <th className="px-4 py-3">Liq.</th>
                            <th className="px-4 py-3">Min.</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {banks.map((bank: Bank) => (
                            <tr key={bank.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bank.color }}></div>
                                    {bank.name}
                                </td>
                                <td className="px-4 py-3 text-green-400">{bank.cdi}%</td>
                                <td className="px-4 py-3 text-gray-400">{bank.liquidity}</td>
                                <td className="px-4 py-3 text-gray-400">R$ {bank.min}</td>
                                <td className="px-4 py-3">
                                    <a href={bank.link} className="text-primary hover:text-white">
                                        <ExternalLink size={14} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
=======
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ArrowUpDown, ExternalLink } from "lucide-react";

type Bank = {
    name: string;
    cdi: number;
    liquidity: string;
    min: number;
    link: string;
    color: string;
};

const banksData: Bank[] = [
    { name: "Sofisa", cdi: 110, liquidity: "Diária", min: 1, link: "#", color: "#e30613" },
    { name: "Nu", cdi: 100, liquidity: "Diária", min: 0, link: "#", color: "#820ad1" },
    { name: "Inter", cdi: 100, liquidity: "Diária", min: 0, link: "#", color: "#ff7a00" },
    { name: "C6", cdi: 104, liquidity: "D+2", min: 100, link: "#", color: "#242424" },
    { name: "BTG", cdi: 103, liquidity: "Diária", min: 100, link: "#", color: "#002c6b" },
];

export default function BankTable() {
    const [banks, setBanks] = useState(banksData);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Bank; direction: "asc" | "desc" } | null>(null);

    const sort = (key: keyof Bank) => {
        let direction: "asc" | "desc" = "desc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
            direction = "asc";
        }

        const sorted = [...banks].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setBanks(sorted);
        setSortConfig({ key, direction });
    };

    return (
        <Card className="overflow-hidden p-0">
            <div className="p-4 border-b border-white/10">
                <h3 className="font-bold text-primary">Melhores Bancos (CDI)</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                            <th className="px-4 py-3">Banco</th>
                            <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => sort("cdi")}>
                                <div className="flex items-center gap-1">% CDI <ArrowUpDown size={12} /></div>
                            </th>
                            <th className="px-4 py-3">Liq.</th>
                            <th className="px-4 py-3">Min.</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {banks.map((bank: Bank) => (
                            <tr key={bank.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bank.color }}></div>
                                    {bank.name}
                                </td>
                                <td className="px-4 py-3 text-green-400">{bank.cdi}%</td>
                                <td className="px-4 py-3 text-gray-400">{bank.liquidity}</td>
                                <td className="px-4 py-3 text-gray-400">R$ {bank.min}</td>
                                <td className="px-4 py-3">
                                    <a href={bank.link} className="text-primary hover:text-white">
                                        <ExternalLink size={14} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
