import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className='bg-slate-900 fixed top-0 left-0 right-0 shadow-lg z-10'>
      <div className='flex justify-between items-center p-3 mx-auto max-w-6xl'>
        <h1 className='font-bold text-white'>ImageTamer</h1>
        <ul className='flex gap-4'>
          <li>
            <Link to='/home' className='text-white hover:underline'>Home</Link>
          </li>
          <li>
            <Link to='/profile' className='text-white hover:underline'>Profile</Link>
          </li>
          <li>
            <Link to='/signup' className='text-white hover:underline'>Signup</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
