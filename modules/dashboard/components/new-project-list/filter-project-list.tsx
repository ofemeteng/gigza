import { HireClientButton } from "../button"
import FilterProjectForm from "./filter-project-form"

const FilterProjectList = () => {

    return (
        <aside className="hidden md:block px-6">
            <div className="w-[276px] ml-auto md:sticky md:top-[100px]">
            <h3 className="mb-[13px] text-base leading-[21px] font-satoshiMedium capitalize">specialties</h3>
            <FilterProjectForm />
            </div>
        </aside>
    )
}

export default FilterProjectList