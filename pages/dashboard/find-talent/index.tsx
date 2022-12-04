import React, { useState } from "react"
import SearchInput from "@/modules/dashboard/components/input/search-input"
import DashboardLayout from "@/modules/dashboard/components/layout"
import Button from "@/modules/common/components/button"
import Image from "next/image"
import TalentList from "@/modules/dashboard/components/talent-list"
import FilterTalentList from "@/modules/dashboard/components/filter-talent-list"
import FilterTalentListModal from "@/modules/dashboard/modals/filter-talent-list-modal"

// images
import filterIcon from '@/public/asset/icon/filter.png'

const FindTalent = () => {

  const initialFormData = {
    search: "",
  }

  const [formData, setFormData] = useState(initialFormData)

const [showFilterTalentModal, setShowFilterTalentModal] = useState(false)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
  }
  const handleShowFilterTalent = () => setShowFilterTalentModal(true)

  return (
    <DashboardLayout>
      <FilterTalentListModal {...{showFilterTalentModal, setShowFilterTalentModal}}/>
      <main className="layout-container pt-[34px] pb-10 md:pt-12 md:pb-20">
        <div className="text-center mb-4 md:mb-10">
          <h1 className="text-xl md:text-[40px] leading-[27px] md:leading-[54px] capitalize text-b1 font-satoshiBold mb-2">Hire talents</h1>
          <p className="text-b3 text-sm md:text-base leading-[19px] md:leading-[22px] font-satoshiRegular">Find the world's best professionals on Gigza</p>
        </div>

        <form onSubmit={handleSubmit} className='w-full mb-[43px] md:mb-16'>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 md:w-4/5 max-w-[688px] mx-auto">
            <div className="flex items-center space-x-6 md:space-x-0 md:w-full">
              <SearchInput
                placeholder="Search for talents"
                handleTextChange={handleTextChange}
                value={formData.search}
              />
              <div onClick={handleShowFilterTalent} className="flex items-center justify-center bg-[#F3F3F4] rounded-lg shadow-[0px_6px_60px_#F3F3F4] border border-[#F0F0F0] md:hidden h-[50px] w-[50px]">
                <Image src={filterIcon} alt="" />
              </div>
            </div>
            <Button title="search" className="mt-4 md:mt-0 w-[196px]" />
          </div>
        </form>

        <div className="md:grid grid-cols-[2fr_1fr] md:gap-x-10 max-w-[1164px] mx-auto">
          <TalentList />
          <FilterTalentList />
        </div>
      </main>
    </DashboardLayout>
  )
}

export default FindTalent