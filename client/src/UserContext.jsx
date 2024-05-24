
import React, { createContext, useState, useContext, useEffect } from "react";


// Creating LoginContext to store login
const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        setIsLoggedIn(storedIsLoggedIn);
        setUser(storedUser);
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
    };

    return (
        <LoginContext.Provider value = {{ isLoggedIn, user,  login, logout }}>
            {children}
        </LoginContext.Provider>
    );

};


export const useAuth = () => useContext(LoginContext)
