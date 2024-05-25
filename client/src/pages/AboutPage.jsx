import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({

  root: {
    textAlign: 'center',
    paddingTop: 0
    , // Adjust the top padding as needed
  },
  imageContainer: {
    position: 'relative',
    width: '200%',
    height: 'calc(100vh - 64px)', // Adjust to account for the top padding
    maxHeight: '100vh', // Set maximum height to prevent the image from taking up the entire viewport
    overflow: 'hidden', // Hide overflow to prevent scrollbars
  },
  image: {
    width: '400%',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -55%)',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -300%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    color: 'white',
    padding: 17, // Adjust the padding as needed
    borderRadius: 10, // Optional: Add border radius to the overlay
  },
  
}));

function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Typography variant="h1" gutterBottom>
          Wildlife
        </Typography>
        <Box position="relative">
          <img src={'https://www.sulasula.com/wp-content/uploads/zaba_new.jpg'} alt="Wildlife" className={classes.image} />
          <div className={classes.overlay}>
            <Typography variant="h5">Discover the beauty of wildlife</Typography>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default AboutPage;