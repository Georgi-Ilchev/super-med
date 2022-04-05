import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Account.css';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import defaultAvatar from '../../assets/images/avatar.png';

const AccountPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [doctorData, setDoctorData] = useState(null);
    const [showBecomeDoctorBtn, setShowBecomeDoctorBtn] = useState(false);
    const [flag, setFlag] = useState(true);
    const [loading, setLoading] = useState(true);

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
            setLoading(prevState => false);

        })();
    }, [currentUser]);

    useEffect(() => {
        if (userData) {
            // console.log(Object.keys(userData).length);
            // console.log(userData?.role);
            (async () => {
                if (userData?.role === 'doctor') {
                    const ref = await doc(db, 'doctors', currentUser.uid);
                    const doctor = await getDoc(ref);
                    setDoctorData(prevState => doctor.data());
                }
            })();

            let dataLength = Object.keys(userData).length;
            if (dataLength <= 2) {
                setFlag(false);
                setShowBecomeDoctorBtn(false);
            } else if (dataLength >= 6) {
                setFlag(false);
                setShowBecomeDoctorBtn(true);
            }
        }
    }, [userData])

    console.log(doctorData);

    return (
        <div className="container mt-5">
            {loading ? <p>loading...</p>
                : userData?.role === 'client'
                    ? <div className="main-body">
                        <nav aria-label="breadcrumb" className="main-breadcrumb">
                            <ol className="breadcrumb">
                            </ol>
                        </nav>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img
                                        src={userData?.imageUrl ? userData.imageUrl : defaultAvatar} alt="Admin" className="rounded-circle"
                                        width="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{userData?.fullName}</h4>
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
                                            {userData?.fullName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Age</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.age}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.phoneNumber}
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
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.address}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Link
                                                className="btn btn-info "
                                                to={`/account/${uid}/edit`}
                                                style={style.cardButton}
                                            >Edit</Link>

                                            {userData?.role === 'client'
                                                ? flag
                                                    ? <a className="btn btn-dark" style={{ marginRight: '15px', cursor: 'not-allowed' }}>Loading...</a>
                                                    : showBecomeDoctorBtn
                                                        ? <Link
                                                            className="btn btn-dark md-2"
                                                            to={`/account/${uid}/becomedoctor`}
                                                            state={{ userData }}
                                                        >Become a doctor
                                                        </Link>
                                                        : <a className="btn btn-dark" style={{ marginRight: '15px', cursor: 'not-allowed' }}>You should set your information!</a>

                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    : <div className="main-body">
                        <nav aria-label="breadcrumb" className="main-breadcrumb">
                            <ol className="breadcrumb">
                            </ol>
                        </nav>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img
                                        src={userData?.imageUrl ? userData.imageUrl : defaultAvatar} alt="Admin" className="rounded-circle"
                                        width="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{userData?.fullName}</h4>
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
                                            {userData?.fullName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">doctor Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.fullName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Age</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.age}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.phoneNumber}
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
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userData?.address}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Link
                                                className="btn btn-info "
                                                to={`/account/${uid}/edit`}
                                                style={style.cardButton}
                                            >Edit</Link>

                                            {userData?.role === 'client'
                                                ? flag
                                                    ? <a className="btn btn-dark" style={{ marginRight: '15px', cursor: 'not-allowed' }}>Loading...</a>
                                                    : showBecomeDoctorBtn
                                                        ? <Link
                                                            className="btn btn-dark md-2"
                                                            to={`/account/${uid}/becomedoctor`}
                                                            state={{ userData }}
                                                        >Become a doctor
                                                        </Link>
                                                        : <a className="btn btn-dark" style={{ marginRight: '15px', cursor: 'not-allowed' }}>You should set your information!</a>

                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
        </div >
    );
};

export default AccountPage;

const style = {
    cardButton: {
        marginRight: '15px'
    }
}