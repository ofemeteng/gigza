import { useContractContext } from "context/ContractContext"
import numeral from "numeral"
import { useEffect, useState } from "react"
import { formatUnit, initDaiContract } from "utils/helper"

const WalletBalance = () => {
    const [balance, setBalance] = useState<number>()
    //@ts-ignore
    const { account } = useContractContext()
    const getUserBalance = async () => {
        const response = await initDaiContract()
        //@ts-ignore
        const contract = await response.contract
        const accountBalance = await contract.balanceOf(account)
        setBalance(formatUnit(accountBalance))
    }

    useEffect(() => {
        getUserBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])
    return (
        <section className="layout-container max-w-[1126px] mt-20 md:mt-[100px] py-8 pl-6 rounded-lg border md:border-none border-[#F3F4F5]">
            <h5 className="capitalize text-sm md:text-[18px] leading-[19px] md:leading-6 font-satoshiRegular text-b4 mb-4 md:mb-1">wallet Balance</h5>
            <h1 className="font-satoshiBold text-2xl md:text-4xl leading-8 md:leading-[49px] text-[#0B0B27]">DAI {numeral(balance).format(',') || 0}</h1>
        </section>
    )
}

export default WalletBalance