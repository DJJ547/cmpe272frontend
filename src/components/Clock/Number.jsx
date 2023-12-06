import React from 'react'

export const Number = ({value = 0}) => {
  const result = String(value).padStart(2, "0");
  return (
      <div className="inline-block relative font-['Digital-7']">
        <p className='w-full absolute text-[#242a32] z-0'>88</p>
        <p className='relative text-[#ebebeb] z-10'>{result}</p>
      </div>
  )
}