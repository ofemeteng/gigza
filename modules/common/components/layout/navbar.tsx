
import { useState } from "react"
import Image from "next/image"
import { navbarLinks } from "utils/data"
import Link from "next/link"
import Sidebar from "./sidebar"
import ConnectWalletButton from "../button/connect-wallet-button"
import Logo from "../logo"

// images
import menu from '@/public/asset/navbar/menu.png'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Sidebar {...{ isOpen, toggleMenu, setIsOpen }} />
      <header className="fixed h-[78px] md:h-20 flex items-center w-full bg-white z-[99] top-0 left-0">
        <div className="layout-container flex items-center justify-between">
          <Logo />
          <nav className="md:flex items-center  hidden">
            <ul className="space-x-8 capitalize">
              {
                navbarLinks.map((item, index) => (
                  <Link key={index} href={item.to}><a className="font-satoshiMedium text-base leading-[18px] text-primary2">{item.name}</a></Link>
                ))
              }
            </ul>
          </nav>
          <ConnectWalletButton />
          <div className="md:hidden">
            <Image src={menu} alt="" onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  )
}

export default NavBar