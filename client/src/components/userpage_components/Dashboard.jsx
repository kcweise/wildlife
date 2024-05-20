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
  content: {
    flexGrow: 1,
    
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button component={Link} to="/photos">
            <ListItemText primary="Photos" />
          </ListItem>
          <ListItem button component={Link} to="/users-list">
            <ListItemText primary="Users List" />
          </ListItem>
          <ListItem button component={Link} to="/load-photos">
            <ListItemText primary="Load Photos" />
          </ListItem>
          <ListItem button component={Link} to="/current-competitions">
            <ListItemText primary="Current Competitions" />
          </ListItem>
        </List>
      </Drawer>
      <Box className={classes.content}>
        {/* Main content of the page */}
      </Box>
    </Box>
  );
}
export default Dashboard;