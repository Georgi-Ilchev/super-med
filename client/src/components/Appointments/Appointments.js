import AppointmentTable from './AppointmentTable/AppointmentTable.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, query, where, documentId, getDocs, list, orderBy } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';

const Appointments = () => {
    const { currentUser } = useAuth();
    const [appointments, setAppointments] = useState(null);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const appointments = collection(db, 'appointments');
                const q = query(appointments, where("userId", "==", currentUser.uid), orderBy("date", "asc"), orderBy("hour", "asc"));
                const userAppointments = await getDocs(q);
                setAppointments(userAppointments.docs.map(x => ({
                    id: x.id,
                    data: x.data()
                })));

                setFlag(false);
            }
        })();
    }, [currentUser]);

    return (
        <section>
            <h1 style={style.appointmentTable} className='text-center'>Your Appointments</h1>
            <div>
                {appointments?.length > 0
                    ? <AppointmentTable data={appointments} >
                    </AppointmentTable>
                    : flag
                        ? <p className="no-doctors-message">Loading...</p>
                        : <p className="no-doctors-message">You dont have appointments yet!</p>}

            </div>
        </section>
    );
}

export default Appointments;

const style = {
    appointmentTable: {
        marginTop: '30px',
        marginBottom: '30px',
    }
}

