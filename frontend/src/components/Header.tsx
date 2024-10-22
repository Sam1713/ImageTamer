import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import api from '../components/api/Api'
import { useDispatch } from 'react-redux';
import { setLogout } from '../redux/user/userSlice';
const Header: React.FC = () => {
  const dispatch=useDispatch()
  const handleSignOut=async()=>{
    console.log('sdf')
    try{
    const response=await api.get('/api/auth/logout')
    dispatch(setLogout())
    console.log('res',response)
    }catch(error){
      console.log('er',error)
    }
  }
  const currentUser=useSelector((state:RootState)=>state.user.currentUser)
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
  <Link 
    to={currentUser ? '#' : '/signup'}  // Keep '#' to prevent navigation when logging out
    className='text-white hover:underline'
    onClick={currentUser ? handleSignOut : undefined}  // Add the signout function when the user is logged in
  >
    {currentUser ? 'Logout' : 'Signup'}
  </Link>
</li>


        </ul>
      </div>
    </div>
  );
}

export default Header;
