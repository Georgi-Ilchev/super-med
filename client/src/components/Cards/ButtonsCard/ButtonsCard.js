import { useEffect, useState, useCallback } from "react";
import { WeeklyOurs } from "../../../constants.js";
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from "../../../utils/firebase.js";

const ButtonsCard = ({
    day,
    clickedHour,
    date,
    doctorId
}) => {
    const [hours, setHours] = useState(null);
    const [takenHours, setTakenHours] = useState([]);

    useEffect(() => {
        (async () => {
            const doctorAppointments = collection(db, `appointments/${doctorId}/currentDoctorApp`);
            const q = query(doctorAppointments, where("date", "==", date));
            const dataAppointment = await getDocs(q);
            setTakenHours((state) => dataAppointment.docs.map((appointment) => appointment.data().hour));
        })();

        switch (day) {
            case '1':
                setHours(prevState => WeeklyOurs.mond); break;
            case '2':
                setHours(prevState => WeeklyOurs.tues); break;
            case '3':
                setHours(prevState => WeeklyOurs.wedn); break;
            case '4':
                setHours(prevState => WeeklyOurs.thur); break;
            case '5':
                setHours(prevState => WeeklyOurs.frid); break;

            default: setHours(prevState => null); break;
        }

    }, [date]);

    useEffect(() => {
    }, [takenHours])

    return (
        <div>
            {hours
                ?
                Object.entries(hours).map(([keyName, info], x) =>
                    // <p key={x}>{info}</p>)
                    // <p key={x} style={style.buttons} >{info}</p>)
                    // <p style={style.buttons} key={x}>{info}</p>)
                    // console.log(takenHours);
                    takenHours.find((hour) => hour.includes(info))
                        ? <button
                            key={x}
                            style={style.disabledButtons}
                            type="button"
                            onClick={clickedHour}
                            value={info}
                            disabled
                            className="btn btn-outline-secondary">
                            {info}
                        </button>
                        : <button
                            key={x}
                            style={style.buttons}
                            type="button"
                            onClick={clickedHour}
                            value={info}
                            className="btn btn-outline-secondary">
                            {info}
                        </button>


                )
                : <p>nyama chasove</p>}
        </div>
    )
}


export default ButtonsCard;

const style = {
    buttons: {
        fontSize: '1.2em',
        fontWeight: 500,
        // minWidth: 'calc(10% - 4px)',
        height: '36px',
        // lineHeight: '39px',
        margin: '5px',
        textAlign: 'center',
        color: '#38bd82',
        borderRadius: '5px',
        border: '2px solid #01bfa5',
        display: 'inline-block',
        cursor: 'pointer',

        // display: 'grid',
    },
    disabledButtons: {
        opacity: 0.65,
        color: 'gray',
        fontSize: '1.2em',
        fontWeight: 500,
        height: '36px',
        margin: '5px',
        textAlign: 'center',
        border: '2px solid',
        display: 'inline-block',
        background: 'repeating-linear-gradient(-45deg,transparent,transparent 5px,#f7fafc 0,#f7fafc 10px)',
    }
}