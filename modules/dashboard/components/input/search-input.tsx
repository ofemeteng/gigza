import searchIcon from '@/public/asset/icon/search.png'
import Image from 'next/image';

type Props = {
  placeholder: string;
  value: string;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput = ({ placeholder, value, handleTextChange }: Props) => {
  return (
    <div className="flex items-center w-full bg-[#FCFCFC] border border-[#E8E8EF] rounded-[6px] py-[15px] px-[13px] space-x-[11px]">
      <div className='flex items-center'>
        <Image src={searchIcon} alt="" />
      </div>
      <input
        type="text"
        {...{ placeholder, value }}
        name='search'
        onChange={handleTextChange}
        className="focus:outline-none bg-transparent placeholder:text-[#9696B4] text-sm leading-[20px] w-full"
      />

    </div>
  )
}

export default SearchInput