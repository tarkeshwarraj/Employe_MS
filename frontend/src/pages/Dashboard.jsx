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
    <div className=''>
      This si Dashboard
    </div>
  )
}

export default Dashboard