import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useAuth } from '../../UserContext';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!user){
        console.error('No user is logged in');
        return;
      }

      try {
        const response = await fetch(`/users/${user.Id}/photos`);
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [user]);

  return (
    <Container>
      <Grid container spacing={3}>
        {photos.map(photo => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card>
              <CardMedia
                component="img"
                alt={photo.title || 'Photo'}
                height="200"
                image={photo.photo_url}
                title={photo.title || 'Photo'}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {photo.title || 'Untitled'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {photo.description || 'No description'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Photos;