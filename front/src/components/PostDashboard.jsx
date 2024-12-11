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

    const post = ({ id, message, mediaUrl, title }) =>
        // render appropriate media formats in list
        <li key={id}>
            <h2 className='postTitle'>{title}</h2>
            <p className="postMessage">{message}</p>

            {mediaUrl.includes('.png', '.jpg    ') ?
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
                <h1>Employee Dashboard</h1>
                <ul>
                    {posts.map(post)}
                </ul>
            </div>
        </>
    )
}

export default PostDashboard