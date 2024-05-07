import React, { useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../search-bar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    const handleSearch = () => {
        if(searchQuery){
            onSearchNote(searchQuery);
        }
    }

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    }


    return (
        <nav className='bg-white flex items-center justify-between gap-4 py-2 w-[80%] mx-auto'>
            <h2 className='text-xl font-medium text-black py-2 select-none'>
                <Link to='/dashboard'>Notes</Link>
            </h2>
            <SearchBar
            value={searchQuery}
            onChange={({target}) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            />

            <ProfileInfo
            userInfo={userInfo}
            onLogout={onLogout}
            />

        </nav>
    )
}

export default Navbar