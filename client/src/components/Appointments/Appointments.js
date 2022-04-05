import AppointmentTable from './AppointmentTable/AppointmentTable.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, query, where, documentId, getDocs, list, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';
import { useNavigate } from 'react-router-dom';
import './Appointments.css';

const Appointments = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState(null);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        let isMounted = true;

        if (currentUser === null) {
            navigate('/');
        }

        // await updateDoc(doc(db, 'appointments', id), {
        //     status: 'inactive'
        // });
        const currentDate = new Date();

        (async () => {
            if (currentUser) {
                const appointments = collection(db, 'appointments');
                const q = query(appointments,
                    where("userId", "==", currentUser.uid),
                    where("status", "==", "active"),
                    orderBy("date", "asc"),
                    orderBy("hour", "asc"));
                const userAppointments = await getDocs(q);

                userAppointments.docs.map(x => {
                    const newDate = new Date(x.data().date);
                    const [hour, minute] = x.data().hour.split(':');

                    newDate.setHours(Number(hour));
                    newDate.setMinutes(Number(minute));
                    // console.log(newDate);
                    // console.log(currentDate);
                    if (newDate.getTime() < currentDate) {
                        updateDoc(doc(db, 'appointments', x.id), {
                            status: 'inactive'
                        });
                        // should be deleted!
                    }
                })

                if (isMounted) {
                    setAppointments(userAppointments.docs.map(x => ({
                        id: x.id,
                        data: x.data()
                    })));

                    setFlag(false);
                }
            }
        })();
        // console.log('hereeeee');
        return () => { isMounted = false };
    }, [currentUser]);

    const seeArchiveAppointments = () => {
        (async () => {
            if (currentUser) {
                const appointments = collection(db, 'appointments');
                const q = query(appointments,
                    where("userId", "==", currentUser.uid),
                    where("status", "==", "inactive"),
                    orderBy("date", "desc"),
                    orderBy("hour", "asc"));
                const userAppointments = await getDocs(q);

                setAppointments(userAppointments.docs.map(x => ({
                    id: x.id,
                    data: x.data()
                })));

                setFlag(false);
            }
        })();
    }

    return (
        <section className='user-appointment-section'>
            <h1 style={style.appointmentTable} className='text-center'>Your Appointments</h1>
            <div>
                {appointments?.length > 0
                    ?
                    <div>
                        <AppointmentTable data={appointments} >
                        </AppointmentTable>

                        {/* <button type="button" className="btn btn-light" onClick={seeArchiveAppointments}>Archive</button> */}
                    </div>
                    : flag
                        ? <p className="appointments-loading-message">Loading...</p>
                        : <p className="no-appointments-message">You dont have appointments yet!</p>}


            </div>

        </section>
    );
}

export default Appointments;

const style = {
    appointmentTable: {
        marginTop: '30px',
        marginBottom: '30px',
        color: 'bisque'
    }
}

