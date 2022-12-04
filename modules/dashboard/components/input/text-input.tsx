import { InputProps } from "./typing";


const TextInput = ({ id, type, placeholder, label, name, value, labelClassName, className, handleTextChange, ...props }: InputProps) => {
    return (
        <div className="">
            <label htmlFor={id} className={`text-b1 font-satoshiMedium text-base leading-[22px] capitalize ${labelClassName}`}>{label}</label>
            <input
                {...{ name, type, id, placeholder, value, ...props }}
                onChange={handleTextChange}
                className={`block py-[14px] px-3 placeholder:text-[#9696B4] bg-[#FCFDFD] mt-2 rounded-[5px] border border-[#E8E8EF] focus:outline-none font-satoshiRegular w-full ${className}`}
            />
        </div>
    )
}

export default TextInput