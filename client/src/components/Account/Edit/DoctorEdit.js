import { db, storage } from '../../../utils/firebase';
import AccountModal from '../../Modal/AccountModal/AccountModal.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { Towns } from '../../../constants.js';

import React, { useState, useCallback, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const DoctorEditProfile = () => {
    // let params = useParams();
    let formIsValid = true;
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [doctorData, setDoctorData] = useState(null);

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [education, setEducation] = useState('');
    const [phone, setPhone] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddress, setHospitalAddress] = useState('');
    const [hospitalTown, setHospitalTown] = useState('');
    const [image, setImage] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [educationError, setEducationError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [hospitalNameError, setHospitalNameError] = useState('');
    const [hospitalAddressError, setHospitalAddressError] = useState('');
    const [hospitalTownError, setHospitalTownError] = useState('');
    const [imageError, setImageError] = useState('');

    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [, updateState] = useState();

    const [modalInfo, setModalInfo] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const handleValidation = () => {
        setFullNameError('');
        setAgeError('');
        setDescriptionError('');
        setEducationError('');
        setPhoneError('');
        setHospitalNameError('');
        setHospitalAddressError('');
        setHospitalTownError('');
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

        if (education.length <= 0) {
            setEducationError('Education must be not empty!');
            formIsValid = false;
        }

        if (description.length < 20) {
            setDescriptionError('Description must be minimum 20 characters!');
            formIsValid = false;
        }

        if (!phone?.match(/^[0-9]{10}$/) || phone === undefined) {
            setPhoneError('Phone number must contains exactly 10 numbers');
            formIsValid = false;
        }

        if (hospitalName.length < 5) {
            setHospitalNameError('Hospital name must be at least 5 characters!');
            formIsValid = false;
        }

        if (hospitalAddress?.length <= 5 || hospitalAddress === undefined) {
            setHospitalAddressError('Address must be not empty');
            formIsValid = false;
        }

        if (Towns.find((town) => hospitalTown === town)) {
        } else {
            setHospitalTownError('Town does not exist!');
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
        // console.log(doctorData.image);
        if (!doctorData.image) {
            if (progress != 100) {
                forceUpdate();
                return;
            }
        }

        // console.log(image[0]);

        // const ref = doc(db, 'users', params?.uid);
        const ref = doc(db, 'doctors', currentUser.uid);

        try {
            await updateDoc(ref, {
                fullName,
                age,
                description,
                education,
                phone,
                image: url,
                hospitalName,
                hospitalAddress,
                town: hospitalTown,
            });
        } catch (error) {
            console.log(error);
            return;
        }

        setModalInfo('You have successfully edit your account!');
        setModalShow(true);
        setTimeout(() => navigate(`/doctor-account/${currentUser.uid}`), 1500);

    }, [fullName, age, description, education, phone, hospitalName, hospitalAddress, hospitalTown, url]);

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

        if (!doctorData) {
            return;
        }

        setFullName(state => doctorData.fullName);
        setAge(state => doctorData.age);
        setDescription(state => doctorData.description);
        setEducation(state => doctorData.education);
        setPhone(state => doctorData.phone);
        setHospitalName(state => doctorData.hospitalName);
        setHospitalAddress(state => doctorData.hospitalAddress);
        setHospitalTown(state => doctorData.town);
        setUrl(state => doctorData.image);
    }, [doctorData]);

    useEffect(() => {
        (async () => {
            if (!currentUser?.uid) {
                return;
            }

            const ref = await doc(db, 'doctors', currentUser.uid);

            const doctor = await getDoc(ref);

            setDoctorData(prevState => doctor.data());
        })();
    }, [currentUser?.uid]);

    console.log(education);

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
                                            defaultValue={doctorData?.fullName}
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
                                            defaultValue={doctorData?.age}
                                        />
                                        <small className="text-danger form-text">
                                            {ageError}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            placeholder="description..."
                                            onChange={(event) => setDescription(event.target.value)}
                                            defaultValue={doctorData?.description}
                                        />
                                        <small className="text-danger form-text">
                                            {descriptionError}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="education"
                                            placeholder="education..."
                                            onChange={(event) => setEducation(event.target.value)}
                                            defaultValue={doctorData?.education}
                                        />
                                        <small className="text-danger form-text">
                                            {educationError}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            placeholder="08********"
                                            onChange={(event) => setPhone(event.target.value.trim())}
                                            defaultValue={doctorData?.phone}

                                        />
                                        <small className="text-danger form-text">
                                            {phoneError}
                                        </small>
                                    </div>

                                    {/* <div className="form-group">
                                        <label>PIN(Personal Identification Number)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="PIN"
                                            placeholder="0000000000"
                                            onChange={(event) => setPin(event.target.value)}
                                            defaultValue={doctorData?.pin}

                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div> */}

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
                                        <label>Hospital Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="hospitalName"
                                            placeholder="Okrujna"
                                            onChange={(event) => setHospitalName(event.target.value.trim())}
                                            defaultValue={doctorData?.hospitalName}

                                        />
                                        <small className="text-danger form-text">
                                            {hospitalNameError}
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Hospital Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="hospitalAddress"
                                            placeholder="bul. Evlogi Georgiev 27"
                                            onChange={(event) => setHospitalAddress(event.target.value.trim())}
                                            defaultValue={doctorData?.hospitalAddress}

                                        />
                                        <small className="text-danger form-text">
                                            {hospitalAddressError}
                                        </small>
                                    </div>

                                    {/* <div className="form-group">
                                        <label>Hospital Town</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="hospitalTown"
                                            placeholder="Sofia"
                                            onChange={(event) => setHospitalTown(event.target.value.trim())}
                                            defaultValue={doctorData?.town}

                                        />
                                        <small className="text-danger form-text">
                                            {hospitalTownError}
                                        </small>
                                    </div> */}

                                    <div className="form-group mb-3">
                                        <label>Hospital Town</label>
                                        <select
                                            className="form-select"
                                            id="inputGroupSelect01"
                                            defaultValue=''
                                            name="hospitalTown"
                                            onBlur={(event) => setHospitalTown(event.target.value.trim())}>
                                            <option value={hospitalTown} hidden>{hospitalTown}</option>
                                            {Towns.map(x =>
                                                <option key={x} value={x}>{x}</option>
                                            )}
                                        </select>
                                        <small className="text-danger form-text">
                                            {hospitalTownError}
                                        </small>
                                    </div>

                                    {
                                        doctorData?.image && progress === 0
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
