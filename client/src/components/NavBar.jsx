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


const useStyles = makeStyles({
  appBar: {
    backgroundColor: "LightBlue",
  },
});

const theme = createTheme();

const NavBar = ({ handleLogout })=> {
  const classes = useStyles();

  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const { isLogin, setIsLogin } = useContext(UserContext); // Use the UserContext to access the user's login status
  // //const { isAdmin, setIsAdmin } = useContext(UserContext); // Use the UserContext to access the user's admin status
  // const navigate = useNavigate(); // Use the navigate function to navigate to different pages

  // // check if the user is logged in
  // // useEffect(() => {
  // //   // auto-login
  // //   fetch("/api/check_session").then((r) => {
  // //     if (r.ok) {
  // //       r.json().then((user_data) => {
  // //         setIsLogin(true); // Update the user's login status if the user is logged in
  // //         //if (user_data.IsAdmin === true) {
  // //           //setIsAdmin(true); // Set the admin status to true
  // //         }
  // //       });
  // //     }
  // //   });
  // // }, [setIsLogin/*, setIsAdmin*/];

  // Handle the logout event
  // const handleLogout = () => {
  //   fetch("/api/logout", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Logout failed");
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       setIsLogin(false); // Update the user's login status
  //       //setIsAdmin(false); // Update the user's admin status
  //     });
  //   setIsLogin(false); // Update the user's login status
  //   //setIsAdmin(false); // Update the user's admin status
  //   navigate("/login");
  // };

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
          }}
        >
          Wildlife Photos
        </Typography>
        <Button
          color="inherit"
          className={classes.navButton}
          component={NavLink}
          to="/"
          exact
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
          to="/login"
        >
          Login
        </Button>
        <Button
          color="inherit"
          className={classes.navButton}
          component={NavLink}
          to="/user/:id"
        >
          User Detail
        </Button>
        <Button
          color="inherit"
          className={classes.navButton}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  </ThemeProvider>
);
};

export default NavBar;
