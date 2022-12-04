import Button from '@/modules/common/components/button'
import { hireTalents } from 'utils/data'

type Prop = {
    className?: string;
}

const HireClientButton = ({className}:Prop) => {
    return (
        <Button
            href={hireTalents}
            title='hire talents'
            className={`w-[134px] ml-auto ${className}`}
        />
    )
}

export default HireClientButton