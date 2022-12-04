import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"
import Button from "@/modules/common/components/button"

// images
import closeIcon from "@/public/asset/icon/close.png"
import successIcon from "@/public/asset/icon/success-icon.svg"
import { useRouter } from "next/router"

type Props = {
    showPostSuccessModal: boolean,
    setShowPostSuccessModal: React.Dispatch<React.SetStateAction<boolean>>
}

const JobPostSuccessModal = ({ showPostSuccessModal, setShowPostSuccessModal }: Props) => {
const router = useRouter()
    const handleClose = () => setShowPostSuccessModal(false)
    const handleNavigation = () => router.push('/dashboard/find-work')
    return (
        <Transition
            appear
            show={showPostSuccessModal}
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
                        <Dialog.Title as="div" className="flex items-center justify-end">
                            <div className="cursor-pointer">
                                <Image src={closeIcon} onClick={handleClose} />
                            </div>
                            {/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}

                        </Dialog.Title>
                        <section className="my-6 gap-y-4 flex flex-col items-center">
                            <Image src={successIcon} alt="" />
                            <p className="font-satoshiMedium text-based md:text-xl md:leading-[27px] text-[#192839] capitalize">Job post Uploaded successfully</p>
                            <Button title="view job post" className="bg-[#E0E7FF] text-primary w-[166px]" onClick={handleNavigation} />
                        </section>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default JobPostSuccessModal