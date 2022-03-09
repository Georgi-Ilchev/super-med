import { db } from '../../../utils/firebase';
import AccountModal from '../../Modal/AccountModal/AccountModal.js';

import React, { useState, useCallback, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';


const EditProfile = () => {
    let params = useParams();
    let formIsValid = true;

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    const [pin, setPin] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [ageError, setAgeError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const [modalInfo, setModalInfo] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const handleValidation = () => {
        setFullNameError('');
        setAgeError('');
        setPhoneNumberError('');
        setAddressError('');
        formIsValid = true;

        if (!fullName.match(/^([a-zA-Z]){2,25} ([a-zA-Z]){2,25}$/)) {
            setFullNameError('Name must contains only letters between 2 and 25');
            formIsValid = false;
        }

        if (age < 18 || age >= 100) {
            setAgeError('Age must be between 18 and 100');
            formIsValid = false;
        }

        if (!phoneNumber.match(/^[0-9]{10}$/)) {
            setPhoneNumberError('Phone number must contains exactly 10 numbers');
            formIsValid = false;
        }

        if (address.length <= 5) {
            setAddressError('Address must be not empty');
            formIsValid = false;
        }
    }

    const onEditHandler = useCallback(async (e) => {
        e.preventDefault();
        handleValidation();

        if (!formIsValid) {
            return;
        }

        const ref = doc(db, 'users', params?.uid);



        try {
            await updateDoc(ref, { age, pin, address, fullName, phoneNumber });
        } catch (error) {
            console.log(error);
            return;
        }

        setModalInfo('You have successfully edit your account!');
        setModalShow(true);
        setTimeout(() => navigate(`/account/${params.uid}`), 1500);

    }, [age, pin, address, fullName, phoneNumber]);


    useEffect(() => {
        if (!userData) {
            return;
        }
        setPin(state => userData.pin);
        setAge(state => userData.age);
        setAddress(state => userData.address);
        setFullName(state => userData.fullName);
        setPhoneNumber(state => userData.phoneNumber);
    }, [userData]);

    useEffect(() => {
        (async () => {
            if (!params?.uid) {
                return;
            }

            const ref = await doc(db, 'users', params.uid);

            const user = await getDoc(ref);

            setUserData(prevState => user.data());
        })();
    }, [params?.uid]);


    return (
        <div>
            {modalInfo === ''
                ? null
                : <AccountModal
                    show={modalShow}
                    modalInfo={modalInfo}
                    onHide={() => setModalShow(false)}
                />
            }
            <section className="register-section">
                <div className="App">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <form id="loginform" onSubmit={onEditHandler}>

                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            placeholder="Pancho Villa"
                                            onChange={(event) => setFullName(event.target.value.trim())}
                                            defaultValue={userData?.fullName}
                                        />
                                        <small className="text-danger form-text">
                                            {fullNameError}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Age</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="age"
                                            placeholder="32"
                                            onChange={(event) => setAge(event.target.value)}
                                            defaultValue={userData?.age}
                                        />
                                        <small className="text-danger form-text">
                                            {ageError}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            placeholder="08********"
                                            onChange={(event) => setPhoneNumber(event.target.value.trim())}
                                            defaultValue={userData?.phoneNumber}

                                        />
                                        <small className="text-danger form-text">
                                            {phoneNumberError}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>PIN(Personal Identification Number)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="PIN"
                                            placeholder="0000000000"
                                            onChange={(event) => setPin(event.target.value)}
                                            defaultValue={userData?.pin}

                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="PIN"
                                            placeholder="City, Street 00"
                                            onChange={(event) => setAddress(event.target.value.trim())}
                                            defaultValue={userData?.address}

                                        />
                                        <small className="text-danger form-text">
                                            {addressError}
                                        </small>
                                    </div>


                                    <button type="submit" className="btn mt-5 btn-primary">
                                        Edit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditProfile;
