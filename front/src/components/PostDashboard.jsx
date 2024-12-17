import axios from "axios";
import React, { useEffect, useState } from "react";
import '../styles/PostDashboard.css';

function PostDashboard() {

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        headers: { Authorization: `Bearer ${auth}` }
    };

    // make the fetch the first time your component mounts
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/posts', config)
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

    const post = ({ id, message, mediaUrl, title }) =>
        // render appropriate media formats in list
        <li key={id}>
            <h2 className="postTitle">{title}</h2>
            <p className="postMessage">{message}</p>

            {mediaUrl?.includes('.png', '.jpg') ?
                <img className="postMedia" src={mediaUrl} alt={`media for ${title}`} /> : null}

            {mediaUrl?.includes('.mp4') ?
                <video className="postMedia" controls>
                    <source src={mediaUrl} type="video/mp4"></source>
                </video> : null}

            {mediaUrl?.includes('.mp3') ?
                <audio className="postMedia" controls>
                    <source src={mediaUrl} type="audio/ogg"></source>
                    <source src={mediaUrl} type="audio/mpeg"></source>
                </audio > : null}
        </li >

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