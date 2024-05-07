import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-24 select-none'>
        <img src={imgSrc} alt="No Notes" className='w-60 select-none'/>
        <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-10'>{message}</p>
    </div>
  )
}

export default EmptyCard