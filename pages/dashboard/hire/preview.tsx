import { useEffect, useState } from 'react'
import Button from '@/modules/common/components/button'
import DashboardLayout from '@/modules/dashboard/components/layout'
import { useRouter } from 'next/router'
import JobPostSuccessModal from '@/modules/dashboard/modals/job-post-success-modal'
import toast from 'react-hot-toast'
import { convertToNumber, currentEpochTime, formatUnit, GigzaContractAddress, initDaiContract, initGigzaContract, parseUnit } from 'utils/helper'
import { useContractContext } from 'context/ContractContext'

type FormDataProps = {
    title: string;
    description: string;
    skills: string[];
    timeline: string;
    amount: string;
}

const initialFormData = {
    title: '',
    description: '',
    skills: [''],
    timeline: '',
    amount: ''
}

const HireTalentPreview = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [allowanceBalance, setAllowanceBalance] = useState()
    const [postingJobs, setPostingJobs] = useState(false)
    const [showPostSuccessModal, setShowPostSuccessModal] = useState(false)
    const [isApproving, setIsApproving] = useState(false)
    // @ts-ignore
    const { isLoading, setStore, account } = useContractContext()

    const router = useRouter()

    const checkAllowance = async () => {
        // @ts-ignore
        setStore(prev => ({
            ...prev,
            isLoading: true
        }))
        try {
            const response = await initDaiContract()
            // @ts-ignore
            const contract = response.contract
            const allowance = await contract.allowance(account, GigzaContractAddress)
            const balance = formatUnit(allowance)
            console.log(formatUnit(allowance))
            // @ts-ignore
            setAllowanceBalance(balance)
            // @ts-ignore
            setStore(prev => ({
                ...prev,
                isLoading: false,
            }))
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        if (!router.query.data) {
            router.push('/dashboard/hire')
        } else {
            const data = JSON.parse(router.query.data as string)
            setFormData(data)
            checkAllowance()
        }

    }, [])

    const handleCancel = () => {
        router.back()
    }

    const handleClick = () => {
        setShowPostSuccessModal(true)
    }

    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const notification = toast.loading('Please wait...Posting job')
        setPostingJobs(true)
        try {
            if (typeof window !== 'undefined') {

                const options = {
                    value: parseUnit(0.01)
                }

                const response = await initGigzaContract()
                // @ts-ignore
                const contract = response.contract
                const txHash = await contract.createJobPost(
                    formData.title,
                    formData.description,
                    formData.skills,
                    // @ts-ignore
                    currentEpochTime + (604800 * convertToNumber(formData.timeline)),
                    parseUnit(convertToNumber(formData.amount)),
                    options
                )

                const receipt = await txHash.wait()
                if (receipt) {
                    setPostingJobs(false)
                    toast.success("Job has been created", {
                        id: notification
                    })
                    handleClick()
                }
            }
        } catch (error) {
            setPostingJobs(false)
            toast.error("Opps! Something went wrong.", {
                id: notification
            })
            console.log(error)
        }
    }

    const approveTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const approvalAmount = convertToNumber(formData.amount)
        setIsApproving(true)
        const notification = toast.loading('Approving transaction')
        try {
            const response = await initDaiContract()
            // @ts-ignore
            const contract = response.contract
            const txHash = await contract.approve(GigzaContractAddress, parseUnit(approvalAmount))
            const receipt = await txHash.wait()
            if (receipt) {
                checkAllowance()
                toast.success("Approval was successful", {
                    id: notification
                })
            }
            setIsApproving(false)

        } catch (error) {
            toast.error("Something went wrong", {
                id: notification
            })
            setIsApproving(false)
        }
    }

    useEffect(() => {
        checkAllowance()
        console.log(allowanceBalance)
        // @ts-ignore
        console.log(allowanceBalance >= convertToNumber(formData.amount))
    }, [])

    return (
        <DashboardLayout>
            <>
                <JobPostSuccessModal {...{ showPostSuccessModal, setShowPostSuccessModal }} />
                <div className="layout-container max-w-[709px] pt-8  pb-[121px] space-y-6">
                    <h1 className="text-center capitalize text-b1 text-xl md:text-[28px] leading-[27px] md:leading-[38px] font-satoshiBold">hire talents</h1>

                    {/* project title */}
                    <div>
                        <p className="text-b1 capitalize text-base leading-[22px] font-satoshiMedium">
                            Project title
                        </p>
                        <p className="mt-2 border border-[#E8E8EF] rounded-[5px] py-[14px] px-3 bg-[#FCFDFD] text-b1 text-base leading-[22px] capitalize font-satoshiRegular">
                            {formData?.title}
                        </p>
                    </div>

                    {/* project description */}
                    <div>
                        <p className="text-base leading-[22px] text-b1 font-satoshiMedium mb-2">
                            Describe your brief
                        </p>
                        <p className="text-b2 text-sm leading-[19px] font-satoshiRegular">
                            {formData?.description}
                        </p>
                    </div>

                    {/* skills */}
                    <div>
                        <p className="text-b1 text-base leading-[21px] font-satoshiMedium mb-[13px]">
                            What type of skills are you looking for? (up to 5)
                        </p>
                        <div className="flex items-center flex-wrap gap-2">
                            {
                                formData?.skills.map((item, index) => (
                                    <div key={index} className="bg-[#E0E7FF] text-primary py-[11px] px-3 rounded-[5px] text-sm leading-[19px]">
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* timeline */}
                    <div>
                        <p className="text-b1 text-base leading-[21px] capitalize font-satoshiMedium mb-[13px]">
                            timeline for project
                        </p>
                        <p className="text-b2 text-base font-satoshiBold capitalize">
                            {formData?.timeline}
                        </p>
                    </div>

                    {/* budget */}
                    <div>
                        <p className="text-b1 capitalize text-base leading-[21px] font-satoshiMedium">budget</p>
                        <p className="mt-[13px] border border-[#E8E8EF] rounded-[5px] py-[14px] px-3 bg-[#FCFDFD] text-b1 text-base leading-[22px] capitalize font-satoshiRegular">
                            DAI {(Number(formData?.amount))}
                        </p>
                    </div>
                    <div className="space-y-4 md:space-y-0 md:flex justify-between items-center flex-row-reverse">
                        {
                            // @ts-ignore
                            !(allowanceBalance >= convertToNumber(formData.amount)) ?
                                <Button
                                    title={isApproving ? 'Approving' : 'Approve'}
                                    className='md:w-[92px] disabled:cursor-not-allowed disabled:bg-gray-600'
                                    onClick={approveTransaction}
                                    disabled={isApproving}
                                /> :
                                <Button
                                    title="Post"
                                    className='md:w-[92px]'
                                    onClick={handlePost}
                                />

                        }
                        <Button onClick={handleCancel} title="cancel" className='bg-[#EBEEF2] text-b1 md:w-[111px]' />
                    </div>
                </div>
            </>
        </DashboardLayout>
    )
}

export default HireTalentPreview