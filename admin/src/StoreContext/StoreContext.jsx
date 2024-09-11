import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

// Create the context
const StoreContext = createContext();

// Create the context provider component
export const StoreProvider = ({ children }) => {
    const [url, setUrl] = useState('');
    const [token, setToken] = useState("");
    const [role, setRole] = useState(null);

    // Set the backend URL from the environment variable or configuration file
    useEffect(() => {
        const backendUrl = 'http://localhost:3000';
        setUrl(backendUrl);
    }, []);

    // Decode token and set role
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error('Failed to decode token', error);
                setRole(null);
            }
        } else {
            setRole(null);
        }
    }, [token]);

    // Handle login
    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setRole(null);
    };

    const contextValue = {
        url,
        token,
        setToken: handleLogin,
        logout: handleLogout,
        role
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

// Custom hook for using the context
export const useStoreContext = () => useContext(StoreContext);
