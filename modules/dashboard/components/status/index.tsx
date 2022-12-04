type Props = {
    title: string;
    className?: string;
}

const Status = ({title, className}:Props) => {
  return (
    <p className={`md:h-9 md:w-[86px] capitalize flex items-center justify-center rounded-lg ${title.toLowerCase() === 'pending' ? 'text-[#F29B4F] bg-[#F29B4F]/10' : 'text-[#209653] bg-[rgb(32_150_83)] bg-opacity-10'} ${className}`}>{title}</p>
  )
}

export default Status