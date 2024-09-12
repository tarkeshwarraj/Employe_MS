import React from 'react'
import {useNavigate} from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //Remove token from localStorage
    localStorage.removeItem("token");

    //Redirect to login page
    navigate('/');
  };


  return (
    <div className='border'>
      <Sidebar />

    </div>
  )
}

export default Dashboard