import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.js';

import style from './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loginError, setError] = useState("");

    const handleValidation = (event) => {
        let formIsValid = true;

        return formIsValid;
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        handleValidation();

        console.log(password);
        console.log(email);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError("Invalid login attempt");
            const errorCode = error.code;
            const errorMessage = error.message;
        }
    };

    return (
        <section className="login-section">
            <div className="App">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <form id="loginform" onSubmit={onLoginSubmit}>
                                <small id="emailHelp" className="text-danger form-text">
                                    {loginError}
                                </small>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="EmailInput"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        onChange={(event) => setEmail(event.target.value.trim())}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) => setPassword(event.target.value.trim())}
                                    />
                                    {/* <small id="passworderror" className="text-danger form-text">
                                        {passwordError}
                                    </small> */}
                                </div>
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1"
                                    />
                                    <label className="form-check-label">Check me out</label>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;