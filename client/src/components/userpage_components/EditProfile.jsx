import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel, 
    Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useAuth } from '../../UserContext';

const EditProfile = () => {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        email: user.email,
        publicPrivate: user.public_private === 1,
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleToggle = () => {
        setFormData({
            ...formData,
            publicPrivate: !formData.publicPrivate,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(formData.email)) {
            setDialogMessage("Invalid email format. Please enter a valid email.");
            setDialogOpen(true);
            return;
        }

        if (!phoneRegex.test(formData.phone)) {
            setDialogMessage("Invalid phone format. Please use the format (XXX)-XXX-XXXX.");
            setDialogOpen(true);
            return;
        }

        const updatedFormData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          public_private: formData.publicPrivate ? 1 : 0,
        };

        try {
          console.log(updatedFormData)
          const response = await fetch(`/api/user/${user.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedFormData),
          });
  
          if (response.ok) {
              const data = await response.json();
              login(data.user); // Update user context with the updated data
              console.log('Profile updated successfully:', data);
              setSuccessDialogOpen(true);
          } else {
              console.error('Failed to update profile:', response.statusText);
          }
      } catch (error) {
          console.error('Error updating profile:', error);
      }
    };   
    
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialogOpen(false);
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <FormControlLabel
                control={<Switch checked={formData.publicPrivate} onChange={handleToggle} />}
                label={formData.publicPrivate ? 'Public Profile' : 'Private Profile'}
            />
            <Button type="submit" variant="contained" color="primary">Save Changes</Button>

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
                    Profile updated successfully.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSuccessDialogClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}


export default EditProfile;