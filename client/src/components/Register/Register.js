import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '../../utils/firebase.js';
import './Register.css';

import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const Register = () => {
	const navigate = useNavigate();

	let formIsValid = true;

	const [email, setEmail] = useState('');

	const [rePass, setRePass] = useState('');

	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');

	const [rePassError, setRePassError] = useState('');

	const [existingUser, setExistingUser] = useState(null);

	const [passwordError, setPasswordError] = useState('');

	const handleValidation = () => {
		setEmailError('');
		setRePassError('');
		setPasswordError('');

		formIsValid = true;

		if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
			formIsValid = false;

			setEmailError('Email Not Valid');
		}

		if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
			formIsValid = false;

			setPasswordError('Password must be only letters and digits between 8 and 22 characters');
		}

		if (password !== rePass) {
			formIsValid = false;

			setRePassError('Password dont match!');
		}


	};

	const onRegisterSubmit = async (e) => {
		e.preventDefault();
		handleValidation();

		if (!formIsValid) {
			return;
		}

		const users = collection(db, 'users');
		const q = query(users, where('email', '==', email));
		const dataUsers = await getDocs(q);

		if (!dataUsers.empty) {
			setEmailError('Email already exist!');
			return [];
		}

		dataUsers.docs.map(u => setExistingUser(u));

		if (existingUser) {
			setEmailError('This user already exist!');
			return;
		}

		try {
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

			await setDoc(doc(db, 'users', userCredentials.user.uid), {
				email,
				role: 'client'
			});

			navigate('/');

		} catch (error) {
			console.log(error);
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
										onChange={(event) => setEmail(event.target.value.trim())}
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
										onChange={(event) => setPassword(event.target.value.trim())}
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
										id="exampleInputPassword2"
										name="re-password"
										placeholder="Password"
										onChange={(event) => setRePass(event.target.value.trim())}
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
