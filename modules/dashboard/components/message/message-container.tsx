import { useMessageStoreContext } from '../../store/message-context'
import Chat from './chat'
import Inbox from './inbox'

const MessageContainer = () => {
    const { toggleTranslate } = useMessageStoreContext()

    return (
        <div className="pt-[34px] pb-16 h-[]">
            <div className={`md:layout-container md:grid grid-flow-col md:grid-cols-2  ${toggleTranslate ? '-translate-x-full md:translate-x-0' : null}`}>
                <Inbox />
                <Chat />
            </div>
        </div>
    )
}

export default MessageContainer