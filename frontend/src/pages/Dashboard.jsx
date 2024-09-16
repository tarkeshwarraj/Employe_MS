import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useStoreContext } from '../StoreContext/StoreContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const {url, token} = useStoreContext();

  const handleLogout = () => {
    //Remove token from localStorage
    localStorage.removeItem("token");

    //Redirect to login page
    navigate('/');
  };

  //Get current year , month, and day
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1; //Js Months are 0-indexed, so add 1
  const day = new Date().getDate(); //Current day

  const handlePresent = async() => {
    try{
      const response = await axios.post(`${url}/api/attendance/mark`,{
        token,
        year,
        month,
        day,
        Status:'present', //Mark as present
      });
      console.log(response.data.message);
    }catch(error){
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div className='px-6 sm:px-20'>
      <div className="flex justify-between">
        <p><span className='text-2xl'>Hi</span> Arman</p>
        <button onClick={handlePresent} className='bg-lime-400 text-black px-2 py-1.5 rounded-sm hover:scale-105 animate-bounce transition-none'>I am present</button>
      </div>
    </div>
  )
}

export default Dashboard