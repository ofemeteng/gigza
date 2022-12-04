import Button from "@/modules/common/components/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { bidState, convertToNumber, covertToReadableDate, formatUnit, initGigzaContract, jobState } from "utils/helper";
import SubmitJobForm from "../submit-job-form";

type ProposalContainerProps = {
    data: {
        title: string;
        description: string;
        name: string;
        date: string;
        status: string;
    }
}

// @ts-ignore
const ProposalContainer = ({ data, mybid }: ProposalContainerProps) => {
    const { pathname } = useRouter()
    // const [isLoading, setIsLoading] = useState(false)
    const [isSendingContract, setIsSendingContract] = useState(false)
    const [isAcceptingContract, setIsAcceptingContract] = useState(false)
    const [isPaying, setIsPaying] = useState(false)
    // const [isDecliningOffer, setIsDecliningOffer] = useState(false)

    const router = useRouter()

    const checkIfReceiveProposal = () => pathname.includes('received')

    // @ts-ignore
    // this is used for only sending contract and can't be used for anything else
    const jobId = convertToNumber(formatUnit(data?.jobId)) * 10 ** 18

    const handleSendContract = async (freelancerAddress: string) => {
        console.log(freelancerAddress)
        const notification = toast.loading('Please wait...sending contract')
        setIsSendingContract(true)
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const txHash = await contract.sendContract(
                jobId,
                freelancerAddress
            )
            const receipt = await txHash.wait()
            if (receipt) {
                setIsSendingContract(false)
                toast.success("Contract has been sent", {
                    id: notification
                })

                if (typeof window !== 'undefined') {
                    // @ts-ignore
                    router.reload(window?.location?.pathname)
                }
            }
        } catch (error) {
            setIsSendingContract(false)
            toast.error("Opps! Something went wrong.", {
                id: notification
            })

            console.log(error)
        }
    }

    // @ts-ignore
    const handleAcceptContract = async (_jobId) => {
        // @ts-ignore
        const formattedJobId = convertToNumber(formatUnit(_jobId)) * 10 ** 18
        const notification = toast.loading('Please wait...accepting contract')
        setIsAcceptingContract(true)
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const txHash = await contract.acceptContract(
                formattedJobId
            )
            const receipt = await txHash.wait()
            if (receipt) {
                setIsAcceptingContract(false)
                toast.success("Contract has been accepted", {
                    id: notification
                })
                if (typeof window !== 'undefined') {
                    // @ts-ignore
                    router.reload(window?.location?.pathname)
                }
            }
        } catch (error) {
            setIsAcceptingContract(false)
            toast.error("Opps! Something went wrong.", {
                id: notification
            })

            

            console.log(error)
        }
    }

    // @ts-ignore
    const handleReleasePayment = async (jobId) => {
        setIsPaying(true)
        //  @ts-ignore
        const formattedJobId = convertToNumber(formatUnit(jobId)) * 10 ** 18
        const notification = toast.loading('Please wait...accepting contract')
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const txHash = await contract.releasePayment(
                formattedJobId,
            )
            const receipt = await txHash.wait()
            if (receipt) {
                setIsPaying(false)
                toast.success("Contract has been accepted", {
                    id: notification
                })
                if (typeof window !== 'undefined') {
                    // @ts-ignore
                    router.reload(window?.location?.pathname)
                }
            }
        } catch (error) {
            setIsPaying(false)
            toast.error("Opps! Something went wrong.", {
                id: notification
            })

            console.log(error)
        }
    }

    // const handleDeclineContract = async (_jobId) => {
    //     // @ts-ignore
    //     const formattedJobId = convertToNumber(formatUnit(_jobId)) * 10 ** 18
    //     const notification = toast.loading('Please wait...declining contract')
    //     setIsDecliningOffer(true)
    //     try {
    //         const response = await initGigzaContract()
    //         // @ts-ignore
    //         const contract = response.contract
    //         const txHash = await contract.declineOffer(
    //             formattedJobId
    //         )
    //         const receipt = await txHash.wait()
    //         if (receipt) {
    //             setIsDecliningOffer(false)
    //             toast.success("Contract has been declined", {
    //                 id: notification
    //             })
    //             if (typeof window !== 'undefined') {
    //                 // @ts-ignore
    //                 router.reload(window?.location?.pathname)
    //             }
    //         }
    //     } catch (error) {
    //         setIsDecliningOffer(false)
    //         toast.error("Opps! Something went wrong.", {
    //             id: notification
    //         })

    //         console.log(error)
    //     }
    // }
    // console.log('mybid', mybid)
    return (
        <>
            <div className="grid grid-flow-col gap-x-5 md:gap-x-[55px] items-start border-b border-[#eaecf0] pb-5">
                <div className="">
                    <h4 className="text-base leading-[22px] font-satoshiMedium text-b1 mb-2">{data?.title} </h4>
                    <h4 className="text-base leading-[22px] font-satoshiMedium text-b1 mb-2">no of bids: {mybid?.length} </h4>
                    <p className="text-sm leading-[21px] font-satoshiRegular mb-[13px]">{data?.description}</p>
                    {/* @ts-ignore */}
                    <p className="text-[#F02323]">timeline: {covertToReadableDate(data?.timeline)}</p>
                    <div className="flex items-center text-sm leading-[19px]">
                        {/* @ts-ignore */}
                        {/* <p className="text-b1 font-satoshiMedium mr-1">{data?.client} •</p> */}
                        {/* @ts-ignore */}
                        <Link href={`/dashboard/profile/${data?.client}`}>
                            {/* @ts-ignore */}
                            <a className="text-b1 font-satoshiMedium mr-1">{data?.client}</a>
                        </Link>
                        {/* @ts-ignore */}
                        <p className="font-satoshiRegular text-b3">• Initiated {covertToReadableDate(data?.timestamp)}</p>
                    </div>
                    {/* my bid */}
                    {
                        checkIfReceiveProposal() ? (
                            <>
                                {
                                    mybid?.length > 0 ? (
                                        <>
                                            <h1 className="my-2">Bids received</h1>
                                            <div className="space-y-5">
                                                {
                                                    // @ts-ignore
                                                    mybid?.map((item, index) => (
                                                        <div className="border border-[#eaecf0] p-5 rounded-md" key={index}>
                                                            <h1>
                                                                Application by
                                                                {/* @ts-ignore */}
                                                                <Link href={`/dashboard/profile/${item?.freelancer}`}>
                                                                    {/* @ts-ignore */}
                                                                    <a className="text-b1 font-satoshiMedium mr-1">{item?.freelancer}</a>
                                                                </Link>
                                                            </h1>
                                                            <h1>{item?.description}</h1>
                                                            <p>I can get this done before {covertToReadableDate(item?.timeline)}</p>
                                                            <div className="">
                                                                bid status : <span className={`capitalize ml-auto font-satoshiMedium text-sm leading-[19px] ${item?.bidState === 0 ? 'text-[#0E9802]' : 'text-[#F02323]'}`}>{bidState[item?.bidState]}</span>
                                                            </div>
                                                            <div className="flex justify-end">
                                                                {
                                                                    // @ts-ignore
                                                                    jobState[data?.state].toLowerCase() === 'posted'
                                                                        ?
                                                                        <Button
                                                                            title='Send Contract'
                                                                            className="w-[120px] h-8 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                                            // @ts-ignore
                                                                            onClick={() => handleSendContract(item?.freelancer)}
                                                                            // @ts-ignore
                                                                            disabled={data?.state !== 0 || isSendingContract}
                                                                        />
                                                                        :
                                                                        null
                                                                }

                                                                {
                                                                    // @ts-ignore
                                                                    jobState[data?.state].toLowerCase() === 'executed' ?
                                                                        <Button
                                                                            title='Release Payment'
                                                                            className="w-[180px] h-8 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                                            // @ts-ignore
                                                                            onClick={() => handleReleasePayment(data?.jobId)}
                                                                            // @ts-ignore
                                                                            disabled={isPaying}
                                                                        />
                                                                        :
                                                                        null
                                                                }
                                                            </div>


                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    ) : null
                                }
                            </>
                        ) : (
                            <>
                                {
                                    mybid?.length > 0 ? <div className="border border-[#eaecf0] p-5 mt-4">
                                        <h1>Your Bid</h1>
                                        <div className="">
                                            <h1>{mybid[0]?.description}</h1>
                                            <p>when I can get the job done {covertToReadableDate(mybid[0]?.timeline)}</p>
                                            <div className="">
                                                bid status : <span className={`capitalize ml-auto font-satoshiMedium text-sm leading-[19px] ${mybid[0]?.bidState === 0 ? 'text-[#0E9802]' : 'text-[#F02323]'}`}>{bidState[mybid[0]?.bidState]}</span>
                                                {
                                                    // @ts-ignore
                                                    bidState[mybid[0]?.bidState].toLowerCase() == 'accepted' ? <SubmitJobForm jobId={mybid[0]?.jobId} /> : null
                                                }
                                                <div className="">
                                                    {
                                                        bidState[mybid[0]?.bidState].toLowerCase() == 'awarded' ?
                                                            (
                                                                <div className="flex justify-between mt-5">
                                                                    {/* <Button
                                                                        title='Decline offer'
                                                                        className="w-[120px] h-8 bg-[#EBEEF2] cursor-pointer text-b1 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                                        onClick={() => handleDeclineContract(mybid[0]?.jobId)}
                                                                        // @ts-ignore
                                                                        disabled={isDecliningOffer}
                                                                    /> */}
                                                                    <Button
                                                                        title='Accept contract'
                                                                        className="w-[150px] h-8 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                                        onClick={() => handleAcceptContract(mybid[0]?.jobId)}
                                                                        // @ts-ignore
                                                                        disabled={isAcceptingContract}
                                                                    />
                                                                </div>
                                                            ) : null
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div> : null
                                }
                            </>
                        )
                    }

                </div>
                {/* @ts-ignore */}
                <p className={`capitalize ml-auto font-satoshiMedium text-sm leading-[19px] ${data?.state === 0 ? 'text-[#0E9802]' : 'text-[#F02323]'}`}>{jobState[data?.state]}</p>
            </div>

        </>
    )
}

export default ProposalContainer