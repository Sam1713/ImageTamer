import React from 'react'
import { Link } from 'react-router-dom'

const Header:React.FC = () => {
  return (
    <div className='bg-slate-300 shadow-lg'>
     <div className='flex justify-between items-center p-3 mx'>
        <h1 className='font-bold'>ImageTamer</h1>
        <ul className='flex gap-4'>
            <Link to='/home'><li>home</li></Link>
            <Link to='/profile'><li>profile</li></Link>
            <Link to='/signup'><li>Signup</li></Link>
        </ul>

     </div>
    </div>
  )
}

export default Header
