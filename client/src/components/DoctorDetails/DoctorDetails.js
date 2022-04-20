import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../../utils/firebase.js';

import './DoctorDetails.css';

const DoctorDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [doctorData, setDoctorData] = useState();

    useEffect(() => {
        (async () => {
            if (!params.doctorId) {
                return;
            }
            const doctor = doc(db, 'doctors', params.doctorId);
            const snapShot = await getDoc(doctor);

            // if (!snapShot.exists()) {
            //     navigate(`/doctors`);
            // }
            setDoctorData(state => snapShot.data());

        })();
    }, [params.doctorId]);

    return (
        <div className="card mb-3" style={{ maxWidth: '70%', margin: 'auto', border: 'none', padding: '10px', marginTop: '8rem', boxShadow: '0px 0px 30px #888888' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={doctorData?.image} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title" style={{ textAlign: 'center' }}>Dr. {doctorData?.fullName}</h4>
                        <p className="card-text" style={{ textAlign: 'center' }}>{doctorData?.type} - {doctorData?.town}</p>
                        <hr />
                        <p className="card-text"><span className="doctor-details-span">Description:</span> {doctorData?.description}</p>
                        <p className="card-text"><span className="doctor-details-span">Graduated at:</span> {doctorData?.education}</p>
                        <p className="card-text"><span className="doctor-details-span">Age:</span> {doctorData?.age}</p>
                        <p className="card-text"><span className="doctor-details-span">Hospital:</span> {doctorData?.hospitalName}</p>
                        <p className="card-text"><span className="doctor-details-span">Address:</span> {doctorData?.hospitalAddress}</p>
                        <p className="card-text"><span className="doctor-details-span">Email:</span> {doctorData?.email}</p>
                        <p className="card-text"><span className="doctor-details-span">Phone:</span> {doctorData?.phone}</p>
                        <hr />
                        <Button as={Link} to={`/doctors/${params.doctorId}/createappointment`} variant='info' size='sm'>Make an appointment</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails;