import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Pagination } from '@mui/material';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        try {
            const response = await fetch(`/api/public_users?page=${page}`);
            const data = await response.json();
            console.log(data);
            setUsers(data.users);
            setTotalPages(data.pages);
        } catch (error) {
            console.error('Error fetching users:', error);
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

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Public Users and Their Photos
            </Typography>
            <Grid container spacing={4}>
                {users.map((user) => (
                    <Grid item key={user.id} xs={12} sm={6} md={4}>
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
                            <Box>
                                {user.user_photos.map((photo) => (
                                    <CardMedia
                                        key={photo.id}
                                        component="img"
                                        alt={user.username}
                                        height="140"
                                        image={modifyPhotoURL(photo)}
                                        title={user.username}
                                    />
                                ))}
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box my={4} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default UserList;