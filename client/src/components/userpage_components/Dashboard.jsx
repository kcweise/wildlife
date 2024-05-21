import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
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

function Dashboard() {
  const classes = useStyles();

  return (
    <div>
      <List component="nav">
        <ListItem button component={Link} to="photos">
          <ListItemText primary="Photos" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="users-list">
          <ListItemText primary="Users List" />
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
      </List>
    </div>
  );
}
export default Dashboard;