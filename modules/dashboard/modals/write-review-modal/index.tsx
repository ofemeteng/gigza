import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TextArea from '../../components/input/text-area'
import Button from '@/modules/common/components/button'
import Image from 'next/image'

// images
import closeIcon from '@/public/asset/icon/close.png'
import Stars from '../../components/stars'
import toast from 'react-hot-toast'
import { initGigzaContract } from 'utils/helper'

type Props = {
    showWriteReviewModal: boolean,
    setShowWriteReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

const WriteReviewModal = ({ showWriteReviewModal, setShowWriteReviewModal }: Props) => {

    const initialFormData = {
        reviewText: '',
        star: 0,
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleClose = () => {
        setFormData(initialFormData)
        setShowWriteReviewModal(false)
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const notification = toast.loading('Please wait...Updating profile')

        // try {
        //     const response = await initGigzaContract()
        //     // @ts-ignore
        //     const contract = response.contract
        //     const txHash = await contract.createProfile(
        //         formData.name,
        //         formData.bio,
        //         formData.mainSkill,
        //         formData.skills,
        //         `https://avatars.dicebear.com/api/pixel-art/${account}.svg`
        //     )
        //     const receipt = await txHash.wait()
        //     if (receipt) {
        //         setIsCreatingProfile(false)
        //         toast.success("Profile has been updated", {
        //             id: notification
        //         })
        //         setFormData(initialFormData)
        //         router.push('/dashboard/profile')
        //     }
        // } catch (error) {
        //     setIsCreatingProfile(false)
        //     toast.error("Opps! Something went wrong.", {
        //         id: notification
        //     })
        // }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleReview = (index: number) => setFormData(
        prevState => ({
            ...prevState,
            star: index
        })
    )


    return (
        <Transition
            appear
            show={showWriteReviewModal}
            as={Fragment}
        >
            <Dialog
                as="div"
                className="fixed inset-0 z-[999999]"
                onClose={handleClose}
            >
                <div className="min-h-screen text-center">
                    <Dialog.Overlay className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-75 z-[999999]" />
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <div className="inline-block w-11/12 text-left align-middle transition-all z-[999999999] relative shadow-xl bg-[#fff] max-w-lg px-6 py-6 rounded-lg">
                        <Dialog.Title as="div" className="flex items-center justify-between">
                            <h1 className="text-b1 text-[18px] leading-6 capitalize font-satoshiBold">Write Review</h1>
                            <div className="cursor-pointer">
                                <Image src={closeIcon} onClick={handleClose} />
                            </div>

                        </Dialog.Title>
                        <section className="my-6">
                            <form onSubmit={handleSubmit}>
                                <TextArea
                                    id="reviewText"
                                    name="reviewText"
                                    placeholder="write out your experience"
                                    label="describe your experience"
                                    value={formData.reviewText}
                                    handleTextChange={handleTextChange}
                                    className="h-[163px]"
                                />

                                <div className="my-[25px]">
                                    <h4 className='capitalize text-b1 text-sm leading-[21px] font-satoshiMedium'>give your ratings</h4>
                                    <div className="flex justify-center py-10 mt-[13px] mb-[25px] bg-[#FCFCFC]">
                                        <Stars
                                            reviews={formData.star}
                                            handleReview={handleReview}
                                            className="space-x-4"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button title="cancel" onClick={handleClose} className='bg-[#EBEEF2] font-satoshiMedium text-b1 w-[111px] text-base leading-[18px]' />
                                    <Button title="post" className='w-[92px] text-base leading-[18px] font-satoshiMedium' />
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default WriteReviewModal