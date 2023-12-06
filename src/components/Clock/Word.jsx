import React from 'react'

export const Word = ({ value, hidden = false }) => {
  const getStyle = ()=> {
    return {
      visibility:  hidden ? 'hidden' : 'visible'
    }
  }
  return (
    <div className="inline-block relative font-['Digital-7']">
      <p className='w-full absolute text-[#242a32] z-0'>{value}</p>
      <p className='relative text-[#ebebeb] z-10' style={getStyle()}>{value}</p>
    </div>
  )
}