import { useState } from "react"
import DashboardLayout from "@/modules/dashboard/components/layout"
import ActiveContracts from "@/modules/dashboard/components/contracts/active-contract"
import ClosedContract from "@/modules/dashboard/components/contracts/closed-contract"

const Contracts = () => {
    const sections = ['Active contracts', 'closed contracts']
    const [activeSection, setActiveSection] = useState(0)
    const changeActiveSection = (index: number) => setActiveSection(index)
    return (
        <DashboardLayout>
            <div className="layout-container max-w-[1126px] pt-[27px] md:pt-10">

                <h1 className="text-b1 capitalize text-xl md:text-2xl leading-[27px] md:leading-8 font-satoshiBold">contracts</h1>

                <div className="flex mt-6 mb-8 md:mb-7">
                    {
                        sections.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => changeActiveSection(index)}
                                className={`capitalize font-satoshiRegular cursor-pointer text-[13px] md:text-base  text-center md:text-left leading-[18px] pb-2 border-b-2  md:px-2 ${index === 0 ? 'flex-1 md:flex-none  md:w-[147px]' : 'flex-1 '} ${activeSection === index ? 'text-[#2F2A89] border-primary'  : 'text-b4 border-b4'}`}
                            >
                                {item}
                            </div>
                        ))
                    }
                </div>

                <section className="">
                    {
                        activeSection === 0 ? <ActiveContracts />  : <ClosedContract />
                    }
                </section>
            </div>
        </DashboardLayout>
    )
}

export default Contracts