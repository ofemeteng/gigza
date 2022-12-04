import Image, { StaticImageData } from "next/image"
import { useMessageStoreContext } from "../../store/message-context"

type ChatListProps = {
    data: {
        avatar: StaticImageData,
        name: string,
        chat: string,
        unreadMessages: number,
        time: string,
        onlineStatus: boolean,
    }[],
}


const ChatList = ({ data }: ChatListProps) => {
    const { handleToggleTranslate } = useMessageStoreContext()
    return (
        <div className="space-y-[13px] mt-4  error">
            {
                data.map((item, index) => (
                    <div key={index} onClick={handleToggleTranslate} className="flex items-center py-3 border-b border-[#F0F0F0]">
                        <div className="flex items-center flex-1 space-x-2">
                            <Image src={item.avatar} alt='' width={40} height={40} />
                            <div className="space-y-2 font-satoshiMedium text-[#1F1F1F]">
                                <p className=" text-base leading-[22px] capitalize">{item.name}</p>
                                <p className="text-xs leading-4">{item.chat}</p>
                            </div>
                        </div>
                        <div className="space-y-[14px]">
                            <p className="text-[#8C8C8C] text-[10px] leading-3">{item.time}</p>
                            <div className="flex items-center justify-between">
                                {
                                    item.onlineStatus ? <div className="w-2 h-2 bg-[#90C37F] rounded-full" /> : null
                                }
                                {
                                    item.unreadMessages ?
                                        <span className="flex items-center ml-auto justify-center bg-primary rounded-[32px] h-[14px] w-[14px] text-[10px] leading-[14px] text-white">{item.unreadMessages}</span> :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ChatList