import DashboardLayout from '@/modules/dashboard/components/layout'
import ProposalContainer from '@/modules/dashboard/components/proposal-container'
import { useContractContext } from 'context/ContractContext'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { convertToNumber, formatUnit, initGigzaContract } from 'utils/helper'

const SentProposal = () => {

    // @ts-ignore
    const { account } = useContractContext()
    const [totalJobs, setTotalJobs] = useState([])
    const [myBids, setMyBids] = useState([])
    const [jobsBidded, setJobsBidded] = useState([])

    const getGetTotalJobs = async () => {
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const totalJobs = await contract.getTotalJobs()
            // console.log('total jobs', totalJobs)
            setTotalJobs(totalJobs)
        } catch (error) {
            toast.error('Something went wrong, could not fetch jobs')
            console.log({ error })
        }
    }

    const getMyBids = () => {
        const totalJobsNumber = totalJobs?.length
        let myBids = []
        for (let i = 0; i < totalJobsNumber; i++) {
            // @ts-ignore
            let myJobBids = totalJobs[i]?.userBids?.filter(item => item?.freelancer?.toLowerCase() == account?.toLowerCase());
            if (myJobBids.length > 0) {
                myBids.push(myJobBids)
            }
        }
        // @ts-ignore
        setMyBids(myBids)
        // console.log('my bids', myBids)
    }

    const getJobById = async (id: number) => {
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const job = await contract.jobs(id)
            // console.log('getJobById', job)
            return job
        } catch (error) {
            toast.error('Something went wrong, could not fetch jobs')
            console.log({ error })
        }
    }

    const getJobsBiddedFor = async () => {
        let jobsBiddedFor = []
        for (let i = 0; i < myBids.length; i++) {
            // @ts-ignore
            let jobId = (convertToNumber(formatUnit(myBids[i][0]?.jobId)) * 10 ** 18)
            // @ts-ignore
            let job = await getJobById(jobId);
            // if (job) {
            // console.log('job', job)
            jobsBiddedFor.push(job)
            // }
        }
        // @ts-ignore
        setJobsBidded(jobsBiddedFor)
    }

    useEffect(() => {
        getGetTotalJobs()
        // console.log('total jobs', totalJobs)
    }, [account])

    useEffect(() => {
        if (totalJobs.length > 0) {
            getMyBids()
        }
    }, [account, totalJobs])

    useEffect(() => {
        if (myBids?.length > 0) {
            getJobsBiddedFor()
        }
    }, [myBids])


    return (
        <DashboardLayout>
            <div className='layout-container max-w-[1126px] pt-4 mb-[65px]'>
                <h1 className="text-xl leading-[27px] capitalize text-b1 font-satoshiBold ">Sent proposals ({myBids?.length})</h1>

                <section className="mt-4 space-y-5">
                    {
                        jobsBidded.length > 0 ?
                            <>
                                {jobsBidded.map((data, index) => (
                                    <ProposalContainer
                                        key={index}
                                        data={data}
                                        // @ts-ignore
                                        mybid={myBids[index]}
                                    />
                                ))}
                            </> : null
                    }
                </section>
            </div>
        </DashboardLayout>
    )
}

export default SentProposal