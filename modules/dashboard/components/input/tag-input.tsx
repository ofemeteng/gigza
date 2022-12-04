import React, { useEffect, useState } from "react"
import Image from "next/image"
import { InputProps } from "./typing"

// images
import closeIcon from "@/public/asset/icon/blue-close-icon.png"



const TagInput = ({ id, name, label, labelClassName, type, placeholder, className, handleTag, ...props }: Omit<InputProps, 'handleTextchange'>) => {
    const [input, setInput] = useState('')
    const [tags, setTags] = useState<string[]>([])

    const onChange = (e: React.FormEvent<HTMLInputElement>) => setInput(e.currentTarget.value)

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if ((key === ',' || key === 'Enter') && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }
        if (key === "Backspace" && !input.length && tags.length) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop()!;

            setTags(tagsCopy);
            setInput(poppedTag);
        }
    };

    const deleteTag = (e:React.MouseEvent<HTMLButtonElement>,index: number) => {
        e.preventDefault()
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    useEffect(() => {
        handleTag(tags)
    }, [tags])

    return (
        <div>
            <div className="">
                <label htmlFor={id} className={`text-b1 font-satoshiMedium text-base leading-[22px] capitalize mb-2 ${labelClassName}`}>{label}</label>
                <input
                    {...{ name, type, id, placeholder, onKeyDown, onChange, ...props }}
                    value={input}
                    className={`block py-[14px] px-3 placeholder:text-[#9696B4] bg-[#FCFDFD] rounded-[5px] border border-[#E8E8EF] focus:outline-none font-satoshiRegular w-full ${className}`}
                />
            </div>
            <p className="text-base leading-[22px] font-satoshiMedium text-[#9696B4] mt-2 mb-4">Tip: you can press ENTER to add a skill</p>
            <div className="flex items-center flex-wrap gap-[11px]">
                {
                    tags.map((tag, index) => (
                        <div key={index} className="bg-[#E0E7FF] rounded py-[7px] pl-[14px] pr-[17px] space-x-2 text-[#4F46E5] capitalize text-[13px] leading-[18px] font-satoshiBold flex items-center">
                            <p>{tag}</p>
                            <button onClick={(e) => deleteTag(e,index)}>
                                <Image src={closeIcon} />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TagInput