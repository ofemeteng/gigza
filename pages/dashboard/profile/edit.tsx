import { useState } from "react"
import DashboardLayout from "@/modules/dashboard/components/layout"
import Button from "@/modules/common/components/button"
import TextInput from "@/modules/dashboard/components/input/text-input"
import TextArea from "@/modules/dashboard/components/input/text-area"
import TagInput from "@/modules/dashboard/components/input/tag-input"
// import ProfileUpload from "@/modules/dashboard/components/profile-upload"
import toast from "react-hot-toast"
import { initGigzaContract } from "utils/helper"
import { useContractContext } from "context/ContractContext"
import Router, { useRouter } from "next/router"



const EditProfile = () => {
    const initialFormData = {
        name: '',
        bio: '',
        skills: [''],
        mainSkill: '',
        profileUrl: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const [isCreatingProfile, setIsCreatingProfile] = useState(false)
    const router = useRouter()
    // @ts-ignore
    const { account } = useContractContext()

    // const handleFile = (file: any) => setFormData(
    //     prev => ({
    //         ...prev,
    //         avatar: file
    //     })
    // )

    const handleTag = (tag: string[]) => {
        setFormData(prev => ({
            ...prev,
            skills: tag
        }))
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const notification = toast.loading('Please wait...Updating profile')

        try {
            const response = await initGigzaContract()
            // @ts-ignore
            const contract = response.contract
            const txHash = await contract.createProfile(
                formData.name,
                formData.bio,
                formData.mainSkill,
                formData.skills,
                `https://avatars.dicebear.com/api/pixel-art/${account}.svg`
            )
            const receipt = await txHash.wait()
            if (receipt) {
                setIsCreatingProfile(false)
                toast.success("Profile has been updated", {
                    id: notification
                })
                setFormData(initialFormData)
                router.push('/dashboard/profile')
            }
        } catch (error) {
            setIsCreatingProfile(false)
            toast.error("Opps! Something went wrong.", {
                id: notification
            })
        }
    }


    return (
        <DashboardLayout>
            <div className="mt-[27px] pt-6 pb-[81px] layout-container max-w-[1078px]">
                <h1 className="text-xl text-[#192839] leading-[27px] capitalize font-satoshiBold">edit profile</h1>
                <form onSubmit={handleSubmit}>
                    {/* <ProfileUpload {...{ handleFile }} /> */}
                    <div className="space-y-8 mt-8">
                        <TextInput
                            type='text'
                            name='name'
                            placeholder="Enter name"
                            label='name'
                            id='name'
                            value={formData.name}
                            handleTextChange={handleTextChange}
                            required
                        />
                        <TextArea
                            id="bio"
                            name="bio"
                            label="bio"
                            placeholder="Tell us about yourself"
                            className="h-[152px]"
                            value={formData.bio}
                            handleTextChange={handleTextChange}
                            required
                        />
                        <TagInput
                            type="text"
                            label="skills"
                            id="skills"
                            name="skills"
                            handleTag={handleTag}
                            // value={formData.skills}
                            placeholder="Ex. Product Design, No-code, ReactJS"
                        />
                        <TextInput
                            type='text'
                            name='mainSkill'
                            placeholder="Enter your main skill"
                            label='main skill'
                            id='mainSkill'
                            value={formData.mainSkill}
                            handleTextChange={handleTextChange}
                            required
                        />
                        {/* <TextInput
                            type='text'
                            name='profileUrl'
                            placeholder="Enter a link to your profile avatar"
                            label='Profile Avatar Url'
                            id='profileUrl'
                            value={formData.profileUrl}
                            handleTextChange={handleTextChange}
                            required
                        /> */}
                        <Button
                            title="save changes"
                            className="w-[163px] ml-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
                            disabled={isCreatingProfile}
                        />
                    </div>

                </form>
            </div>
        </DashboardLayout>
    )
}

export default EditProfile