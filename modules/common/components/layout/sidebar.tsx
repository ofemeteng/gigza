import Image from "next/image";
import { useRef } from "react";
import { navbarLinks } from "utils/data";
import useOnClickOutside from "utils/hooks/useOnClickOutside.";
import Button from "../button";

// images 
import closeIcon from "@/public/asset/icon/close.png"

type Props = {
    isOpen: boolean;
    toggleMenu: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, toggleMenu, setIsOpen }: Props) => {
    const sideBarRef = useRef(null);
    const clickOutsideHandler = () => {
        setIsOpen(false);
    }
    useOnClickOutside(sideBarRef, clickOutsideHandler);

    return isOpen ? (
        <div className={`bg-black/80 w-full fixed h-screen top-0 left-0 z-[200] overflow-y-hidden md:hidden`}>
            <aside ref={sideBarRef} className={`bg-white pb-5 pl-5 pt-[17px] pr-[33px] w-3/5 fixed top-0 overflow-hidden z-[9999] h-screen ${isOpen ? "right-0 transition-all ease-in-out "
                : "right-[-100%] transition-all ease-in-out"}`}>
                <div className="flex justify-between items-center mb-[45px]">
                    <div
                        onClick={toggleMenu}
                        className="ml-auto"
                    >
                        <Image src={closeIcon} alt='' />
                    </div>
                </div>
                <ul>
                    {navbarLinks.map((item, index) => (
                        <li key={index} className="mb-[38px]" onClick={() => setIsOpen(false)}>
                            <a href={item.to} className="text-[#111111] font-satoshiRegular text-base leading-[21px] capitalize">{item.name}</a>
                        </li>
                    ))}
                </ul>
                <Button
                    title="connect wallet"
                    className="w-[130px] h-8"
                />
            </aside>
        </div>
    ) : null
}

export default Sidebar