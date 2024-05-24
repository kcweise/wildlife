import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useAuth } from "../../UserContext";
import PCompPhotoDetail from './PCompPhotoDetail';

const PastCompetitions = () => {
  const { modifyPhotoURL } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.past_competitions);
      })
      .catch((error) => console.error('Error fetching Competitions:', error));
  }, []);

  console.log(competitions)

  const handleOpenModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Past Competitions
      </Typography>
      <Grid container spacing={2}>
        {competitions.map((comp) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={comp.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {comp.name}
                </Typography>
                <Typography variant="body2">
                  {comp.description}
                </Typography>
                <Typography variant="body2">
                  Start Date: {new Date(comp.start_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  End Date: {new Date(comp.end_date).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" component="div">
                  Winner Photo:
                </Typography>
                {comp.winner_photo ? (
                  <div className="photo-card" onClick={() => handleOpenModal(comp.winner_photo)}>
                    <img 
                      src={modifyPhotoURL(comp.winner_photo)} 
                      alt={`Photo ${comp.winner_photo.id}`}
                      style={{ width: '100%', height: 'auto' }} 
                    />
                    <Typography variant="body2">Votes: {comp.winner_photo.votes}</Typography>                        
                  </div>
                ) : (
                  <Typography variant="body2">No winner selected</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedPhoto && (
        <PCompPhotoDetail 
          photo={selectedPhoto} 
          open={selectedPhoto !== null} 
          onClose={handleCloseModal}         
        />
      )}  
    </section>
  );
};

export default PastCompetitions;