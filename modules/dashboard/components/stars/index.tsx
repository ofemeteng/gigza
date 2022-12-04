import reviewStar from '@/public/asset/icon/colored-star.png'
import star from '@/public/asset/icon/star.png'
import Image from 'next/image';

type Props = {
    reviews: number;
    className?: string;
    handleReview?: (index: number) => void;
}

const Stars = ({ reviews, className, handleReview }: Props) => {
    return (
        <div className={`flex items-center space-x-[3px] ${className}`}>
            {
                Array(5).fill('').map((_, index) => (
                    <div key={index} className={`${handleReview ? 'cursor-pointer' : null }`} onClick={() => handleReview?.(index + 1)}>
                        <Image key={index} src={index + 1 > reviews ? star : reviewStar} alt="" width={handleReview ? 32 : 12} height={handleReview ? 32 : 12} />
                    </div>
                ))
            }
        </div>
    )
}

export default Stars