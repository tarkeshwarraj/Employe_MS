import React from 'react'
import {useNavigate} from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //Remove token from localStorage
    localStorage.removeItem("token");

    //Redirect to login page
    navigate('/');
  };


  return (
    <>
    <div>Admin Dashboard</div>
    <button onClick={handleLogout} >Logout</button>
    </>
  )
}

export default Dashboard