import { useState } from "react";
import CheckBox from "@/modules/common/components/check-box";
import { budgetOptions, specialtiesOptions } from "utils/data";
import { randomTextGenerator } from "utils/helper";
import Button from "@/modules/common/components/button";



const FilterProjectForm = () => {
    const [checkedState, setCheckedState] = useState<boolean[]>(
        new Array(specialtiesOptions.length).fill(false)
    );
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

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-[17px]">
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
            <h3 className="mb-[18px] mt-8 text-base leading-[21px] font-satoshiMedium capitalize">Budget</h3>
            <div className="space-y-[17px]">
                {
                    budgetOptions.map((item, index=randomTextGenerator()) => (
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
        </form>
    )
}

export default FilterProjectForm