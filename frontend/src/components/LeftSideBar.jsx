import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'

const LeftSideBar = () => {
    const { user } = useAuthStore();
    console.log(user);

    return (
        <div>
            <div className='w-[70px] md:w-[300px] h-screen bg-gray-100 border-r fixed top-[12.7%] left-0'>
                <div className='flex flex-col gap-1'>
                    <div className='w-full h-16 bg-white flex items-center justify-center '>
                        <i class="fi fi-rr-apps-add text-3xl"></i>
                        <span className='hidden sm:block'>Feed</span>
                    </div>
                    <div className='w-full h-16 bg-white flex items-center justify-center '>
                        <i class="fi fi-rr-window-maximize text-3xl"></i>
                        <span className='hidden sm:block'>Event</span>
                    </div>
                    <div className='w-full h-16 bg-white flex items-center justify-center '>
                        <i class="fi fi-rr-add-image"></i>
                        <span className='hidden sm:block'>Craete</span>
                    </div>
                    <div className='w-full h-16 bg-white flex items-center justify-center '>
                        {/* <img src={user.personal_info.profile_img} className='w-14 h-14 rounded-full' alt="" /> */}
                        <span className='hidden sm:block'>Feed</span>
                    </div>
                    <div className='w-full h-16 bg-white flex items-center justify-center '>
                        <i class="fi fi-rr-address-card text-3xl"></i>
                        <span className='hidden sm:block'>Feed</span>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>

    )
}

export default LeftSideBar
