import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

function LoadPhotos() {
  
  const [title, setTitle] = useState('');
  const [animal, setAnimal] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    const data = {
      title,
      animal,
      description,
      photo_url: photoUrl
    };
    
    try{
      const response = await fetch(`/api/users/${user.id}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const updatedUser = await response.json();
      login(updatedUser); // Update user in context with the new data
      navigate(`/user/${updatedUser.id}/photos`);

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography variant="h4" gutterBottom>
        Add Photo to Collection
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mb={2}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Animal"
          variant="outlined"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Photo URL"
          variant="outlined"
          multiline
          rows={4}
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />        
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default LoadPhotos;