import axios from "axios";
import '../styles/ReadPost.css';

function ReadPost(props) {

    const id = props.id;
    const read = props.read;

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const authId = JSON.parse(localStorage.getItem('auth')).userId;
    const config = {
        headers: { Authorization: `Bearer ${auth}` }
    };

    const handleClick = e => {
        if (read?.includes(authId)) {
            const payload = {UserId: authId, read: 0};
            axios
                .post(`http://localhost:3000/api/posts/${id}/read`, payload, config)
                .then(
                    response => {
                        window.location.reload();
                    }
                ).catch(
                    (error) => {
                        console.log(error.response);
                    }
                );
        }
        else {
            const payload = {UserId: authId, read: 1};
            axios
                .post(`http://localhost:3000/api/posts/${id}/read`, payload, config)
                .then(
                    response => {
                        window.location.reload();
                    }
                ).catch(
                    (error) => {
                        console.log(error.response);
                    }
                );
        }
    };

    return (
        <>
            {read?.includes(authId) ?
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