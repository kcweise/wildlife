import React from 'react';
import { Route, Routes } from "react-router-dom";
import { CssBaseline, Box, Toolbar, Container } from '@mui/material';
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PublicPics from "./pages/PublicPics";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import UserPage from "./pages/UserPage";
import Photos from './components/userpage_components/Photos';
import EditProfile from './components/userpage_components/EditProfile';
import LoadPhotos from './components/userpage_components/LoadPhotos';
import CurrentCompetitions from './components/userpage_components/CurrentCompetitions';
import NotFoundPage from './components/NotFoundPage';
import { AuthProvider } from "./UserContext";
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '5vh' }}>
        <CssBaseline />
        <NavBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: -3, // Adjust this margin to match the height of the navbar            
          }}
        >
          <Container>
            <Toolbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/public" element={<PublicPics />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/user/:id" element={<UserPage />}>
                {/* Nested routes to persist on user page */}
                <Route index element={<Photos />} />
                <Route path="photos" element={<Photos />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="load-photos" element={<LoadPhotos />} />
                <Route path="current-competitions" element={<CurrentCompetitions />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;
