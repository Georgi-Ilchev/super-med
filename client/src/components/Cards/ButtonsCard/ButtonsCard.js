import { useEffect, useState, useCallback } from "react";
import { WeeklyOurs } from "../../../constants.js";
import { collection, doc, getDocs, query, setDoc, where, getDoc } from 'firebase/firestore';
import { db } from "../../../utils/firebase.js";

const ButtonsCard = ({
    day,
    clickedHour,
    date,
    doctorId,
    doctorHours
}) => {
    const [hours, setHours] = useState(null);
    const [takenHours, setTakenHours] = useState([]);

    useEffect(() => {
        // (async () => {
        //     const doctorAppointments = collection(db, `appointments/${doctorId}/currentDoctorApp`);
        //     const q = query(doctorAppointments, where("date", "==", date));
        //     const dataAppointment = await getDocs(q);
        //     setTakenHours((state) => dataAppointment.docs.map((appointment) => appointment.data().hour));
        // })();
        // console.log(doctorId);

        (async () => {
            const doctorAppointments = collection(db, `appointments`);
            const q = query(doctorAppointments, where("date", "==", date), where("doctorId", "==", doctorId));
            const dataAppointment = await getDocs(q);
            setTakenHours((state) => dataAppointment.docs.map((appointment) => appointment.data().hour));
        })();

        // Fixed hours
        // console.log(WeeklyOurs);
        // switch (day) {
        //     case '1':
        //         setHours(prevState => WeeklyOurs.mond); break;
        //     case '2':
        //         setHours(prevState => WeeklyOurs.tues); break;
        //     case '3':
        //         setHours(prevState => WeeklyOurs.wedn); break;
        //     case '4':
        //         setHours(prevState => WeeklyOurs.thur); break;
        //     case '5':
        //         setHours(prevState => WeeklyOurs.frid); break;

        //     default: setHours(prevState => null); break;
        // }

        // Current doctor hours
        // console.log(doctorHours);
        switch (day) {
            case '1':
                setHours(prevState => doctorHours.monday); break;
            case '2':
                setHours(prevState => doctorHours.thuesday); break;
            case '3':
                setHours(prevState => doctorHours.wednesday); break;
            case '4':
                setHours(prevState => doctorHours.thursday); break;
            case '5':
                setHours(prevState => doctorHours.friday); break;
            case '6':
                setHours(prevState => doctorHours.saturday); break;
            case '7':
                setHours(prevState => doctorHours.sunday); break;

            default: setHours(prevState => null); break;
        }

    }, [date]);

    return (
        <div>
            {hours?.length > 0
                ? Object.entries(hours).map(([keyName, info], x) =>
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
                : <div className="alert alert-primary d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                    <div>
                        Тhere are no hours on this day!
                    </div>
                </div>}
        </div>
    )
}


export default ButtonsCard;

const style = {
    buttons: {
        fontSize: '1.2em',
        fontWeight: 500,
        height: '36px',
        margin: '5px',
        textAlign: 'center',
        color: '#38bd82',
        borderRadius: '5px',
        border: '2px solid #01bfa5',
        display: 'inline-block',
        cursor: 'pointer',
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