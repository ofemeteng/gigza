import React, { useState } from 'react'
import Button from '@/modules/common/components/button'
import CheckBox from '@/modules/common/components/check-box'
import { specialtiesOptions } from 'utils/data'

const FilterTalentListForm = () => {
    const [checkedState, setCheckedState] = useState<boolean[]>(
        new Array(specialtiesOptions.length).fill(false)
    );

    const ratings = Array.from(Array(6).keys())
    // change for checkbox
    const handleOnChange = (position: number) => {
        console.log(position)
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState)
        const _support_types = updatedCheckedState.map((item, index) => item === true ? specialtiesOptions[index] : null).filter(item => item !== null)
        // @ts-ignore
        // setFormData({ ...formData, support_types: _support_types })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <h3 className="capitalize font-satoshiMedium text-base leading-[21px] text-[#101828]">ratings</h3>
                <div className="flex flex-col space-y-[17px] mt-[17px] border-b border-[#F0F0F0] pb-5">
                    {
                        ratings.map((item, index)=>(
                            <CheckBox
                            key={index}
                            value={item}
                            onChange={() => handleOnChange(index)}
                            checked={checkedState[index]}
                            rating
                        />
                        ))
                    }
                </div>
            </div>
            <div className="mt-4 flex flex-col space-y-[17px]">
                {
                    specialtiesOptions.map((item, index) => (
                        <CheckBox
                            key={index}
                            value={item}
                            onChange={() => handleOnChange(index)}
                            checked={checkedState[index]}
                        />
                    ))
                }
            </div>

            <Button
                title="filter results"
                className="mt-7"
            />
        </form>)
}

export default FilterTalentListForm