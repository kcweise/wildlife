import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';


const ActiveCompetitions = ({ competitions }) => {


  //Dynamically changing relative file path.
  const modifyPhotoURL = (competitionPhoto) =>{
    if (competitionPhoto.photo.photo_url.startsWith('../../../'))
      return competitionPhoto.photo.photo_url.replace(`../../../`, `../../`);
    else 
      return competitionPhoto.photo.photo_url;
  };
    
    
  
  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Active Competitions
      </Typography>
      <div className="card-container">
        {competitions.map((comp) => (
          <Card key={comp.id} className="card">
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
                Photos:
              </Typography>
              <div className="photos-container">
                {comp.competition_photos.map((photo) => (
                  <div key={photo.id} className="photo-card">
                    <img src={modifyPhotoURL(photo)} alt={`Photo ${photo.id}`}
                      style={{ maxWidth: '100%', maxHeight: '300px' }} 
                    />
                    <Typography variant="body2">Votes: {photo.votes}</Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ActiveCompetitions;