import { useAuth } from '../../contexts/AuthContext.js';
import { db } from '../../utils/firebase.js';

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

    const clickedDate = useCallback((value) => {
        // alert(`Your selected ${value.format('YYYY-MM-DD')}`)
        setDate(prevState => value.format('YYYY-MM-DD'));
    }, []);

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

    console.log(date);

    return (
        <section className='appointment-section'>
            <div className='appointment-div'></div>

            <div style={style.centerCalendar}>
                {/* <h4>ReactJS Ant-Design Calendar Component</h4> */}
                <Calendar onChange={clickedDate}
                />
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
                        ? <p className="card-text">{date}</p>
                        : <p>Waiting for your response</p>}
                    </div>
                </div>
            </div>

        </section>

        // <div className='row'>
        //     <div className='appointment-div'>

        //         <div className='col' style={style.centerCalendar}>
        //             <h4>ReactJS Ant-Design Calendar Component</h4>
        //             <Calendar onChange={clickedDate} />
        //         </div>

        //         <div className='col'>
        //             <div class="card mb-3">
        //                 <img src="..." class="card-img-top" alt="..." />
        //                 <div class="card-body">
        //                     <h5 class="card-title">Card title</h5>
        //                     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        //                     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        //                 </div>
        //             </div>
        //         </div>

        //     </div>
        // </div>
    )
}

export default CreateAppointment;

const style = {
    centerCalendar: {
        // display: 'block',
        width: '80%',
        padding: 40,
        zIndex: 1
        // gridColumn: 1,
        // gridRow: 1,

        // margin: "auto"
    },
    appointmentInfo: {
        gridColumn: 2,
        gridRow: 1,
        padding: 40,
    }
}
