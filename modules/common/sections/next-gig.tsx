import React from 'react'
import { gigs } from 'utils/data';

const NextGig = () => {
  return (
    <section className='pt-12 md:pt-20 pb-[42px]'>
        <div className="layout-container max-w-[1127px]">
            <h1 className="capitalize text-center text-b1 text-2xl md:text-4xl md:leading-[55px] font-satoshiBold mb-2 md:mb-8">find your next gig today</h1>
            <p className="text-b3 text-base md:text-xl  text-center leading-[22px] md:leading-[27px] font-satoshiRegular">Get more from your trades by fulfilling orders from </p>

            <div className="mt-8 md:mt-10 grid grid-cols-2 gap-y-[10px] md:gap-y-12 md:flex md:flex-wrap md:justify-center md:space-x-4">
                {
                    gigs.map((item,index) => (
                        <div key={index} className="text-primary capitalize text-xs md:text-base font-satoshiMedium border border-[#E0E7FF] rounded-[52px] p-[15px] md:py-[21px] md:px-[30px] w-fit shadow-[0px_6px_40px_rgba(97_89_232_0.05)]">{item}</div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default NextGig;