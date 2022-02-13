import React, { useState, useCallback, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { useNavigate, useParams } from 'react-router-dom';


const EditProfile = () => {
  let params = useParams();

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const [pin, setPin] = useState('');

  const [email, setEmail] = useState('');

  const [address, setAddress] = useState('');

  const [fullName, setFullName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const onEditHandler = useCallback(async (e) => {
    e.preventDefault();

    const ref = doc(db, 'users', params?.uid);




    await updateDoc(ref, { email, pin, address, fullName, phoneNumber });

    navigate(`/account/${params.uid}`);
  }, [email, pin, address, fullName, phoneNumber]);


  useEffect(() => {
    (async () => {
      if (!params?.uid) {
        return;
      }

      const ref = await doc(db, 'users', params.uid);

      const user = await getDoc(ref);

      setUserData(prevState => user.data());
    })();
  }, [params?.uid]);


  debugger;

  return (
    <div>
      <section className="register-section">
        <div className="App">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-4">
                <form id="loginform" onSubmit={onEditHandler}>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      placeholder="Pancho Villa"
                      onChange={(event) => setFullName(event.target.value)}
                      defaultValue={userData?.fullName}
                    />
                    <small className="text-danger form-text">
                      {null}
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="EmailInput"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="yourmail@mail.com"
                      onChange={(event) => setEmail(event.target.value)}
                      defaultValue={userData?.email}

                    />
                    <small className="text-danger form-text">
                      {null}
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Phone number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      placeholder="+359 *********"
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      defaultValue={userData?.phoneNumber}

                    />
                    <small className="text-danger form-text">
                      {null}
                    </small>
                  </div>

                  <div className="form-group">
                    <label>PIN(Personal Identification Number)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="PIN"
                      placeholder="0000000000"
                      onChange={(event) => setPin(event.target.value)}
                      defaultValue={userData?.pin}

                    />
                    <small className="text-danger form-text">
                      {null}
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="PIN"
                      placeholder="City, Street 00"
                      onChange={(event) => setAddress(event.target.value)}
                      defaultValue={userData?.address}

                    />
                    <small className="text-danger form-text">
                      {null}
                    </small>
                  </div>


                  <button type="submit" className="btn mt-5 btn-primary">
                    Edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
