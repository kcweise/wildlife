import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useAuth } from '../../UserContext';

function LoadPhotos() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [animal, setAnimal] = useState('');
  const [description, setDescription] = useState('');
  const { user, setUser } = useAuth();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("animal", animal);
    formData.append("description", description);
    for(let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    
    try{
      const response = await fetch(`/users/${user.id}/photos`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // Update user in context with the new data

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography variant="h4" gutterBottom>
        Upload Photos
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
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
        >
          Upload Photos
          <input
            type="file"
            hidden
            multiple
            onChange={handleFileChange}
          />
        </Button>
        {files.length > 0 && (
          <Typography variant="body1">{files.length} files selected</Typography>
        )}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default LoadPhotos;