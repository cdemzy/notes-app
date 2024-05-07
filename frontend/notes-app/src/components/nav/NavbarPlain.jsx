import React from 'react'
import { Link } from 'react-router-dom'

const NavbarPlain = () => {
    return (
        <div className='bg-white flex items-center justify-between py-2 w-[80%] mx-auto'>
            <h2 className='text-xl font-medium text-black py-2 select-none'>
                <Link to='/'>Notes</Link>
            </h2>
        </div>
    )
}

export default NavbarPlain