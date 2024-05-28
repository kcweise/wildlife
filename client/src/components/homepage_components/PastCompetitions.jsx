import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useAuth } from "../../UserContext";
import PCompPhotoDetail from './PCompPhotoDetail';

const PastCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {

        const processedCompetitions = data.past_competitions.map(comp => {
          if (comp.competition_photos.length > 0) {
            const winningPhoto = comp.competition_photos.reduce((max, photo) => 
              photo.votes > max.votes ? photo : max, comp.competition_photos[0]
            );
            console.log(comp.start_date)
            return {
              ...comp,
              winner_photo_url: winningPhoto.photo.photo_url,
              winner_photo_votes: winningPhoto.votes,
              winner_photo_title: winningPhoto.photo.title,
              start_date: comp.start_date,
              end_date: comp.end_date,

            };
          }
          return {
            ...comp,
            start_date: comp.start_date,
            end_date: comp.end_date,
          };
        });
        setCompetitions(processedCompetitions);
        console.log(competitions)
      })
      .catch((error) => console.error('Error fetching Competitions:', error));
  }, []);


  const handleOpenModal = (photo) => {
    console.log(photo)
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

    //Dynamically changing relative file path.
    const modifyPhotoURL = (competitionPhoto) =>{
      if (competitionPhoto.startsWith('../../../'))
        return competitionPhoto.replace(`../../../`, `../../`);
      else 
        return competitionPhoto;
    };
  

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Past Competitions
      </Typography>
      <Grid container spacing={2}>
        {competitions.map((comp) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={comp.id}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 
            'space-between',  border: '3px solid #ccc',  borderRadius: '10px',  overflow: 'hidden'}}>
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
                {comp.winner_photo_url ? (
                  <div className="photo-card" onClick={() => handleOpenModal(comp.winner_photo_url)}>
                    <img 
                      src={modifyPhotoURL(comp.winner_photo_url)} 
                      alt={`Winning Photo`}
                      style={{ width: '100%', height: 'auto' }} 
                    />
                    <Typography variant="body2">Votes: {comp.winner_photo_votes}</Typography>                        
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