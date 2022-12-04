import React, { useEffect, useState } from "react"
import Button from "@/modules/common/components/button"
// import AttachFile from "../attach-file"
// import Radio from "../input/radio"
import Select from "../input/select"
import TextArea from "../input/text-area"
import { convertToNumber, currentEpochTime, initGigzaContract } from "utils/helper"
import toast from "react-hot-toast"
import { useContractContext } from "context/ContractContext"

type BidFormProps = {
    jobId: number;
}
const BidForm = ({ jobId }: BidFormProps) => {
    const initialFormData = {
        duration: '2',
        description: '',
        jobId,
    }
    const [formData, setFormData] = useState(initialFormData)
    const [isClient, setIsClient] = useState(false)

    const timeDurationOptions = ['2', '4', '6', '8']
    const [isSubmitting, setIsSubmitting] = useState(false)
    // @ts-ignore
    const { account } = useContractContext()

    const handleSelect = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            duration: value
        }))
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // const handleRadioChange = (event: React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>) => {
    //     setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value });
    // }

    // const handleFile = (file: any) => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         file,
    //     }))
    // }

    const handleBid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        const notification = toast.loading('Submitting Proposal')
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const txHash = await contract.submitProposal(
                jobId,
                formData.description,
                // @ts-ignore
                currentEpochTime + (604800 * convertToNumber(formData.timeline))
            )
            const receipt = await txHash.wait()
            if (receipt) {
                setIsSubmitting(false)
                toast.success("Your submission was successful", {
                    id: notification
                })
            }
            setIsSubmitting(false)

        } catch (error) {
            toast.error("Something went wrong", {
                id: notification
            })
            console.log(error)
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleBid} className="mt-4 mb-[22px]">
            <Select
                options={timeDurationOptions}
                defaultValue={formData.duration}
                onChange={handleSelect}
                headerTitle="How long will it take you?"
            />
            {/* <h4 className="text-sm md:text-base leading-[19px] md:leading-[22px] mb-[18px] mt-6  capitalize font-satoshiMedium">Payment method</h4> */}
            {/* <div className="flex flex-col space-y-4 mb-[26px]">
                <Radio
                    id='end'
                    title="At the end of the project"
                    name="paymentMethod"
                    handleChange={handleRadioChange}
                    value='end'
                    checked={formData.paymentMethod === 'end' ? true : false}
                />
                <Radio
                    id='milestone'
                    title="After achieving milestones"
                    name="paymentMethod"
                    handleChange={handleRadioChange}
                    value='milestone'
                    checked={formData.paymentMethod === 'milestone' ? true : false}
                />
            </div> */}

            <TextArea
                id="description"
                name="description"
                label='submit proposal'
                placeholder='Write Message'
                className="h-[124px] mt-2"
                value={formData.description}
                handleTextChange={handleTextChange}
                required
            />

            {/* Attach files */}
            {/* <div className="mt-6 mb-4">
                <h5 className="mb-4 text-sm capitalize font-satoshiMedium leading-[19px]">Attach files <span className="text-b4">(optional)</span></h5>
                <AttachFile handleFile={handleFile} />
            </div> */}

            <Button
                className="mt-5 disabled:bg-gray-600 disabled:cursor-not-allowed"
                title="submit"
                disabled={isSubmitting}
            />
        </form>
    )
}

export default BidForm