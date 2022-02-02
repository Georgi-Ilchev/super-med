import style from './Home.css';
import Typical from 'react-typical';

const Home = () => {
    return (
        <section className="home-container">
            <h1 className='home-message'>We can help you to:</h1>
            <Typical className="home-typical"
                loop={Infinity}
                wrapper="b"
                steps={[
                    'find your medical check...', 1500,
                    'make an appointment...', 1500,
                    'happen easily and quickly!', 1500]}
            />
        </section>

    )
};

export default Home;