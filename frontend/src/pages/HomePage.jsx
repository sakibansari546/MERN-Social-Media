import React, { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store'
import { Navigate } from 'react-router-dom'
import LeftSideBar from '../components/LeftSideBar';

const HomePage = () => {
    const { user, checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const checkAuthAsync = async () => {
            await checkAuth();
        };
        checkAuthAsync()
    }, [checkAuth]);

    if (isCheckingAuth) {
        // You can return a loading spinner or a placeholder while checking authentication
        return <div>Loading...</div>;
    }

    // Check if user is authenticated and user object is defined
    if (!isAuthenticated || !user || !user.personal_info || !user.personal_info.isVerified) {
        return <Navigate to='/signin' replace />;
    }



    return (
        <>
            <div className='bg-gray-100'>
                <LeftSideBar />
            </div>
        </>
    )
}

export default HomePage;
