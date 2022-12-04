import Image from "next/image"
import Button from "../components/button"

// images
import hero from '@/public/asset/hero/hero.png'

const Hero = () => {
    return (
        <section className="mt-[45px] md:mt-[100px]">
            <div className="layout-container md:grid grid-cols-2 md:items-center lg:gap-x-[27px]">
                <div className="mb-8 md:mb-0">
                    <h1 className="font-satoshiBold text-3xl lg:text-4xl leading-[49px] xl:text-[52px] xl:leading-[68px] ">Gigza market place is <span className="text-primary block">the future of work</span></h1>
                    <p className="text-base lg:text-[23px] leading-[22px] lg:leading-[31px] text-b3 my-[18px]">Gigza is a permisionless decentralized freelancing marketplace that allows anyone to post a job and get help from freelancers with the requisite skills.</p>
                    <Button title="get started" className="w-[196px] rounded" href='/dashboard/find-work' />
                </div>
                <div className="">
                    <Image src={hero} alt="" layout="responsive" className="w-full h-full" />
                </div>
            </div>
        </section>
    )
}

export default Hero