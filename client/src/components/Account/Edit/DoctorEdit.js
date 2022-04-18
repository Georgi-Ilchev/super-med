import { db, storage } from '../../../utils/firebase';
import AccountModal from '../../Modal/AccountModal/AccountModal.js';
import { useAuth } from '../../../contexts/AuthContext.js';

import React, { useState, useCallback, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const DoctorEditProfile = () => {
    // let params = useParams();
    let formIsValid = true;
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    const [pin, setPin] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');

    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [, updateState] = useState();

    const [ageError, setAgeError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [imageError, setImageError] = useState('');

    const [modalInfo, setModalInfo] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const handleValidation = () => {
        setFullNameError('');
        setAgeError('');
        setPhoneNumberError('');
        setAddressError('');
        setImageError('');
        formIsValid = true;

        if (!fullName?.match(/^([a-zA-Z]){2,25} ([a-zA-Z]){2,25}$/) || fullName === undefined) {
            setFullNameError('Name must contains only letters between 2 and 25');
            formIsValid = false;
        }

        if (age < 18 || age >= 100 || age === undefined) {
            setAgeError('Age must be between 18 and 100');
            formIsValid = false;
        }

        if (!phoneNumber?.match(/^[0-9]{10}$/) || phoneNumber === undefined) {
            setPhoneNumberError('Phone number must contains exactly 10 numbers');
            formIsValid = false;
        }

        if (address?.length <= 5 || address === undefined) {
            setAddressError('Address must be not empty');
            formIsValid = false;
        }

        if (url === undefined) {
            setImageError('Required 1 image at least!');
            formIsValid = false;
        }
    }

    console.log('updated');
    console.log(url);

    const onEditHandler = useCallback(async (e) => {
        e.preventDefault();
        handleValidation();

        if (!formIsValid) {
            return;
        }

        // console.log(progress);
        // console.log(userData.imageUrl);
        if (!userData.imageUrl) {
            if (progress != 100) {
                forceUpdate();
                return;
            }
        }

        // console.log(image[0]);

        // const ref = doc(db, 'users', params?.uid);
        const ref = doc(db, 'users', currentUser.uid);

        try {
            await updateDoc(ref, { age, pin, address, fullName, phoneNumber, imageUrl: url });
        } catch (error) {
            console.log(error);
            return;
        }

        setModalInfo('You have successfully edit your account!');
        setModalShow(true);
        setTimeout(() => navigate(`/account/${currentUser.uid}`), 1500);

    }, [age, pin, address, fullName, phoneNumber, image, url]);

    const uploadFile = async (file) => {
        if (!file) {
            return;
        }

        const storageRef = ref(storage, `/ documents / ${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    // .then((url) => console.log(url));
                    .then((url) => setUrl(prevState => url));
            }
        );
    }

    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        (async () => {
            if (currentUser === null || currentUser === undefined) {
                navigate('/');
            }
        })();

        if (!userData) {
            return;
        }
        setPin(state => userData.pin);
        setAge(state => userData.age);
        setAddress(state => userData.address);
        setFullName(state => userData.fullName);
        setPhoneNumber(state => userData.phoneNumber);
        setUrl(state => userData.imageUrl);
    }, [userData]);

    useEffect(() => {
        (async () => {
            if (!currentUser?.uid) {
                return;
            }

            const ref = await doc(db, 'users', currentUser.uid);

            const user = await getDoc(ref);

            setUserData(prevState => user.data());
        })();
    }, [currentUser?.uid]);

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

                                    <div className="form-group mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload an image</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                            onBlur={(event) => setImage(event.target.files)}
                                            onChange={(event) => uploadFile(event.target.files[0])}
                                        />
                                        <small>
                                            <h3>{`Uploaded ${progress}`}</h3>
                                        </small>
                                        <small className="text-danger form-text">
                                            {imageError}
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

                                    {
                                        userData?.imageUrl && progress === 0
                                            ? <button type="submit" className="btn mt-5 btn-primary">
                                                Edit
                                            </button>
                                            : progress === 100
                                                ? <button type="submit" className="btn mt-5 btn-primary">
                                                    Edit
                                                </button>
                                                : <button type="submit" className="btn mt-5 btn-primary" disabled>
                                                    Edit
                                                </button>
                                    }

                                    {image[0] !== undefined}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DoctorEditProfile;
