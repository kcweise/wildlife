import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import Dashboard from '../components/userpage_components/Dashboard';


function UserPage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to = "/login"/>;
  }
  
  return (
    <div>
      <h1>User: Welcome to your page!</h1>
      <Dashboard/>
        <Outlet />
    </div>
  );
}

export default UserPage;