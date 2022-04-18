import { db } from '../../../utils/firebase.js';

import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup } from 'react-bootstrap';
import { collection, doc, getDocs, query, setDoc, where, deleteDoc, updateDoc } from 'firebase/firestore';

const BecomeDoctorCard = ({
    data,
    id
}) => {
    const navigate = useNavigate();
    // console.log(data);

    const onDeclineHandler = useCallback(async (e) => {
        if (id != undefined) {
            await deleteDoc(doc(db, "doctor-requests", id));
            console.log('deleted');
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
                workSchedule: data.workSchedule,
                image: data.imageUrl,
            });

            await updateDoc(doc(db, 'users', id), {
                role: 'doctor'
            });
            console.log('created');

            onDeclineHandler();
        }
    }, []);

    return (
        <div className="col-sm-3" style={style.doctorCardDiv}>
            <div className="card" style={{ width: '19rem', height: '28rem' }}>
                <img className="card-img-top" src={data.imageUrl} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Dr. {data.userName}</h5>
                    <p className="card-text">{data.describe}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span className='doctor-card-span'>Specialization: </span>{data.specialization}</li>
                    <li className="list-group-item"><span className='doctor-card-span'>Hospital name: </span>{data.hospitalName}</li>
                </ul>
                <div className="card-body">
                    <ButtonGroup md={4}>
                        <Button variant='success' onClick={onApproveHandler} style={style.cardButton}>Approve</Button>
                        <Button as={Link} to={`/admin/requests/becomeadoctor/${id}`} variant='secondary' style={style.cardButton}>Details</Button>
                        <Button variant='danger' onClick={onDeclineHandler} style={style.cardButton}>Decline</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

export default BecomeDoctorCard;

const style = {
    cardButton: {
        marginRight: '15px'
    },
    cardImage: {
        // objectFit: 'cover',
        // borderRadius: 55,
        width: '150px',
        height: '150px'
    },
    doctorCardDiv: {
        padding: '15px 0px 15px 0px'
    }
}