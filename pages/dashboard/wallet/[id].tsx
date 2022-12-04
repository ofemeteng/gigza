import { useState } from "react"
import OpenDisputeModal from "@/modules/dashboard/modals/open-dispute-modal"
import Button from "@/modules/common/components/button"
import GoBack from "@/modules/dashboard/components/go-back"
import DashboardLayout from "@/modules/dashboard/components/layout"
import Status from "@/modules/dashboard/components/status"
import { openDispute, sendMessage } from "utils/data"

// images
import sendMessageIcon from "@/public/asset/icon/send-message.png"


const TransactionDetails = () => {
    const [showDisputeModal, setShowDisputeModal] = useState(false)
    return (
        <DashboardLayout>
            <>
                <OpenDisputeModal {...{ showDisputeModal, setShowDisputeModal }} />
                <section className="layout-container max-w-[700px] pt-8">
                    <GoBack />
                    <h1 className="mt-[29px] capitalize font-satoshiBold text-[15px] md:text-xl leading-5 md:leading-[27px] text-[#192839]">transaction details</h1>

                    <div className="mt-6 mb-10 space-y-4 text-sm leading-[18px] font-satoshiRegular capitalize text-b2">
                        <div className="flex justify-between">
                            <div>Amount($)</div>
                            <div>$1,000</div>
                        </div>
                        <div className="flex justify-between">
                            <div>date</div>
                            <div>22 Jun, 2022, 19:25PM</div>
                        </div>
                        <div className="flex justify-between">
                            <div>status</div>
                            <div><Status title="pending" className="w-20" /></div>
                        </div>
                    </div>

                    <Button
                        href={sendMessage}
                        icon={sendMessageIcon}
                        title="Send a message"
                        className="mb-5 text-white font-satoshiMedium text-base leading-[18px]"
                    />
                    <Button
                        onClick={() => setShowDisputeModal(true)}
                        title="open dispute"
                        className="bg-[#E0E7FF] text-primary font-satoshiMedium text-base leading-[18px]"
                    />
                </section>
            </>
        </DashboardLayout>
    )
}
export default TransactionDetails   