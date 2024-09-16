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
    <div className=''>
    <header className='header-section flex flex-row h-20 justify-between items-center px-4'>
        <div className='logo w-full h-full flex items-center'>
            <span className='text-2xl font-bold'>This is header</span>
        </div>
        {token ? (<div className="items-center">
          <p onClick={removeToken} className="cursor-pointer">LogOut</p>
        </div> ):<></>
        }
    </header>
    </div>
  );
}

export default Header;
