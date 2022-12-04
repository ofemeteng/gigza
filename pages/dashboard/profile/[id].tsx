import Button from "@/modules/common/components/button"
import DashboardLayout from "@/modules/dashboard/components/layout"
import RecentReview from "@/modules/dashboard/components/recent-review"
import Stars from "@/modules/dashboard/components/stars"
import WriteReviewModal from "@/modules/dashboard/modals/write-review-modal"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { sendMessage } from "utils/data"
import { initGigzaContract } from "utils/helper"
import Image from "next/image"

// images
// import avatar from '@/public/asset/faces/profile-avatar.png'
import sendMessageIcon from '@/public/asset/icon/send-message.png'

type userDetailsType = {
    name: string;
    bio: string;
    skills: string[];
    profileUrl: string;
    mainSkill: string;
}

const ProfileView = () => {
    const router = useRouter()
    const { id: userAddress } = router.query

    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false)
    const [userDetails, setUserDetails] = useState<userDetailsType>()

    const handleShowWriteReviewModal = () => setShowWriteReviewModal(true)

    const getUserProfile = async () => {
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const userDetails = await contract.getUser(userAddress)
            setUserDetails(userDetails)
        } catch (error) {
            toast.error('Something went wrong, could not user details')
            console.log(error)
        }
    }

    useEffect(() => {
        if (userAddress) {
            getUserProfile()
        }
    }, [userAddress])
    return (
        <DashboardLayout>
            <>
                <WriteReviewModal {...{ showWriteReviewModal, setShowWriteReviewModal }} />
                <main className="layout-container max-w-[1126px] pt-[27px] md:py-9 pb-[82px]">
                    {/* @ts-ignore */}
                    <Image src={userDetails?.profileUrl} alt="" width={72} height={72} />
                    <div className="mb-8 md:grid grid-cols-[2fr_1fr]">
                        <div>
                            <div className="flex items-center mb-3 md:mb-4 space-x-[11px]">
                                <h1 className="text-b1 font-satoshiBold text-lg md:text-xl leading-6 md:leading-[27px] capitalize">{userDetails?.name}</h1>
                                <Stars reviews={4} />
                            </div>
                            <p className="text-b3 text-[13px] leading-[18px] font-satoshiRegular">{userDetails?.bio}</p>
                            <p className="text-b3 text-[13px] leading-[18px] font-satoshiRegular">main skill: {userDetails?.mainSkill}</p>

                            <h1 className="text-b1 capitalize text-sm font-satoshiBold leading-[19px] mb-2 mt-8 md:mt-4">Skills</h1>

                            <div className="flex flex-wrap gap-[11px] mb-8">
                                {
                                    userDetails?.skills.map((item, index) => (
                                        <div key={index} className="bg-[#F0F0F0] rounded py-[7px] px-[14px] font-satoshiMedium text-xs text-b2 leading-[18px] capitalize">{item}</div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                title="Send a message"
                                href={sendMessage}
                                icon={sendMessageIcon}
                                className='bg-primary text-white md:w-[210px] md:ml-auto'
                            />
                            <Button
                                title="Write a review"
                                className='bg-[#E0E7FF] text-primary md:w-[210px] md:ml-auto'
                                onClick={handleShowWriteReviewModal}
                            />
                        </div>

                    </div>

                    <RecentReview />
                </main>
            </>
        </DashboardLayout>
    )
}

export default ProfileView