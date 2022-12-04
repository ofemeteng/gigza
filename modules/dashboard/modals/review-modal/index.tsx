import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';

// images
import closeIcon from '@/public/asset/icon/close.png'
import Image from 'next/image';
import { ReviewProp } from '../../components/recent-review/typing';

type Props = {
    showReviewModal: boolean;
    setShowReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
    review: ReviewProp | undefined;
}

const ReviewModal = ({ showReviewModal, setShowReviewModal, review }: Props) => {
    return (
        <Transition
            appear
            show={showReviewModal}
            as={Fragment}
        >
            <Dialog
                as="div"
                className="fixed inset-0 z-[999999]"
                onClose={() => setShowReviewModal(false)}
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
                    <div className="inline-block w-11/12 text-left align-middle transition-all z-[999999999] relative shadow-xl bg-white max-w-lg px-6 py-6 rounded-[10px]">
                        <Dialog.Title as="div" className="flex justify-between items-center">
                            <h1 className="capitalize text-xl leading-6 text-[#0B0B27]  font-satoshiBold md:text-2xl md:leading-6">review</h1>
                            <Image
                                src={closeIcon}
                                alt=""
                                className="cursor-pointer"
                                onClick={() => setShowReviewModal(false)}
                            />
                        </Dialog.Title>
                        <section className="my-6 space-y-5">
                            <p className='text-base leading-[22px] text-b2 font-satoshiRegular'>{review?.review}</p>
                            <div className="flex items-center space-x-2">
                                <div className="" >
                                    <Image src={review?.avatar} alt="" />
                                </div>
                                <p className='capitalize text-b1 text-base leading-5 font-satoshiRegular'>{review?.clientName}</p>
                            </div>

                        </section>

                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ReviewModal