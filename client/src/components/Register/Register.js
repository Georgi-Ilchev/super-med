import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '../../utils/firebase.js';
import './Register.css';

import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const Register = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [allUsers, setAllUser] = useState(null);

    const [rePass, setRePass] = useState("");
    const [rePassError, setRePassError] = useState("");

    let formValidation;

    const handleValidation = () => {
        formValidation = true;
        setemailError("");
        setpasswordError("");
        setRePassError("");

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formValidation = false;
            setemailError("Email Not Valid");
        }

        if (!password.match(/^[a-zA-Z]{8,22}$/)) {
            formValidation = false;
            setpasswordError(
                "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
            );
        }

        if (password != rePass) {
            formValidation = false;
            setRePassError(
                "Password dont match!"
            );
        }
    };

    const onRegisterSubmit = async (e) => {
        e.preventDefault();
        handleValidation();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const users = collection(db, 'users');
        const q = query(users, where("email", "==", email));
        const dataUsers = await getDocs(q);

        if (!dataUsers.empty) {
            setemailError("Email already exist!");
            formValidation = false;
            return [];
        }

        if (!formValidation) {
            console.log(formValidation);
            return;
        }

        setAllUser(dataUsers.docs.map(u => console.log(u)));

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", userCredentials.user.uid), {
                email,
            });

            navigate("/");

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        }
    };

    return (
        <section className="register-section">
            <div className="App">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <form id="loginform" onSubmit={onRegisterSubmit}>
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
                                <div className="form-group">
                                    <label>Repeat Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="re-password"
                                        placeholder="Password"
                                        onChange={(event) => setRePass(event.target.value)}
                                    />
                                    <small id="passworderror" className="text-danger form-text">
                                        {rePassError}
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
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;