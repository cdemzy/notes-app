import React from 'react'
import encrpyt from '../../assets/images/security/encrypt.gif'
import hash from '../../assets/images/security/hash.png'


const Encrpytion = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-[50vh]'>

        <section className='w-[80%] sm:w-[500px] flex flex-col text-center items-center pb-5'>
            <h2 className='text-3xl md:text-4xl text-center font-bold pb-2'>Your Information is safe</h2>
            <h3 className='w-[80%] sm:w-[400px] text-sm sm:text-base text-gray-500 '>Notes uses hashing algorithms to ensure your credentials and notes are secure for saving your valuable information in our databases.</h3>
        </section>

        <img src={ encrpyt } alt="lock encrpytion animation" className='w-96 rounded-3xl' />
        
    </div>

    </>
  )
}

export default Encrpytion