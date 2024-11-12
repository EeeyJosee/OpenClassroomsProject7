import axios from "axios";
import { useState } from "react";
import '../styles/SignUp.css';

function SignUp() {

    const handleSubmit = e => {
        // Prevent the default submit and page reload
        e.preventDefault();
        // Handle validations
        axios
            .post("http://localhost:3000/api/auth/signup", { email, password, firstName, lastName })
            .then(response => {
                console.log(response);
                // Handle response
            });
    }
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    return (
        <>
            <div>
                <form action="" id="signup" method="post" onSubmit={handleSubmit}>
                    <h1>Signup</h1>
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
                    <p className="item">
                        <input type="submit" value="Signup" />
                    </p>
                </form>
            </div>
        </>
    );
}
export default SignUp;