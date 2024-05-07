import React from 'react'
import { Link } from 'react-router-dom'

const NavbarHome = () => {
    return (
        <nav className='flex items-center justify-between py-2 mx-auto z-50 w-[80%]'>
            <h2 className='text-xl font-medium text-black py-2 select-none'>
                <Link to='/'>Notes</Link>
                
            </h2>
            <div className='flex gap-3 justify-center items-center'>
                <Link to='/login' className='text-sm'>Login</Link>
                <Link to='/signup' className='text-sm border border-blue-500 p-2 rounded-xl bg-gradient-to-br from-blue-500 to-green-600 font-medium text-white transition-all duration-300 hover:rounded-3xl hover:scale-110'>New User?</Link>
            </div>
        </nav>
    )
}

export default NavbarHome;