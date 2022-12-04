import { useEffect, useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { newProjects } from "utils/data"
import { formatUnit, initGigzaContract } from "utils/helper"
// import { formatAmount } from "utils/helper"

const NewProjectList = () => {
    const [totalJobs, setTotalJobs] = useState([])

    const getGetTotalJobs = async () => {
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const totalJobs = await contract.getTotalJobs()
            console.log('main',totalJobs)
            setTotalJobs(totalJobs)
        } catch (error) {
            toast.error('Something went wrong, could not fetch jobs')
            console.log({ error })
        }
    }

    useEffect(() => {
        getGetTotalJobs()
        console.log('total jobs', totalJobs)
    }, [])

    // @ts-ignore
    const filteredTotalJobs = totalJobs?.filter((item) => item)?.reverse()
    // const filteredTotalJobs = totalJobs?.filter((item) => item?.state === 0)?.reverse()
    // console.log(Math.round((formatUnit(item?.jobId) * (10 ** 18)) - 1))
    
    return (
        <section className="space-y-4">
            {
                filteredTotalJobs.map((item, index) => (
                    // @ts-ignore
                    <Link href={`/dashboard/find-work/${Math.round((formatUnit(item?.jobId) * (10 ** 18)))}`} key={index}>
                        <a className="grid grid-flow-col gap-x-[33px] md:gap-x-[55px] pb-[21px] border-b border-[#EAECF0]">
                            <>
                                <div className="">
                                    <h3 className="font-satoshiBold text-b2 text-base leading-[22px] md:text-xl md:leading-[27px]">
                                     {/* @ts-ignore */}
                                        {item?.title}
                                    </h3>
                                    <p className="mt-2 mb-4 text-b3 text-sm  leading-[21px] font-satoshiRegular">
                                        {/* @ts-ignore */}
                                        {item?.description}
                                    </p>
                                    <div className="flex flex-wrap mb-[14px] gap-[11px]">
                                        {
                                            // @ts-ignore
                                            item?.skills?.map((skill, index) => (
                                                <div key={index} className="skills">{skill}</div>
                                            ))
                                        }
                                    </div>
                                    {/* <p className="text-b4 text-[13px] leading-4 font-satoshiMedium"> <span className="capitalize">{item.client}</span>{`. Posted about ${item.time} ago`}</p> */}
                                </div>
                                {/* <h3 className="text-base md:text-xl ml-auto leading-5 md:leading-5 text-b2 font-satoshiBold">${formatAmount(item.budget)}</h3> */}
                                {/* <div className="flex items-center tjustify-between">
                    </div> */}
                            </>
                        </a>
                    </Link>
                ))
            }
        </section>
    )
}

export default NewProjectList