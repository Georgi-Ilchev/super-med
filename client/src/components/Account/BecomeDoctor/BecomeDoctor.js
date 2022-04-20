import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import AccountModal from '../../Modal/AccountModal/AccountModal.js';

import { Categories, Towns, WeeklyHours, WorkedDays } from '../../../constants.js';
import { db, storage } from '../../../utils/firebase.js';
import { useAuth } from '../../../contexts/AuthContext.js';
import { Alert, Modal, Accordion, Form } from 'react-bootstrap';

const BecomeDoctor = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    let formIsValid = true;
    let hourFormIsValid = true;

    const [, updateState] = useState();

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
    const [hoursError, setHoursError] = useState('');

    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);

    const [modalInfo, setModalInfo] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const [existingRequestError, setExistingRequestError] = useState('');

    const handleValidation = () => {
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
            setDescribeError('Description must be minimum 20 characters!');
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
            setHospitalTownError('Town does not exist!');
            formIsValid = false;
        }
    }

    const uploadFile = async (file) => {
        // console.log(file);
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

    const hoursValidation = (mondayHours, thuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours) => {
        let choosenHours = [...new Set(
            [...mondayHours,
            ...thuesdayHours,
            ...wednesdayHours,
            ...thursdayHours,
            ...fridayHours,
            ...saturdayHours,
            ...sundayHours,])];

        hourFormIsValid = true;
        setHoursError('');

        if (choosenHours.length > 0) {
            let allFounded = choosenHours.every(h => WeeklyHours.includes(h));
            if (allFounded) {
                console.log('vyarno');
            } else {
                setHoursError('You choose a wrong time!');
                hourFormIsValid = false;
                console.log('greshka');
                return;
            }
        } else {
            setHoursError('Choose at least one hour!');
            hourFormIsValid = false;
            console.log('nyama izbrani chasowe');
            return;
        }

    }

    // call force-update when image is uploaded last in the form. (need re-render component, to get image url if it uploaded last);
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if (location.state == null) {
            navigate('/');
        }
    }, []);

    const onBecomeDoctorRequestHandler = async (e) => {
        e.preventDefault();
        handleValidation();

        const { userData } = location.state;
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

        if (!dataRequests.empty) {
            setExistingRequestError('You have already sent a request!');
            return [];
        }

        const formData = new FormData(e.target)

        const mondayHours = formData.getAll('Monday');
        const thuesdayHours = formData.getAll('Thuesday');
        const wednesdayHours = formData.getAll('Wednesday');
        const thursdayHours = formData.getAll('Thursday');
        const fridayHours = formData.getAll('Friday');
        const saturdayHours = formData.getAll('Saturday');
        const sundayHours = formData.getAll('Sunday');

        hoursValidation(mondayHours, thuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours);

        if (!formIsValid || !hourFormIsValid) {
            return;
        }

        if (progress != 100) {
            forceUpdate();
            return;
        }

        if (url === null) {
            return;
        }

        try {
            await setDoc(doc(db, "doctor-requests", currentUser?.uid), {
                uid: currentUser?.uid,
                education,
                specialization,
                describe,
                educationUrl: url,
                imageUrl: userData.imageUrl,
                hospitalName,
                hospitalAddres,
                hospitalTown,
                userName: userData.fullName,
                userPhone: userData.phoneNumber,
                userAddress: userData.address,
                userPin: userData.pin,
                userAge: userData.age,
                userEmail: userData.email,
                workSchedule: {
                    monday: mondayHours,
                    thuesday: thuesdayHours,
                    wednesday: wednesdayHours,
                    thursday: thursdayHours,
                    friday: fridayHours,
                    saturday: saturdayHours,
                    sunday: sundayHours,
                }
            });
        } catch (error) {
            console.log(error);
            return;
        }

        setModalInfo('You have successfully send a request to be a doctor!');
        setModalShow(true);
        setTimeout(() => navigate(`/account/${currentUser?.uid}`), 2200);
    }

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
                                            onChange={(event) => uploadFile(event.target.files[0])}
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

                                    <div className="form-group mb-3">
                                        <label>Choose your time to work</label>
                                        <div>
                                            <small className="text-danger form-text">
                                                {hoursError}
                                            </small>
                                        </div>
                                        {WorkedDays.map(day =>
                                            <Accordion key={day}>
                                                <Accordion.Item eventKey='0'>
                                                    <Accordion.Header>{day}</Accordion.Header>
                                                    <Accordion.Body >
                                                        {WeeklyHours.map(x =>
                                                            <div className="form-check form-check-inline" key={x} style={style.accordion}>
                                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" style={style.checkbox} name={day} value={x} />
                                                                <label className="form-check-label" htmlFor="inlineCheckbox1">{x}</label>
                                                            </div>
                                                        )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        )}
                                    </div>

                                    {progress == 100
                                        ? <button type="submit" className="btn mt-5 btn-primary" >
                                            Send request
                                        </button>
                                        : <button className="btn mt-5 btn-primary" disabled>
                                            Send request
                                        </button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default BecomeDoctor;

const style = {
    becomeDoctorSpan: {
        paddingTop: '3rem',
    },
    accordion: {
        // display: 'inline-block',
        margin: 'auto',
        padding: '0.1rem 1.5rem 0.1rem 1.9rem',
    },
    checkbox: {
        width: '20px',
        height: '20px',
        cursor: 'pointer'
    }
}