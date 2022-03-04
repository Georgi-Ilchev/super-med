import { useEffect, useState, useCallback } from "react";
import { WeeklyOurs } from "../../../constants.js";

const ButtonsCard = ({
    day,
    clickedHour
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
                ?
                Object.entries(hours).map(([keyName, info], x) =>
                    // <p key={x}>{info}</p>)
                    // <p key={x} style={style.buttons} >{info}</p>)
                    // <p style={style.buttons} key={x}>{info}</p>)
                    <button
                        key={x}
                        style={style.buttons}
                        type="button"
                        onClick={clickedHour}
                        value={info}
                        className="btn btn-outline-secondary">
                        {info}
                    </button>)
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
    }
}