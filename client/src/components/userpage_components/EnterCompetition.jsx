import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useAuth } from '../../UserContext';

const EnterCompetition = ({ photoId }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [animal, setAnimal] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    // Fetch competitions from backend API
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('/api/competitions');
        if (!response.ok) {
          throw new Error('Failed to fetch competitions');
        }
        const data = await response.json();
        setCompetitions(data);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
    fetchCompetitions();
  }, []);

  const handleSubmit = async () => {
    if (!animal || !title || !description) {
      setValidationError('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch(`/api/competitions/${selectedCompetition}/enter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoId }),
      });

      if (!response.ok) {
        throw new Error('Failed to enter competition');
      }

      // Optionally update user context or handle success

      // Close the modal
      handleClose();
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
              {competitions.map((competition) => (
                <MenuItem key={competition.id} value={competition.id}>
                  {competition.name} - {competition.startDate}
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
    </>
  );
};

export default EnterCompetition;