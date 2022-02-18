import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Account.css';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import defaultAvatar from '../../assets/images/avatar.png';

const AccountPage = () => {

  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  const uid = currentUser?.uid;

  useEffect(() => {
    (async () => {
      if (!currentUser) {
        return;
      }

      const ref = await doc(db, 'users', currentUser.uid);

      const user = await getDoc(ref);

      setUserData(prevState => user.data());
    })();
  }, [currentUser]);


  console.log(currentUser);
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
                src={defaultAvatar} alt="Admin" className="rounded-circle"
                width="150"
              />
              <div className="mt-3">
                <h4>{userData?.fullName}</h4>
                {/*<button className="btn btn-primary m-2">Follow</button>*/}
                {/*<button className="btn btn-outline-primary">Message</button>*/}
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
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData?.email}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData?.phoneNumber}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">PIN(Personal Identification Number)</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData?.pin}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData?.address}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-12">
                  <Link
                    className="btn btn-info "
                    to={`/account/${uid}/edit`}
                  >Edit</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

/*
* Full name
*
* Phone Number
*
* EGN
*
* Address
*
*
*
* */
