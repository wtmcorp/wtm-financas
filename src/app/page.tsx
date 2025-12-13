<<<<<<< HEAD
import BalanceCard from "@/components/dashboard/BalanceCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import TransactionFab from "@/components/dashboard/TransactionFab";

export default function Home() {
    return (
        <div className="p-6 space-y-6">
            <div className="mb-2">
                <p className="text-xs text-gray-400">Bem-vindo de volta, Usuário</p>
            </div>

            <BalanceCard />

            <RevenueChart />

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400">Meta Mensal</span>
                    <div className="h-2 w-full bg-gray-800 rounded-full mt-2 mb-1">
                        <div className="h-full w-[70%] bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold">70%</span>
                </div>
                <div className="bg-card p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400">Investimentos</span>
                    <p className="font-bold text-white mt-1">+12% <span className="text-[10px] font-normal text-gray-500">este mês</span></p>
                </div>
            </div>

            <TransactionFab />
        </div>
    );
}
=======
import BalanceCard from "@/components/dashboard/BalanceCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import TransactionFab from "@/components/dashboard/TransactionFab";

export default function Home() {
    return (
        <div className="p-6 space-y-6">
            <div className="mb-2">
                <p className="text-xs text-gray-400">Bem-vindo de volta, Usuário</p>
            </div>

            <BalanceCard />

            <RevenueChart />

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400">Meta Mensal</span>
                    <div className="h-2 w-full bg-gray-800 rounded-full mt-2 mb-1">
                        <div className="h-full w-[70%] bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold">70%</span>
                </div>
                <div className="bg-card p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400">Investimentos</span>
                    <p className="font-bold text-white mt-1">+12% <span className="text-[10px] font-normal text-gray-500">este mês</span></p>
                </div>
            </div>

            <TransactionFab />
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
