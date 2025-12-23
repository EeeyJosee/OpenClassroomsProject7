import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Banner from '../components/Banner';
import '../styles/SignUp.css';

function SignUp() {

    const handleSubmit = e => {
        // Prevent the default submit and page reload
        e.preventDefault();

        if (reEmail.test(email)
            && rePassword.test(password)
            && (reName.test(firstName) || firstName === '')
            && (reName.test(lastName) || lastName === '')) {

            setErrorMessage('');

            axios
                .post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, { email, password, firstName, lastName }, { withCredentials: true })
                .then(
                    response => {
                        setErrorMessage("✅ Account created! Now redirecting...");
                        setTimeout(() => { navigate('/login') }, 1000);
                    }
                ).catch(
                    (error) => {
                        console.log(error.response.data)
                        setErrorMessage(`❌ ${error.response.data.error}`);
                        setTimeout(() => { setErrorMessage('') }, 4000);
                    }
                );

        } else {
            if (!reEmail.test(email)) {
                setErrorMessage('❌ Email is invalid!');
                setTimeout(() => { setErrorMessage('') }, 3000);
            }
            if (!rePassword.test(password)) {
                setErrorMessage('❌ Password is invalid!');
                setTimeout(() => { setErrorMessage('') }, 3000);
            }
            if (! (reName.test(firstName)|| firstName === '') ) {
                setErrorMessage('❌ First name is invalid!');
                setTimeout(() => { setErrorMessage('') }, 3000);
            }
            if (! (reName.test(lastName)|| lastName === '') ) {
                setErrorMessage('❌ Last name is invalid!');
                setTimeout(() => { setErrorMessage('') }, 3000);
            }
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();
    const reEmail = new RegExp(/([a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3})/);
    const rePassword = new RegExp(/([a-zA-Z0-9])/);
    const reName = new RegExp(/[a-zA-Z-]/);

    return (
        <>
            <Banner />
            <div>
                <form action="" id="signup" method="post" onSubmit={handleSubmit}>
                    <h1 className="signupTitle">Signup</h1>
                    <p className="item">
                        <label htmlFor="email"> Email <span className="requiredField">*</span> </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </p>
                    <p className="item">
                        <label htmlFor="password"> Password <span className="requiredField">*</span> </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </p>
                    <p className="item">
                        <label htmlFor="firstName"> First Name </label>
                        <input
                            type="firstName"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </p>
                    <p className="item">
                        <label htmlFor="lastName"> Last Name </label>
                        <input
                            type="lastName"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </p>
                    <div className="submitError">
                        <p className="item">
                            <input type="submit" id="signupButton" value="Signup" />
                        </p>
                        {errorMessage && <div className="error"> {errorMessage} </div>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;