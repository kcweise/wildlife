import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  contentWrapper: {
    display: 'flex',
    
  },
}));

//Dashboard tools for a users profile page

function Dashboard() {
  const classes = useStyles();

  return (
    <div>
      <List component="nav">
        <ListItem button component={Link} to="photos">
          <ListItemText primary="Display Photos" />
        </ListItem>
        <Divider />        
        <ListItem button component={Link} to="load-photos">
          <ListItemText primary="Load Photos" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="current-competitions">
          <ListItemText primary="Current Competitions" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="edit-profile">
          <ListItemText primary="Edit Profile" />
        </ListItem>   
        <Divider />
      </List>
    </div>
  );
}
export default Dashboard;