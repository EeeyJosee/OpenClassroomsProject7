import React, { useState } from "react";
import '../styles/PostMap.css';
import DeletePost from './DeletePost';
import ReadPost from './ReadPost';

function PostMap(props) {
    // logged in user's ID
    const userId = JSON.parse(localStorage.getItem('auth')).userId;

    const [isExpanded, setIsExpanded] = useState(false);
    const id = props.id;
    const message = props.message;
    const mediaUrl = props.mediaUrl;
    const title = props.title;
    const UserId = props.UserId;
    const read = props.read;
    const createdAt = (props.createdAt).substring(0,10);

    return (
        <li key={id} data-key={id}>
            <h2 className="postTitle" onClick={() => setIsExpanded(!isExpanded)} >{title}</h2>
            {isExpanded ?
                <>
                    <p className="postMessage">
                        <span className="bold">Creator:</span> ID-{UserId} <span className="bold">Date:</span> {createdAt}
                    </p>
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
                <ReadPost id={id} UserId={UserId} read={read} />
                {UserId === userId ? <DeletePost id={id} /> : null}
            </div>
        </li>
    )
}

export default PostMap