import './watchWrp.css'
import React from "react";
import ClockFace from "./clockFace.tsx";
import moment from "moment";

type Props = {
    name: string,
    timeOffset: number,
    onRemove: Function,
}

export default class Watch extends React.Component<Props> {
    timerSecondId: number | null = null;
    state = this.getDataFromDate()

    setNewData() {
        this.setState(this.getDataFromDate())
    }

    getDataFromDate() {
        const now = moment.utc().add(this.props.timeOffset, "hours");
        return {seconds: now.get('seconds'), minutes: now.get("minutes"), hours: now.get("hours")}

    }

    componentDidMount() {
        this.timerSecondId = setInterval(this.setNewData.bind(this), 500)
    }

    componentWillUnmount() {

        if (this.timerSecondId != null) {
            clearInterval(this.timerSecondId);
        }
    }

    render() {
        const {name, onRemove} = this.props

        return (
            <div className="watchWrp">
                <span className="watchTitle">{name}</span>
                <button className="removeButton" onClick={() => onRemove?.call(null)}></button>
                <ClockFace seconds={this.state.seconds} minutes={this.state.minutes} hours={this.state.hours}/>
            </div>
        )
    }
}