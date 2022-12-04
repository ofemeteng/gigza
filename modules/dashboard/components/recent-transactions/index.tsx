import Image from "next/image"
import Link from "next/link"
import { recentTransactionHeading, recentTransactions } from "utils/data"
import Status from "../status"

const RecentTransactions = () => {
    return (
        <section className="mt-6 md:mt-[54px]">
            <div className="layout-container max-w-[1126px] md:p-6">
                <h3 className="text-[15px] md:text-xl capitalize leading-5 md:leading-[27px] font-satoshiBold text-[#192839] mb-4 md:mb-6">recent transactions</h3>

                {/* recent transaction */}
                {/* table heading */}
                <div className="grid grid-cols-4 gap-x-5 md:gap-x-10 border-b border-[#F0F0F0]">
                    {
                        recentTransactionHeading.map((item, index) => (
                            <div key={index} className="capitalize text-b3 py-[13px] text-[11px] md:text-sm leading-[18px] font-satoshiMedium">{item}</div>
                        ))
                    }
                </div>
                {/* data */}
                <div className="h-[300px] overflow-y-auto">
                    <>
                        {
                            recentTransactions.map((item, index) => (
                                <Link href={`/dashboard/wallet/${index}`} key={index} >
                                    <a className="grid grid-cols-4 border-b border-[#F0F0F0] capitalize text-b1 text-[11px] md:text-base leading-5 font-satoshiRegular py-2 md:py-[10px] gap-x-5 md:gap-x-10">
                                        <>
                                            <div className="md:flex items-center md:space-x-2">
                                                <div className="hidden md:block" >
                                                <Image src={item.avatar} alt=""/>
                                                </div>
                                                <p>{item.name}</p>
                                            </div>
                                            <div>{item.amount}</div>
                                            <div>{item.date}</div>
                                            <div className="font-satoshiMedium">
                                                <Status title={item.status} />
                                            </div>
                                        </>
                                    </a>
                                </Link>
                            ))
                        }
                    </>
                </div>
            </div>
        </section>
    )
}

export default RecentTransactions