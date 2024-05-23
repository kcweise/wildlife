import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, 
    FormControl, InputLabel, MenuItem, Select, TextField, ListItemText,
    DialogContentText } from '@material-ui/core';
import { useAuth } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const EnterCompetition = ({ photo, onClose }) => {
  const { login, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [animal, setAnimal] = useState(photo.animal || '');
  const [title, setTitle] = useState(photo.title || '');
  const [description, setDescription] = useState(photo.description || '');
  const [validationError, setValidationError] = useState('');
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch competitions from backend API
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('/api/competitions');
        if (!response.ok) {
          throw new Error('Failed to fetch competitions');
        }
        const data = await response.json();

        const activeCompetitions = data.active_competitions || [];
        const futureCompetitions = data.future_competitions || [];
        const competitions = [...activeCompetitions, ...futureCompetitions];

        setCompetitions(competitions);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
    fetchCompetitions();
  }, []);

  const handleSubmit = async () => {
    if (!animal || !title || !description) {
      setValidationError('Please fill out all fields for competition entry.');
      return;
    }

    const isAlreadySubmitted = photo.competition_photo && 
      photo.competition_photo.competition_id === selectedCompetition;

    if (isAlreadySubmitted){
      setAlreadySubmitted(true);
      return;
    }

    try {
        const patchData = {
            animal,
            title,
            description
          };
    
        // Patch request to update photo attributes if necessary
        const patchResponse = await fetch(`/api/photos/${photo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patchData),
        });
        
        if (!patchResponse.ok) {
          throw new Error('Failed to update photo attributes');
        }

        const enterResponse = await fetch(`/api/competition-photos/${selectedCompetition}/enter`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photo_id: photo.id }),
        });

      if (!enterResponse.ok) {
        throw new Error('Failed to enter competition');
      }
      const updatedUser = await enterResponse.json();
      login(updatedUser.user); // Update user in context with the new data      
      navigate(`/user/${updatedUser.user.id}/photos`);
      handleClose();
      onClose();

    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlreadySubmitted = () => {
    setAlreadySubmitted(false);
  };

  return (
    <>
      <Button onClick={handleOpen} color="primary">
        Enter Competition
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Competition</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="competition-select-label">Competition</InputLabel>
            <Select
              labelId="competition-select-label"
              value={selectedCompetition}
              onChange={(e) => setSelectedCompetition(e.target.value)}
            >
              <MenuItem disabled>
                <ListItemText primary="Name---Start Date---End Date" />
              </MenuItem>
              {competitions.map((competition) => (
                <MenuItem key={competition.id} value={competition.id}>
                  {competition.name} - {competition.start_date} - {competition.end_date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />
          {validationError && (
            <DialogContentText color="error">
              {validationError}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Enter Competition
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={alreadySubmitted} onClose={handleAlreadySubmitted}>
        <DialogTitle>Photo Already Submitted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This photo has already been submitted to the selected competition.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlreadySubmitted} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EnterCompetition;