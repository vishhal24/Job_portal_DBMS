import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Auth/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;