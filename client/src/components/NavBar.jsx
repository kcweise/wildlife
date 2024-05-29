import React from 'react';
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth } from '../UserContext';


const useStyles = makeStyles({
  appBar: {
    backgroundColor: "LightBlue",
  },
});

const theme = createTheme();

const NavBar = ()=> {
  const classes = useStyles();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: '40px',
              fontFamily: 'Boogaloo',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textShadow: '2px 4px 6px rgba(0, 0, 0, .75)',
              marginLeft: '-1000px'
            }}
          >
            Wildlife Photos
          </Typography>
          <Button
            color="inherit"
            className={classes.navButton}
            component={NavLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={classes.navButton}
            component={NavLink}
            to="/about"
          >
            About
          </Button>
          <Button
            color="inherit"
            className={classes.navButton}
            component={NavLink}
            to="/public"
          >
            Public Pictures
          </Button>
          {isLoggedIn && user ? (
            <>
              <Button
                color="inherit"
                className={classes.navButton}
                component={NavLink}
                to={`/user/${user.id}`}
              >
                User Page
              </Button>
              <Button
                color="inherit"
                className={classes.navButton}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              className={classes.navButton}
              component={NavLink}
              to="/login"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
