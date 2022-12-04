import React, { useReducer } from "react"
import Button from "@/modules/common/components/button"
import Select from "@/modules/dashboard/components/input/select"
import TagInput from "@/modules/dashboard/components/input/tag-input"
import TextArea from "@/modules/dashboard/components/input/text-area"
import TextInput from "@/modules/dashboard/components/input/text-input"
import DashboardLayout from "@/modules/dashboard/components/layout"
import { useRouter } from "next/router"
import { ACTION_TYPES, hireTalentReducer, INITIAL_STATE } from "@/modules/dashboard/reducers"

const HireTalents = () => {

    const [state, dispatch] = useReducer(hireTalentReducer, INITIAL_STATE)
    const timeLineOptions = ['2', '4 ', '6', '8']
    const router = useRouter()

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ACTION_TYPES.CHANGE_INPUT,
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const handleTag = (tag: string[]) => {
        dispatch({
            type: ACTION_TYPES.HANDLE_TAGS,
            payload: tag

        })
    }

    const handleSelect = (value: string) => {
        dispatch({
            type: ACTION_TYPES.CHANGE_INPUT,
            payload: {
                name: 'timeline',
                value,
            }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push({
            pathname: '/dashboard/hire/preview',
            query: {
                data: JSON.stringify(state)
            }
        })
        console.log(state)
    }

    return (
        <DashboardLayout>
            <div className="layout-container max-w-[1126px] pt-8 pb-[111px]">
                <h4 className="text-xl md:text-[28px] leading-[27px] md:leading-[38px] capitalize text-b1 font-satoshiBold">Hire Talents</h4>

                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <TextInput
                        type="text"
                        label="Project title*"
                        placeholder="Enter Title"
                        name="title"
                        id="projectTitle"
                        value={state.title}
                        handleTextChange={handleTextChange}
                        required
                    />

                    <TextArea
                        name="description"
                        id="projectDescription"
                        label="Describe your brief*"
                        placeholder="Enter Description"
                        value={state.description}
                        handleTextChange={handleTextChange}
                        className="h-[163px]"
                        required
                    />
                    <TagInput
                        label="What type of skills are you looking for? (up to 5)"
                        placeholder="Enter Skills"
                        handleTag={handleTag}
                        className="mt-[13px]"
                    />

                    <Select
                        headerTitle="timeline for project"
                        options={timeLineOptions}
                        defaultValue={state.timeline}
                        onChange={handleSelect}
                    />

                    <TextInput
                        type="number"
                        label="Budget"
                        name='amount'
                        id='budget'
                        value={state.amount}
                        placeholder="Enter Amount"
                        handleTextChange={handleTextChange}
                        required
                    />
                    <Button
                        title="Preview"
                        className="md:w-[196px]"
                    />
                </form>
            </div>
        </DashboardLayout>
    )
}

export default HireTalents
