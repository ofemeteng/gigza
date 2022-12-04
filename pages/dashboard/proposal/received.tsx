import DashboardLayout from '@/modules/dashboard/components/layout'
import ProposalContainer from '@/modules/dashboard/components/proposal-container'
import { useContractContext } from 'context/ContractContext'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { initGigzaContract } from 'utils/helper'

const ReceivedProposal = () => {

    // @ts-ignore
    const { account } = useContractContext()
    const [myJobsPosted, setMyJobsPosted] = useState([])
    const [myJobsPostedBids, setMyJobsPostedBids] = useState([])


    const getGetTotalJobs = async () => {
        let myJobs = []
        let bids = []
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const totalJobs = await contract.getTotalJobs()
            for (let i = 0; i < totalJobs.length; i++) {
                if (totalJobs[i]?.client?.toLowerCase() == account?.toLowerCase()) {
                    myJobs.push(totalJobs[i])
                    bids.push(totalJobs[i]?.userBids)
                }
            }
            // console.log(myJobs)
            // @ts-ignore
            setMyJobsPosted(myJobs)
            // @ts-ignore
            setMyJobsPostedBids(bids)

        } catch (error) {
            toast.error('Something went wrong, could not fetch jobs')
            console.log({ error })
        }
    }

    useEffect(() => {
        getGetTotalJobs()
    }, [account])
    // check for jobs posted by me
    // list out all the Bids
    return (
        <DashboardLayout>
            <div className='layout-container max-w-[1126px] pt-4 mb-[65px]'>
                <h1 className="text-xl leading-[27px] capitalize text-b1 font-satoshiBold ">Received proposals ({myJobsPosted.length})</h1>
                <section className="mt-4 space-y-5">
                    {
                        myJobsPosted.length > 0 ?
                            <>
                                {
                                    myJobsPosted.map((data, index) => (
                                        <ProposalContainer
                                            key={index}
                                            data={data}
                                            // @ts-ignore
                                            mybid={myJobsPostedBids[index]}
                                        />
                                    ))
                                }
                            </> : null
                    }
                </section>
            </div>
        </DashboardLayout>
    )
}

export default ReceivedProposal