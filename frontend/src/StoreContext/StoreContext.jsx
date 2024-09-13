import React, { createContext, useContext, useState, useEffect } from 'react';


//Create the context
const StoreContext = createContext();


//Create the context provider component
export const StoreProvider = ({ children }) => {
    const [url, setUrl] = useState('');
    const [token, setToken] = useState("");

    //set the backend URL from the enviroment variable or configuration file
    useEffect(() => {
        const backendUrl = 'http://localhost:3000';
        setUrl(backendUrl);

    },[]);

    const contextValue = {
        url,
        token,
        setToken
    };

    return(
        <StoreContext.Provider value={ contextValue }>
            {children}
        </StoreContext.Provider>
    );
};

//Custom hook for using the context  useContext already used here
export const useStoreContext = () => useContext(StoreContext);
