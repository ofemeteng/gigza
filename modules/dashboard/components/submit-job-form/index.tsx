import React, { useState } from "react"
import Button from "@/modules/common/components/button";
import { convertToNumber, formatUnit, initGigzaContract } from 'utils/helper';
import TextArea from "../input/text-area";
import TextInput from "../input/text-input";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

// @ts-ignore 
const SubmitJobForm = ({ jobId }) => {
    const initialFormData = {
        message: '',
        url: '',
        // @ts-ignore 
        jobId: convertToNumber(formatUnit(jobId)) * 10 ** 18
    }

    const [formData, setFormData] = useState(initialFormData)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const notification = toast.loading('Please wait...Updating profile')
        setIsSubmitting(true)
        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const txHash = await contract.submitJob(
                formData.jobId,
                formData.message,
                formData.url
            )
            const receipt = await txHash.wait()
            if (receipt) {
                setIsSubmitting(false)
                toast.success("Profile has been updated", {
                    id: notification
                })
                setFormData(initialFormData)
                if (typeof window !== 'undefined') {
                    // @ts-ignore
                    router.reload(window?.location?.pathname)
                }
            }
        } catch (error) {
            setIsSubmitting(false)
            toast.error("Opps! Something went wrong.", {
                id: notification
            })
            console.log(error)
        }
    }



    return (
        <div className="border border-gray-400 rounded-md p-5 mt-10">
            <h1>Submit Job</h1>
            <form className="space-y-5 mt-5" onSubmit={handleSubmit} >
                <TextArea
                    label='Message'
                    name="message"
                    placeholder='message for client'
                    handleTextChange={handleTextChange}
                    value={formData.message}
                />
                <TextInput
                    label='URL'
                    type='url'
                    name="url"
                    id='url'
                    placeholder="link to your submitted work"
                    handleTextChange={handleTextChange}
                    value={formData.url}
                />

                <Button title="submit" className="disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={isSubmitting} />
            </form>
        </div>
    )
}

export default SubmitJobForm