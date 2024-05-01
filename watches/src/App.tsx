import './App.css'
import React, {Component} from "react";
import Watch from "./watch/watch.tsx";

class App extends Component {

    state: {
        inputWatchNameValue: string,
        inputTimeOffsetValue: number,
        watches: Array<{ name: string, timeOffset: number }>
    } = {
        inputWatchNameValue: "",
        inputTimeOffsetValue: 0,
        watches: []
    }

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formdata = new FormData(e.currentTarget);
        const name = Object.fromEntries(formdata).name.toString();
        const timeOffset = parseInt(Object.fromEntries(formdata).timeOffset.toString());

        const watches = [...this.state.watches, {name, timeOffset}]
        this.setState({
            inputWatchNameValue: "",
            inputTimeOffsetValue: 0, watches
        })
    }

    onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "name") {
            this.setState({inputWatchNameValue: e.target.value})
        } else {
            const value = e.target.value
            if (value === "-" || value === "") {
                this.setState({inputTimeOffsetValue: value})
            } else {
                this.setState({inputTimeOffsetValue: parseInt(value)})
            }

        }
    }

    removeWatch(index: number) {
        const newWatches = this.state.watches.filter((_, i) =>
            i !== index)
        this.setState({watches: newWatches})
    }


    render() {
        return (
            <div className="container">
                <div className="wrp">
                    <form onSubmit={this.onFormSubmit.bind(this)} autoComplete="off">
                        <div className="inputWrp">
                            <label htmlFor="name">Watch name</label>
                            <input type="text" name="name" value={this.state.inputWatchNameValue}
                                   onChange={this.onChangeInput.bind(this)} required/>
                        </div>
                        <div className="inputWrp">
                            <label htmlFor="timeOffset">Time offset from UTC</label>
                            <input name="timeOffset" type="text" pattern="^[\-+]?((1[012])|(0?[0-9]))$"
                                   value={this.state.inputTimeOffsetValue}
                                   onChange={this.onChangeInput.bind(this)}
                                   required/>
                        </div>
                        <button className="formBtn" type="submit">Add</button>
                    </form>
                    <div className="watches">
                        {this.state.watches.map((x, i) =>
                            <Watch key={i} {...x} onRemove={() => this.removeWatch(i)}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
