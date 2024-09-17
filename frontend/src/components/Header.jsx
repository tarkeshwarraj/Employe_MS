import React from 'react';
import {useStoreContext } from '../StoreContext/StoreContext';

const Header = () => {
  
  const {token, setToken} = useStoreContext();

  const removeToken = () =>{
    //Clear the token from context and local Storage
    setToken(null);
    localStorage.removeItem('token');
    //Optionally, you can redirect the user to the login page
    window.location.href = '/';
  };

  return (
    <div className='pb-2 mb-2 border-b-white'>
    <header className='header-section flex flex-row h-20 justify-between items-center px-4 pt-4 sm:pt-0'>
        <div className='myColor  logo w-full h-full flex items-center'>
            <span className='text-2xl font-bold'>LOGO</span>
        </div>
        {token ? (<div className=" myColor items-center">
          <p onClick={removeToken} className="cursor-pointer">LogOut</p>
        </div> ):<></>
        }
    </header>
    </div>
  );
}

export default Header;
