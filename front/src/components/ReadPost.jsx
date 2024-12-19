import axios from "axios";
import React, { useEffect, useState } from "react";
import '../styles/ReadPost.css';

function ReadPost(props) {

    const id = props.id;
    const UserID = props.UserId;
    const read = props.read;

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        headers: { Authorization: `Bearer ${auth}` }
    };

    const handleClick = e => {
        axios
            .post(`http://localhost:3000/api/posts/${id}/read`, config)
            .then(
                response => {
                    window.location.reload();
                }
            ).catch(
                (error) => {
                    console.log(error.response);
                }
            );
    };

    //  const [posts, setPosts] = useState([]);

    return (
        <>
            {!read?.includes(UserID) ?
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