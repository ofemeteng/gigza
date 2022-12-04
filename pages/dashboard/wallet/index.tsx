import DashboardLayout from "@/modules/dashboard/components/layout";
import RecentTransactions from "@/modules/dashboard/components/recent-transactions";
import WalletBalance from "@/modules/dashboard/components/wallet-balance";


const Wallet = () => {
    return (
        <DashboardLayout>
            <div className="pb-[75px] md:pb-[91px]">
                <WalletBalance />
                <RecentTransactions />
            </div>
        </DashboardLayout>
    )
}

export default Wallet;