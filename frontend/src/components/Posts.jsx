import React, { useEffect } from 'react'
import Post from './Post'
import postStore from '../store/post.store'

const Posts = () => {
    const { getPosts, posts, isLoading, error } = postStore()

    useEffect(() => {
        getPosts()
        // console.log(posts);

    }, [getPosts])

    return (
        <div className='mb-24'>
            {
                posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))
            }
        </div>
    )
}

export default Posts
