import React, { useEffect } from 'react'
import Post from './Post'
import postStore from '../store/post.store'

const Posts = () => {
    const { getPosts, posts, likeOrNot, isLoading, error } = postStore()

    useEffect(() => {
        getPosts()
    }, [getPosts, likeOrNot])


    return (
        <div className='pb-20'>

            {
                error ? <h1>{error}</h1> :
                    posts?.map((post) => (
                        <Post key={post._id} post={post} />
                    ))
            }
        </div>
    )
}

export default Posts
