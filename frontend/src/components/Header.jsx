import React from 'react';


const Header = () => {
  return (
    <div className='border border-orange-400'>
    <header className='header-section w-full flex flex-row h-24 justify-between items-center px-4'>
        <div className='logo w-full h-full flex items-center'>
            <span className='text-2xl font-bold'>This is header</span>
        </div>
        <div className='login w-full h-full flex items-center justify-end'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
                LogOut
            </button>
        </div>
    </header>
    </div>
  );
}

export default Header;
