import Image from 'next/image'
import Button from '../components/button'

// images
import find1 from "@/public/asset/find-section/find1.svg"
import find2 from "@/public/asset/find-section/find2.svg"

const Find = () => {

    const FindText = (heading: string, text: string, buttonTitle: string, link:string) => (
        <div className="mt-5">
            <h2 className="text-b1 font-satoshiBold text-2xl lg:text-5xl lg:leading-[65px]">{heading}</h2>
            <p className="py-6 text-b3 font-satoshiRegular text-base lg:text-2xl leading-[22px]">{text}</p>
            <Button href={link} title={buttonTitle} className='w-[196px]' />
        </div>
    )
    return (
        <section className='mt-6 md:mt-20 pt-6 md:pt-0 pb-6 md:pb-20'>
            <div className="layout-container">
                <div className="md:grid grid-cols-2 md:items-center md:gap-x-10 lg:gap-x-[88px]">
                    {/* image */}
                    {/* <div className="relative h-[222px] md:h-[238px] lg:h-[438px]">
                        <Image src={find1} alt="" layout='fill' className='object-fill' />
                    </div> */}
                    <div>
                        <Image src={find1} alt="" layout='responsive' />
                    </div>
                    {
                        FindText(
                            "Find opportunities for every stage of your freelance career",
                            "Meet clients  you are exicited to work with and take your work to the next level",
                            "find opportunities",
                            '/dashboard/find-work'
                        )
                    }
                </div>

                <div className="mt-8 md:mt-20 md:grid grid-cols-2 md:gap-x-10 lg:gap-x-[88px] md:items-center">
                    {/* image */}
                    {/* <div className="relative h-[316px] order-1 lg:h-[510px] error">
                        <Image src={find2} alt="" layout='fill' className='object-fill' />
                    </div> */}
                    <div className='order-1'>
                        <Image src={find2} alt="" layout='responsive' />
                    </div>
                    {
                        FindText(
                            "Hire talents your way",
                            "Work with the largest network of independent professional and get things done.",
                            "post a job",
                            '/dashboard/hire'
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Find