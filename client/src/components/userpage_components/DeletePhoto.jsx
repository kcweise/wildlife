import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../UserContext';

const DeletePhoto = ({ photoId }) => {
  const { setUser } = useAuth();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/photos/${photoId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }
      const updatedUser = await response.json();
      setUser(updatedUser); // Update user in context with the new data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button onClick={handleDelete} color="secondary">
      Delete
    </Button>
  );
};

export default DeletePhoto;