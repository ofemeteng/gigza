import { useRef, useState } from "react";
import Button from "@/modules/common/components/button"

// images
import attachIcon from '@/public/asset/icon/attach-icon.svg'

type Props = {
    handleFile: (item:any) => void;
}

type FileImageProp = {
    src: string;
    alt: string
}

const AttachFile = ({handleFile}: Props) => {
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
    return (
        <div>
            <div>
                <Button
                    onClick={handleClick}
                    icon={attachIcon}
                    title="Attach files"
                    disabled={fileImage}
                    className='w-full font-satoshiBold border text-b2 bg-transparent border-[#E8E8EF] disabled:cursor-not-allowed'
                />
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    className="hidden"
                />
            </div>
            <p>{fileImage?.alt ? fileImage.alt : null}</p>
        </div>
    )
}

export default AttachFile