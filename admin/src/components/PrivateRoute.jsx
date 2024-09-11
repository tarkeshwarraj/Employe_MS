// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

//{element} is passed as a prop to the PrivateRoute component when you define a route in App.jsx.
const PrivateRoute = ({ element }) => {
    //Check if the user is authenticated by checking the token
    const token = localStorage.getItem('token');

    if(token) {
        //If the token exists, render the protected component
        return element;
    }else{
        //If not authenticated, redirect to the login page
        return <Navigate to="/" />
    }
};

export default PrivateRoute;