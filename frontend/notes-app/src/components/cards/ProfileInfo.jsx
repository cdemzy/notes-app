import React, { useState } from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ userInfo, onLogout }) => {

  const [open, setOpen] = useState(false);

  return (
    userInfo && (
    <div className='flex flex-col items-center gap-3'>
        <div 
          className='initials w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-300 hover:bg-slate-200 select-none active:bg-slate-400'
          onClick={() => setOpen(!open)}
        >
            {getInitials(userInfo.fullName)}
        </div>

        {open && 
          <ul className='animate-dropdown absolute w-[300px] mt-14 mr-[250px] bg-slate-100 p-4 rounded-md flex flex-col gap-2 border shadow-xl'>
            <li><p className='p-3 w-full rounded-lg font-medium border-b-2'>Hello, {userInfo.fullName}</p></li>
            <li>
              <button className='flex items-center hover:bg-slate-200 p-3 w-full text-start rounded-lg transition duration-300' onClick={onLogout}>
              <span className='w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center pl-1'><ion-icon name="log-out-outline" style={{ fontSize: "15pt" }}></ion-icon></span>

              &nbsp;Logout
              </button>
            </li>
          </ul>}

        
    </div> 
    )
  );
};

export default ProfileInfo