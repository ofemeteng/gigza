import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
    href?: string;
    title: string;
    className?: string;
    icon?: StaticImageData;
    [x: string]: any;
}


const Button = ({ href, title, className, icon, ...props }: Props) => {
    return href ? (
        <Link href={href}>
            <div className={twMerge(`bg-p1 cursor-pointer font-medium text-base leading-[19px] flex rounded-md capitalize  justify-center items-center bg-primary text-white font-satoshiMedium h-12 ${className}`)}>
                {
                    icon && <div className="relative h-[14px] w-[14px] mr-[13px]">
                        <Image layout="fill" src={icon} alt="" className="object-contain" />
                    </div>
                }
                <a >{title}</a>
            </div>
        </Link>
    ) :
        (
            <button
                className={twMerge(`bg-p1 w-full flex justify-center items-center h-12 rounded-md capitalize bg-primary font-satoshiMedium  text-base text-white leading-[18px] ${className}`)}
                {...props}
            >
                {
                    icon && <div className="relative h-[14px] w-[14px] mr-[13px]">
                        <Image layout="fill" src={icon} alt="" className="object-contain" />
                    </div>
                }
                <>{title}</>
            </button>
        )
}

export default Button