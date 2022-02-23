import { Categories } from '../../../constants.js';

const BecomeDoctor = () => {
    return (
        <div>
            <section style={style.becomeDoctorSpan} >
                <div className="App">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <form id="loginform" /* onSubmit={onBecomeDoctorRequestHandler} */>

                                    <div className="form-group mb-3">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="education"
                                            placeholder="Harvard"
                                        // onChange={(event) => setFullName(event.target.value)}
                                        // defaultValue={userData?.fullName}
                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Specialization</label>
                                        <select className="form-select" id="inputGroupSelect01" defaultValue='Choose'>
                                            {/* <option selected>Choose...</option> */}
                                            {Categories.map(x =>
                                                <option key={x} value={x}>{x}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Describe</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            // name="phoneNumber"
                                            placeholder="description...."
                                            id='exampleFormControlTextarea1'
                                        // onChange={(event) => setPhoneNumber(event.target.value)}
                                        // defaultValue={userData?.phoneNumber}
                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload an education documents</label>
                                        <input className="form-control" type="file" id="formFile" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Hospital name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="education"
                                            placeholder="Okrujna"
                                        // onChange={(event) => setFullName(event.target.value)}
                                        // defaultValue={userData?.fullName}
                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="PIN"
                                            placeholder="City, Street 00"
                                        // onChange={(event) => setAddress(event.target.value)}
                                        // defaultValue={userData?.address}

                                        />
                                        <small className="text-danger form-text">
                                            {null}
                                        </small>
                                    </div>

                                    <button type="submit" className="btn mt-5 btn-primary">
                                        Send request
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BecomeDoctor;

const style = {
    becomeDoctorSpan: {
        paddingTop: '3rem',
    }
}