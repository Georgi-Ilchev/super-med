import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';

const CreateDoctor = () => {
    const buttonStyle = {
        paddingTop: '5rem',
    }


    const onCreate = async () => {
        await setDoc(doc(db, "doctors", 'userid'), {
            firstName: "pesho",
            lastName: "goshov",
            age: "43",
            type: "allergists",
            hospital: "st. Anna"
        });
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