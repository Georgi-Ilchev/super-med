import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from '../../../utils/firebase.js';
import { Button } from 'react-bootstrap';


const BecomeDoctorDetails = () => {
    const params = useParams();
    const [becomeDoctor, setBecomeDoctor] = useState();

    useEffect(() => {
        (async () => {
            if (!params.id) {
                return;
            }

            const requester = doc(db, 'doctor-requests', params.id);
            const snapShot = await getDoc(requester);
            setBecomeDoctor(state => snapShot.data());
        })();
    }, []);

    return (
        <div className="card mb-3" style={{ maxWidth: '70%', margin: 'auto', border: 'none', padding: '10px', marginTop: '3rem' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title" style={{ textAlign: 'center' }}>Dr. {becomeDoctor?.userName}</h4>
                        <p className="card-text" style={{ textAlign: 'center' }}>{becomeDoctor?.specialization}</p>
                        <hr />
                        <p className="card-text"><span className="doctor-details-span">Education:</span> {becomeDoctor?.education}</p>
                        <p className="card-text"><span className="doctor-details-span">Description:</span> {becomeDoctor?.describe}</p>
                        <p className="card-text"><span className="doctor-details-span">Age:</span> {becomeDoctor?.userAge}</p>
                        <p className="card-text"><span className="doctor-details-span">Email:</span> {becomeDoctor?.email}</p>
                        <p className="card-text"><span className="doctor-details-span">Phone:</span> {becomeDoctor?.userPhone}</p>
                        <p className="card-text"><span className="doctor-details-span">Address:</span> {becomeDoctor?.userAddress}</p>
                        <hr />
                        <p className="card-text">Work at:</p>
                        <p className="card-text"><span className="doctor-details-span">Hospital:</span> {becomeDoctor?.hospitalName}</p>
                        <p className="card-text"><span className="doctor-details-span">Addres:</span> {becomeDoctor?.hospitalAddres}</p>
                        <Button variant='success' >Approve</Button>
                        <Button variant='danger' >Decline</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BecomeDoctorDetails;