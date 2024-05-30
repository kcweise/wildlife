import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { useAuth } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

// Handles the editing of a photo. A component in dashboard.
const EditPhoto = ({ photo, onClose }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(photo.title);
  const [animal, setAnimal] = useState(photo.animal);
  const [description, setDescription] = useState(photo.description);
  const [photo_url, setPhoto_URL] = useState(photo.photo_url)
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async () => {
    try {
      console.log(photo.id)
      const response = await fetch(`/api/photos/${photo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, animal, description, photo_url }),
      });
      if (!response.ok) {
        throw new Error('Failed to edit photo');
      }
      const updatedUser = await response.json();
      login(updatedUser.user); // Update user in context with the new data      
      navigate(`/user/${updatedUser.user.id}/photos`);
      handleClose();
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="primary">
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Photo</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="animal"
            type="text"
            fullWidth
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          />          
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="photo_url"
            type="text"
            fullWidth
            value={photo_url}
            onChange={(e) => setPhoto_URL(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPhoto;