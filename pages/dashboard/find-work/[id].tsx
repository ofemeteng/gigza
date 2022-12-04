import Button from '@/modules/common/components/button'
import AboutClient from '@/modules/dashboard/components/about-client'
import GoBack from '@/modules/dashboard/components/go-back'
import DashboardLayout from '@/modules/dashboard/components/layout'
import { useContractContext } from 'context/ContractContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { sendProposal } from 'utils/data'
import { initGigzaContract } from 'utils/helper'

const ProjectDetails = () => {

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
        <DashboardLayout>
            <div className="layout-container max-w-[1126px] pt-[27px] md:pt-10 pb-[54px]">
                <GoBack />

                <div className="space-y-[22px] md:space-y-0 md:grid grid-cols-[2fr_1fr] md:gap-x-[42px]">
                    <div>
                        <h5 className="text-b1 capitalize text-sm md:text-2xl leading-[21px] md:leading-8 font-satoshiRegular mt-5 mb-4">project Brief</h5>

                        {/* heading */}
                        {/* @ts-ignore */}
                        <h1 className="text-[#344054] text-xl leading-[27px] font-satoshiBold">{jobDetails?.title}</h1>

                        <p className='mt-4 mb-8 text-b4 text-sm leading-[21px] font-satoshiRegular'>
                            {/* @ts-ignore */}
                            {jobDetails?.description}
                        </p>
                        <Button
                            // @ts-ignore
                            href={sendProposal(jobId)}
                            className="w-[165px]"
                            title="Send proposal"
                        />
                    </div>
                    <AboutClient {...{ jobDetails }} />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ProjectDetails