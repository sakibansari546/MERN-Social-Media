import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'

const LeftSideBar = () => {
    const { user } = useAuthStore();

    return (
        <div>
            <div className='w-full flex items-center h-[70px] bg-gray-100 border-r fixed bottom-0 left-0 md:top-[13.6%] md:left-0 md:flex-col md:h-screen md:w-24 md:pt- lg:w-72 lg:flex'>
                <div className='w-full flex items-center justify-evenly gap-[2px] md:flex-col '>
                    <Link to='/' className='lg:w-full lg:px- text-center lg:flex items-center gap-2 lg:text-xl font-semibold lg:justify-evenly bg-white w-full h-full py-4'>
                        <i class="fi fi-rr-apps-add text-3xl text-gray-900 hover:text-gray-900 "></i>
                        <span className=' hidden sm:block'>Feed</span>
                    </Link>
                    <Link to='/search' className='lg:w-full lg:px- text-center lg:flex items-center gap-2 lg:text-xl font-semibold lg:justify-evenly bg-white w-full h-full py-4'>
                        <i class="fi fi-rr-search text-3xl hover:text-gray-900 text-gray-500"></i>
                        <span className=' hidden sm:block'>Seacrh</span>
                    </Link>
                    <Link to='/create' className='lg:w-full lg:px- text-center lg:flex items-center gap-2 lg:text-xl font-semibold lg:justify-evenly bg-white w-full h-full py-4'>
                        <i class="fi fi-br-plus text-3xl hover:text-gray-900 text-gray-500"></i>
                        <span className=' hidden sm:block'>Create</span>
                    </Link>
                    <Link to='/notification' className='lg:w-full lg:px- text-center lg:flex items-center gap-2 lg:text-xl font-semibold lg:justify-evenly bg-white w-full h-full py-4'>
                        <i class="fi fi-rr-bell text-3xl hover:text-gray-900 text-gray-500"></i>
                        <span className=' hidden sm:block'>Notification</span>
                    </Link>
                    <Link to={`/profile/${user?._id}`} className='lg:w-full lg:px- text-center lg:flex items-center gap-2 lg:text-xl font-semibold lg:justify-evenly bg-white w-full h-full py-4'>
                        <img src={user?.personal_info.profile_img} className='w-12 h-12 rounded-full border ml-6 object-cover' alt="" />
                        <span className=' hidden sm:block'>Profile</span>
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>

    )
}

export default LeftSideBar
