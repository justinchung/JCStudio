import React from 'react';

class Metronome extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        var audioContext = this.props.context;
        this.state = {
            context: audioContext,
            playing: false,
            sound: true,
            tempo: 120,                                           // BPM
            nextNoteTime: 0.0,
            noteLength: 0.05,
            scheduleAheadTime: .2,
            quarterNote: 1
        };
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