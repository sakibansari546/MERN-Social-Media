import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const { user, followOrUnfollow, userProfile, isLoading, getProfile, editProfile, error, checkAuth, isAuthenticated } = useAuthStore();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.personal_info?.username || '',
        fullname: user?.personal_info?.fullname || '',
        bio: user?.personal_info?.bio || '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [followLoading, setFollowLoading] = useState(false); // Specific loading state for follow/unfollow

    const fileInputRef = useRef(null);

    useEffect(() => {
        const checkAndFetchProfile = async () => {
            await checkAuth();
            if (isAuthenticated) {
                getProfile(userId);
            } else {
                navigate('/signin');
            }
        };

        checkAndFetchProfile();
    }, [isAuthenticated, userProfile, userId, checkAuth, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const updatedData = new FormData();
        updatedData.append('username', formData.username);
        updatedData.append('fullname', formData.fullname);
        updatedData.append('bio', formData.bio);

        try {
            await editProfile(updatedData);
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
            setIsPopupOpen(false);
        }
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (user._id !== userProfile._id) return toast.error("You are not authorized to edit this profile");

        setLoading(true);
        const formData = new FormData();
        formData.append('profileImage', profileImage);

        try {
            await editProfile(formData);
            toast.success("Profile image updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile image.");
        } finally {
            setLoading(false);
            setProfileImage(null);
        }
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    const handleFollowOrUnfollow = async () => {
        setFollowLoading(true);
        try {
            await followOrUnfollow(userProfile._id);
        } catch (error) {
            console.error("Follow/Unfollow action failed.");
        } finally {
            setFollowLoading(false);
        }
    };

    return (
        <>
            <main className="bg-gray-100 bg-opacity-25">
                <div className="lg:w-8/12 lg:mx-auto mb-8">
                    <header className="flex flex-wrap items-center p-4 md:py-8 md:pl-14">
                        <div className="md:w-3/12 md:ml-16">
                            <form>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className='hidden'
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                <div className='relative overflow-hidden'>
                                    <img
                                        className="w-20 h-20 flex items-center justify-center md:w-40 md:h-40 object-cover rounded-full border-2 border-blue-400 p-1"
                                        src={profileImage ? URL.createObjectURL(profileImage) : userProfile?.personal_info.profile_img}
                                        alt="profile"

                                    />
                                    {
                                        user?._id === userProfile?._id &&
                                        <button type='button'
                                            onClick={user?._id === userProfile?._id && handleImageClick}
                                            className='flex items-center justify-center text-lg absolute top-28 left-[42%] rounded-full bg-slate-400 bg-opacity-55 w-10 h-10'>
                                            <i class="fi fi-rr-camera"></i>
                                        </button>
                                    }

                                </div>
                                {error && <p className='text-red-500 ml- mt-3 text-lg'>{error}</p>}
                                {
                                    profileImage &&
                                    <button
                                        onClick={uploadImage}
                                        type='submit'
                                        className={`w-16 ml-12 mt-3 ${loading ? "bg-slate-500 cursor-not-allowed" : "bg-[#00d7ff]"} px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block`}
                                        disabled={loading}
                                    >
                                        {loading ? "Wait..." : "Upload"}
                                    </button>
                                }
                            </form>
                        </div>

                        <div className="w-8/12 md:w-7/12 ml-4">
                            <div className="md:flex md:flex-wrap md:items-center mb-4">
                                <h2 className="text-2xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                                    @{userProfile?.personal_info?.username || 'Username'}
                                </h2>

                                <span
                                    className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                                    aria-hidden="true"
                                >
                                    <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px" />
                                </span>

                                <div className='flex gap-3'>
                                    {
                                        user?._id !== userProfile?._id &&
                                        <button onClick={handleFollowOrUnfollow}
                                            className={` bg-[#00d7ff] px-2 py-1  text-white font-semibold text-sm rounded block text-center sm:inline-block ${user?.following?.includes(userId) ? "bg-gray-500 text-black " : "bg-[#00d7ff] text-white"}`}
                                        >
                                            {user?.following?.includes(userId) ? "Unfollow" : "Follow"}
                                        </button>
                                    }
                                    {
                                        user?._id === userProfile?._id &&
                                        <button
                                            className="w-16 bg-gray-300 px-2 py-1 text-black font-semibold text-sm rounded block text-center sm:inline-block"
                                            onClick={() => setIsPopupOpen(true)}
                                        >
                                            Edit
                                        </button>
                                    }
                                </div>
                            </div>

                            <ul className="hidden md:flex space-x-8 mb-4">
                                <li>
                                    <span className="font-semibold">{userProfile?.posts?.length}</span> posts
                                </li>
                                <li>
                                    <span className="font-semibold">{userProfile?.followers.length}</span> followers
                                </li>
                                <li>
                                    <span className="font-semibold">{userProfile?.following.length}</span> following
                                </li>
                            </ul>

                            <div className="hidden md:block">
                                <h1 className="font-semibold">{userProfile?.personal_info.fullname || 'Full Name'}</h1>
                                <span></span>
                                <p>{user?.personal_info?.bio || "Bio..."}</p>
                            </div>
                        </div>

                        <div className="md:hidden text-sm my-2">
                            <h1 className="font-semibold">{userProfile?.personal_info.fullname || 'Full Name'}</h1>
                            <span></span>
                            <p>{user?.personal_info?.bio || "Bio..."}</p>
                        </div>
                    </header>

                    <div className="px-px md:px-3">
                        <ul className="flex md:hidden justify-around space-x-8 border-t border text-center p-2 text-gray-600 leading-snug text-sm">
                            <li>
                                <span className="font-semibold text-gray-800 block">{userProfile?.posts.length}</span> posts
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800 block">{userProfile?.followers.length}</span> followers
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800 block">{userProfile?.following.length}</span> following
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            {isPopupOpen && (
                <div className="edit-profile-popup fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="mr-4 px-4 py-2 bg-gray-300 text-black rounded"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 ${loading ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded`}
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
