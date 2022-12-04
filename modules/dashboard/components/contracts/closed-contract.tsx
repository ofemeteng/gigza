import React from 'react'
import { closedContracts } from 'utils/data'
import ContractItem from './contract-item'

const ClosedContract = () => {
    return (
        <div className='space-y-5 pb-[151px]'>
            {
                closedContracts.map((item, index) => (
                    <ContractItem
                        key={index}
                        item={item}
                    />
                ))
            }
        </div>)
}

export default ClosedContract