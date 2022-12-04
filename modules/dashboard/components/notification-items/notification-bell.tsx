import { useRouter } from 'next/router';
import NotificationItem from '.';

// images
import bellIcon from '@/public/asset/icon/bell.png'


type Props = {
  isActive?: boolean;
}

const NotificationBell = ({ isActive }: Props) => {
  const router = useRouter()
  const handleClick = () => router.push('/dashboard/message')

  return (
    <NotificationItem type='notification' icon={bellIcon} {...{ isActive, handleClick }} />
  )
}

export default NotificationBell