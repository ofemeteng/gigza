import React from 'react'
import { activeContracts } from 'utils/data'
import ContractItem from './contract-item'

const ActiveContracts = () => {
  return (
    <div className='space-y-5 pb-[151px]'>
      {
        activeContracts.map((item,index)=>(
          <ContractItem key={index} item={item} />
        ))
      }
    </div>
  )
}

export default ActiveContracts