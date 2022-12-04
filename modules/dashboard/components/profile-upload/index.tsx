import React, { useRef, useState } from "react"
import Button from "@/modules/common/components/button"
import Image from "next/image"

// images
import noAvatar from "@/public/asset/faces/empty-avatar.png"

type Props = {
    handleFile: (item:any) => void;
}

type FileImageProp = {
    src: string;
    alt: string
}

const ProfileUpload = ({ handleFile }: Props) => {
    const [fileImage, setFileImage] = useState<FileImageProp | null>(null);

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (hiddenFileInput.current !== null && !fileImage) {
            hiddenFileInput.current.click()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.currentTarget.files != null) {
            const fileUploaded = e?.currentTarget?.files[0]
            // if (!fileImage) {
                setFileImage({
                    src: URL.createObjectURL(fileUploaded),
                    alt: fileUploaded.name,
                });
            // }
            handleFile(fileUploaded)
            console.log(typeof fileUploaded)
        }
    }

    // const handleRemoveFile = () => {
    //     setFileImage({})
    //     handleFile(null)
    // }

    return (
        <div className="mt-8 flex justify-between items-center lg:justify-start lg:space-x-6">
            <div className="relative w-16 h-16">
                <Image src={fileImage?.src ? fileImage.src : noAvatar} layout="fill" className="object-cover" alt="" />
            </div>
            <div>
                <Button
                    onClick={handleClick}
                    title="upload photo"
                    disabled={fileImage}
                    className='w-[163px] font-satoshiBold border text-b2 bg-transparent border-[#E8E8EF] disabled:cursor-not-allowed'
                />
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    className="hidden"
                />
            </div>
        </div>)
}

export default ProfileUpload