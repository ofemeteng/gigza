import Image from "next/image"
import { talentMarketData } from "utils/data/talent-market.data"

const TalentMarket = () => {
    return (
        <section className="bg-[#E1DFFF] py-[56px]">
            <div className="layout-container">
                <div className="text-center mb-12">
                    <h1 className="primary-2 mb-3 font-satoshiBold text-2xl md:text-5xl md:lading-[65px]">Talent market place globally</h1>
                    <p className="text-b3 text-base leading-[22px] md:text-xl md:leading-[30px] max-w-[958px] mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis vitae ligula gravida mauris, lectus. Penatibus enim mattis sit a. Maecenas interdum at id etiam est tempus. Nisi, pellentesque aenean justo cras tempus. Mauris in nec integer elementum sit. Massa faucibus sed ligula facilisi.</p>
                </div>

            <div className="md:grid grid-cols-3">
                    {
                        talentMarketData.map((item, index) => (
                            <div key={index} className={`${index === 1 ? 'even-box' : "bg-[#6159E8]"}  py-10 px-6 text-white first:rounded-t-md md:first:rounded-none md:first:rounded-l-md last:rounded-b-md md:last:rounded-none md:last:rounded-r-md`}>
                                <Image src={item.icon} />
                                <h1 className="mt-6 mb-[7px]  capitalize font-satoshiBold text-xl leading-[27px] md:text-2xl">{item.heading}</h1>
                                <p className="text-base font-satoshiRegular leading-[22px]">{item.text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default TalentMarket