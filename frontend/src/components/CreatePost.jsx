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
            <div className=''>
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

                    <div className='absolute top-6 right-8 flex items-center gap-4'>
                        <button onClick={handleImageClick}>
                            <img
                                src={imageIcon}
                                className='w-5 h-5'
                                alt="Upload"
                            />
                        </button>
                        {
                            formData.caption && formData.postImage &&
                            <button onClick={handleClick} className='text-xl font-bold text-[#00d7ff]'>Post</button>
                        }
                    </div>
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
                    </div>
                }

            </div>
        </div>
    );
};

export default CreatePost;
