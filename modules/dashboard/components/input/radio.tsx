type RadioProps = {
    value: string,
    id: string,
    name: string,
    handleChange: (event: React.FormEvent<HTMLInputElement>) => void,
    title: string,
    className?: string,
    checked?: boolean,
}

const Radio = ({ value, id, name, handleChange, title, className, checked }: RadioProps) => {
    return (
        <div className="inline-block relative px-[6px] font-Montserrat cursor-pointer ">
            {/* @ts-ignore */}
            <input
                type="radio"
                {...{ checked, value, id, name }}
                onChange={handleChange} className="hidden"
            />
            <label
                htmlFor={id}
                className={`${checked ? 'before:border-primary' : 'before:border-b3'} text-b2 text-sm leading-[19px] before:content-[''] before:relative before:inline-block before:w-6 before:h-6 before:mr-[10px] before:rounded-full before:bg-transparent before:border-2  before:top-[8px] ${className}`}>{title}</label>
        </div>
    )
}

export default Radio