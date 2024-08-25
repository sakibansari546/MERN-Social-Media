import React, { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store'
import { Navigate } from 'react-router-dom'
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';

const FeedPage = () => {
    const { user, checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }


    return (
        <div className='w-full h-screen md:px-16 bg-white md:ml-24 lg:ml-72 my-1 md:mr-16 md:w-[50rem]'>
            {
                isAuthenticated && user && user.personal_info && user.personal_info.isVerified && (
                    <CreatePost />
                )
            }
            <Posts />

        </div>
    )
}

export default FeedPage
