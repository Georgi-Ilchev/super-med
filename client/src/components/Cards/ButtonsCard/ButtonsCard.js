import { useEffect, useState } from "react";
import { WeeklyOurs } from "../../../constants.js";

const ButtonsCard = ({
    day
}) => {
    const [hours, setHours] = useState(null);

    useEffect(() => {
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
    }, [day]);

    return (
        <div>
            {hours
                ? Object.entries(hours).map(([keyName, info], x) =>
                    // <p key={x}>{info}</p>)
                    <p key={x} style={style.buttons} >{info}</p>)

                : <p>nyama chasove</p>}
        </div>
    )
}

export default ButtonsCard;

const style = {
    buttons: {
        fontSize: '0.9em',
        fontWeight: 500,
        minWidth: 'calc(50% - 4px)',
        height: '36px',
        lineHeight: '32px',
        margin: '2px',
        textAlign: 'center',
        color: '#38bd82',
        borderRadius: '5px',
        border: '2px solid #01bfa5',
    }
}