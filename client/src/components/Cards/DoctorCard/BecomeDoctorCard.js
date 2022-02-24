
const BecomeDoctorCard = ({
    data,
    id
}) => {
    console.log(id);
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
                <a href="#" className="card-link">Details</a>
                <a href="#" className="card-link">Approve</a>
                <a href="#" className="card-link">Decline</a>
            </div>
        </div>
    )
}

export default BecomeDoctorCard;