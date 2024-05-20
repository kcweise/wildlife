
import React, { createContext, useState, useContext } from "react";

// Creating LoginContext to store login
const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <LoginContext.Provider value = {{ isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );

};


export const useAuth = () => useContext(LoginContext)
