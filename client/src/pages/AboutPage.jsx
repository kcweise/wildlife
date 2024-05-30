import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme()

const useStyles = makeStyles({
  
  backgroundImage: {
    width: '100%',
    height: '85vh',
    backgroundImage: 'url(https://www.sulasula.com/wp-content/uploads/zaba_new.jpg)', 
    backgroundsize: 'cover',   
    backgroundPosition: '0 -200px', 
  },
  content: {
    textAlign: 'center',
    padding: 0,
    fontWeight: 'bold',
  },
  contentContainer: {
    maxWidth: 600,
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)', 
    borderRadius: 0, 

  },

});

const AboutPage = () => {
  const classes = useStyles();

  return (
      <div className ={classes.backgroundImage} >
        <Container className={classes.contentContainer}>
          <Typography variant="h4" className={classes.title}>
            About Page
          </Typography>
          <Typography variant="body1" className={classes.content} >

          Welcome to the Wildlife Photos page! Discover stunning wildlife photographs from around the world, 
          captured by talented photographers. Join our frequent Wildlife Photo Competitions, held every few days! 
          Submit your best shots for a chance to win and have your work featured on our site. Explore past entries and 
          get ready to participate in the upcoming contests. Celebrate the beauty of wildlife with us!
          </Typography>
        </Container>
      </div>
    );
};

export default AboutPage;