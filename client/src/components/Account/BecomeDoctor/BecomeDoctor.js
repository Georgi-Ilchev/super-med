import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import AccountModal from '../../Modal/AccountModal/AccountModal.js';

import { Categories, Towns } from '../../../constants.js';
import { db, storage } from '../../../utils/firebase.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { Alert, Modal } from 'react-bootstrap';

const BecomeDoctor = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    let formIsValid = true;

    const { userData } = location.state;

    console.log('here1');

    const [education, setEducation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [describe, setDescribe] = useState('');
    const [educDocuments, setEducDocuments] = useState(null);
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddres, setHospitalAddres] = useState('');
    const [hospitalTown, setHospitalTown] = useState('');

    const [educationError, setEducationError] = useState('');
    const [specializationError, setSpecializationError] = useState('');
    const [describeError, setDescribeError] = useState('');
    const [hospitalNameError, setHospitalNameError] = useState('');
    const [hospitalAddresError, setHospitalAddresError] = useState('');
    const [hospitalTownError, setHospitalTownError] = useState('');
    const [educDocumentsError, setEducDocumentsError] = useState('');

    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);

    const [modalInfo, setModalInfo] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const [existingRequestError, setExistingRequestError] = useState('');

    const handleValidation = (/*education, specialization, describe, educDocuments, hospitalName, hospitalAddres, hospitalTown*/) => {
        setEducationError('');
        setSpecializationError('');
        setDescribeError('');
        setHospitalNameError('');
        setHospitalAddresError('');
        setHospitalTownError('');
        setEducDocumentsError('');

        formIsValid = true;

        if (education.length <= 0) {
            setEducationError('Education must be not empty!');
            formIsValid = false;
        }

        if (Categories.find((category) => specialization === category)) {
        } else {
            setSpecializationError('Specialization does not exist!');
            formIsValid = false;
        }

        if (describe.length < 20) {
            setDescribeError('Describe must be minimum 20 characters!');
            formIsValid = false;
        }

        if (hospitalName.length < 5) {
            setHospitalNameError('Hospital name must be at least 5 characters!');
            formIsValid = false;
        }

        if (hospitalAddres.length < 8) {
            setHospitalAddresError('Hospital addres must be at least 8 characters!');
            formIsValid = false;
        }

        if (educDocuments === null) {
            setEducDocumentsError('Required 1 document image at least!');
            formIsValid = false;
        }

        if (Towns.find((town) => hospitalTown === town)) {
        } else {
            setHospitalTownError('Town doesn not exist!');
            formIsValid = false;
        }
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
                    // .then((url) => console.log(url));
                    .then((url) => setUrl(prevState => url));
            }
        );
    }
    // console.log(url);

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

        // let education = e.target[0].value.trim();
        // let specialization = e.target[1].value.trim();
        // let describe = e.target[2].value.trim();
        // let educDocuments = e.target[3].value.trim();
        // let hospitalName = e.target[4].value.trim();
        // let hospitalAddres = e.target[5].value.trim();
        // let hospitalTown = e.target[6].value.trim();
        // handleValidation(education, specialization, describe, educDocuments, hospitalName, hospitalAddres, hospitalTown);


        // console.log('here2');
        if (!formIsValid) {
            return;
        }
        return;

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

        setModalInfo('You have successfully send a request to be a doctor!');
        setModalShow(true);
        setTimeout(() => navigate(`/account/${currentUser?.uid}`), 2200);
    }

    // console.log(url);

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

            <section style={style.becomeDoctorSpan} >
                <div className="App">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <small className="text-danger form-text">
                                    {existingRequestError}
                                </small>
                                <form id="loginform" onSubmit={onBecomeDoctorRequestHandler}>

                                    <div className="form-group mb-3">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            placeholder="Harvard"
                                            name="education"
                                            onBlur={(event) => setEducation(event.target.value.trim())}
                                        />
                                        <small className="text-danger form-text">
                                            {educationError}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Specialization</label>
                                        <select
                                            className="form-select"
                                            id="inputGroupSelect01"
                                            defaultValue=''
                                            name="specialization"
                                            onBlur={(event) => setSpecialization(event.target.value.trim())}>
                                            <option value='' hidden>Choose...</option>
                                            {Categories.map(x =>
                                                <option key={x} value={x}>{x}</option>
                                            )}
                                        </select>
                                        <small className="text-danger form-text">
                                            {specializationError}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Describe</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            // name="phoneNumber"
                                            placeholder="Description...."
                                            id='exampleFormControlTextarea1'
                                            onBlur={(event) => setDescribe(event.target.value.trim())}
                                        />
                                        <small className="text-danger form-text">
                                            {describeError}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload an education documents</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                            onBlur={(event) => setEducDocuments(event.target.files)}
                                        />
                                        <small className="text-danger form-text">
                                            {educDocumentsError}
                                        </small>
                                    </div>

                                    <h3>{`Uploaded ${progress}`}</h3>

                                    <div className="form-group mb-3">
                                        <label>Hospital name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="education"
                                            placeholder="Okrujna"
                                            onBlur={(event) => setHospitalName(event.target.value.trim())}
                                        />
                                        <small className="text-danger form-text">
                                            {hospitalNameError}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Hospital town</label>
                                        <select
                                            className="form-select"
                                            id="inputGroupSelect02"
                                            defaultValue=''
                                            onBlur={(event) => setHospitalTown(event.target.value.trim())}
                                        >
                                            <option value='' hidden>Choose...</option>
                                            {Towns.map(x =>
                                                <option key={x} value={x}>{x}</option>
                                            )}
                                        </select>
                                        <small className="text-danger form-text">
                                            {hospitalTownError}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="PIN"
                                            placeholder="City, Street 00"
                                            onBlur={(event) => setHospitalAddres(event.target.value.trim())}
                                        />
                                        <small className="text-danger form-text">
                                            {hospitalAddresError}
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