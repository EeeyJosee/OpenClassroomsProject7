import axios from "axios";
import api from '../api/axios';
import React, { useState } from "react";
import '../styles/ReadPost.css';

function ReadPost(props) {

    const id = props.id;
    const read = props.read;

    // authentication details for get request
    const token = JSON.parse(localStorage.getItem('auth')).token;
    const userId = JSON.parse(localStorage.getItem('auth')).userId;
    const config = {
        headers: { Authorization: `Bearer ${token}`, withCredentials: true, withCredentials: true }
    };

    const [isRead, setIsRead] = useState(read.includes(userId));

    const handleClick = e => {
        const payload = { UserId: userId, read: isRead ? 0 : 1 };
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/posts/${id}/read`, payload, config)
            .then(
                () => {
                    setIsRead(!isRead)
                }
            ).catch(
                (error) => {
                    console.error(error.response);
                }
            );
    };

    return (
        <>
            {isRead ?
                <button onClick={handleClick} className="readPostButton">
                    <span className="longText">Read Post</span>
                    <span className="shortText">Read</span>
                </button>
                :
                <button onClick={handleClick} className="readPostButton unreadPostButton">
                    <span className="longText">Unread Post</span>
                    <span className="shortText">Unread</span>
                </button>
            }
        </>
    )
}

export default ReadPost