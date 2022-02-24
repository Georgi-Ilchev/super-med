// Should be only for admins
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase.js';
import BecomeDoctorCard from "../../Cards/DoctorCard/BecomeDoctorCard.js";

const BecomeDoctorRequests = () => {
    const [dataRequests, setDataRequests] = useState([]);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        (async () => {
            const requests = collection(db, 'doctor-requests');
            const q = query(requests);
            const dbRequests = await getDocs(q);

            setDataRequests(dbRequests.docs.map(x => ({
                id: x.id,
                data: x.data()
            })));

            setFlag(false);
        })();
    }, []);

    return (
        <section>
            {dataRequests.length > 0
                ? dataRequests.map(x => <BecomeDoctorCard key={x.id} id={x.id} data={x.data}></BecomeDoctorCard>)
                : flag ? <p style={style.loading}>Loading...</p>
                       : <p style={style.noDoctorsYet}>No requests yet...</p>}

        </section>

    )
}

export default BecomeDoctorRequests;

const style = {
    noDoctorsYet: {
        fontSize: '50px',
        marginTop: '10rem',
        textAlign: 'center',
    },
    loading: {
        fontSize: '50px',
        marginTop: '10rem',
        textAlign: 'center',
    }
}