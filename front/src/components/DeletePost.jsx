import axios from "axios";
import '../styles/DeletePost.css';

function DeletePost(props) {

    const id = props.id;

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        headers: { Authorization: `Bearer ${auth}` }
    };

    const handleClick = e => {
        axios
            .delete(`http://localhost:3000/api/posts/${id}`, config)
            .then(
                response => {
                    alert("Post Deleted!");
                    window.location.reload();
                }
            ).catch(
                (error) => {
                    console.log(error.response);
                }
            );
    };

    return (
        <>
            <button onClick={handleClick} className="deletePostButton">
                <span className="longText">Delete Post</span>
                <span className="shortText">Delete</span>
            </button>
        </>
    )
}

export default DeletePost