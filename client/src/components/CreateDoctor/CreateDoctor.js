import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';

const CreateDoctor = () => {
    const buttonStyle = {
        paddingTop: '5rem',
    }

    const onCreate = async () => {
        await setDoc(doc(db, "doctors", 'useridasdds'), {
            firstName: "pesho1",
            lastName: "goshov2",
            age: "43",
            type: "allergists",
            hospital: "st. Anna"
        });

        console.log('created');
    }

    return (
        <form id="createForm" style={buttonStyle} onSubmit={onCreate}>
            <button type="submit" className="btn btn-primary">
                Create
            </button>
        </form>
    )
}

export default CreateDoctor;