import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../UserContext';
import { useNavigate } from 'react-router-dom';


//Handles a delete of a user photo.
const DeletePhoto = ({ photoId, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
      });
      //if (!response.ok) {
        //throw new Error('Failed to delete photo');
      //}
      const updatedUser = await response.json();
      login(updatedUser.user); // Update user in context with the new data
      onClose();
      navigate(`/user/${updatedUser.user.id}/photos`);

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