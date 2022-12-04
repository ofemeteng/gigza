import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FilterTalentListForm from '../../components/filter-talent-list/filter-talent-list-form'
import Image from 'next/image'

// images
import closeIcon from '@/public/asset/icon/close.png'

type Props = {
    showFilterTalentModal: boolean;
    setShowFilterTalentModal: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterTalentListModal = ({ showFilterTalentModal, setShowFilterTalentModal }: Props) => {
    const handleClose = () => {
        setShowFilterTalentModal(false)
    }
    return (
        <Transition
            appear
            show={showFilterTalentModal}
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
                    <div className="inline-block   w-11/12 text-left align-middle transition-all z-[999999999] relative shadow-xl bg-[#fff] max-w-lg px-6 py-6 rounded-lg">
                        <Dialog.Title as="div" className="flex items-center">
                            <h1 className="flex-1 capitalize text-xl leading-[21px] text-[#101828] font-satoshiBold md:text-2xl md:leading-[29px]">filter</h1>
                            <Image src={closeIcon} onClick={handleClose} />

                        </Dialog.Title>
                        <section className="my-6 h-[400px] overflow-y-scroll">
                            <FilterTalentListForm />
                        </section>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default FilterTalentListModal