import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


//Create the context
const StoreContext = createContext();


//Create the context provider component
export const StoreProvider = ({ children }) => {
    const [url, setUrl] = useState('');
    const [token, setToken] = useState();
    const [attendanceMarked, setAttendanceMarked] = useState(false);

    //set the backend URL from the enviroment variable or configuration file
    useEffect(() => {
        const backendUrl = 'https://employe-ms-backend.onrender.com';
        setUrl(backendUrl);

        const checkAttendance = async() =>{
            try{
                const response = await axios.get(`${url}/api/attendance/check`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        
                    },
                });
                if(response.data.attendanceMarked){
                    setAttendanceMarked(response.data.attendanceMarked);
                }
            }catch(error){
                console.error('Error check attendance:', error);
            }
        }

        if (token && url) {
            checkAttendance(); // Only check attendance when both token and URL are available
        }

    },[token, url]);




    const contextValue = {
        url,
        token,
        setToken,
        attendanceMarked,
        setAttendanceMarked
    };

    return(
        <StoreContext.Provider value={ contextValue }>
            {children}
        </StoreContext.Provider>
    );
};

//Custom hook for using the context  useContext already used here
export const useStoreContext = () => useContext(StoreContext);
