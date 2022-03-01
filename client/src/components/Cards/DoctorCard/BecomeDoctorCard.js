import { db } from '../../../utils/firebase.js';

import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup } from 'react-bootstrap';
import { collection, doc, getDocs, query, setDoc, where, deleteDoc } from 'firebase/firestore';

const BecomeDoctorCard = ({
    data,
    id
}) => {
    const navigate = useNavigate();


    const onDeclineHandler = useCallback(async (e) => {
        if (id != undefined) {
            await deleteDoc(doc(db, "doctor-requests", id));
            console.log('deteled');
        }
    }, []);

    const onApproveHandler = useCallback(async (e) => {
        if (id != undefined) {
            await setDoc(doc(db, "doctors", id), {
                fullName: data.userName,
                type: data.specialization,
                town: data.hospitalTown,
                description: data.describe,
                age: data.userAge,
                phone: data.userPhone,
                email: data.userEmail,
                education: data.education,
                hospitalName: data.hospitalName,
                hospitalAddres: data.hospitalAddres,
            });
            console.log('created');

            onDeclineHandler();
        }
    }, []);

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{data.userName}</h5>
                <p className="card-text">{data.describe}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Specialization: {data.specialization}</li>
                <li className="list-group-item">Hospital name: {data.hospitalName}</li>
            </ul>
            <div className="card-body">
                {/* <a href="#" className="card-link">Details</a>
                <a href="#" className="card-link">Approve</a>
                <a href="#" className="card-link">Decline</a> */}
                <ButtonGroup md={4}>
                    <Button variant='success' onClick={onApproveHandler}>Approve</Button>
                    <Button as={Link} to={`/admin/requests/becomeadoctor/${id}`} variant='secondary'>Details</Button>
                    <Button variant='danger' onClick={onDeclineHandler}>Decline</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default BecomeDoctorCard;