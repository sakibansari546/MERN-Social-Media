import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

import Logo from '../assets/stop.png';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [showSearch, setShowSearch] = useState(false);

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    return (
        <div>
            <header>
                <nav className="bg-white relative border-b border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className='px-5 py-3 flex items-center justify-between'>
                        <div className="logo flex items-center gap-2">
                            <img className='w-8 h-8 md:w-10 md:h-10 object-cover' src={Logo} alt="Wecreate Logo" />
                            <span className='text-md md:text-lg font-bold font-sans'>Wecreate</span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='block md:hidden'>
                                <i
                                    className="fi fi-rr-search text-xl cursor-pointer text-gray-500"
                                    onClick={handleSearchClick}
                                ></i>
                            </div>
                            {isAuthenticated ? (
                                <div className='flex items-center gap-5'>
                                    <Link to={`/profile`} className='bg-gray-200 rounded-full'>
                                        <img src={user.personal_info.profile_img} className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover' alt="Profile" />
                                    </Link>
                                    <button onClick={logout} className='rounded-full w-8 h-8 md:w-10 md:h-10 hover:bg-gray-100 transition-all'>
                                        <i className="fi fi-br-sign-out-alt text-xl md:text-2xl"></i>
                                    </button>
                                </div>
                            ) : (
                                <Link to='/signin' className='mt-1'>
                                    <i className="fi fi-bs-user-add text-xl md:text-2xl text-gray-600"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className={`search-bar absolute w-[90vw] top-[93] z-20 md:block md:w-[200px] md:top-[25px] md:left-[40%] ${showSearch ? 'block' : 'hidden'}`}>
                        <input
                            type="text"
                            className='w-full md:w-[300px] lg:w-[390px] text-sm md:text-lg h-10 md:h-12 bg-gray-100 pl-5 outline-none'
                            placeholder='Search'
                        />
                        <i className="fi fi-rr-search text-xl md:text-2xl cursor-pointer pr-4 text-gray-500 absolute right-0 top-2.5 md:top-2.5 lg:right-[-94%] md:right-[-50%]"></i>
                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    );
};

export default Navbar;
