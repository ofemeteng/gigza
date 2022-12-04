import Stars from "@/modules/dashboard/components/stars"

type CheckboxProps = {
    value: string | number,
    onChange: VoidFunction,
    checked?: boolean,
    rating?: boolean
}


const CheckBox = ({ value, onChange, checked, rating }: CheckboxProps) => {
    return (
        <label className="checkbox-container text-base leading-[22px] capitalize text-[#475467] font-satoshiRegular">
            <input type="checkbox" value={value} onChange={onChange} checked={checked} />
            <span className="checkmark"></span>
            {
                rating ?
                    (
                        <Stars reviews={Number(value)}/>
                    ) :
                    (
                        <p>
                            {value}
                        </p>
                    )
            }

        </label>
    )
}

export default CheckBox