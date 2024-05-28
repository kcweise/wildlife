import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, 
    CardMedia, Dialog, Pagination, DialogTitle, DialogContent, 
    Button, DialogActions } from '@mui/material';

const UserList = () => {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        fetchUser(page);
    }, [page]);

    const fetchUser = async (page) => {
        try {
            const response = await fetch(`/api/public_users?page=${page}&per_page=1`);
            const data = await response.json();
            if (data.users.length > 0){
                setUser(data.users[0]);
                setTotalPages(data.pages);
            } else {
                setUser(null);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const modifyPhotoURL = (photo) => {
        if (photo.photo_url.startsWith('../../../'))
          return photo.photo_url.replace(`../../../`, `../../`);
        else 
          return photo.photo_url;
      };


    const handleClickOpen = (photo) => {
        setSelectedPhoto(photo);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPhoto(null);
    };

      return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Public User and Their Photos
            </Typography>
            {user ? (
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {user.first_name} {user.last_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {user.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {user.email}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        {user.user_photos.map((photo) => (
                            <Grid item xs={12} sm={6} md={3} key={photo.id}>
                                <Card onClick={() => handleClickOpen(photo)}>
                                    <CardMedia
                                        key={photo.id}
                                        component="img"
                                        alt={user.username}
                                        height="140"
                                        image={modifyPhotoURL(photo)}
                                        title={user.username}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {photo.description || 'No description'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No user found
                </Typography>
            )}
            <Box my={4} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{selectedPhoto?.description || 'Photo'}</DialogTitle>
                <DialogContent>
                    {selectedPhoto && (
                        <img
                            src={modifyPhotoURL(selectedPhoto)}
                            alt={user.username}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserList;