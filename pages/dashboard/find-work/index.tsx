import { useState } from 'react'
import Button from '@/modules/common/components/button'
import DashboardLayout from '@/modules/dashboard/components/layout'
import NewProjectList from '@/modules/dashboard/components/new-project-list'
import FilterProjectList from '@/modules/dashboard/components/new-project-list/filter-project-list'
import { HireClientButton } from '@/modules/dashboard/components/button'
import FilterProjectListModal from '@/modules/dashboard/modals/filter-project-list-modal'


// images
import filterIcon from '@/public/asset/icon/filter.png'

const FindWork = () => {
    const [showFilterModal, setShowFilterModal] = useState(false)
    const handleShowModal = () => setShowFilterModal(true)
    return (
        <DashboardLayout>
            <FilterProjectListModal {...{ showFilterModal, setShowFilterModal }} />
            <>
                <div className="layout-container max-w-[1164px] pt-[25px] md:pt-10 lg:pt-[51px] pb-10 md:pb-[139px]">

                    <div className="flex items-end justify-between mb-7">
                        <div>
                            <h1 className='font-satoshiBold text-xl md:text-[32px] md:leading-[43px] leading-[27px] text-[#101828]'>Recent new projects</h1>
                            <p className="mt-2 text-sm leading-[19px] text-[#667085]">36 new projects posted today</p>
                        </div>
                        <div>
                            {/* hire talents */}
                            <HireClientButton className='mb-[18px] md:w-[196px]' />

                            {/* filter button */}
                            <Button
                                title='filter'
                                icon={filterIcon}
                                className="border-[#D9D9D9] border rounded bg-white w-[97px] ml-auto text-b2 md:hidden"
                                onClick={handleShowModal}
                            />
                        </div>
                    </div>



                    <div className="md:grid grid-cols-[2fr_1fr] md:gap-x-10 lg:gap-x-[78px]">
                        <NewProjectList />
                        <FilterProjectList />
                    </div>
                </div>
            </>
        </DashboardLayout >
    )
}

export default FindWork

