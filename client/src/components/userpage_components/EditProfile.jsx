import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';
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
          } else {
              console.error('Failed to update profile:', response.statusText);
          }
      } catch (error) {
          console.error('Error updating profile:', error);
      }
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
        </form>
    );
}


export default EditProfile;