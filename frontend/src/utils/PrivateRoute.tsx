import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {RootState} from '../redux/store'
const PrivateRoute: React.FC = () => {
  const currentUser = useSelector((state:RootState)=>state.user.currentUser);
 console.log('cu',currentUser)

  if (!currentUser) {
    return <Navigate
    to="/signin"  
  />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;