import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import React from 'react';
import { useState } from 'react';
import { Route, Link, NavLink, Navigate, useNavigate, Routes } from 'react-router-dom';
import style from './Login.css';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");

    const handleValidation = (event) => {
        let formIsValid = true;

        return formIsValid;
    };

    const onLoginSubmit = (e) => {
        e.preventDefault();
        handleValidation();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email);
        console.log(password);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(userCredential);
                console.log('----------');
                console.log(user);

                //redirect
                return <Navigate replace to="/"></Navigate>
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <section className="login-section">
            <div className="App">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <form id="loginform" onSubmit={onLoginSubmit}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="EmailInput"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <small id="emailHelp" className="text-danger form-text">
                                        {emailError}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <small id="passworderror" className="text-danger form-text">
                                        {passwordError}
                                    </small>
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