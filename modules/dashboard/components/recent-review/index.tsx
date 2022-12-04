import { useState } from "react"
import Image from "next/image"
import { reviewData, reviewHeading } from "utils/data"
import Stars from "../stars"
import { ReviewProp } from "./typing"
import ReviewModal from "../../modals/review-modal"


const RecentReview = () => {

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [review, setReview] = useState<ReviewProp>()
  const handleShowModal = (item: ReviewProp) => {
    setReview(item)
    if (review) setShowReviewModal(true)
  }

  return (
    <>
      <ReviewModal {...{ showReviewModal, setShowReviewModal, review }} />
      <div>
        <h1 className="text-base leading-[22px] font-satoshiBold capitalize text-[#192839]">recent Project reviews</h1>
        {/* reviews */}
        {/* table heading */}
        <div className="mt-4 grid grid-cols-3 gap-x-5 md:gap-x-10 border-b border-[#F0F0F0]">
          {
            reviewHeading.map((item, index) => (
              <div key={index} className="capitalize text-b3 py-[13px] text-[11px] md:text-sm leading-[18px] font-satoshiMedium">{item}</div>
            ))
          }
        </div>

        {/* data */}
        <div className="h-[300px] overflow-y-auto">
          <>
            {
              reviewData.map((item, index) => (
                <div onClick={() => handleShowModal(item)} key={index} className="grid grid-cols-3 cursor-pointer border-b border-[#F0F0F0] capitalize text-b1 text-[11px] md:text-base leading-5 font-satoshiRegular py-2 md:py-[10px] gap-x-5 md:gap-x-10">
                  <>
                    <div className="md:flex items-center md:space-x-2">
                      <div className="hidden md:block" >
                        <Image src={item.avatar} alt="" />
                      </div>
                      <p>{item.clientName}</p>
                    </div>
                    <div className="truncate">{item.review}</div>
                    <div>
                      <Stars reviews={item.rating} />
                    </div>
                  </>
                </div>
              ))
            }
          </>
        </div>
      </div>
    </>
  )
}

export default RecentReview