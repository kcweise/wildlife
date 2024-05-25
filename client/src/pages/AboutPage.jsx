import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme()

const useStyles = makeStyles({
  backgroundImage: {
    position: 'center',
    width: '80%',
    height: '75vh',
    backgroundImage: 'url(https://www.sulasula.com/wp-content/uploads/zaba_new.jpg)', // Replace with your actual image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',   
    display: 'flex',   
  },

});

const AboutPage = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" gutterBottom style={{ paddingTop: '28px', position: 'center' }}>
        About Page
      </Typography>
      <Typography variant="body1" paragraph >
        Welcome to the Wildlife Photos page! Here, you can explore a stunning collection of wildlife photographs captured by talented photographers from around the world. Our mission is to showcase the beauty and diversity of wildlife through captivating images. Whether you're an avid nature enthusiast or just appreciate the art of photography, we hope you find inspiration and enjoyment in our gallery.
      </Typography>
      <Box className={classes.backgroundImage}>
      </Box>
      <Container>
        <Box sx={{ marginTop: theme.spacing(8), width: '80%', margin: '0 auto' }}>        
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AboutPage;