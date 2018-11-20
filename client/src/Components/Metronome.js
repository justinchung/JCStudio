import React from 'react';

class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.scheduler = this.scheduler.bind(this);
        this.toggleMetronome = this.toggleMetronome.bind(this);
        this.playSound = this.playSound.bind(this);
        var audioContext = new window.AudioContext();
        this.state = {
            playing: false,
            context: audioContext,
            nextNoteTime: audioContext.currentTime,
            noteLength: 0.5,
            lookAheadTime: 0.1,
            quarterNote: 1
        };
    }

    scheduler() {
        while (this.state.nextNoteTime < this.state.context.currentTime + this.state.lookAheadTime) {
            this.state.nextNoteTime += 0.5;
            this.playSound(this.state.nextNoteTime);
        }
    }

    playSound(time) {
        var osc = this.state.context.createOscillator();
        osc.connect(this.state.context.destination);

        if (this.state.quarterNote == 1) {
            osc.frequency.value = 880;
        }
        else {
            osc.frequency.value = 600;
        }
        console.log(this.state.quarterNote);
        this.state.quarterNote++;

        if (this.state.quarterNote == 5) {
            this.setState({
                quarterNote: 1
            });
        }
        osc.start(time);
        osc.stop(time + 0.1);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //window.clearInterval(this.state.intervalId);
    }

    toggleMetronome() {
        if (!this.state.playing) {
            console.log('playing');
            this.setState({
                playing: true,
                quarterNote: 1
            });
            var intervalId = window.setInterval(this.scheduler, 500.0)
            this.setState({
                intervalId: intervalId,
            });

        }
        else {
            console.log('stopped');
            this.setState({
                playing: false,
                quarterNote: 1
            });
            window.clearInterval(this.state.intervalId);
        }
    }

    render() {
        return (
            <div className="metronome">
                <button className="metronome start" onClick={this.toggleMetronome.bind(this)}>START</button>
            </div>
        );
    }

}

export default Metronome;