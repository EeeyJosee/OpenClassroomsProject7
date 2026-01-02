import axios from "axios";
import React, { useEffect, useState } from "react";
import PostMap from './PostMap';

function PostDashboard() {

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
    };

    // get all posts
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/posts`, config)
            .then(
                response => {
                    setPosts(response.data);
                }
            ).catch(
                (error) => {
                    console.log(error.response.data)
                }
            );
    }, []);

    const [posts, setPosts] = useState([]);

    // call the mapping we'll use for each individual post
    const post = ({ id, message, media, title, UserId, read, createdAt }) =>
        <PostMap
            id={id} 
            UserId={UserId}
            read={read}
            message={message}
            media={media}
            title={title}
            createdAt={createdAt} />

    return (
        <>
            <div className="postContainer">
                <h1 className="dashboardTitle">Employee Dashboard</h1>
                <ul>
                    {posts.map(post)}
                </ul>
            </div>
        </>
    )
}

export default PostDashboard