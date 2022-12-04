import { useRef, useState } from "react";
import useOnClickOutside from "utils/hooks/useOnClickOutside.";

// Images
import ArrowDownIcon from "@/public/asset/icon/arrow-down.svg"
import Image from "next/image";

type SelectProps = {
    title?: string,
    options: string[],
    headerTitle?: string,
    onChange: (value: string) => void,
    defaultValue?: string,
}

const Select = ({ options, title, onChange, defaultValue, headerTitle }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue || "");
    const selectContainerRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const clickOutsideHandler = () => setIsOpen(false);
    useOnClickOutside(selectContainerRef, clickOutsideHandler);

    // @ts-ignore
    const onOptionClicked = (value) => () => {
        setSelectedOption(value);
        if (typeof onChange === "function") {
            onChange(value);
        }
        // setIsComponentVisible(true);
        setIsOpen(false);
    };

    const filteredIdOptions = options?.filter((option: string) => option !== selectedOption);
    return (
        <div>
            <div className="font-satoshiMedium text-sm md:text-base leading-5 text-[#101828] capitalize mb-2">{headerTitle}</div>
            <div className="cursor-pointer flex justify-between items-center relative px-4 py-[15px] pl-4 pr-[18px] select-none border border-[#E8E8EF] bg-[#FCFDFD] rounded-[5px]" onClick={handleToggle} ref={selectContainerRef}>
                <p className="font-satoshiMedium text-[#101828] text-base leading-[22px] mb-2">{selectedOption !== "" ? `${selectedOption} weeks` : `${title}`}</p>
                    <Image src={ArrowDownIcon}  alt="" />
                {isOpen && (
                    <div className="top-[60px] left-[-1px] absolute w-full select-none z-50" >
                        <ul className="bg-[#FCFDFD] shadow-md rounded-[5px] text-base leading-[22px]">
                            {
                                filteredIdOptions?.map((option, index) => (
                                    <li key={index} onClick={onOptionClicked(option)} className="text-black py-[10px] px-5 cursor-pointer hover:text-white hover:bg-primary">
                                        {option} weeks
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Select