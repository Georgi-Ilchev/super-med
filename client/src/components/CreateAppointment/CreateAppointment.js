import { useAuth } from '../../contexts/AuthContext.js';
import { db } from '../../utils/firebase.js';
import ButtonsCard from '../Cards/ButtonsCard/ButtonsCard.js';
import { WeeklyHours } from '../../constants.js';

import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, getDoc, query, setDoc, addDoc, where, updateDoc, arrayUnion } from 'firebase/firestore';
import { Alert } from 'react-bootstrap';
import { Calendar } from 'antd';
import "antd/dist/antd.css";
import './CreateAppointment.css';

const CreateAppointment = () => {
    let params = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [doctorData, setDoctorData] = useState(null);
    const [doctorHours, setDoctorHours] = useState(null);
    const [date, setDate] = useState(null);
    const [day, setDay] = useState(null);
    const [hour, setHour] = useState(null);
    const [takenHours, setTakenHours] = useState([]);
    const [error, setError] = useState('');
    const [showAlert, setAlert] = useState(false);

    const clickedDate = useCallback((value) => {
        const rawDate = value;
        setDate(prevState => value.format('YYYY-MM-DD'));
        setDay(prevState => value.format('E'));
        setHour(prevState => null);

        let selectedDate = new Date(rawDate);
        let currentDate = new Date();

        // OPTIMIZE

        if (selectedDate.getTime() < currentDate.getTime()) {
            let compare = selectedDate.toLocaleDateString().localeCompare(currentDate.toLocaleDateString());
            if (compare === 0) {
                return;
            }

            setDate(prevState => null);
            setDay(prevState => null);
            setError('You cannot select a date that is in the past.');
            setAlert(true);
            return;
        }
    }, []);

    useEffect(() => {
        (async () => {
            // const doctorAppointments = collection(db, `appointments/${params.doctorId}/currentDoctorApp`);
            const doctorAppointments = collection(db, `appointments`);
            // const q = query(doctorAppointments, where("date", "==", date));
            const q = query(doctorAppointments, where("doctorId", "==", params.doctorId), where("date", "==", date));
            const dataAppointment = await getDocs(q);
            setTakenHours((state) => dataAppointment.docs.map((appointment) => appointment.data().hour));
        })();
    }, [date]);

    const reserveAppointment = async (e) => {
        if (!date || !hour || !currentUser) {
            return;
        }

        const generatedId = autoId();

        setError('');
        if (takenHours.find((takenHour) => takenHour.includes(hour))) {
            console.log('This hour is already taken');
            setError('This hour is already taken.');
            setAlert(true);
            return;
        }

        if (!WeeklyHours.find((doctorHours) => doctorHours.includes(hour))) {
            console.log('wrong hour');
            setError('Do not edit html!');
            setAlert(true);
            return;
        }

        // try {
        //     await setDoc(doc(db, `appointments/${params.doctorId}`, 'currentDoctorApp', generatedId), {
        //         doctorId: params.doctorId,
        //         userId: currentUser.uid,
        //         date: date,
        //         hour: hour,
        //         status: 'active',
        //         address: doctorData.hospitalAddres,
        //         hospital: doctorData.hospitalName
        //     });

        //     await updateDoc(doc(db, 'users', currentUser.uid), {
        //         appointments: arrayUnion({
        //             appointmentId: generatedId,
        //             doctorId: params.doctorId,
        //         })
        //     });
        // } catch (error) {
        //     console.log(error);
        // }

        try {
            const docRef = await addDoc(collection(db, 'appointments'), {
                doctorId: params.doctorId,
                doctorName: doctorData.fullName,
                userId: currentUser.uid,
                date: date,
                hour: hour,
                status: 'active',
                address: doctorData.hospitalAddres,
                hospital: doctorData.hospitalName
            });

            // await updateDoc(doc(db, 'users', currentUser.uid), {
            //     appointments: arrayUnion({
            //         appointmentId: docRef.id,
            //         doctorId: params.doctorId,
            //     })
            // });
        } catch (error) {
            console.log(error);
        }


        navigate(`/appointments`);
    };

    useEffect(() => {
        (async () => {
            // if (!currentUser) {
            //     console.log('here1');
            //     return;
            // }

            const ref = await doc(db, 'doctors', params.doctorId);
            const doctor = await getDoc(ref);
            setDoctorData(prevState => doctor.data());
            setDoctorHours(prevState => doctor.data().workSchedule);
        })();
    }, [params.doctorId]);



    function clickedHour(el) {
        setHour(prevState => el.target.value);
        // el.target.style.backgroundStyle = 'red';
    };

    function autoId() {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let autoId = '';

        for (let i = 0; i < 20; i++) {
            autoId += CHARS.charAt(
                Math.floor(Math.random() * CHARS.length)
            )
        }
        return autoId;
    }

    return (
        <section className='appointment-section'>
            <div className='appointment-div'></div>

            <div style={style.centerCalendar}>
                <Calendar disabledDate={disabledDate} onChange={clickedDate} />
            </div>

            <div style={style.appointmentInfo}>
                <div className="card mb-3">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-center">Make your appointment with {doctorData?.fullName}</h5>
                        <hr />
                        <p className="card-text">Hospital: {doctorData?.hospitalName}</p>
                        <p className="card-text">Address: {doctorData?.hospitalAddres}</p>
                        <hr />
                        <p className="card-text"><small className="text-muted">Pick a date from calendar</small></p>
                        {date
                            ? <div>
                                {/* <p className="card-text text-center">{date}{hour ? ` - ${hour}` : null}</p> */}
                                <h2 className='text-center'>
                                    <span className="badge rounded-pill bg-light text-dark">
                                        {date}{hour ? ` - ${hour}` : null}
                                    </span>
                                </h2>
                                <ButtonsCard
                                    style={style.buttonsStyle}
                                    day={day}
                                    clickedHour={clickedHour}
                                    doctorId={params.doctorId}
                                    doctorHours={doctorHours}
                                    date={date} >
                                </ButtonsCard>
                                {date && hour
                                    ? <div><hr /> <button type="button" className="btn btn-dark" onClick={reserveAppointment}>Reserve</button></div>
                                    : null
                                }
                            </div>
                            : <p>Waiting for your response</p>}
                    </div>
                </div>
                {showAlert &&
                    <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                        <Alert.Heading>Something went wrong!</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                }
            </div>
        </section>
    )
}

export default CreateAppointment;

function disabledDate(current) {
    // Can not select days before today
    return (current && current < moment().startOf('day'))
}



const style = {
    centerCalendar: {
        width: '97%',
        padding: 40,
        zIndex: 1
        // display: 'block',
        // gridColumn: 1,
        // gridRow: 1,
        // margin: "auto"
    },
    appointmentInfo: {
        // position: 'inherit',
        // display: 'block',
        gridColumn: 2,
        gridRow: 1,
        paddingTop: 40,
        paddingRight: 40,
        width: '40rem',
        // height: '100rem'
    },
    buttonsStyle: {
        paddingTop: '10rem'
    }
}