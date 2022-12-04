import Image from "next/image"
import { dashboardNavLinks } from "utils/data"
import NavLink from "@/modules/common/components/nav-link"
import NotificationBell from "../notification-items/notification-bell"
import MessagingNotification from "../notification-items/messaging-notification"
import ConnectWalletButton from "@/modules/common/components/button/connect-wallet-button"
import Logo from "@/modules/common/components/logo"

// images
import menuIcon from '@/public/asset/navbar/menu.png'

const DashboardNav = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white z-[99] flex items-center h-12 md:h-20">
            <div className="layout-container flex items-center justify-between">
                <Logo />
                <nav className="hidden lg:block">
                    <ul className="flex items-center space-x-3">
                        {
                            dashboardNavLinks.map((item, index) => (
                                <NavLink key={index} title={item.name} to={item.to} />
                            ))
                        }
                    </ul>
                </nav>
                <div className="flex items-center space-x-8">
                    <MessagingNotification isActive />
                    <NotificationBell isActive />
                    <ConnectWalletButton />
                    <div className="flex items-center md:hidden">
                        <Image src={menuIcon} alt="" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DashboardNav