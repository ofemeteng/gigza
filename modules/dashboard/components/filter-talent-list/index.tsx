import FilterTalentListForm from "./filter-talent-list-form"

const FilterTalentList = () => {
    return (
        <aside className="hidden md:block">
            <div className="w-[276px] border px-6 border-[#F0F0F0] py-6 ml-auto md:sticky md:top-[100px]">
                <h3 className="mb-[13px] text-base md:text-xl leading-[21px] text-[#101828] font-satoshiMedium capitalize">filter</h3>

                <FilterTalentListForm />
            </div>
        </aside>
    )
}

export default FilterTalentList