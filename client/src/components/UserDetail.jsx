import React from 'react';
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  return (
    <div>
      <h1>User Detail</h1>
      <p>Details for user with ID: {id}</p>
    </div>
  );
}

export default UserDetail;