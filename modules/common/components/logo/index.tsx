import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/asset/navbar/logo.svg'

const Logo = () => {
    return (
        <Link href='/'>
            <a className='h-6 md:h-8 w-[96px] md:w-[126px]'>
                <Image src={logo} alt="" layout='responsive' />
            </a>
        </Link>
    )
}

export default Logo