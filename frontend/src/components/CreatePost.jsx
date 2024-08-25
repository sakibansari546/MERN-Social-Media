import React, { useRef, useState } from 'react';
import imageIcon from '../assets/add-image.svg';

const CreatePost = () => {
    const postRef = useRef(null);
    const [formData, setFormData] = useState({
        caption: "",
        postImage: null
    });

    const handleImageClick = () => {
        postRef.current.click();
    };

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === "file") {
            setFormData(prevState => ({ ...prevState, postImage: files[0] }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleClick = () => {
        const updateData = new FormData();
        updateData.append('caption', formData.caption);
        if (formData.postImage) {
            updateData.append('postImage', formData.postImage);
        }

        console.log(updateData);
        console.log(formData);


    };

    return (
        <div>
            <div className='w-full h-screen md:px-16 bg-white md:ml-24 lg:ml-72 my-1 md:mr-16 md:w-[50rem]'>
                <div className='py-4 px-5 relative'>
                    <input
                        onChange={handleChange}
                        className='w-full bg-gray-100 p-2 px-4'
                        type="text"
                        placeholder='Write a post'
                        name='caption'
                    />
                    <input
                        ref={postRef}
                        onChange={handleChange}
                        className='hidden'
                        type="file"
                        name="postImage"
                        accept="image/*"
                    />

                    <button onClick={handleImageClick}>
                        <img
                            src={imageIcon}
                            className='w-5 h-5 absolute top-7 right-8'
                            alt="Upload"
                        />
                    </button>
                </div>
                {
                    formData.postImage &&
                    <div className='py-4 px- w-full h-[300px] border'>
                        {formData.postImage && (
                            <img
                                src={URL.createObjectURL(formData.postImage)}
                                className='w-full h-full object-contain'
                                alt="Post preview"
                            />
                        )}
                        {
                            formData.caption && (
                                <>
                                    <button
                                        onClick={handleClick}
                                        className='bg-[#00d7ff] text-white px-4 py-2 rounded-md float-right mr-16 mt-8'
                                    >
                                        Post
                                    </button>
                                </>
                            )
                        }
                    </div>
                }

            </div>
        </div>
    );
};

export default CreatePost;
