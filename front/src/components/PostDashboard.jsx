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
                    console.log(response.data)
                    console.log(posts)
                }
            ).catch(
                (error) => {
                    console.log(error.response.data)
                }
            );
    }, []);

    const posts = [
        {
            "id": 1,
            "message": "some post containing sound file",
            "mediaUrl": "http://localhost:3000/media/sampleMP3.mp31733968414498.mp3",
            "title": "First Post",
            "read": [],
            "createdAt": "2024-12-06T00:43:28.755Z",
            "updatedAt": "2024-12-06T00:43:28.755Z",
            "UserId": 5
        },
        {
            "id": 3,
            "message": "some post containing video file",
            "mediaUrl": "http://localhost:3000/media/sampleMP4.mp41733968435549.mp4",
            "title": "Second Post",
            "read": [],
            "createdAt": "2024-12-06T00:43:28.755Z",
            "updatedAt": "2024-12-06T00:43:28.755Z",
            "UserId": 4
        },
        {
            "id": 4,
            "message": "some post with no media",
            "mediaUrl": "",
            "title": "Third Post",
            "read": [],
            "createdAt": "2024-12-06T00:44:14.035Z",
            "updatedAt": "2024-12-06T00:44:14.035Z",
            "UserId": 3
        },
        {
            "id": 2,
            "message": "some post containing image file",
            "mediaUrl": "http://localhost:3000/media/icon-above-font.png1733968376990.png",
            "title": "Fourth Post",
            "read": [],
            "createdAt": "2024-12-06T00:44:14.035Z",
            "updatedAt": "2024-12-06T00:44:14.035Z",
            "UserId": 2
        }
    ]

    const [posts2, setPosts] = useState('');

    const post = ({ id, message, mediaUrl, title }) =>
        // render appropriate media formats in list
        <li key={id}>
            <h2 className="postTitle">{title}</h2>
            <p className="postMessage">{message}</p>

            {mediaUrl.includes('.png', '.jpg') ?
                <img className="postMedia" src={mediaUrl} alt={`media for ${title}`} /> : null}

            {mediaUrl.includes('.mp4') ?
                <video className="postMedia" controls>
                    <source src={mediaUrl} type="video/mp4"></source>
                </video> : null}

            {mediaUrl.includes('.mp3') ?
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