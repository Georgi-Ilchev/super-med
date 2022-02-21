import notfound from '../../notfound.png';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='text-center'>
            <img className="rounded mx-auto d-block notfoundImg" src={notfound} ></img>
        </div>
    );
};

export default NotFound;