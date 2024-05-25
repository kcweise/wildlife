import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { useAuth } from '../../UserContext';

const EditProfile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        email: user.email,
        publicPrivate: user.public_private === 1 ? true : false,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
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
};

export default EditProfile;