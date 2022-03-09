import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import AccountModal from '../../Modal/AccountModal/AccountModal.js';

import { Categories } from '../../../constants.js';
import { db, storage } from '../../../utils/firebase.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { Alert, Modal } from 'react-bootstrap';

const BecomeDoctor = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    let formIsValid = true;

    const { userData } = location.state;

    const [education, setEducation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [describe, setDescribe] = useState('');
    const [educDocuments, setEducDocuments] = useState(null);
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddres, setHospitalAddres] = useState('');
    const [hospitalTown, setHospitalTown] = useState('');

    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);

    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const [existingRequestError, setExistingRequestError] = useState('');

    const handleValidation = () => {

    }

    const uploadFile = async (file) => {
        console.log(file);
        if (!file) {
            return;
        }

        const storageRef = ref(storage, `/documents/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => setUrl(prevState => url));
            }
        );
    }

    const onBecomeDoctorRequestHandler = async (e) => {
        e.preventDefault();
        handleValidation();
        //validation

        // const doctors = collection(db, "doctors");
        // const qu = query(doctors, where('uid', '==', currentUser?.uid));
        // const dataDoctors = await getDocs(qu);

        // console.log(dataDoctors);

        // if (!dataDoctors.empty) {
        //     console.log('You are already a doctor!');
        //     return [];
        // }

        const requests = collection(db, "doctor-requests");
        const q = query(requests, where('uid', '==', currentUser?.uid));
        const dataRequests = await getDocs(q);

        // console.log(dataRequests);
        if (!dataRequests.empty) {
            setExistingRequestError('You have already sent a request!');
            return [];
        }

        if (!formIsValid) {
            return;
        }

        await uploadFile(educDocuments[0]);

        try {
            console.log(url);
            await setDoc(doc(db, "doctor-requests", currentUser?.uid), {
                uid: currentUser?.uid,
                education,
                specialization,
                describe,
                // educDocuments,
                hospitalName,
                hospitalAddres,
                hospitalTown,
                userName: userData.fullName,
                userPhone: userData.phoneNumber,
                userAddress: userData.address,
                userPin: userData.pin,
                userAge: userData.age,
                userEmail: userData.email,
            });
        } catch (error) {
            console.log(error);
            return;
        }

        setAlertInfo('You have successfully send a request to be a doctor!');
        setModalShow(true);
        setTimeout(() => navigate(`/account/${currentUser?.uid}`), 3000);
    }

    // console.log(url);

    return (
        <div>
            {alertInfo === ''
                ? null
                : <AccountModal
                    show={modalShow}
                    alertInfo={alertInfo}
                    onHide={() => setModalShow(false)}
                />
            }

            <section style={style.becomeDoctorSpan} >
                <div className="App">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <small className="text-danger form-text">
                                    {existingRequestError}
                                </small>
                                <form id="loginform" onSubmit={onBecomeDoctorRequestHandler} >

                                    <div className="form-group mb-3">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="education"
                                            placeholder="Harvard"
                                            onChange={(event) => setEducation(event.target.value)}
                                        // defaultValue={userData?.fullName}
                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Specialization</label>
                                        <select
                                            className="form-select"
                                            id="inputGroupSelect01"
                                            defaultValue='Choose'
                                            onChange={(event) => setSpecialization(event.target.value)}>
                                            {/* <option selected>Choose...</option> */}
                                            {Categories.map(x =>
                                                <option key={x} value={x}>{x}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Describe</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            // name="phoneNumber"
                                            placeholder="description...."
                                            id='exampleFormControlTextarea1'
                                            onChange={(event) => setDescribe(event.target.value)}
                                        // defaultValue={userData?.phoneNumber}
                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload an education documents</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                            onChange={(event) => setEducDocuments(event.target.files)} />
                                    </div>

                                    <h3>{`Uploaded ${progress}`}</h3>

                                    <div className="form-group mb-3">
                                        <label>Hospital name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="education"
                                            placeholder="Okrujna"
                                            onChange={(event) => setHospitalName(event.target.value)}
                                        // defaultValue={userData?.fullName}
                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Hospital town</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="education"
                                            placeholder="Plovdiv"
                                            onChange={(event) => setHospitalTown(event.target.value)}
                                        // defaultValue={userData?.fullName}
                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="PIN"
                                            placeholder="City, Street 00"
                                            onChange={(event) => setHospitalAddres(event.target.value)}
                                        // defaultValue={userData?.address}

                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <button type="submit" className="btn mt-5 btn-primary">
                                        Send request
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BecomeDoctor;

const style = {
    becomeDoctorSpan: {
        paddingTop: '3rem',
    }
}