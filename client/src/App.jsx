import { Route, Routes } from "react-router-dom";v
import { useState } from 'react'
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import UserDetail from "./components/UserDetail";
import UserContext from "./UserContext";
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(false); // State to store the login status

  return (
    <>
      <UserContext.Provider
        value={{ isLogin, setIsLogin }}
      >
        <div className="app">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
