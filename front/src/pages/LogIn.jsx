import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Banner from '../components/Banner';
import '../styles/LogIn.css';

function LogIn() {

    const handleSubmit = e => {
        // Prevent the default submit and page reload
        e.preventDefault();
        
        if (reEmail.test(email) && rePassword.test(password)) {
            setErrorMessage('');

            axios
                .post("http://localhost:3000/api/auth/login", { email, password })
                .then(
                    response => {
                        localStorage.setItem("auth", JSON.stringify(response.data));
                        navigate('..');
                    }
                ).catch(
                    (error) => {
                        setErrorMessage('❌ Email/Password are invalid!');
                        setTimeout(() => { setErrorMessage('') }, 3000);
                    }
                );

        } else {
            setErrorMessage('❌ Email/Password are invalid!');
            setTimeout(() => { setErrorMessage('') }, 3000);
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();
    const reEmail = new RegExp(/([a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3})/);
    const rePassword = new RegExp(/([a-zA-Z0-9])/);

    return (
        <>
            <Banner />
            <div>
                <form action="" id="login" method="post" onSubmit={handleSubmit}>
                    <h1 className="loginTitle">Login</h1>
                    <p className="item">
                        <label htmlFor="email"> Email </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </p>
                    <p className="item">
                        <label htmlFor="password"> Password </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </p>
                    <div className="submitError">
                        <p className="item">
                            <input type="submit" id="loginButton" value="Login" />
                        </p>
                        {errorMessage && <div className="error"> {errorMessage} </div>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default LogIn;