import React, { useState } from 'react'
import SearchInput from '../input/search-input'

type Props = {
    handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string;
}

const SearchInbox = ({ handleTextChange, searchQuery }: Props) => {

    return (
        <SearchInput
            placeholder="Search for chat"
            value={searchQuery}
            handleTextChange={handleTextChange}
        />
    )
}

export default SearchInbox