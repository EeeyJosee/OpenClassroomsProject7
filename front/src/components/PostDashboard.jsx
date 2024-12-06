import '../styles/PostDashboard.css';

function PostDashboard() {

    const posts = [
        {
            "id": 1,
            "message": "some post containing sound file",
            "mediaUrl": "http://localhost:3000/media/sampleMP3.mp31733445854027.mp3",
            "title": "First Post",
            "read": [],
            "createdAt": "2024-12-06T00:43:28.755Z",
            "updatedAt": "2024-12-06T00:43:28.755Z"
        },
        {
            "id": 3,
            "message": "some post containing video file",
            "mediaUrl": "http://localhost:3000/media/sampleMP4.mp41733445808725.mp4",
            "title": "Second Post",
            "read": [],
            "createdAt": "2024-12-06T00:43:28.755Z",
            "updatedAt": "2024-12-06T00:43:28.755Z"
        },
        {
            "id": 4,
            "message": "some post with no media",
            "mediaUrl": "",
            "title": "Third Post",
            "read": [],
            "createdAt": "2024-12-06T00:44:14.035Z",
            "updatedAt": "2024-12-06T00:44:14.035Z"
        },
        {
            "id": 2,
            "message": "some post containing image file",
            "mediaUrl": "http://localhost:3000/media/icon-left-font.png1733465028603.png",
            "title": "Fourth Post",
            "read": [],
            "createdAt": "2024-12-06T00:44:14.035Z",
            "updatedAt": "2024-12-06T00:44:14.035Z"
        }
    ]

    // verifying media contents for conditional rendering
    for (const eachPost of posts) {
        if (eachPost.mediaUrl) {
            eachPost.hasMedia = true;

            if (eachPost.mediaUrl.includes('.png')) {
                eachPost.hasImg = true;
                posts[eachPost] = eachPost;
            }
            else {
                eachPost.hasImg = false;
                posts[eachPost] = eachPost;
            }
        }
        else {
            eachPost.hasMedia = false;
            eachPost.hasImg = false;
            posts[eachPost] = eachPost;
        }
    }

    // format mapping for each post
    const post = ({ id, message, mediaUrl, title, hasMedia, hasImg }) =>
        <li key={id}>
            <h2>{title}</h2>

            {/* render appropriate media formats in list */}
            {hasMedia ?
                <>
                    {/* what type of media is present */}
                    {hasImg ?
                        <img className="postMedia" alt={`media for ${title}`} src={mediaUrl} />
                        :
                        <video className="postMedia" controls>
                            <source src={mediaUrl} type="video/mp4"></source>
                        </video>
                    }
                </> : null
            }

            < p className="">{message}</p>
        </li >

    return (
        <>
            <div className="postContainer">
                <h1>Employee Dashboard</h1>
                <ul>
                    {posts.map(post)}
                </ul>
            </div>
        </>
    )
}

export default PostDashboard