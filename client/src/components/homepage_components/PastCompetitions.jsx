import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PastCompetitions = ({ competitions }) => {
  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Past Competitions
      </Typography>
      <div className="card-container">
        {competitions.map((comp) => {
          const winnerPhoto = comp.competition_photos.reduce((prev, current) => (prev.votes > current.votes ? prev : current), {});
          return (
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
                  Winner Photo:
                </Typography>
                {winnerPhoto && (
                  <div className="photo-card">
                    <img src={winnerPhoto.image_url} alt={`Photo ${winnerPhoto.id}`} />
                    <Typography variant="body2">Votes: {winnerPhoto.votes}</Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default PastCompetitions;