import React from 'react';

class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.scheduler = this.scheduler.bind(this);
        this.playMetronome = this.playMetronome.bind(this);
        this.toggle = this.toggle.bind(this);

        var audioContext = this.props.context;
        this.state = {
            context: audioContext,
            playing: false,
            sound: true,
            tempo: 120.0,                                           // BPM
            nextNoteTime: 0.0,
            noteLength: 0.1,
            scheduleAheadTime: 0.1,
            quarterNote: 1
        };
    }

    render() {
        return (
            <button className="control metronome" onClick={this.toggle}>Metronome</button>
        );
    }

    componentWillReceiveProps() {
        this.playMetronome();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    // Metronome
    scheduler() {
        while (this.state.nextNoteTime < this.state.context.currentTime + this.state.scheduleAheadTime) {
            this.scheduleNote(this.state.quarterNote, this.state.nextNoteTime);
            this.nextNote();
        }
    }

    nextNote() {
        var secondsPerBeat = 60.0 / this.state.tempo;

        this.setState({
            nextNoteTime: this.state.nextNoteTime + secondsPerBeat,
            quarterNote: this.state.quarterNote + 1
        });

        if (this.state.quarterNote === 5) {
            this.setState({
                quarterNote: 1
            });
        }
    }

    scheduleNote(beatNumber, time) {
        var osc = this.state.context.createOscillator();
        osc.connect(this.state.context.destination);
        if (beatNumber % 4 === 1) {
            osc.frequency.value = 880;
        }
        else {
            osc.frequency.value = 440;
        }

        if (this.state.sound) {
            osc.start(time);
            osc.stop(time + this.state.noteLength);
        }

        this.setState({
            quarterNote: this.state.quarterNote++
        });
         if (this.state.quarterNote === 5) {
            this.setState({
                quarterNote: 1
            })
        }
    }

    playMetronome() {
        if (!this.state.playing) {
            console.log('metronome playing');
            this.setState({
                playing: true,
                quarterNote: 1
            });
            var intervalId = window.setInterval(this.scheduler, 100.0)
            this.setState({
                intervalId: intervalId,
            });

        }
        else {
            console.log('metronome stopped');
            this.setState({
                playing: false,
                quarterNote: 1
            });
            window.clearInterval(this.state.intervalId);
        }
    }

    toggle() {
        if (!this.state.sound) {
            this.setState({
                sound: true
            });
            console.log("sound on");
        }
        else {
            this.setState({
                sound: false
            });
            console.log("sound off");
        }
    }




}

export default Metronome;