import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../UserContext"
import {TextField, Button, Container, Typography, Box} from '@mui/material';
import UserPage from '../pages/UserPage'


function LoginForm() {

  const { isLoggedIn, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5555/login', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful:', data);
        login();
        navigate(`/user/${data.userId}`);
      }
      else {
      console.error('Login failed', response.statusText);
      }
    }
      catch (error) {
      console.error('Error during login', error);
    }   
  };

  if (isLoggedIn){
    return<UserPage />;
  }



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
          Login
        </Typography>
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
      </Box>
    </Container>
  );
};

export default LoginForm;