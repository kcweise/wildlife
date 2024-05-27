import React, { useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useAuth } from '../../UserContext';
// import PhotoDetail from './PhotoDetail';

const CurrentCompetitions = () => {
  const { user } = useAuth();


  // Filter photos to get only those in competitions
  const competitionPhotos = user.user_photos.filter(photo => photo.competition_photo);

  return (
    <Container>
      <Grid container spacing={3}>
        {competitionPhotos.map(photo => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card>
              <CardMedia
                component="img"
                alt={photo.title || 'Photo'}
                height="200"
                image={photo.photo_url}
                title={photo.title || 'Photo'}
                onClick={() => setSelectedPhoto(photo)}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {photo.title || 'Untitled'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {photo.description || 'No description'}
                </Typography>
                {photo.competition_photo && (
                  <>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Competition:</strong> {photo.competition_photo.competition.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Start Date:</strong> {new Date(photo.competition_photo.competition.start_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>End Date:</strong> {new Date(photo.competition_photo.competition.end_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Votes:</strong> {photo.competition_photo.votes}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CurrentCompetitions;