import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../UserContext";
import {TextField, Button, Container, Typography, Box} from '@mui/material';
import UserPage from '../pages/UserPage'
import RegistrationForm from './RegistrationForm';


function LoginForm() {

  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful:', data);
        console.log(data.user)
        login(data.user);
        navigate(`/user/${data.user.id}`);
      }
      else {
      console.error('Login failed', response.statusText);
      }
    }
      catch (error) {
      console.error('Error during login', error);
    }   
  };

    // Function to toggle between login and registration forms
    const toggleRegistration = () => {
      setShowRegistration(!showRegistration);
    };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {showRegistration ? '' : 'Login'}
        </Typography>
        {showRegistration ? (
          <RegistrationForm /> // Render RegistrationForm component if showRegistration is true
        ) : (
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        )}
        {/* Button to toggle between login and registration forms */}
        <Button onClick={toggleRegistration}>
          {showRegistration ? 'Back to Login' : 'Register'}
        </Button>
      </Box>
    </Container>
  );
}
export default LoginForm;