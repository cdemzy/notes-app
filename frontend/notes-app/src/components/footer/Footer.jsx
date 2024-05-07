import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-black h-20 text-white flex justify-center items-center w-full bottom-0 z-50'>
      <ul className='flex justify-center items-center gap-10'>
        <li className='hover:border-b-2 border-white'><Link to='/about'>About</Link></li>
        <li className='hover:border-b-2 border-white'><Link to='/security'>Security & Privacy</Link></li>
        <li className='hover:border-b-2 border-white'><Link to='/contact'>Contact</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
