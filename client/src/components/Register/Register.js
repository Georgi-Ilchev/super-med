import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '../../utils/firebase.js';
import './Register.css';

import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [rePass, setRePass] = useState('');

  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');

  const [rePassError, setRePassError] = useState('');

  const [formIsValid, setFormIsValid] = useState(true);

  const [existingUser, setExistingUser] = useState(null);

  const [passwordError, setPasswordError] = useState('');

  const handleValidation = () => {

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setFormIsValid(false);
      setEmailError('Email Not Valid');
    } else {
      setEmailError('');
      setFormIsValid(false);
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      setFormIsValid(false);

      setPasswordError(
        'Only Letters and length must best min 8 Chracters and Max 22 Chracters'
      );
      return false;
    } else {
      setPasswordError('');
      setFormIsValid(false);
    }

    if (password !== rePass) {
      setRePassError(
        'Password dont match!'
      );
      setFormIsValid(false);

    } else {
      setRePassError('');
      setFormIsValid(false);

    }
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    handleValidation();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const users = collection(db, 'users');
    const q = query(users, where('email', '==', email));
    const dataUsers = await getDocs(q);

    if (!dataUsers.empty) {
      setEmailError('Email already exist!');
      return [];
    }

    if (!formIsValid) {
      return;
    }

    dataUsers.docs.map(u => setExistingUser(u));

    if (existingUser) {
      setEmailError('This user already exist!');
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', userCredentials.user.uid), {
        email
      });

      navigate('/');

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
