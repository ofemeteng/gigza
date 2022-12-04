import NotificationItem from '.'
import { useRouter } from 'next/router';

// images
import messagingIcon from '@/public/asset/icon/message.png'

type Props = {
    isActive?: boolean;
}

const MessagingNotification = ({ isActive }: Props) => {
    const router = useRouter()
    const handleClick = () => router.push('/dashboard/message')
    return (
        <NotificationItem type='message' icon={messagingIcon} {...{isActive, handleClick}}/>
    )
}

export default MessagingNotification