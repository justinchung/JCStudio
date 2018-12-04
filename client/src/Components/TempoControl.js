import React from 'react';

class TempoControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bpm: 120
        };
    }

    render() {
        return (
            <div>
                <span class="range-slider__value">{this.state.sliderValue}</span>
                <input className="range-slider__range" type="range" value={this.state.sliderValue} min="60" max="150" onChange={this.onChange.bind(this)} />
            </div>
        );
    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({
            bpm: e.target.value
        });
    }

}

export default TempoControl;