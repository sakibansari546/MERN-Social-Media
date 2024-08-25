import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, editProfile, isLoading, checkAuth, isAuthenticated } = useAuthStore();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.personal_info?.username || '',
        fullName: user?.fullName || '',
        bio: user?.personal_info?.bio || '',
        profileImg: user?.personal_info?.profile_img || ''
    });

    const fileInputRef = useRef(null); // Create a ref for the file input

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        } else {
            checkAuth();
        }
    }, [isAuthenticated, checkAuth, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, profileImg: e.target.files[0] });
    };
    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the file input click when the image is clicked
    };

    const handleProfileImgChange = async () => {
        setFormData({ ...formData, profileImg: e.target.files[0] });
        console.log(formData);

        await editProfile(formData);
    }


    const handleSubmit = async () => {
        setIsPopupOpen(false);
        await editProfile(formData);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className="bg-gray-100 bg-opacity-25">
                <div className="lg:w-8/12 lg:mx-auto mb-8">
                    <header className="flex flex-wrap items-center p-4 md:py-8 md:pl-14">
                        <div className="md:w-3/12 md:ml-16">
                            <form onSubmit={handleProfileImgChange}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                <img
                                    className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-blue-400 p-1 cursor-pointer"
                                    src={user?.personal_info.profile_img}
                                    alt="profile"
                                    onClick={handleImageClick} // Trigger file input on image click
                                />
                            </form>
                        </div>

                        <div className="w-8/12 md:w-7/12 ml-4">
                            <div className="md:flex md:flex-wrap md:items-center mb-4">
                                <h2 className="text-2xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                                    @{user?.personal_info?.username || 'Username'}
                                </h2>

                                <span
                                    className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                                    aria-hidden="true"
                                >
                                    <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px" />
                                </span>

                                <div className='flex gap-3'>
                                    <button
                                        className="w-16 bg-[#00d7ff] px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block"
                                    >
                                        Follow
                                    </button>
                                    <button
                                        className="w-16 bg-gray-300 px-2 py-1 text-black font-semibold text-sm rounded block text-center sm:inline-block"
                                        onClick={() => setIsPopupOpen(true)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>

                            <ul className="hidden md:flex space-x-8 mb-4">
                                <li>
                                    <span className="font-semibold">0</span> posts
                                </li>
                                <li>
                                    <span className="font-semibold">0</span> followers
                                </li>
                                <li>
                                    <span className="font-semibold">0</span> following
                                </li>
                            </ul>

                            <div className="hidden md:block">
                                <h1 className="font-semibold">{user?.personal_info.fullname || 'Full Name'}</h1>
                                <span></span>
                                <p>{user?.personal_info?.bio || "Bio..."}</p>
                            </div>
                        </div>

                        <div className="md:hidden text-sm my-2">
                            <h1 className="font-semibold">{user?.personal_info.fullname || 'Full Name'}</h1>
                            <span></span>
                            <p>{user?.personal_info?.bio || "Bio..."}</p>
                        </div>
                    </header>

                    <div className="px-px md:px-3">
                        <ul className="flex md:hidden justify-around space-x-8 border-t border text-center p-2 text-gray-600 leading-snug text-sm">
                            <li>
                                <span className="font-semibold text-gray-800 block">0</span> posts
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800 block">0</span> followers
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800 block">0</span> following
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
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-[#00d7ff] text-white px-4 py-2 rounded-md ${isLoading && 'disabled:true'}`}
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
