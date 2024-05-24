import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import UserPage from "./pages/UserPage";
import Photos from './components/userpage_components/Photos';
import UsersList from './components/userpage_components/UsersList';
import LoadPhotos from './components/userpage_components/LoadPhotos';
import CurrentCompetitions from './components/userpage_components/CurrentCompetitions';
import NotFoundPage from './components/NotFoundPage';
import { AuthProvider } from "./UserContext";
import './App.css'

function App() {
  
  return (
    
      <AuthProvider>
          <div className="app">
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/user/:id" element={<UserPage />} >
                {/*Nested routes to persist on user page*/}
                <Route index element={<Photos />} />
                <Route path="photos" element={<Photos />} />
                <Route path="users-list" element={<UsersList />} />
                <Route path="load-photos" element={<LoadPhotos />} />
                <Route path="current-competitions" element={<CurrentCompetitions />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
      </AuthProvider>
    
  );
}

export default App;
