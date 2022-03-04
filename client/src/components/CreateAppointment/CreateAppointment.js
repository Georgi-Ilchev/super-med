import { useAuth } from '../../contexts/AuthContext.js';
import { db } from '../../utils/firebase.js';
import ButtonsCard from '../Cards/ButtonsCard/ButtonsCard.js';

import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Calendar } from 'antd';
import "antd/dist/antd.css";
import './CreateAppointment.css';

const CreateAppointment = () => {
    let params = useParams();
    // const { currentUser } = useAuth();
    const [doctorData, setDoctorData] = useState(null);
    const [date, setDate] = useState(null);
    const [day, setDay] = useState(null);
    const [hour, setHour] = useState(null);

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
            console.log('greshna data');
            return;
        }
    }, []);

    function clickedHour(el) {
        setHour(prevState => el.target.value);
        // el.target.style.backgroundStyle = 'red';
    };

    const reserveAppointment = async (e) => {
        if (!date || !hour) {
            return;
        }
        console.log('reserve appointment');
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
        })();
    }, [params.doctorId]);


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
                                <h2 className='text-center'><span className="badge rounded-pill bg-light text-dark">
                                    {date}{hour ? ` - ${hour}` : null}
                                </span></h2>
                                <ButtonsCard style={style.buttonsStyle} day={day} clickedHour={clickedHour} ></ButtonsCard>
                                {date && hour
                                    ? <div><hr /> <button type="button" className="btn btn-dark" onClick={reserveAppointment}>Reserve</button></div>
                                    : null
                                }

                            </div>
                            : <p>Waiting for your response</p>}


                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateAppointment;

function disabledDate(current) {
    // Can not select days before today and sundays
    return (current && current < moment().startOf('day')) ||
        (moment(current).day() === 0)
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
