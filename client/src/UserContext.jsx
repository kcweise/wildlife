
import { SettingsSuggestRounded } from "@mui/icons-material";
import React, { createContext, useState, useContext } from "react";

// Creating LoginContext to store login
const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);

    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <LoginContext.Provider value = {{ isLoggedIn, user,  login, logout }}>
            {children}
        </LoginContext.Provider>
    );

};


export const useAuth = () => useContext(LoginContext)
