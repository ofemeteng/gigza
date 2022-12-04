import { useRef, useState } from 'react'
import Image from 'next/image'
import arrowDown from '@/public/asset/navbar/arrow-down.svg'
import Link from 'next/link'
import useOnClickOutside from 'utils/hooks/useOnClickOutside.'

const ProposalLink = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const dropDownRef = useRef(null);

  const clickOutsideHandler = () => setShowDropDown(false);

  useOnClickOutside(dropDownRef, clickOutsideHandler);

  const handleShowDropDown = () => setShowDropDown(!showDropDown)

  const links = [
    {
      name: 'Sent proposals',
      to: '/dashboard/proposal/sent'
    },
    {
      name: 'Received proposals',
      to: '/dashboard/proposal/received'
    }
  ]

  return (
    <div ref={dropDownRef} className="relative">
      {
        showDropDown ?
          (
            <div className='absolute top-8 bg-white py-4 w-[291px]'>
              <ul className='flex flex-col space-y-5'>
                {
                  links.map((link, index) => (
                    <Link key={index} href={link.to}>
                      <a className='text-b4 w-fit capitalize cursor-pointer text-[15px] leading-5 font-satoshiRegular' onClick={handleShowDropDown}>
                        {link.name}
                      </a>
                    </Link>
                  ))
                }
              </ul>
            </div>
          ) : null
      }
      <div className='flex items-center' onClick={handleShowDropDown}>
        <p className='mr-1 text-b4 capitalize cursor-pointer text-[15px] leading-5 font-satoshiRegular'>proposals</p>
        <div className='cursor-pointer'>
          <Image src={arrowDown} alt='' />
        </div>
      </div>
    </div>
  )
}

export default ProposalLink