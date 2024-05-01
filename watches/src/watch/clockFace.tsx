import './clockFace.css'

type Props = {
    seconds: number,
    minutes: number,
    hours: number
}

export default function ClockFace({seconds, minutes, hours}: Props) {

    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

    return (
        <div className="clockFace">
            <div className="outer-clock-face">
                <div className="marking marking-one"></div>
                <div className="marking marking-two"></div>
                <div className="marking marking-three"></div>
                <div className="marking marking-four"></div>
                <div className="inner-clock-face">
                    <div className="hand hour-hand"
                         style={{transform: `rotate(${hourDegrees}deg)`}}></div>
                    <div className="hand min-hand"
                         style={{transform: `rotate(${minuteDegrees}deg)`}}></div>
                    <div className="hand second-hand"
                         style={{transform: `rotate(${secondDegrees}deg)`}}></div>
                </div>
            </div>
        </div>
    )
}