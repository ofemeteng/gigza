import Button from '@/modules/common/components/button'
import AboutClient from '@/modules/dashboard/components/about-client'
import BidForm from '@/modules/dashboard/components/bid-form'
import GoBack from '@/modules/dashboard/components/go-back'
import DashboardLayout from '@/modules/dashboard/components/layout'
import { useContractContext } from 'context/ContractContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { sendProposal } from 'utils/data'
import { convertToNumber, initGigzaContract } from 'utils/helper'

const Bid = () => {
    // @ts-ignore
    const { account } = useContractContext()
    const [jobDetails, setJobDetails] = useState([])
    const router = useRouter()
    const { id: jobId } = router.query

    const getJobDetails = async () => {
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const _jobDetails = await contract.jobs(jobId)
            setJobDetails(_jobDetails)
        } catch (error) {
            toast.error('Something went wrong, could not get job details')
            console.log({ error })
        }
    }

    useEffect(() => {
        if (jobId) {
            getJobDetails()
        }
    }, [account, jobId])

    return (
        <DashboardLayout >
            <div className="layout-container max-w-[1126px] pt-[27px] md:pt-10 pb-[54px] md:pb-[175px]">
                <GoBack />
                <div className="md:grid grid-cols-[2fr_1fr] gap-x-[42px]">
                    <div>
                        <h4 className='text-b1 mt-[23px] mb-4 text-xl md:text-2xl leading-[27px] md:leading-8 capitalize font-satoshiBold'>bid for job</h4>

                        {/* job heading */}
                        {/* @ts-ignore */}
                        <h5 className="text-base md:text-[18px] leading-5 font-satoshiMedium text-[#344054] mb-2">{jobDetails?.title}</h5>

                        {/* job description */}
                        <p className='mt-4 mb-8 text-b4 text-sm leading-[21px] font-satoshiRegular'>
                            {/* @ts-ignore */}
                            {jobDetails?.description}
                        </p>
                        {/* @ts-ignore */}
                        <BidForm jobId={convertToNumber(jobId as string)} />
                    </div>
                    <AboutClient {...{ jobDetails }} />
                </div>
            </div>
        </DashboardLayout >
    )

}

export default Bid