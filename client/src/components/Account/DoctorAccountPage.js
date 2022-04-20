import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Account.css';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import defaultAvatar from '../../assets/images/avatar.png';

const DoctorAccountPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [doctorData, setDoctorData] = useState(null);

    const uid = currentUser?.uid;

    useEffect(() => {
        (async () => {
            if (currentUser === null) {
                navigate('/');
            }
        })();

        (async () => {
            if (!currentUser) {
                return;
            }

            const ref = await doc(db, 'users', currentUser.uid);

            const user = await getDoc(ref);

            setUserData(prevState => user.data());

            if (user.data().role !== 'doctor') {
                navigate('/');
            }
        })();
    }, [currentUser]);

    useEffect(() => {
        if (userData) {
            (async () => {
                if (userData?.role === 'doctor') {
                    const ref = await doc(db, 'doctors', currentUser.uid);
                    const doctor = await getDoc(ref);
                    setDoctorData(prevState => doctor.data());
                }
            })();
        }
    }, [userData])

    console.log(doctorData);

    return (
        <div className="container mt-5">
            <div className="main-body">
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                    <ol className="breadcrumb">
                    </ol>
                </nav>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img
                                src={doctorData?.image ? doctorData.image : defaultAvatar} alt="Admin" className="rounded-circle"
                                width="150"
                            />
                            <div className="mt-3">
                                <h4>{doctorData?.fullName}</h4>
                                <h6>{doctorData?.type}</h6>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Full Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.fullName}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Age</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.age}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.description}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Graduated at</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.education}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.email}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.phone}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">PIN(Personal Identification Number)</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {userData?.pin}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Hospital name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.hospitalName}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Hospital address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.hospitalAddress}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Hospital town</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {doctorData?.town}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <Link
                                        className="btn btn-info "
                                        to={`/doctor-account/${uid}/edit`}
                                        style={style.cardButton}
                                    >Edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DoctorAccountPage;

const style = {
    cardButton: {
        marginRight: '15px'
    }
}