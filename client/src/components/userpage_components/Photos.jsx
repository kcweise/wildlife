// import React, { useEffect, useState } from 'react';
// import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
// import { useAuth } from '../../UserContext';

// const Photos = () => {
//   const { user } = useAuth();


//   return (
//     <Container>
//       <Grid container spacing={3}>
//         {user.user_photos.map(photo => (
//           <Grid item xs={12} sm={6} md={4} key={photo.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 alt={photo.title || 'Photo'}
//                 height="200"
//                 image={photo.photo_url}
//                 title={photo.title || 'Photo'}
//               />
//               <CardContent>
//                 <Typography variant="h6" component="h2">
//                   {photo.title || 'Untitled'}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   {photo.description || 'No description'}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Photos;

import React, { useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useAuth } from '../../UserContext';

const Photos = () => {
  const { user } = useAuth();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (photo) => {
    setSelectedPhoto(photo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
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
                onClick={() => handleOpenModal(photo)} // Open modal on click
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {photo.title || 'Untitled'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {photo.description || 'No description'}
                </Typography>
                <Button onClick={() => handleDelete(photo.id)}>Delete</Button>
                <Button onClick={() => handleEnterCompetition(photo.id)}>Enter Competition</Button>
                <Button onClick={() => handleEdit(photo.id)}>Edit</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for displaying large photo */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth= "auto">
        <DialogTitle>{selectedPhoto ? selectedPhoto.title : 'Untitled'}</DialogTitle>
        <DialogContent style = {{justifyContent: 'center'}}>
          <img src={selectedPhoto ? selectedPhoto.photo_url : ''} alt={selectedPhoto ? selectedPhoto.title : ''} style={{maxWidth:'75%', width: '75%', height: 'auto'}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(selectedPhoto.id)}>Delete</Button>
          <Button onClick={() => handleEnterCompetition(selectedPhoto.id)}>Enter Competition</Button>
          <Button onClick={() => handleEdit(selectedPhoto.id)}>Edit</Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Photos;