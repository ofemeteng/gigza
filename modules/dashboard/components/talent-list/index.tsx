import { useContractContext } from "context/ContractContext"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { initGigzaContract } from "utils/helper"
import Stars from "../stars"

const TalentList = () => {
    const [userProfiles, setUserProfiles] = useState([])
    // @ts-ignore
    const { account } = useContractContext()
    const getUsersProfile = async () => {
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const data = await contract.getUserProfiles()
            console.log(data)
            setUserProfiles(data)
        } catch (error) {
            console.log({ error })
            toast.error('Could not fetch freelancers')
        }
    }

    useEffect(() => {
        getUsersProfile()
    }, [account])

    return (
        <div className="space-y-4">
            {
                // @ts-ignore
                userProfiles?.filter(item => item?.name !== 'Nakamoto').map((item, index) => (
                    <div key={index} className="flex items-start space-x-2 py-4 border-b border-[#F0F0F0]">
                        <div className="h-10 w-20">
                            {/* @ts-ignore */}
                            <Image src={item?.profileUrl} alt="" width={10} height={10} layout="responsive" />
                        </div>
                        <div className="lg:grid grid-flow-col gap-x-5 xl:gap-x-20">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    {/* @ts-ignore */}
                                    <p className="text-b1 text-base md:text-xl leading-[22px] md:leading-[27px] capitalize font-satoshiBold">{item?.name}</p>
                                    {/* @ts-ignore */}
                                    <Stars reviews={item?.stars} />
                                </div>
                                <div className="mb-4 text-sm leading-4 text-b3 font-satoshiRegular" >
                                    {/* @ts-ignore */}
                                    <p className="mb-2 capitalize">{item?.mainSkill} • 5 contracts</p>
                                    {/* @ts-ignore */}
                                    <p className="text-[13px] leading-[18px]">{item?.bio}</p>
                                </div>
                            </div>
                            {/* <Button title="send message" className="bg-[#F3F3F4] text-b2 lg:text-[13px] leading-[18px] h-9 lg:w-[159px]" /> */}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TalentList