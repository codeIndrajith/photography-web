import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PhotographyRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo.type === 'photography-club' ? (
    <Outlet />
  ) : (
    <Navigate to="/phClub-login" replace />
  );
};

export default PhotographyRoute;
