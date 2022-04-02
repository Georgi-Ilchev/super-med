import { db } from "../../../utils/firebase.js";
import { useCallback } from "react";
import { doc, deleteDoc } from 'firebase/firestore';

const AppointmentTable = ({
    data
}) => {
    // const onDeclineHandler = (async (appointmentId) => {
    //     if (appointmentId != undefined) {
    //         await deleteDoc(doc(db, "appointments", appointmentId));
    //         console.log('deteled');
    //     }
    // });

    let counter = 0;
    return (
        <table className="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Hospital</th>
                    <th scope="col">Address</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Delete</th> */}
                </tr>
            </thead>
            <tbody>
                {data.map(x =>
                    <tr key={x.id}>
                        <th scope="row">{++counter}</th>
                        <td>{x.data.doctorName}</td>
                        <td>{x.data.hospital}</td>
                        <td>{x.data.address}</td>
                        <td>{x.data.date} - {x.data.hour}</td>
                        <td>{x.data.status}</td>
                        {/* <td><button type="button" className="btn btn-danger btn-sm" onClick={() => onDeclineHandler(x.id)}>X</button></td> */}
                    </tr>
                )}
            </tbody>

        </table>
    )
}

export default AppointmentTable;