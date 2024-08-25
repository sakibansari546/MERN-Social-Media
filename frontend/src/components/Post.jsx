import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    let { author, caption, postImage } = post;
    // console.log(post);

    return (
        <div>
            <div className="container mx-auto my-2 sm:px-20 flex justify-center mb-11">

                {/* Post */}
                <div className="rounded overflow-hidden border w-full  bg-white mx-3 md:mx-0 lg:mx-0">
                    <div className="w-full flex justify-between p-3">
                        <Link to={`/profile/${author?._id}`} className="flex">
                            <div className="flex">
                                <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                                    <img src={author?.personal_info.profile_img} alt="profilepic" />
                                </div>
                                <span className="pt-1 ml-2 font-bold text-sm">{author?.personal_info?.username}</span>
                            </div>
                        </Link>
                        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded flex items-center justify-center">
                            <i class="fi fi-bs-menu-dots"></i>
                        </span>
                    </div>
                    <div className='w-full bg-gray-100 flex items-center justify-center'>
                        <img
                            className="w-full h-72 object-cover bg-cover"
                            src={postImage}
                            alt="Post"
                        />
                    </div>
                    <div className="px-3 pb-2">
                        <div className="pt-2">
                            <i className="far fa-heart cursor-pointer"></i>
                            <span className="text-sm text-gray-400 font-medium">12 likes</span>
                        </div>
                        <div className="pt-1">
                            <div className="mb-2 text-sm">
                                <span className="font-medium mr-2">{author?.personal_info?.username}</span>
                                {caption}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Post;
