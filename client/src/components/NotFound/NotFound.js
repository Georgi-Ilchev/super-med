import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import notfound from '../../assets/images/notfound.png';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='text-center'>
            <img className="rounded mx-auto d-block notfoundImg" src={notfound} ></img>
            <Button as={Link} to={'/'} variant='secondary'>Back to home</Button>
        </div>
    );
};

export default NotFound;