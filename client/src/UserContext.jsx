
import React, { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

// Creating LoginContext to store login
const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["isLoggedIn", "user"]);

    // useEffect(() => {
    //     const initialIsLoggedIn = cookies.isLoggedIn === "true";
    //     const initialUser = cookies.user ? JSON.parse(cookies.user) : null;
    //     setIsLoggedIn(initialIsLoggedIn);
    //     setUser(initialUser);
    //   }, []);



    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        setCookie("isLoggedIn", "true", { path: "/"});
        setCookie("user", JSON.stringify(userData), { path: "/"});

    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        removeCookie("isLoggedIn", { path: "/" });
        removeCookie("user", { path: "/" });
    };

    return (
        <LoginContext.Provider value = {{ isLoggedIn, user,  login, logout }}>
            {children}
        </LoginContext.Provider>
    );

};


export const useAuth = () => useContext(LoginContext)
