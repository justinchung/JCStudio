import React from 'react';

class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
            <button className="control metronome" onClick={this.toggle}>Metronome</button>
        );
    }

    toggle() {
        this.props.toggleMetronome();
    }
}

export default Metronome;