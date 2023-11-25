import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, isAdmin }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  console.log('IsAuthenticated:', isAuthenticated);
  console.log('User:', user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin && user.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, user, navigate]);

  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
