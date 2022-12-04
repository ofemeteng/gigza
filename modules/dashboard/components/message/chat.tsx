import React, { useState } from 'react'
import Image from 'next/image'
import { useMessageStoreContext } from '../../store/message-context'


// images
import arrowLeftIcon from '@/public/asset/icon/arrow-left-black.png'
import avatar from '@/public/asset/faces/1.png'
import one from '@/public/asset/faces/2.png'
import sendIcon from '@/public/asset/icon/send.png'

const Chat = () => {
    const initialFormData = {
        message: ''
    }
    const { handleToggleTranslate } = useMessageStoreContext()
    const [formData, setFormData] = useState(initialFormData)

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        setFormData(initialFormData)
    }

    const chatMessages = [
        {
            name: 'you',
            text: 'Hi, about the project it is about a transfer',
            avatar,
        },
        {
            name: 'me',
            text: 'The great benefits of Monito is it gives a snapshot of the current money transfer offers and trends.',
            avatar: one,
        },
        {
            name: 'you',
            text: 'Monito has given me a complete and reliable summary to pick the best choice in providers.',
            avatar,
        },
        {
            name: 'you',
            text: 'Monito has given me a complete and reliable summary to pick the best choice in providers.',
            avatar,
        },
        {
            name: 'me',
            text: 'i have finished the payment and I am requesting for payment, can you please confirm the payment.',
            avatar: one,
        },

    ]
    return (
        <div className='w-screen md:w-auto -mt-8 md:mt-0'>
            <div className="border-b border-[#F0F0F0] py-2">
                <div className="layout-container">
                    <div className="flex items-center space-x-2">
                        <div className="md:hidden">
                            <Image src={arrowLeftIcon} alt="" onClick={handleToggleTranslate} />
                        </div>
                        <div>
                            <Image src={avatar} alt="" width={40} height={40} />
                        </div>
                        <p className='font-satoshiMedium text-base leading-[22px] text-[#1F1F1F]'>Mmasirichukwu Peter</p>
                    </div>
                </div>
            </div>

            <div className="layout-container">
                {/* chat */}
                <div className='space-y-8 mt-4'>
                    {
                        chatMessages.map((item, index) => (
                            <div key={index} className="grid grid-flow-col gap-x-2">
                                <div className={` ${item.name.toLowerCase() === 'me' ? 'order-1' : null}`}>
                                    <Image src={item.avatar} width={40} height={40} />
                                </div>
                                <div className={`p-3 font-satoshiRegular text-sm leading-[18px] ${item.name.toLowerCase() === 'me' ? 'text-white bg-[#657795] rounded-tl-lg rounded-br-lg rounded-bl-lg' : 'text-b1 bg-[#E5E5E5] rounded-tr-lg rounded-br-lg rounded-bl-lg'}`}>{item.text}</div>
                            </div>
                        ))
                    }
                </div>
                {/* send message */}
                <form onSubmit={handleSubmit} className='flex items-center space-x-3 mt-5 border border-[#F0F0F0] rounded-md py-2 px-3'>
                    <input
                        type="text"
                        placeholder='Write a message'
                        onChange={handleTextChange}
                        className='focus:outline-none flex-1'
                        name='message'
                        value={formData.message}
                    />
                    <button className=''>
                        <Image src={sendIcon} alt="" width={32} height={32} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat