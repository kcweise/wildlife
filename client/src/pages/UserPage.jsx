import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Dashboard from '../components/userpage_components/Dashboard';
import { useAuth } from '../UserContext';


function UserPage() {
  const { isLoggedIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay for demonstration
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  if (isLoading) {
    // Show loading spinner or message
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !user) {
    return <Navigate to = "/login"/>;
  }
  
  return (
    <div>
      <h1>{user.first_name}: Welcome to your page!</h1>
      <Dashboard/>
      <Outlet />
    </div>
  );
}

export default UserPage;