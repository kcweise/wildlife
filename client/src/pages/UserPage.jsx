import React from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import Dashboard from '../components/userpage_components/Dashboard';
import { useAuth } from '../UserContext';


function UserPage() {
  const { isLoggedIn, user } = useAuth();

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