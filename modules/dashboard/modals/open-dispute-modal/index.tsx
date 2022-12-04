import { ChangeEvent, FormEvent, Fragment, useState } from "react"
import Button from "@/modules/common/components/button"
import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"

// images
import closeIcon from "@/public/asset/icon/close.png"
import TextArea from "../../components/input/text-area"
import AttachFile from "../../components/attach-file"


type Props = {
    showDisputeModal: boolean;
    setShowDisputeModal: React.Dispatch<React.SetStateAction<boolean>>
}

const OpenDisputeModal = ({ showDisputeModal, setShowDisputeModal }: Props) => {
    const initialFormData = {
        dispute: "",
        file: {}
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.value]: e.target.name
        }))
    }

    const handleFile = (file: any) => {
        setFormData(prevState => ({
            ...prevState,
            file,
        }))
    }

    const handleClose = () => setShowDisputeModal(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }
    return (
        <Transition
            appear
            show={showDisputeModal}
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
                            <h1 className="text-b1 text-[28px] leading-[38px]">Dispute</h1>
                            <div className="cursor-pointer">
                                <Image src={closeIcon} onClick={handleClose} />
                            </div>
                            {/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}

                        </Dialog.Title>
                        <section className="my-6">
                            <form onSubmit={handleSubmit}>
                                <TextArea
                                    id="dispute"
                                    name="dispute"
                                    placeholder="write out your issue"
                                    label="Enter your dispute"
                                    value={formData.dispute}
                                    handleTextChange={handleTextChange}
                                    className="h-[163px]"
                                />

                                <div className="my-[25px]">
                                    <p className="capitalize mb-4 text-base text-[#101828]">Attach file</p>
                                    <AttachFile handleFile={handleFile} />
                                </div>

                                <Button title="Submit" />
                            </form>
                        </section>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default OpenDisputeModal