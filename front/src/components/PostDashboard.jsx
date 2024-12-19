import axios from "axios";
import React, { useEffect, useState } from "react";
import DeletePost from '../components/DeletePost';
import ReadPost from '../components/ReadPost';
import '../styles/PostDashboard.css';

function PostDashboard() {
    // logged in user's ID
    const userId = JSON.parse(localStorage.getItem('auth')).userId;

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
    const [isExpanded, setIsExpanded] = useState(false);

    const post = ({ id, message, mediaUrl, title, UserId, read }) =>

        <li key={id}>
            <h2 className="postTitle" onClick={() => setIsExpanded(!isExpanded)}>{title}</h2>
            {isExpanded ?
                <>
                    {/* <h2 className="postTitle">{title}</h2> */}
                    <p className="postMessage">{message}</p>

                    {/* render appropriate media formats in list */}
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
                </>
                :
                null
            }
            <div className="postModification">
                <ReadPost id={id} UserID={UserId} read={read} />
                {UserId === userId ? <DeletePost id={id} /> : null}
            </div>
        </li>

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