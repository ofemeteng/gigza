import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CopyToClipboard from '../copy-to-clipboard';
import Button from '.'
import useOnClickOutside from 'utils/hooks/useOnClickOutside.';
import { useContractContext } from 'context/ContractContext'
import { formatWalletAddress } from 'utils/helper';

// images
import arrowDownIcon from '@/public/asset/icon/arrow-down.png'
import duplicateIcon from '@/public/asset/icon/duplicate.svg'


const ConnectWalletButton = () => {
    const [showDropDown, setShowDropDown] = useState(false)
    // @ts-ignore
    const { account, isWalletConnected, connectWallet } = useContractContext()

    const dropDownRef = useRef(null);

    const handleShowDropDown = () => setShowDropDown(!showDropDown)

    const clickOutsideHandler = () => setShowDropDown(false);

    useOnClickOutside(dropDownRef, clickOutsideHandler);


    return (
        <div ref={dropDownRef} className='hidden md:block relative '>
            {
                showDropDown && isWalletConnected ? (
                    <div className='absolute top-[53px] bg-white rounded-lg shadow-[0px_6px_60px_#F2F3F7] py-6 pl-6 pr-9'>
                        <ul className='text-base leading-7 capitalize space-y-4 text-[#1B1C1E] font-satoshiRegular'>
                            <li>
                                <Link href="/dashboard/profile">
                                    <a onClick={handleShowDropDown}>
                                        view profile
                                    </a>
                                </Link>
                            </li>
                            <li className='cursor-pointer'>disconnect wallet</li>
                        </ul>
                    </div>
                ) : null
            }
            <div>
                {
                    isWalletConnected ? (
                        <div className='flex items-center space-x-[26px] bg-[#F3F4F5] rounded-[38px] py-[9px] pl-[14px] pr-[21px]'>
                            <div className="flex items-center">
                                {/* <div className="h-[30px] w-[30px] rounded-full bg-[#A7A3F2] mr-2" /> */}
                                <Image src={`https://avatars.dicebear.com/api/pixel-art/${account}.svg`} priority alt="" width={30} height={30}/>
                                <p className='font-satoshiMedium text-base leading-[18px] text-primary2 ml-2'>{formatWalletAddress(account)}</p>
                            </div>
                            <div className="flex items-center space-x-[9px]">
                                <CopyToClipboard icon={duplicateIcon} text={`${account}`} />
                                <div onClick={handleShowDropDown} className="cursor-pointer">
                                    <Image src={arrowDownIcon} alt='' />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Button
                            title="connect wallet"
                            onClick={connectWallet}
                            className="w-[171px] hidden md:flex"
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ConnectWalletButton