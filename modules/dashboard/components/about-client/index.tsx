import { covertToReadableDate, formatUnit } from 'utils/helper'

// images
import avatar from '@/public/asset/faces/1.png'
import Image from 'next/image'
import Link from 'next/link'

// @ts-ignore
const AboutClient = ({ jobDetails }) => {

    const heading = (title: string) => (
        <h5 className="capitalize font-satoshiRegular text-sm leading-[21px] text-[#667085] mb-[5px]">{title}</h5>
    )


    return (
        <div className="">
            <div className="rounded-lg border border-[#F0F0F0] p-4 space-y-6">
                {/* Date */}
                <div>
                    {heading('date posted')}
                    {/* @ts-ignore */}
                    <p className="text-base leading-[21px] text-[#101828] font-satoshiMedium capitalize">{covertToReadableDate(formatUnit(jobDetails?.timestamp) * 10 ** 18)}</p>
                </div>

                {/* tags */}
                {/* <div>
                    {heading('tag')}
                    <div>
                        {
                            jobDetails?.skills?.map((tag, index) => (
                                <p key={index} className="text-base leading-[21px] text-[#101828] font-satoshiMedium capitalize">{tag}</p>

                            ))
                        } */}
                {/* <p className="text-base leading-[21px] text-[#101828] font-satoshiMedium capitalize">Illustration</p>
                        <p className="text-base leading-[21px] text-[#101828] font-satoshiMedium capitalize">Animation</p> */}
                {/* </div>
                </div> */}

                {/* budget */}
                <div>
                    {heading('budget')}
                    <p className="text-base leading-[21px] text-[#101828] font-satoshiMedium capitalize">DAI {formatUnit(jobDetails?.amount)}</p>
                </div>

                {/* about client */}
                <div>
                    {heading('client')}
                    <div className="flex items-center space-x-2">
                        <Image src={`https://avatars.dicebear.com/api/pixel-art/${jobDetails?.client}.svg`} priority alt='' width={40} height={40} />
                        {/* <p className="text-xs text-[#101828] font-satoshiMedium capitalize">{jobDetails?.client}</p> */}
                        <Link href={`/dashboard/profile/${jobDetails?.client}`}>
                            <a className="text-xs text-[#101828] font-satoshiMedium capitalize">{jobDetails?.client}</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>)
}

export default AboutClient
