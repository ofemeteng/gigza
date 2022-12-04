import { useState } from "react"
import { chatData } from "utils/data"
import ChatList from "./chat-list"
import SearchInbox from "./search-inbox"

const Inbox = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const data = chatData.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="w-screen md:w-auto">
            <div className="layout-container md:w-full md:mx-0 md:border border-[#F0F0F0] md:pt-6 md:pb-4 md:px-5">
                <div className="flex items-center space-x-2 mb-[21px]">
                    <h1 className="capitalize text-xl leading-[21px] text-[#101828] font-satoshiBold">inbox</h1>
                    <span className="px-2 py-1 capitalize text-primary text-[13px] leading-4 font-satoshiRegular rounded-2xl bg-[#E0E7FF]">2 new</span>
                </div>

                {/* search */}
                <SearchInbox {...{ handleTextChange, searchQuery }} />
                <ChatList {...{ data }} />
            </div>
        </div>
    )
}

export default Inbox