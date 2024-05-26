import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, 
  Dialog, DialogContent, DialogActions, DialogTitle  } from '@mui/material';
import { useAuth } from "../UserContext";
import { Login } from '@mui/icons-material';

function RegistrationForm() {
  const { login } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(userData.email)) {
      setDialogMessage("Invalid email format. Please enter a valid email.");
      setDialogOpen(true);
      return;
  }

  if (!phoneRegex.test(userData.phone)) {
      setDialogMessage("Invalid phone format. Please use the format (XXX)-XXX-XXXX.");
      setDialogOpen(true);
      return;
  }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json()
        login(newUser);
        setSuccessDialogOpen(true);
        

        // Registration successful, handle the success case (e.g., redirect to login)
      } else {
        console.error('Registration failed', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
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
          Registration Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoComplete="first_name"
            autoFocus
            value={userData.first_name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="last_name"
            value={userData.last_name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={userData.username}
            onChange={handleChange}
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
            autoComplete="new-password"
            value={userData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    {dialogMessage}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">OK</Button>
                </DialogActions>
          </Dialog>

          <Dialog open={successDialogOpen} onClose={handleSuccessDialogClose}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    Registered successfully.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSuccessDialogClose} color="primary">OK</Button>
                </DialogActions>
          </Dialog>
      </Box>
    </Container>
  );
}

export default RegistrationForm;