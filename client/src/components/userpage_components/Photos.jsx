
import React, { useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { useAuth } from '../../UserContext';
import PhotoDetail from './PhotoDetail';

const Photos = () => {
  const { user } = useAuth();
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenDetail = (photo) => {
    setSelectedPhoto(photo);
    setOpenModal(true);
  };

  const handleCloseDetail = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {user.user_photos.map(photo => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card>
              <CardMedia
                component="img"
                alt={photo.title || 'Photo'}
                height="200"
                image={photo.photo_url}
                title={photo.title || 'Photo'}
                onClick={() => handleOpenDetail(photo)} // Open Detail on click
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

      {/* Detail for displaying large photo */}
      <PhotoDetail
        photo={selectedPhoto}
        open={openModal}
        onClose={handleCloseDetail}
      />
    </Container>
  );
};

export default Photos;