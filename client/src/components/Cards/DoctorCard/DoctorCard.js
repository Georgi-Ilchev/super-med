import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup } from 'react-bootstrap';
import './DoctorCard.css';

const DoctorCard = ({
    data,
    id
}) => {
    return (
        // <Card border='primary' className='doctor-card'>
        //     <Card.Img variant="top" src={data.image} style={style.cardImage} />
        //     <Card.Body>
        //         <Card.Title>Dr. {data.fullName}</Card.Title>
        //         <Card.Text>
        //             {data.type} - {data.town}
        //         </Card.Text>
        //     </Card.Body>
        //     <ListGroup className="list-group-flush">
        //         <ListGroupItem><span className='doctor-card-span'>Age:</span> {data.age}</ListGroupItem>
        //         <ListGroupItem><span className='doctor-card-span'>Hospital:</span> {data.hospitalName}</ListGroupItem>
        //         <ListGroupItem><span className='doctor-card-span'>Email:</span> {data.email}</ListGroupItem>
        //         <ListGroupItem><span className='doctor-card-span'>Phone:</span> {data.phone}</ListGroupItem>
        //     </ListGroup>
        //     <Card.Body>
        //         <ButtonGroup md={4}>
        //             <Button as={Link} to={`/doctors/${id}/createappointment`} style={style.cardButton} variant='success'>Make an appointment</Button>
        //             <Button as={Link} to={`/doctors/${id}/details`} variant='secondary' >Details</Button>
        //         </ButtonGroup>

        //     </Card.Body>
        // </Card >

        <div className="col-sm-3">
            <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top" src={data.image} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Dr. {data.fullName}</h5>
                    <p className="card-text">{data.type} - {data.town}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span className='doctor-card-span'>Age: </span>{data.age}</li>
                    <li className="list-group-item"><span className='doctor-card-span'>Hospital: </span>{data.hospitalName}</li>
                    <li className="list-group-item"><span className='doctor-card-span'>Email: </span>{data.email}</li>
                    <li className="list-group-item"><span className='doctor-card-span'>Phone: </span>{data.phone}</li>
                </ul>
                <div className="card-body">
                    <ButtonGroup md={4}>
                        <Button as={Link} to={`/doctors/${id}/createappointment`} style={style.cardButton} variant='success'>Make an appointment</Button>
                        <Button as={Link} to={`/doctors/${id}/details`} variant='secondary' >Details</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

export default DoctorCard;

const style = {
    cardButton: {
        marginRight: '15px'
    },
    cardImage: {
        // objectFit: 'cover',
        // borderRadius: 55,
        width: '150px',
        height: '150px'
    }
}