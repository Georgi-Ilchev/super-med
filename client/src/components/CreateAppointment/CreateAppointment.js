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


    // let currentDate = newDate.getDate();
    // let currentMonth = newDate.getMonth() + 1;
    // let currentYear = newDate.getFullYear();

    const clickedDate = useCallback((value) => {
        console.log(`date before parsed: ${value}`);
        setDate(prevState => value.format('YYYY-MM-DD'));
        setDay(prevState => value.format('E'));

    }, []);

    let currentDate = new Date();
    console.log(`currentDate ${currentDate}`);
    // let choosenDate = new Date(currentDate);
    // choosenDate.format('YYYY-MM-DD');

    console.log(`date after parsed: ${date}`);
    // console.log(`new date after format${choosenDate}`);

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
                        <h5 className="card-title">Make your appointment with {doctorData?.fullName}</h5>
                        <hr />
                        <p className="card-text">Hospital: {doctorData?.hospitalName}</p>
                        <p className="card-text">Address: {doctorData?.hospitalAddres}</p>
                        <hr />
                        <p className="card-text"><small className="text-muted">Pick a date from calendar</small></p>
                        {date
                            ? <div>
                                <p className="card-text">{date}</p>
                                <p>{day}</p>

                                <ButtonsCard day={day}></ButtonsCard>
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
    return current && current < moment().startOf('day') ||
        moment(current).day() === 0
}

const style = {
    centerCalendar: {
        width: '80%',
        padding: 40,
        zIndex: 1
        // display: 'block',
        // gridColumn: 1,
        // gridRow: 1,
        // margin: "auto"
    },
    appointmentInfo: {
        position: 'inherit',
        gridColumn: 2,
        gridRow: 1,
        padding: 40,
    }
}
