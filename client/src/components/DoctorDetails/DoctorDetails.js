import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/firebase.js';

const DoctorDetails = () => {
    const params = useParams();
    const [doctorData, setDoctorData] = useState();

    useEffect(() => {
        (async () => {
            if (!params.doctorId) {
                return;
            }
            const doctor = doc(db, 'doctors', params.doctorId);
            const snapShot = await getDoc(doctor);
            setDoctorData(state => snapShot.data());
        })();
    }, [params.doctorId]);

    console.log(doctorData);

    return (
        <div className="card mb-3" style={{ maxWidth: '70%', marginTop: '20rem' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{doctorData?.firstName} {doctorData?.lastName}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails;