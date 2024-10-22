import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const PublicRoute: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (currentUser) {
    return <Navigate to="/home" replace />; // Redirect authenticated users to home
  }

  return <Outlet />;
};

export default PublicRoute;
