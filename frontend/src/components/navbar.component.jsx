import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store';

import Logo from '../assets/stop.png'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();

    return (
        <div>
            <header>
                <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-2.5 ">
                    <div className='px-5 py-3 flex items-center justify-between '>
                        <div className="logo flex items-center gap-2">
                            <img className='w-10 h-10 object-cover' src={Logo} alt="" />
                            <span className='text-lg font-bold font-sans'>Wecreate</span>
                        </div>
                        <div className='search-bar relative'>
                            <input type="text" className='w-[390px] text-lg h-12 text-md bg-gray-100 pl-5 outline-none' placeholder='Search' />
                            <i className="fi fi-rr-search text-2xl cursor-pointer pr-4 text-gray-500 absolute right-0 top-2.5"></i>
                        </div>
                        <div className="flex items-center gap-4">
                            {isAuthenticated ? (
                                <div className='flex items-center gap-5'>
                                    <Link to={`/profile`} className='bg-gray-200 rounded-full'>
                                        <img src={user.personal_info.profile_img} className='w-12 h-12 rounded-full object-cover' alt="" />
                                    </Link>
                                    <button onClick={logout} className='rounded-full w-10 h-10   hover:bg-gray-100 transition-all'>
                                        <i class="fi fi-br-sign-out-alt text-2xl"></i>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to='/signin' className='mt-1'>
                                        <i class="fi fi-bs-user-add text-2xl text-gray-600"></i>
                                    </Link>
                                </>
                            )}

                        </div>
                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}

export default Navbar
