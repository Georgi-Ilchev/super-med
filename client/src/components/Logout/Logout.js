import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        signOut(auth)
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
        });
    })

    return null;
}

export default Logout;