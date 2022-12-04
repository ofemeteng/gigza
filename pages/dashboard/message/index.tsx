import DashboardLayout from "@/modules/dashboard/components/layout"
import MessageContainer from "@/modules/dashboard/components/message/message-container"
import { MessageContextProvider } from "@/modules/dashboard/store/message-context"

const Message = () => {
    return (
        <MessageContextProvider>
            <DashboardLayout>
                <MessageContainer />
            </DashboardLayout>
        </MessageContextProvider>

    )
}

export default Message