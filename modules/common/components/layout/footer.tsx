import Link from "next/link"
import { footerLinks } from "utils/data"
import Logo from "../logo"


const Footer = () => {
    return (
        <footer className="flex-shrink-0 py-4 md:py-8 border-t border-[#F0F0F0]">
            <div className="layout-container md:flex items-center justify-between">
                <div className="mb-6 md:mb-0">
                    <Logo />
                    <p className="font-satoshiRegular text-sm leading-6 text-black3">Copyright © 2021 Gigza. <br />All rights reserved.</p>
                </div>
                <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5 capitalize xl:space-x-[64px]">
                    {
                        footerLinks.map((item, index) => (
                            <Link key={index} href={item.to}><a className="text-black1 font-satoshiMedium text-base md:text-xl leading-[30px]">{item.name}</a></Link>
                        ))
                    }
                </ul>
            </div>
        </footer>
    )
}

export default Footer