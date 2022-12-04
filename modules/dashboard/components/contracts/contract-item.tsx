import Image, { StaticImageData } from 'next/image';
import React from 'react'

type ContractItemProps = {
    item: {
        name: string;
        projectTitle: string;
        projectDescription: string;
        profileAvatar: StaticImageData,
        deadline: string,
    }
}


const ContractItem = ({ item }: ContractItemProps) => {
    return (
        <div className='py-5 border-b border-[#EAECF0] md:grid grid-flow-col gap-x-[55px]'>
            <div>
                <div className="flex items-center space-x-2 mb-[13px]">
                    <Image src={item.profileAvatar} alt="" />
                    <p className="text-sm leading-4 capitalize font-satoshiMedium">{item.name}</p>
                </div>
                <div>
                    <h4 className='text-b2 font-satoshiBold text-base leading-[22px] mb-2'>{item.projectTitle}</h4>
                    <p className="text-b3 text-sm leading-[21px] font-satoshiRegular">{item.projectDescription}</p>
                </div>
            </div>
            <div className='mt-[13px] md:mt-0 md:ml-auto'>
                <p className="text-sm leading-[19px] font-satoshiMedium capitalize">{item.deadline}</p>
            </div>
        </div>
    )
}

export default ContractItem