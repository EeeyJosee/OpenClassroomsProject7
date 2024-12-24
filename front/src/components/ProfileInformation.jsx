import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/ProfileInformation.css';

function ProfileInformation() {

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        headers: { Authorization: `Bearer ${auth}` }
    };
    const id = JSON.parse(localStorage.getItem('auth')).userId;
    const navigate = useNavigate();

    const handleClick = e => {
        axios
            .delete(`http://localhost:3000/api/auth/delete/${id}`, config)
            .then(
                () => {
                    localStorage.clear();
                    { navigate('/login') };
                }
            ).catch(
                (error) => {
                    console.error(error.response);
                }
            );
    };

    return (
        <>
            <h1 className="profileIdTitle">Account ID: {id}</h1>
            <div className="createPostContainer deleteProfileButton">
                <button onClick={handleClick}>Delete Profile</button>
            </div>
        </>
    )
}

export default ProfileInformation