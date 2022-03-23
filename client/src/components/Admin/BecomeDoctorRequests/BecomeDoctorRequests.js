// Should be only for admins
import { collection, doc, getDocs, query, setDoc, where, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.js';
import { db } from '../../../utils/firebase.js';
import BecomeDoctorCard from "../../Cards/DoctorCard/BecomeDoctorCard.js";

const BecomeDoctorRequests = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [dataRequests, setDataRequests] = useState([]);
    const [flag, setFlag] = useState(true);
    const [, updateState] = useState();

    const forceUpdate = useCallback(() => updateState({}), []);
    // console.log(currentUser);

    useEffect(() => {
        if (currentUser !== undefined) {
            (async () => {
                const ref = await doc(db, 'users', currentUser?.uid);
                const user = await getDoc(ref);
                if (user.data().role !== 'admin') {
                    navigate('/');
                }
            })();
        }
    }, [currentUser])

    console.log('updated');

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const requests = collection(db, 'doctor-requests');
            const q = query(requests);
            const dbRequests = await getDocs(q);

            if (isMounted) {
                setDataRequests(dbRequests.docs.map(x => ({
                    id: x.id,
                    data: x.data()
                })));

                setFlag(false);
                forceUpdate();
            }
        })();


        return () => { isMounted = false };
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