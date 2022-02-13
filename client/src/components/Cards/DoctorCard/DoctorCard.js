import { Route, Link, NavLink, Redirect, Routes } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup } from 'react-bootstrap';
import './DoctorCard.css';

const DoctorCard = ({
    data
}) => {
    return (
        <Card border='primary' className='' style={{ width: '19rem' }}>
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
                    <Button variant='warning' size='sm'>Make an appointment</Button>
                </ButtonGroup>
                <ButtonGroup >
                    <Button variant='secondary' size='sm'>Details</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default DoctorCard;