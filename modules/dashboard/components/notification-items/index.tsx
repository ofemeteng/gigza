import Image, { StaticImageData } from 'next/image'

// images
import notificationIcon from '@/public/asset/icon/notification-status.png'


type Props = {
  isActive?: boolean;
  icon: StaticImageData;
  handleClick: VoidFunction;
  type: 'message' | 'notification'
}

const NotificationItem = ({ isActive, type, icon, handleClick }: Props) => {
  return (
    <div onClick={handleClick} className='relative hover:cursor-pointer'>
      <div className='w-[14px] h-[14px]'>
        <Image src={icon} layout="responsive" alt="" />
      </div>
      {
        isActive ? (
          <div className={`absolute ${type === 'message' ? '-right-[2px] -top-[14px]' : '-top-[14px] right-0'} `}>
            <Image src={notificationIcon} alt="" />
          </div>
        ) : null
      }
    </div>
  )
}

export default NotificationItem