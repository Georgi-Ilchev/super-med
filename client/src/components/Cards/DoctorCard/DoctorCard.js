import { Route, Link, NavLink, Redirect, Routes } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup } from 'react-bootstrap';
import './DoctorCard.css';

const DoctorCard = ({
    data,
    id
}) => {
    return (
        <Card border='primary' className='doctor-card'>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Title>Dr. {data.firstName}</Card.Title>
                <Card.Text>
                    {data.type} - {data.town}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><span className='doctor-card-span'>Age:</span> {data.age}</ListGroupItem>
                <ListGroupItem><span className='doctor-card-span'>Hospital:</span> {data.hospital}</ListGroupItem>
                <ListGroupItem><span className='doctor-card-span'>Email:</span> {data.email}</ListGroupItem>
                <ListGroupItem><span className='doctor-card-span'>Phone:</span> {data.phone}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <ButtonGroup md={4}>
                    <Button as={Link} to={`/doctors/${id}/createappointment`} variant='warning' size='sm'>Make an appointment</Button>
                </ButtonGroup>
                <ButtonGroup >
                    <Button as={Link} to={`/doctors/${id}/details`} variant='secondary' size='sm'>Details</Button>
                </ButtonGroup>
            </Card.Body>
        </Card >

        // <div className="card media border-info col-md-4 mb-4 mr-4" style={{ width: '18rem' }}>
        //     <img className="card-img-top" src="@auction.ImageUrl" alt="This auction doesn`t have image" width="100" height="200" />
        //     <div className="card-body">
        //         <h3 className="card-title">{data.firstName}</h3>
        //         <p className="card-text">{data.type} - {data.town}</p>
        //         <p className="card-text">                </p>
        //     </div>
        //     <ul className="list-group list-group-flush">
        //         <li className="list-group-item"><span className="font-weight-bold">Age: </span>{data.age}</li>
        //         <li className="list-group-item"><span className="font-weight-bold">Hospital: </span>{data.hospital}</li>
        //         <li className="list-group-item"><span className="font-weight-bold">Phone: </span>{data.phone}</li>
        //     </ul>
        //     <div className="card-body">

        //     </div>
        // </div>
    )
}

export default DoctorCard;